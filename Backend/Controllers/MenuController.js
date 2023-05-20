// Requires
const validate = require("../Utils/MenuValidation");
let MenusModel = require("../Models/MenusModel");

// Get all menu
let getAllMenu = async (req, res) => {
  let id = req.params.id_store;
  //let menus = await StoreModel.find({menu: {$elemMatch: {product_title:"gambryyy"}}}).where('_id').equals(id).exec();
  // let menus = await StoreModel.find({menu: {$elemMatch: {product_title:"gambryyy"}}}).where('_id').equals(id).select('menu').exec();
  // let menus = await MenusModel.find("_id").equals(id).select("menu").exec();
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
    } catch (err) {
      res.status(301).send(err.message);
    }
  } else {
    res.status(301).send(validate.errors);
  }
};

//updateitem

var updateItemByID = async (req, res) => {
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
    } catch (err) {
      res.status(301).send(err.message);
    }
  } else {
    res.status(301).send(validate.errors);
  }
};

//delete item from menu
var deleteMenuItemByID = async (req, res) => {
  var ID = req.params.id_item;
  var itemToDelete = await MenusModel.find({ _id: ID });
  await MenusModel.deleteOne({ _id: ID });
  res.json(itemToDelete || "Not Found");
};

//Export to route
module.exports = {
  getAllMenu,
  getMenuByID,
  deleteMenuItemByID,
  CreateMenuItem,
  updateItemByID,
};
