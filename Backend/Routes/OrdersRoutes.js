const express = require("express");
const Router = express.Router();
const ordersController = require("../Controllers/OrdersController");
let adminauth = require("../Middlewares/adminMW");
let sellerauth = require("../Middlewares/sellerMW");
let buyerauth = require("../Middlewares/buyerMW");

Router.get("/", buyerauth, ordersController.GetAllOrders);
Router.get("/:id", buyerauth, auth, ordersController.GetOrderByID);
Router.post("/create", buyerauth, auth, ordersController.CreateOrder);
Router.put("/:id", adminauth, ordersController.UpdateOrderByID);

module.exports = Router;
