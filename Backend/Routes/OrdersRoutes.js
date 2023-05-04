const express=require("express");
const Router=express.Router();
const ordersController=require("../Controllers/OrdersController");


Router.get("/",ordersController.GetAllOrders)
Router.get("/:id",ordersController.GetOrderByID)
Router.post("/create",ordersController.CreateOrder)
Router.put("/:id",ordersController.UpdateOrderByID)
// Router.delete("/:id",studentsController.deleteStudentByID)

module.exports=Router;