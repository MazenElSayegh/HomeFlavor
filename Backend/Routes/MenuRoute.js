const express = require("express");
const Router = express.Router();
const MenuController = require("../Controllers/MenuController");



Router.get("/:id_store", MenuController.getAllMenu);
Router.delete("/:id_item", MenuController.deleteMenuItemByID);
Router.put("/:id", MenuController.updateItemByID);
Router.post("/create", MenuController.CreateMenuItem );

module.exports = Router;
