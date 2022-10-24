const express = require("express");
const router = express.Router();
const likesController = require("../controllers/likesController");
const authorization = require("../middleware/authorization");

router.get("/feed/posts/:id/likes", authorization, likesController.userLikesPost);
router.post("/feed/posts/:id/likes", authorization, likesController.likePost);
router.delete("/feed/posts/:id/likes", authorization, likesController.deleteLikeFromPost);
router.get("/feed/posts/likes", authorization, likesController.getAllLikes);


module.exports = router;