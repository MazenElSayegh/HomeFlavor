const express=require("express");
const Router=express.Router();
const ordersController=require("../Controllers/OrdersController");
let auth=require("../Middlewares/ordersMW");

Router.get("/",auth,ordersController.GetAllOrders)
Router.get("/:id",auth,ordersController.GetOrderByID)
Router.post("/create",auth,ordersController.CreateOrder)
Router.put("/:id",auth,ordersController.UpdateOrderByID)

module.exports=Router;