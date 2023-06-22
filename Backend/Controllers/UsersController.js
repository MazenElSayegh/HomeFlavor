let UserModel = require("../Models/UsersModel");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { OAuth2Client } = require("google-auth-library");
const CLIENT_ID =
  "129503736404-5ngv63pcim0njm3pbb5ev32hli36t18b.apps.googleusercontent.com";
const CLIENT_Secret = "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";
const client = new OAuth2Client(CLIENT_ID);
const userValid = require("../Utils/UserValidation");
let jwt = require("jsonwebtoken");

id = 0;
let AddNewUser = async (req, res, next) => {
  console.log("inside new user");
  const file = req.file;
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
    mobile: req.body.mobile,
  };
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
        email: req.body.email,
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

let SubscribeUser = async (req, res) => {
  console.log("inside back");
  try {
    const user = await UserModel.findById(req.body._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("inside back");
    user.is_subscribed = true;
    await user.save();

    res.json({ message: "Subscription successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

let GoogleLogin = async (req, res) => {
  console.log("googlelogin");
  console.log(req.body.credential);
  if (!req.body.credential) {
    return res.json({
      success: false,
      message: "credential are required",
    });
  }

  const ticket = await client.verifyIdToken({
    idToken: req.body.credential,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  console.log(payload.name);

  let user = await UserModel.findOne({ email: payload.email });
  if (!user) {
    user = new UserModel({
      user_name: payload.name,
      email: payload.email,
      password: CLIENT_Secret,
      gender: "male",
      address: "ibrahimia",
      mobile: "01063995866",

      user_image: payload.picture,
      role: "buyer",
    });
    await user.save();
  }

  let Token = jwt.sign(
    {
      role: user.role,
      user_id: user._id,
    },
    "token"
  );
  res.header("X-Auth-Token", `Bearer ${Token}`);
  res.header("Access-Control-Expose-Headers", "*");

  res.json({ key: "value" });
};

module.exports = {
  AddNewUser,
  GetAllUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
  SubscribeUser,
  GoogleLogin,
};
