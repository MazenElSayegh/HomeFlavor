const express = require("express");

const router = new express.Router();

const multer = require("multer");

const UsersController = require("../Controllers/UsersController");
const adminauth = require("../Middlewares/adminMW");

// Adding new User

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });
router.get("/", adminauth, UsersController.GetAllUsers);
//Get user By ID
router.get("/:id",  UsersController.GetUserById);
//Create New user
router.post("/", upload.single("user_image"), UsersController.AddNewUser);

//Update user
router.put("/:id", upload.single("user_image"), UsersController.UpdateUser);
//Delete user
router.delete("/:id", UsersController.DeleteUser);

module.exports = router;
