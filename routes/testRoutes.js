const express = require("express");
const { testUpload } = require("../controllers/testController");
const router = express.Router();

router.route("/test-upload").post(testUpload);

module.exports = router;
