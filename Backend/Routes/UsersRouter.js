const express = require("express");
const router = new express.Router();

const UsersController = require("../Controllers/UsersController");
const auth = require("../Middlewares/authMW");
// Adding new User

router.get("/", auth, UsersController.GetAllUsers);
//Get user By ID
router.get("/:id", UsersController.GetUserById);
//Create New user
router.post("/", UsersController.AddNewUser);

//Update user
router.put("/:id", UsersController.UpdateUser);
//Delete user
router.delete("/:id", UsersController.DeleteUser);

module.exports = router;
