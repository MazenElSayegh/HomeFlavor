const express = require("express");

const router = new express.Router();

const multer = require("multer");

const UsersController = require("../Controllers/UsersController");
let auth = require("../Middlewares/authMW");

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
router.get("/", auth(["admin"]), UsersController.GetAllUsers);
//Get user By ID
router.get("/:id", UsersController.GetUserById);
//Create New user
router.post("/", upload.single("user_image"), UsersController.AddNewUser);
router.post("/googleAuth", UsersController.GoogleLogin);

//Update user
router.put("/:id", upload.single("user_image"), UsersController.UpdateUser);
//Delete user
router.delete("/:id", UsersController.DeleteUser);

//Subscribe user
router.post("/subscribe", UsersController.SubscribeUser);

module.exports = router;
