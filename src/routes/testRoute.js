const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

// BaseUrl/api/test

router.get("/dbtest", testController.testDB);
router.get("/makedb", testController.createTables);


module.exports = router;