const pool = require("../config/dbConfig");

class CommentModel {
  static async getAllComents(id) {
    const comments = await pool.query(
      "SELECT comments.id, user_id, post_id, content, avatar_url, first_name, last_name, created_at FROM comments JOIN users ON user_id = users.id WHERE post_id = $1 ORDER BY comments.id DESC",
      [id]
    );
    return comments.rows;
  }
  static async postNewComment(userId, postId, content) {
    const newComment = await pool.query(
      "INSERT INTO comments (user_id, post_id, content) VALUES($1, $2, $3) RETURNING id, content",
      [userId, postId, content]
    );
    return newComment.rows;
  }
  static async deleteComment(commentId) {
    await pool.query("DELETE FROM comment_likes WHERE comment_id = $1", [
      commentId,
    ]);
    const deletedComment = await pool.query(
      "DELETE FROM comments WHERE comments.id = $1 RETURNING comments.id, comments.content",
      [commentId]
    );
    return deletedComment.rows;
  }
  static async getCommentCount() {
    const metrics = await pool.query(
      "SELECT post_id, COUNT(*) as commentCount FROM comments GROUP BY post_id"
    );
    return metrics.rows;
  }
}

module.exports = CommentModel;
