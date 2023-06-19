const express = require("express");
const Router = express.Router();
const ordersController = require("../Controllers/OrdersController");
let buyerauth = require("../Middlewares/buyerMW");
let auth= require("../Middlewares/authMW");

Router.get("/", auth(["admin","buyer","seller"]), ordersController.GetAllOrders);
Router.get("/:id", buyerauth, ordersController.GetOrderByID);
Router.post("/create", buyerauth, ordersController.CreateOrder);
Router.put("/:id", buyerauth, ordersController.UpdateOrderByID);

module.exports = Router;