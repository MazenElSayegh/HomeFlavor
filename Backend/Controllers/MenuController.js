// Requires
const validate = require("../Utils/StoreValidation");
let StoreModel = require("../Models/StoresModel");

// Get all menu
let getAllMenu = async (req, res) => {
  let id = req.params.id;
  //let menus = await StoreModel.find({menu: {$elemMatch: {product_title:"gambryyy"}}}).where('_id').equals(id).exec();
  // let menus = await StoreModel.find({menu: {$elemMatch: {product_title:"gambryyy"}}}).where('_id').equals(id).select('menu').exec();
  let menus = await StoreModel.where("_id").equals(id).select("menu").exec();

  res.status(201).json(menus);
};

//delete item from menu

var deleteMenuItemByID = async (req, res) => {
  var id = req.params.id;
  var itemName = req.params.itemName;
  try {
    const result = await StoreModel.updateOne(
      { _id: id },
      { $pull: { menu: { product_title: itemName } } }
    );
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

//Export to route
module.exports = {
  getAllMenu,
  deleteMenuItemByID,
};
