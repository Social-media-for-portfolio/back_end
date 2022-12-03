const pool = require("../config/dbConfig");

class PostController {
  static async getAllPosts(req, res) {
    try {
      const allPosts = await pool.query(
        "SELECT user_id, posts.id, avatar_url, first_name, last_name, likes, replies, content, created_at FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.id DESC"
      );
      return res.status(200).json(allPosts.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
  static async getPost(req, res) {
    try {
      const { id } = req.body;
      const post = await pool.query(
        "SELECT posts.id, avatar_url, first_name, last_name, likes, replies, content, created_at FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = $1",
        [id]
      );
      return res.status(200).json(post.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
  static async createPost(req, res) {
    try {
      const { content, tags } = req.body;
      const newPost = await pool.query(
        "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING id",
        [req.user, content]
      );
      const { id } = newPost.rows[0];
      for (let tag of tags) {
        await pool.query(
          "INSERT INTO post_tags (post_id, tag) VALUES ($1, $2)",
          [id, tag]
        );
      }
      return res.status(201).json(newPost.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }

  static async deletePost(req, res) {
    try {
      const { id } = req.params;
      await pool.query("DELETE FROM post_tags WHERE post_id = $1", [id]);
      await pool.query("DELETE FROM comment_likes WHERE post_id = $1", [id]);
      await pool.query("DELETE FROM comments WHERE post_id = $1", [id]);
      await pool.query("DELETE FROM likes WHERE post_id = $1", [id]);
      const deletedPost = await pool.query(
        "DELETE FROM posts WHERE posts.id = $1 RETURNING id, user_id, content",
        [id]
      );
      return res.status(200).json(deletedPost.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
  static async GetPostsWithUsersComments(req, res) {
    try {
      const { id } = req.params;
      const posts = await pool.query(
        "SELECT posts.user_id, posts.id, users.avatar_url, users.first_name, users.last_name, posts.likes, posts.replies, posts.content, posts.created_at FROM comments JOIN posts ON posts.id = comments.post_id JOIN users ON users.id = posts.user_id WHERE comments.user_id = $1",
        [id]
      );
      return res.status(200).json(posts.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
  static async getAllPostTags(req, res) {
    try {
      const postTags = await pool.query("SELECT * FROM post_tags");
      return res.status(200).json(postTags.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
}

module.exports = PostController;
