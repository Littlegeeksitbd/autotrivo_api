const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const auth = require("../middleware/authMiddleware");

router.get("/",  serviceController.getServices);
router.get("/:id",  serviceController.getServiceById);
router.post("/", serviceController.insertService);

module.exports = router;