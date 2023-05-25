let UserModel = require("../Models/UsersModel");
const bcrypt = require("bcrypt");
const fs = require("fs");

const userValid = require("../Utils/UserValidation");
let jwt = require("jsonwebtoken");

id = 0;
let AddNewUser = async (req, res, next) => {
  const file = req.file;
  console.log(file);
  let image_path;
  if (file) {
    image_path = req.file.filename;
  } else {
    image_path = "defaultImage.jpg";
  }

  var salt = await bcrypt.genSalt(10);
  var hashedPassword = await bcrypt.hash(req.body.password, salt);

  // check if existing user
  let foundUser = await UserModel.findOne({ email: req.body.email }).exec();
  if (foundUser) return res.status(400).send("User Already Exist");

  var newUserModel = new UserModel({
    user_name: req.body.user_name,
    email: req.body.email,
    password: hashedPassword,

    user_image: "/uploads/" + image_path,

    gender: req.body.gender,
    role: req.body.role,
    address: req.body.address,
    mobile: req.body.mobile,
  });

  var valid = userValid(newUserModel);

  if (valid) {
    await newUserModel.save();
    let Token = jwt.sign(
      {
        role: req.body.role,

        user_id: newUserModel._id,
      },
      "token"
    );
    res.header("X-Auth-Token", `Bearer ${Token}`);
    res.header("Access-Control-Expose-Headers", "*");
    res.status(201).json(newUserModel);
  } else {
    res.status(400).send("Not Compatible, check validation..");
  }
};

let GetAllUsers = async (req, res) => {
  let users = await UserModel.find({});
  res.status(201).json(users);
};

let GetUserById = async (req, res) => {
  let Id = req.params.id;
  let user = await UserModel.findOne({ _id: Id });
  res.json(user);
};
let UpdateUser = async (req, res) => {
  const file = req.file;
  console.log(file);
  let image_path;
  if (file) {
    image_path = req.file.filename;
  } else {
    image_path = "defaultImage.jpg";
  }
  let Id = req.params.id;
  let data = {
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,

    user_image: "/uploads/" + image_path,

    gender: req.body.gender,
    role: req.body.role,
    address: req.body.address,
    mobile: +req.body.mobile,
  };
  console.log(data);
  const valid = userValid(data);
  if (!valid) {
    res.send("Not Compatible..");
  } else {
    var salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(data.password, salt);
    var updatedUserModel = await UserModel.updateOne(
      { _id: Id },
      {
        user_name: req.body.user_name,
        email: req.body.email, //can not update email logic
        password: hashedPassword,
        user_image: "/uploads/" + image_path,
        gender: req.body.gender,
        role: req.body.role,
        address: req.body.address,
        mobile: req.body.mobile,
      }
    );
    await res.json(updatedUserModel);
  }
};

let DeleteUser = async (req, res) => {
  var ID = req.params.id;
  var UserToDelete = await UserModel.find({ _id: ID });
  await UserModel.deleteOne({ _id: ID });
  res.json(UserToDelete || "Not Found");
};

module.exports = {
  AddNewUser,
  GetAllUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
};
