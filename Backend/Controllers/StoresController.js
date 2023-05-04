// Requires
const validate = require("../Utils/StoreValidation");
let StoreModel = require("../Models/StoresModel");

// Get all stores
let getAllStores = async (req, res) => {
  let stores = await StoreModel.find({});
  res.status(201).json(stores);
};

// Get store by ID
let getStoreByID = async (req, res) => {
  let id = req.params.id;
  let store = null;
  try {
    store = await StoreModel.findById({ _id: id });
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
  let newStore = req.body;
  if (true) {
    // AJV Later
    let store = new StoreModel(newStore);
    await store.save();
    res.status(201).json(newStore);
  } else {
    res.status(301).send("check ur data");
  }
};

// Update Store
var updateStoreByID = async (req, res) => {
  var ID = req.params.id;
  var updatedStore = req.body;
  await StoreModel.updateOne({ _id: ID }, updatedStore);
  res.json(updatedStore || "Not Found");
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
