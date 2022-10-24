const pool = require("../config/dbConfig");

class LikesController {
  static async userLikesComment(req, res) {
    try {
      const { id } = req.params;
      const likes = await pool.query(
        "SELECT COUNT(*) FROM comment_likes WHERE comment_id = $1 AND user_id = $2",
        [id, req.user]
      );
      const boolean = parseInt(likes.rows[0].count) ? true : false;
      return res.status(200).json(boolean);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server error");
    }
  }
  static async likeComment(req, res) {
    try {
      const { id } = req.params;
      const newLike = await pool.query(
        "INSERT INTO comment_likes (comment_id,  user_id) VALUES($1, $2) RETURNING *",
        [id, req.user]
      );
      return res.status(200).json(newLike.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  }
  static async deleteLikeFromComment(req, res) {
    try {
      const { id } = req.params;
      const deletedLike = await pool.query(
        "DELETE FROM comment_likes WHERE comment_id = $1 AND user_id = $2 RETURNING *",
        [id, req.user]
      );
      return res.status(200).json(deletedLike.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  }
  static async getAllCommentLikes(req, res) {
    try {
      const likes = await pool.query(
        "SELECT comment_id, COUNT(*) as likeCount FROM likes GROUP BY comment_id"
      );
      return res.status(200).json(likes.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  }
}

module.exports = LikesController;
