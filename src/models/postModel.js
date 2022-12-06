const pool = require("../config/dbConfig")

class PostModel {
    static async getPosts() {
        const allPosts = await pool.query(
            "SELECT user_id, posts.id, avatar_url, first_name, last_name, likes, replies, content, created_at FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.id DESC"
          );
          return allPosts.rows;
    }
    static async createNewPost(userId, content, tagArr) {
        const newPost = await pool.query(
            "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING id",
            [userId, content]
          );
          const { id } = newPost.rows[0];
          for (let tag of tagArr) {
            await pool.query(
              "INSERT INTO post_tags (post_id, tag) VALUES ($1, $2)",
              [id, tag]
            );
          }
          return newPost.rows;
    }
    static async deletePostAndRelatedInfo (postId) {
        await pool.query("DELETE FROM post_tags WHERE post_id = $1", [postId]);
        await pool.query("DELETE FROM comment_likes WHERE post_id = $1", [postId]);
        await pool.query("DELETE FROM comments WHERE post_id = $1", [postId]);
        await pool.query("DELETE FROM likes WHERE post_id = $1", [postId]);
        const deletedPost = await pool.query(
          "DELETE FROM posts WHERE posts.id = $1 RETURNING id, user_id, content",
          [postId]
        );
        return deletedPost.rows;
    }
}

module.exports = PostModel;