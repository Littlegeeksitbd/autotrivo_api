const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

// BaseUrl/api/test

router.post("/db", testController.testDB);


module.exports = router;