const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authorization = require("../middleware/authorization");

router.get("/posts", authorization, postController.getAllPosts);
router.post("/posts", authorization, postController.createPost);

module.exports = router;