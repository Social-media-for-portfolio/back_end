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
            "INSERT INTO comments (user_id, post_id, content) VALUES($1, $2, $3) RETURNING id",
            [userId, postId, content]
          );
          return newComment.rows;
    }
}

module.exports = CommentModel;