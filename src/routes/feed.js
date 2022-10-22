const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const authorization = require("../middleware/authorization");

router.get("/posts", authorization, postController.getAllPosts);
router.post("/posts", authorization, postController.createPost);
// router.get("/posts/:id", authorization, postController.getPost);
router.delete("/posts/:id", authorization, postController.deletePost);
router.get("/posts/:id/comments", authorization, commentController.getComments);
router.delete("/posts/:id/comments/:commentId", authorization, commentController.deleteComment)
router.post("/posts/:id", authorization, commentController.postComment);
router.get("/comments/metrics", authorization, commentController.getCommentMetric);

module.exports = router;
