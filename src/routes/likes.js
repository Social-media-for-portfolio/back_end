const express = require("express");
const router = express.Router();
const likesController = require("../controllers/likesController");
const authorization = require("../middleware/authorization");

router.get("/feed/posts/:id/likes", authorization, likesController.getLikesOfPost);
router.post("/feed/posts/:id/likes", authorization, likesController.likePost);
router.delete("/feed/posts/:id/likes", authorization, likesController.deleteLikeFromPost);

module.exports = router;