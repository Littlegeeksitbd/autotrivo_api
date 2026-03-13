const express = require("express");
const router = express.Router();
const testController = require("../controllers/testController");

// BaseUrl/api/test

router.get("/db", testController.testDB);


module.exports = router;