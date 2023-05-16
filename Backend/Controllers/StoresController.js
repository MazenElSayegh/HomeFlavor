// Requires
const validate = require("../Utils/StoreValidation");
let StoreModel = require("../Models/StoresModel");

// Get all stores
let getAllStores = async (req, res) => {
  let stores = await StoreModel.find({}).populate("user_id");
  res.status(201).json(stores);
};

// Get store by ID
let getStoreByID = async (req, res) => {
  let id = req.params.id;
  let store = null;
  try {
    store = await StoreModel.findById({ _id: id }).populate("user_id");
  } catch (error) {
    console.log(error);
  }
  if (store) {
    res.status(201).json(store);
  } else {
    res.status(401).json("not found");
  }
};

// Make new Store
let createStore = async (req, res) => {
  let newStore = {
    user_id: req.body.user_id,
    name: req.body.name,
    city: req.body.city,
    image: "/uploads/" + req.file.filename,
    about: req.body.about,
  };
  if (validate(newStore)) {
    try {
      let store = new StoreModel(newStore);
      await store.save();
      res.status(201).json(newStore);
    } catch (err) {
      res.status(301).send(err.message);
    }
  } else {
    res.status(301).send(validate.errors);
  }
};

// Update Store
var updateStoreByID = async (req, res) => {
  var ID = req.params.id;
  var updatedStore = {
    user_id: req.body.user_id,
    name: req.body.name,
    city: req.body.city,
    image: "/uploads/" + req.file.filename,
    about: req.body.about,
  };

  if (validate(updatedStore)) {
    try {
      await StoreModel.updateOne({ _id: ID }, updatedStore);
      res.json(updatedStore);
    } catch (err) {
      res.status(301).send(err.message);
    }
  } else {
    res.status(301).send(validate.errors);
  }
};

var deleteStoreByID = async (req, res) => {
  var ID = req.params.id;
  var storeToDelete = await StoreModel.find({ _id: ID });
  await StoreModel.deleteOne({ _id: ID });
  res.json(storeToDelete || "Not Found");
};

//Export to route
module.exports = {
  getAllStores,
  getStoreByID,
  createStore,
  updateStoreByID,
  deleteStoreByID,
};
