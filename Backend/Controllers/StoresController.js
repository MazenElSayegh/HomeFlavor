// Requires
const validate = require("../Utils/StoreValidation");
let StoreModel = require("../Models/StoresModel");
let jwt = require("jsonwebtoken");

// Get all stores

let getAllStores = async (req, res) => {
  let stores = await StoreModel.find({}).populate("user_id");
  res.status(201).json(stores);
};

// let getAllStores = async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     const loggedInUser = jwt.verify(token, "token");

//     if (loggedInUser.role === "seller") {
//       const stores = await StoreModel.findOne({
//         user_id: loggedInUser.user_id,
//       }).populate("user_id");

//       if (!stores) {
//         return res.status(404).json({ message: "No stores found" });
//       }

//       res.status(200).json(stores);
//     } else {
//       const stores = await StoreModel.find({}).populate("user_id");

//       if (!stores) {
//         return res.status(404).json({ message: "No stores found" });
//       }

//       res.status(200).json(stores);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

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

// Make new Store only for admin or seller
let createStore = async (req, res) => {
  var token = req.headers.authorization?.split(" ")[1];
  var loggedInUser = jwt.verify(token, "token");
  if (loggedInUser.role == "admin" ||loggedInUser.role == "seller") {
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

// Update Store
var updateStoreByID = async (req, res) => {
  var token = req.headers.authorization?.split(" ")[1];
  var loggedInUser = jwt.verify(token, "token");
  if (loggedInUser.role == "admin" ||loggedInUser.role == "seller") {
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

var deleteStoreByID = async (req, res) => {
  var token = req.headers.authorization?.split(" ")[1];
  var loggedInUser = jwt.verify(token, "token");
  if (loggedInUser.role == "admin" ||loggedInUser.role == "seller") {
  var ID = req.params.id;
  var storeToDelete = await StoreModel.find({ _id: ID });
  await StoreModel.deleteOne({ _id: ID });
  console.log("you have permission")
  res.json(storeToDelete || "Not Found");
  }
  else{
    console.log("you not have permission")
  }
};

//Export to route
module.exports = {
  getAllStores,
  getStoreByID,
  createStore,
  updateStoreByID,
  deleteStoreByID,
};
