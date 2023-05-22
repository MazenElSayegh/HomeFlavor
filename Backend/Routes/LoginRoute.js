const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const sessionMiddleware = require("../Middlewares/sessionMW");

let router = express.Router();
// router.use(sessionMiddleware);
let LoginController = require("../Controllers/LoginController");

router.post("/", LoginController.loginUser);

module.exports = router;
