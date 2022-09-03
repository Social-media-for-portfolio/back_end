const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

router.post("/register", validInfo, authController.registerUser);
router.post("/login", validInfo, authController.loginUser);
router.get("/is-verified", authorization, authController.isVerified);
router.get("/email", authController.checkEmail);

module.exports = router;
