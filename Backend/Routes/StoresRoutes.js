const express = require("express");
const Router = express.Router();
const StoresController = require("../Controllers/StoresController");
const MenuController = require("../Controllers/MenuController");
const FeedBackController = require("../Controllers/FeedBackController");

Router.get("/", StoresController.getAllStores);
Router.get("/:id", StoresController.getStoreByID);
Router.post("/create", StoresController.createStore);
Router.put("/:id", StoresController.updateStoreByID);
Router.delete("/:id", StoresController.deleteStoreByID);

Router.get("/menu/:id", MenuController.getAllMenu);
Router.delete("/:id/menu/:itemName", MenuController.deleteMenuItemByID);
Router.post("/menu/create/:id", MenuController.CreateMenuItem );

Router.get("/feedback/:id", FeedBackController.getAllFeedBack);
Router.delete("/:id/feedback/:feedbackId", FeedBackController.deleteFeedBackByID);
Router.post("/feedback/create/:id", FeedBackController.CreateFeedBack );





module.exports = Router;
