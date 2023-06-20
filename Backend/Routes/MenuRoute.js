const express = require("express");
const Router = express.Router();
const MenuController = require("../Controllers/MenuController");
const multer = require("multer");
let adminauth = require("../Middlewares/adminMW");
let sellerauth = require("../Middlewares/sellerMW");
let buyerauth = require("../Middlewares/buyerMW");


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

Router.get("/:id_store", MenuController.getAllMenu);
Router.get("/item/:id_item", MenuController.getMenuByID);
Router.delete("/:id_item", sellerauth,MenuController.deleteMenuItemByID);
Router.put(
  "/:id",sellerauth,
  upload.single("product_image"),
  MenuController.updateItemByID
);
Router.post(
  "/create",sellerauth,
  upload.single("product_image"),
  MenuController.CreateMenuItem
);

module.exports = Router;
