const pool = require("../config/dbConfig");

class CommentController {
  static async getComments(req, res) {
    try {
      const { id } = req.params;
      const comments = await pool.query(
        "SELECT comments.id, user_id, post_id, content, avatar_url, first_name, last_name, created_at FROM comments JOIN users ON user_id = users.id WHERE post_id = $1 ORDER BY comments.id DESC",
        [id]
      );
      return res.status(200).json(comments.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("server error");
    }
  }
  static async postComment(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const newComment = await pool.query(
        "INSERT INTO comments (user_id, post_id, content) VALUES($1, $2, $3) RETURNING id",
        [req.user, id, content]
      );
      res.status(200).json(newComment.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json("Server error");
    }
  }
}

module.exports = CommentController;
