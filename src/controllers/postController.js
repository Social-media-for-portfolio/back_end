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
  static async getPostsByUser() {
    try {
        
    } catch (error) {
        
    }
  }
}
