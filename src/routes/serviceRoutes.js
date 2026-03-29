const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const auth = require("../middleware/authMiddleware");

router.get("/",  serviceController.getServices);
router.get("/byid/:id",  serviceController.getServiceById);
router.post("/", serviceController.insertService);
router.get("/seed", serviceController.seedServices);

module.exports = router;