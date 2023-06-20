const express = require("express");
const Router = express.Router();
const StoresController = require("../Controllers/StoresController");
const MenuController = require("../Controllers/MenuController");
const FeedBackController = require("../Controllers/FeedBackController");
const multer = require("multer");
let auth= require("../Middlewares/authMW");

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

Router.get("/", StoresController.getAllStores);
Router.get("/:id", StoresController.getStoreByID);
Router.post("/create",auth(["admin","seller"]), upload.single("image"), StoresController.createStore);
Router.put("/:id",auth(["admin","seller"]), upload.single("image"), StoresController.updateStoreByID);
Router.delete("/:id", auth(["admin","seller"]),StoresController.deleteStoreByID);

module.exports = Router;
