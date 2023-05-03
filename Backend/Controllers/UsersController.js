let UserModel = require("../Models/UsersModel");

let AddNewUser = async (req, res) => {
  var newUserFromBody = req.body;
  //{name, age, dept}//==>ajv.validate(newUserFromBody)
  var newUserModel = new UserModel(newUserFromBody);
  await newUserModel.save();
  await res.json(newUserModel);
};

module.exports = {
  AddNewUser,
};
