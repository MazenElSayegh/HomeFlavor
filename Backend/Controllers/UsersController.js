let UserModel = require("../Models/UsersModel");
const bcrypt = require("bcrypt");

id = 0;
let AddNewUser = async (req, res, next) => {
  var salt = await bcrypt.genSalt(10);
  var hashedPassword = await bcrypt.hash(req.body.password, salt);

  var newUserModel = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  await newUserModel.save();
  await res.json(newUserModel);
};

module.exports = {
  AddNewUser,
};
