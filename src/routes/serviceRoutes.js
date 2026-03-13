const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, serviceController.getServices);

module.exports = router;