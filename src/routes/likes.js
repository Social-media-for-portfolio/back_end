const express = require("express");
const router = express.Router();
const likesController = require("../controllers/likesController");
const commentLikesController = require("../controllers/commentLikesController")
const authorization = require("../middleware/authorization");

router.get("/feed/posts/:id/likes", authorization, likesController.userLikesPost);
router.post("/feed/posts/:id/likes", authorization, likesController.likePost);
router.delete("/feed/posts/:id/likes", authorization, likesController.deleteLikeFromPost);
router.get("/feed/posts/likes", authorization, likesController.getAllLikes);
router.get("/feed/comments/likes", authorization, commentLikesController.getAllCommentLikes);
router.get("/feed/comments/:id/likes", authorization, commentLikesController.userLikesComment);
router.post("/feed/comments/:id/likes", authorization, commentLikesController.likeComment);
router.delete("/feed/comments/:id/likes", authorization, commentLikesController.deleteLikeFromComment);


module.exports = router;