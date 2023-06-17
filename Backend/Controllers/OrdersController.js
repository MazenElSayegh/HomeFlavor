// Requires
const validateOrder = require("../Utils/OrderValidation");
let OrderModel = require("../Models/OrdersModel");
let StoreModel = require("../Models/StoresModel");
let jwt = require("jsonwebtoken");

class OrdersController{

// Get all orders (ADMIN only)
 GetAllOrders = async (req, res) => {
  var token = req.headers.authorization?.split(" ")[1];
  var loggedInUser = jwt.verify(token, "token");
  if (loggedInUser.role == "admin") {
    var orders = await OrderModel.find({})
      .populate({
        path: "user_id",
        model: "users",
      })
      .populate({
        path: "store_id",
        model: "stores",
      });
  } else if (loggedInUser.role == "seller") {
    var store = await StoreModel.findOne({
      user_id: loggedInUser.user_id,
    }).populate("user_id");
    if(store){
    var orders = await OrderModel.find({ store_id: store._id })
      .populate({
        path: "user_id",
        model: "users",
      })
      .populate({
        path: "store_id",
        model: "stores",
      });
  }else{
    store= "none";
    res.status(201).json(store);

  }} else {
    var orders = await OrderModel.find({ user_id: loggedInUser.user_id })
      .populate({
        path: "user_id",
        model: "users",
      })
      .populate({
        path: "store_id",
        model: "stores",
      });
  }
  res.status(201).json(orders);
};

// Get order by ID
 GetOrderByID = async (req, res) => {
  let id = req.params.id;
  let order = null;
  try {
    order = await OrderModel.findById({ _id: id })
      .populate({
        path: "user_id",
        model: "users",
      })
      .populate({
        path: "store_id",
        model: "stores",
      });
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
 CreateOrder = async (req, res) => {

  let newOrder = req.body;
  if (validateOrder(newOrder)) {
    let order = new OrderModel(newOrder);
    await order.save();
    res.status(201).json(order);
  } else {
    console.log(validateOrder.errors);
  }
};

// Update Order  -> when status:"pending" only  (ADMIN)  //products or status
 UpdateOrderByID = async (req, res) => {
  if (true) {
    var ID = req.params.id;
    var updatedOrder = req.body;
    let oldOrder;
    if (validateOrder(updatedOrder)) {
      try {
        oldOrder = await OrderModel.findOneAndUpdate(
          { _id: ID },
          { status: updatedOrder.status }
        );
      } catch (err) {
        res.status(301).json(err);
      }
      if (oldOrder) {
        res.status(201).json(oldOrder);
      } else {
        res.status(401).json("couldnt update");
      }
    } else {
      res.status(401).send("check ur data");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};
}

//Export to route
module.exports = new OrdersController();
