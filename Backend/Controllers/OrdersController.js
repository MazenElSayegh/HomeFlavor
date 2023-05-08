// Requires
const validateOrder = require("../Utils/OrderValidation");
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
  if (validateOrder(newOrder)) {
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
var UpdateOrderByID = async (req, res) => {
  // var ID = req.params.id;
  // var updatedOrder = req.body;
  // let Order=await OrderModel.findOneAndUpdate({ _id: ID }, { status:updatedOrder.status });
  // console.log(Order.total_price)
  //  res.json(Order || "Not Found");
    console.log("update students")
    var ID = req.params.id;
    var updatedOrder = req.body;
    let updatedStudent;
    if(validateOrder(updatedOrder)){
        try{
            updatedStudent=await OrderModel.findOneAndUpdate({_id:ID},
            { status:updatedOrder.status });
            
        }catch(err){
        }
        if(updatedStudent){
            res.status(201).json(updatedStudent);
        }else{
            res.status(401).json("couldnt update");
        }
        
    }else{
        res.status(401).send("check ur data")
    }
};

//Export to route
module.exports = {
  GetAllOrders,
  GetOrderByID,
  CreateOrder,
  UpdateOrderByID,
};