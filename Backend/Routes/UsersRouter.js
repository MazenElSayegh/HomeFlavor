const express = require("express");
const router = new express.Router();

const UsersController = require("../Controllers/UsersController");

// Adding new User

router.get("/", UsersController.GetAllUsers);
//Get Student By ID
router.get("/:id", UsersController.GetUserById);
//Create New Student
router.post("/", UsersController.AddNewUser);

//Update Student
router.put("/:id", UsersController.UpdateUser);
//Delete Student
router.delete("/:id", UsersController.DeleteUser);

module.exports = router;
