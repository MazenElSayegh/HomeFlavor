// Requires
const validateOrder = require("../Utils/OrderValidation");
let OrderModel = require("../Models/OrdersModel");

// Get all orders (ADMIN only)
let GetAllOrders = async (req, res) => {
  // console.log("get all Orders");
  let orders = await OrderModel.find({}).populate({
    path: 'user_id',
    model: 'users'
  })
  .populate({
    path: 'store_id',
    model: 'stores'
  });
  res.status(201).json(orders);
};

// Get order by ID
let GetOrderByID = async (req, res) => {
  console.log("get Order by id");
  let id = req.params.id;
  let order = null;
  try {
    order = await OrderModel.findById({ _id: id }).populate({
      path: 'user_id',
      model: 'users'
    })
    .populate({
      path: 'store_id',
      model: 'stores'
    });
  } catch (error) {
    console.log(error);
  }
  if (order) {
    res.status(201).json(order);
  } else {
    res.status(401).json("not found");
  }  
console.log(order.user_id)
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
    res.status(301).send("Check your data");
  }
};

// Update Order  -> when status:"pending" only  (ADMIN)  //products or status
var UpdateOrderByID = async (req, res) => {
    console.log("update order")
    var ID = req.params.id;
    var updatedOrder = req.body;
    let oldOrder;
    if(validateOrder(updatedOrder) && updatedOrder.status=='Pending'){
      console.log("gowa el validate");
        try{
            oldOrder=await OrderModel.findOneAndUpdate({_id:ID},
            { status:updatedOrder.status});
            console.log("hello");
            
        }catch(err){
          res.status(301).json(err)
        }
        if(oldOrder){
            res.status(201).json(oldOrder);
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