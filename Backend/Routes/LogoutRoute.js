const express = require("express");

let router = express.Router();
let LogoutController = require("../Controllers/LogoutController");

router.post("/", LogoutController.logoutUser);

module.exports = router;
