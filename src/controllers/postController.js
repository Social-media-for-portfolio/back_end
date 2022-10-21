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
      const { content } = req.body;
      const newPost = await pool.query(
        "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING id",
        [req.user, content]
      );
      return res.status(200).json(newPost.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }

  static async deletePost(req, res) {
    try {
      const { id } = req.params;
      const deletedPost = await pool.query(
        "DELETE FROM posts WHERE posts.id = $1 RETURNING id, user_id, content",
        [id],
      );
      return res.status(200).json(deletedPost.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
}

module.exports = PostController;
