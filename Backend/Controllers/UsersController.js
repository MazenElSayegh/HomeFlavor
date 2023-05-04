let UserModel = require("../Models/UsersModel");
const bcrypt = require("bcrypt");
const userValid = require("../Utils/UserValidation");

id = 0;
let AddNewUser = async (req, res, next) => {
  var salt = await bcrypt.genSalt(10);
  var hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  // check if existing user
  let foundUser = await UserModel.findOne({ email: req.body.email }).exec();
  if (foundUser) return res.status(400).send("User Already Exist");

  var newUserModel = new UserModel({
    user_name: req.body.user_name,
    email: req.body.email,
    password: hashedPassword,
    user_image: req.body.user_image,
    gender: req.body.gender,
    store_id: req.body.store_id,
    role: req.body.role,
  });
  // await newUserModel.save();
  // await res.json(newUserModel);

  var valid = userValid(newUserModel);

  if (valid) {
    await newUserModel.save();
    res.status(201).send("User Added Successfully");
  } else {
    res.status(400).send("Not Compatible..");
  }
};

module.exports = {
  AddNewUser,
};
