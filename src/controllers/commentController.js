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
      return res.status(201).json(newComment.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }

  static async deleteComment(req, res) {
    try {
      const { commentId } = req.params;
      await pool.query("DELETE FROM comment_likes WHERE comment_id = $1", [
        commentId,
      ]);
      const deletedComment = await pool.query(
        "DELETE FROM comments WHERE comments.id = $1 RETURNING comments.id",
        [commentId]
      );
      return res.status(200).json("success");
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
  static async getCommentMetric(req, res) {
    try {
      const metrics = await pool.query(
        "SELECT post_id, COUNT(*) as commentCount FROM comments GROUP BY post_id"
      );
      return res.status(200).json(metrics.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("server error");
    }
  }
}

module.exports = CommentController;
