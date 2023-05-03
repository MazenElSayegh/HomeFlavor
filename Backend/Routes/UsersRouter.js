const express = require("express");
const router = new express.Router();

const UsersController = require("../Controllers/UsersController");

// Adding new User
router.post("/", UsersController.AddNewUser);

module.exports = router;
