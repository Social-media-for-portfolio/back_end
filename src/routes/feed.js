const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const authorization = require("../middleware/authorization");

router.get("/posts", authorization, postController.getAllPosts);
router.post("/posts", authorization, postController.createPost);
router.get("/posts/:id", authorization, commentController.getComments);
router.post("/posts/:id", authorization, commentController.postComment);

module.exports = router;
