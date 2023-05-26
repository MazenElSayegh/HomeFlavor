// Requires
const validate = require("../Utils/MenuValidation");
let MenusModel = require("../Models/MenusModel");
let StoreModel = require("../Models/StoresModel");
let jwt = require("jsonwebtoken");

// Get all menu
let getAllMenu = async (req, res) => {
  let id = req.params.id_store;
  
  let menus = await MenusModel.find({ store_id: id });

  res.status(201).json(menus);
};

// Get Menu By ID
let getMenuByID = async (req, res) => {
  let menuId = req.params.id_item;

  try {
    menuItem = await MenusModel.find({ _id: menuId });
  } catch (error) {
    console.log(error);
  }
  if (menuItem) {
    res.status(201).json(menuItem);
  } else {
    res.status(401).json("not found");
  }
};

//creatr menu item
let CreateMenuItem = async (req, res) => {
  var store = await StoreModel.findById({ _id: req.body.store_id });
  var store_owner = store.user_id;
  var token = req.headers.authorization?.split(" ")[1];
  var loggedInUser = jwt.verify(token, "token");
  if (loggedInUser.role == "admin" ||(loggedInUser.role == "seller" &&loggedInUser.user_id==store_owner)) {
  var newItem = {
    store_id: req.body.store_id,
    product_title: req.body.product_title,
    price: req.body.price,
    product_details: req.body.product_details,
    category: req.body.category,
    product_image: "/uploads/" + req.file.filename,
  };
  if (validate(newItem)) {
    try {
      let item = new MenusModel(newItem);
      await item.save();
      res.status(201).json(newItem);
      console.log("you have permission")
    } catch (err) {
      res.status(301).send(err.message);
    }
  } else {
    res.status(301).send(validate.errors);
  }
}
else {
  console.log("you not have permission")
  res.status(301).send("you not have permission");
}
};

//updateitem

var updateItemByID = async (req, res) => {
  var store = await StoreModel.findById({ _id: req.body.store_id });
  console.log( req.body.store_id);
  var store_owner = store.user_id._id;
  var token = req.headers.authorization?.split(" ")[1];
  var loggedInUser = jwt.verify(token, "token");
  if (loggedInUser.role == "admin" ||(loggedInUser.role == "seller" &&loggedInUser.user_id==store_owner)) {
  console.log(req.body);
  var ID = req.params.id;
  var updatedItem = {
    store_id: req.body.store_id,
    product_title: req.body.product_title,
    price: req.body.price,
    product_details: req.body.product_details,
    category: req.body.category,
    product_image: "/uploads/" + req.file.filename,
  };

  if (validate(updatedItem)) {
    try {
      await MenusModel.updateOne({ _id: ID }, updatedItem);
      res.json(updatedItem);
      console.log("you have permission")
    } catch (err) {
      res.status(301).send(err.message);
    }
  } else {
    res.status(301).send(validate.errors);
  }
}
else {
  console.log("you not have permission")
  res.status(301).send("you not have permission");
}
};

//delete item from menu
var deleteMenuItemByID = async (req, res) => {
  var ID = req.params.id_item;
  var itemToDelete = await MenusModel.find({ _id: ID });
  console.log(itemToDelete[0].store_id._id);
  var store = await StoreModel.findById({ _id:itemToDelete[0].store_id._id});
  var store_owner = store.user_id._id;
  var token = req.headers.authorization?.split(" ")[1];
  var loggedInUser = jwt.verify(token, "token");
  if (loggedInUser.role == "admin" ||(loggedInUser.role == "seller" &&loggedInUser.user_id==store_owner)) {
  await MenusModel.deleteOne({ _id: ID });
  console.log("you have permission")
  res.json(itemToDelete || "Not Found");
  }
  else{
    console.log("you not have permission")
  }
};

//Export to route
module.exports = {
  getAllMenu,
  getMenuByID,
  deleteMenuItemByID,
  CreateMenuItem,
  updateItemByID,
};
