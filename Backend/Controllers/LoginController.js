let userModel = require("../Models/UsersModel");
let validate = require("../Utils/loginValidation");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

var loginUser = async (req, res) => {
  var data = req.body;
  console.log(req.body);
  const valid = validate(data);
  if (!valid) console.log(validate.errors);
  else {
    let checkUser = await userModel.findOne({ email: data.email });
    if (!checkUser) return res.send("invalid email ");
    let checkPass = await bcrypt.compare(data.password, checkUser.password);
    if (!checkPass) return res.send("invalid password");
    let Token = jwt.sign(
      {
        role: checkUser.role,
        user_name: checkUser.user_name,
        user_id: checkUser._id,
        user_image: checkUser.user_image,
      },
      "token"
    );

    req.session.token = Token;
    await req.session.save();
    console.log(req.session);
    console.log(req.session.token);

    res.header("X-Auth-Token", `Bearer ${Token}`);
    res.header("Access-Control-Expose-Headers", "*");
    // res.header("x-auth-token", Token);
    await res.json({ message: "login successfully", checkUser });
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
