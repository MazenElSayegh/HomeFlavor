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







module.exports = Router;
