const pool = require("../config/dbConfig");

class LikesController {
  static async getLikesOfPost(req, res) {
    try {
      const { id } = req.params;
      const likes = await pool.query(
        "SELECT COUNT(*) FROM likes WHERE post_id = $1",
        [id]
      );
      return res.status(200).json(likes.rows[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server error");
    }
  }
  static async likePost(req, res) {
    try {
      const { id } = req.params;
      const newLike = await pool.query(
        "INSERT INTO likes (post_id,  user_id) VALUES($1, $2) RETURNING *",
        [id, req.user]
      );
      return res.status(200).json(newLike.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  }
  static async deleteLikeFromPost(req, res) {
    try {
      const { id } = req.params;
      const deletedLike = await pool.query(
        "DELETE FROM likes WHERE post_id = $1 AND user_id = $2 RETURNING *",
        [id, req.user]
      );
      return res.status(200).json(deletedLike.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  }
  static async getAllLikes(req, res) {
    try {
      const likes = await pool.query(
        "SELECT post_id, COUNT(*) as likeCount FROM likes GROUP BY post_id"
      );
      return res.status(200).json(likes.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  }
}

module.exports = LikesController;
