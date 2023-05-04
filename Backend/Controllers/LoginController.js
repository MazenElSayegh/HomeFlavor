let userModel = require("../Models/UsersModel");
let validate = require("../Utils/loginValidation");
let bcrypt = require("bcrypt");
// let jwt = require("jsonwebtoken");

var loginUser = async (req, res) => {
  var data = req.body;
  const valid = validate(data);
  if (!valid) res.send(validate.errors);
  else {
    let checkUser = await userModel.findOne({ email: data.email });
    if (!checkUser) return res.send("invalid email or password");
    let checkPass = await bcrypt.compare(data.password, checkUser.password);
    if (!checkPass) return res.send("invalid email or password");
    await res.send("Login Successfully");
  }

  //   let checkUser = await userModel.findOne({ email: req.body.email });

  //   if (!checkUser) return res.send("invalid email or password");

  //   let checkPass = await bcrypt.compare(req.body.password, checkUser.password);
  //   if (!checkPass) return res.send("invalid email or password");
  //   else {
  //     var data = req.body;
  //     console.log(data);
  //     const valid = validate(data);

  //     if (!valid) console.log(validate.errors);
  //     else {
  //       let token = jwt.sign(
  //         { email: checkUser.email, adminRule: checkUser.isAdmin },
  //         "this is token secret"
  //       );
  //       res.header("x-auth-token", token);
  //       await res.json(checkUser);
  //     }
  //   }
};
module.exports = {
  loginUser,
};
