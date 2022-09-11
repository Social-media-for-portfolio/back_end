const pool = require("../config/dbConfig");

class PostController {
  static async getAllPosts(req, res) {
    try {
      const allPosts = await pool.query("SELECT * FROM posts");
      return res.status(200).json(allPosts.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
  static async getPostsByUser(req, res) {
    try {
      const { id } = req.params;
      const userPosts = await pool.query(
        "SELECT * FROM posts WHERE user_id = $1",
        [id]
      );
      return res.status(200).json(userPosts.rows);
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
