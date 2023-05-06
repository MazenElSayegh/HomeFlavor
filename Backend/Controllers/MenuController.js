// Requires
const validate = require("../Utils/MenuValidation");
let StoreModel = require("../Models/StoresModel");

// Get all menu
let getAllMenu = async (req, res) => {
  let id = req.params.id;
  //let menus = await StoreModel.find({menu: {$elemMatch: {product_title:"gambryyy"}}}).where('_id').equals(id).exec();
  // let menus = await StoreModel.find({menu: {$elemMatch: {product_title:"gambryyy"}}}).where('_id').equals(id).select('menu').exec();
  let menus = await StoreModel.where("_id").equals(id).select("menu").exec();

  res.status(201).json(menus);
};

//creatr menu item
let CreateMenuItem = async (req, res) => {
    let id = req.params.id;
    let newItem = req.body;
    console.log(newItem);
    if (validate(newItem)) {
    try {
        const result = await StoreModel.updateOne(
          { _id: id },
          // { $push: { menu: { $each: newItem.menu }  } }
             { $push: { menu: newItem  } }
        );
        console.log(result);
        res.status(200).send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send(err);
      }
    }
    else {
    res.status(301).send(validate.errors);
  }
    
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
  CreateMenuItem,
};
