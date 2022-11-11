const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const PostController = require("../controllers/postController");
const interestController = require("../controllers/interestController");
const authorization = require("../middleware/authorization");

router.get("/", authorization, userController.getAllUsers);
router.get("/me", authorization, userController.getMyUserProfile);
router.put("/me/onboarding", authorization, interestController.setOnboarding);
router.get("/interests", authorization, interestController.getInterestsForAllUsers);
router.get("/me/interests", authorization, interestController.getMyIntersts);
router.post("/me/interests", authorization, interestController.addInterests);
router.delete("/me/interests", authorization, interestController.removeInterest);
router.get("/me/friends/incoming", authorization,  userController.getIncomingRequests);
router.get("/me/friends/outgoing", authorization, userController.getOutgoingRequests);
router.get("/profile/:id", authorization, userController.getUserProfile);
router.get("/profile/:id/posts", authorization, userController.getPostsByUser);
router.get("/profile/:id/comments", authorization, PostController.GetPostsWithUsersComments);
router.get("/profile/:id/friends", authorization, userController.getFriendsForUser);
router.post("/profile/:id", authorization, userController.addUserAsFriend);
router.put("/profile/:id", authorization, userController.acceptFriendRequest);
router.delete("/profile/:id", authorization, userController.removeUserFromFriends);
router.put("/profile/:id/info", authorization, userController.updateProfile);
router.put("/profile/:id/avatar", authorization, userController.updateAvatar);

module.exports = router;
