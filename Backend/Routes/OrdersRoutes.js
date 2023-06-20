const express = require("express");
const Router = express.Router();
const ordersController = require("../Controllers/OrdersController");
let auth= require("../Middlewares/authMW");

Router.get("/", auth(["admin","buyer","seller"]), ordersController.GetAllOrders);
Router.get("/:id", auth(["admin","buyer","seller"]), ordersController.GetOrderByID);
Router.post("/create", auth(["admin","buyer","seller"]), ordersController.CreateOrder);
Router.put("/:id", auth(["admin","buyer","seller"]), ordersController.UpdateOrderByID);

module.exports = Router;