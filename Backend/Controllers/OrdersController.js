// Requires
//const validate = require("../utils/OrdersValidation");
let OrderModel = require("../Models/OrdersModel");

// Get all orders (ADMIN only)
let GetAllOrders = async (req, res) => {
  console.log("get all Orders");
  let orders = await OrderModel.find({});
  res.status(201).json(orders);
};

// Get order by ID
let GetOrderByID = async (req, res) => {
  console.log("get Order by id");
  let id = req.params.id;
  let order = null;
  try {
    order = await OrderModel.findById({ _id: id });
  } catch (error) {
    console.log(error);
  }
  if (order) {
    res.status(201).json(order);
  } else {
    res.status(401).json("not found");
  }
};

// Make new Order (USER)
let CreateOrder = async (req, res) => {
  console.log("add orders");
  let newOrder = req.body;
  if (true) {
    console.log(newOrder);
    let order = new OrderModel(newOrder);
    console.log("2");
    await order.save();
    console.log("3");
    res.status(201).json(order);
  } else {
    res.status(301).send("check ur data");
  }
};

// Update Order  -> when status:"pending" only  (ADMIN)  //products or status
var UpdateOrderByID = (req, res) => {
  var ID = req.params.id;
  var updatedOrder = req.body;
  OrderModel.updateOne({_id: ID},{ status: updatedOrder.status});
   res.json(updatedOrder || "Not Found");
};

//Export to route
module.exports = {
  GetAllOrders,
  GetOrderByID,
  CreateOrder,
  UpdateOrderByID,
};