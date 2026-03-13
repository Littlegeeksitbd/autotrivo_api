const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

// BaseUrl/api/test

router.get("/dbtest", testController.testDB);


module.exports = router;