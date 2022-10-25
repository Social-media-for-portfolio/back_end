const pool = require("../config/dbConfig");

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await pool.query(
        "SELECT id, first_name, last_name, avatar_url FROM users"
      );
      return res.status(200).json(users.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
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
  static async getMyUserProfile(req, res) {
    try {
      const userInfo = await pool.query(
        "SELECT id, first_name, last_name, avatar_url FROM users WHERE id = $1",
        [req.user]
      );

      return res.status(200).json(userInfo.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
  static async getUserProfile(req, res) {
    try {
      const {id} = req.params;
      const userInfo = await pool.query(
        "SELECT id, first_name, last_name, avatar_url FROM users WHERE id = $1",
        [id]
      );
      return res.status(200).json(userInfo.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  }
  static async addUserAsFriend(req, res) {
    try {
      const { id } = req.params;
      const friend = await pool.query(
        "INSERT INTO friend_requests (sender_id, receiver_id) VALUES ($1, $2) RETURNING *",
        [req.user, id]
      );
      return res.status(200).json(friend.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
}

module.exports = UserController;
