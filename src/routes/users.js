const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const PostController = require("../controllers/postController");
const authorization = require("../middleware/authorization");

router.get("/", authorization, userController.getAllUsers);
router.get("/me", authorization, userController.getMyUserProfile);
router.get("/profile/:id", authorization, userController.getUserProfile);
router.get("/profile/:id/posts", authorization, userController.getPostsByUser);
router.get("/profile/:id/comments", authorization, PostController.GetPostsWithUsersComments);
router.get("/profile/:id/friends", authorization, userController.getFriendsForUser);
router.post("/profile/:id", authorization, userController.addUserAsFriend);
router.delete("/profile/:id", authorization, userController.removeUserFromFriends);
router.put("/profile/:id/info", authorization, userController.updateProfile);

module.exports = router;
