const pool = require("../config/dbConfig");

class PostController {
  static async getAllPosts(req, res) {
    try {
      const allPosts = await pool.query("SELECT avatar_url, first_name, last_name, likes, replies, content, created_at FROM posts JOIN users ON posts.user_id = users.id");
      return res.status(200).json(allPosts.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
  static async createPost(req, res) {
    try {
      const { content } = req.body;
      const newPost = await pool.query(
        "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING user_id, content",
        [req.user, content]
      );
      return res.status(200).json(newPost.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
}

module.exports = PostController;
