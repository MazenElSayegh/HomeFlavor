const express = require("express");
const Router = express.Router();
const ordersController = require("../Controllers/OrdersController");
let buyerauth = require("../Middlewares/buyerMW");

Router.get("/", buyerauth, ordersController.GetAllOrders);
Router.get("/:id", buyerauth, ordersController.GetOrderByID);
Router.post("/create", buyerauth, ordersController.CreateOrder);
Router.put("/:id", buyerauth, ordersController.UpdateOrderByID);

module.exports = Router;