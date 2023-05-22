const express = require("express");
// const cors = require("cors");
// const multer = require("multer");

let router = express.Router();
let LogoutController = require("../Controllers/LogoutController");

router.post("/", LogoutController.logoutUser);

module.exports = router;
