const express = require("express");
const cors = require("cors");
const multer = require("multer");

let router = express.Router();
let LoginController = require("../Controllers/LoginController");

router.post("/", LoginController.loginUser);

module.exports = router;
