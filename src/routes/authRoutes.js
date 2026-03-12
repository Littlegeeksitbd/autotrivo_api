const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// BaseUrl/api/register

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/me", authController.me);

module.exports = router;