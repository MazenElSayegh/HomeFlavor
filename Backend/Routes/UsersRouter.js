const express = require("express");
const router = new express.Router();

const UsersController = require("../Controllers/UsersController");

// Adding new User

router.get("/", UsersController.GetAllUsers);
//Get user By ID
router.get("/:id", UsersController.GetUserById);
//Create New user
router.post("/", UsersController.AddNewUser);

//Update user
router.put("/:id", UsersController.UpdateUser);
//Delete user
router.delete("/:id", UsersController.DeleteUser);

module.exports = router;
