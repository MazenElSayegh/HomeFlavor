const express = require("express");


let router = express.Router();
let LoginController = require("../Controllers/LoginController");

router.post("/", LoginController.loginUser);

module.exports = router;
