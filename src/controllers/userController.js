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
        "SELECT user_id, posts.id, avatar_url, first_name, last_name, likes, replies, content, created_at FROM posts JOIN users ON posts.user_id = users.id WHERE user_id = $1 ORDER BY posts.id DESC",
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
        "SELECT id, first_name, last_name, avatar_url, bio, location, birthday FROM users WHERE id = $1",
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
      const { id } = req.params;
      const userInfo = await pool.query(
        "SELECT id, first_name, last_name, avatar_url, bio, location, birthday FROM users WHERE id = $1",
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
        "SELECT FROM friend_requests WHERE sender_id = $2 AND receiver_id = $1 ",
        [req.user, id]
      );
      if (friend.rows.length < 1) {
        await pool.query(
          "INSERT INTO friend_requests (sender_id, receiver_id) VALUES ($1, $2)",
          [req.user, id]
        );
      } else {
        await pool.query(
          "UPDATE friend_requests SET is_accepted = true WHERE sender_id = $2 AND receiver_id = $1",
          [req.user, id]
        );
      }
      return res.status(200).json("success");
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
  static async updateProfile(req, res) {
    try {
      const { firstName, lastName, location, birthday, bio } = req.body;
      const updatedProfile = await pool.query(
        "UPDATE users SET first_name = $1, last_name = $2, location = $3, birthday = $4, bio = $5 WHERE id = $6",
        [firstName, lastName, location, birthday, bio, req.user]
      );
      return res.status(200).json(updatedProfile.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
  static async getFriendsForUser(req, res) {
    try {
      const { id } = req.params;
      const friends = await pool.query(
        "SELECT users.id, first_name, last_name, avatar_url FROM friend_requests JOIN users ON users.id = sender_id OR users.id = receiver_id WHERE sender_id = $1 AND is_accepted = true OR receiver_id = $1 AND is_accepted = true",
        [id]
      );
      return res.status(200).json(friends.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server Error");
    }
  }
  static async removeUserFromFriends(req, res) {
    try {
      const { id } = req.params;
      const removedFriend = await pool.query(
        "DELETE FROM friend_requests WHERE sender_id = $1 AND receiver_id = $2 OR receiver_id = $1 AND sender_id = $2 RETURNING *",
        [req.user, id]
      );
      return res.status(200).json(removedFriend.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server Error");
    }
  }
  static async acceptFriendRequest(req, res) {
    try {
      const { id } = req.params;
      await pool.query(
        "UPDATE friend_requests SET is_accepted = true WHERE sender_id = $1 AND receiver_id = $2",
        [id, req.user]
      );
      const newFriend = await pool.query(
        "SELECT users.id, first_name, last_name, avatar_url FROM friend_requests JOIN users ON users.id = sender_id WHERE receiver_id = $1 AND sender_id = $2",
        [req.user, id]
      );
      return res.status(200).json(newFriend.rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json("server error");
    }
  }
  static async getIncomingRequests(req, res) {
    try {
      const incomingRequests = await pool.query(
        "SELECT users.id, first_name, last_name, avatar_url FROM friend_requests JOIN users ON users.id = sender_id WHERE receiver_id = $1 AND is_accepted = false",
        [req.user]
      );
      return res.status(200).json(incomingRequests.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("server error");
    }
  }
  static async getOutgoingRequests(req, res) {
    try {
      const outgoingRequests = await pool.query(
        "SELECT users.id, first_name, last_name, avatar_url FROM friend_requests JOIN users ON users.id = receiver_id WHERE sender_id = $1 AND is_accepted = false",
        [req.user]
      );
      return res.status(200).json(outgoingRequests.rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json("server error");
    }
  }
  static async updateAvatar(req, res) {
    try {
      const {avatar} = req.body;
      const newAvatar = await pool.query("UPDATE users SET avatar_url = $1 WHERE id = $2 RETURNING avatar_url, id", [avatar, req.user]);
      return res.status(200).json(newAvatar.rows)
    } catch (error) {
      console.error(error);
      return res.status(500).json("server error")
    }
  }
}

module.exports = UserController;
