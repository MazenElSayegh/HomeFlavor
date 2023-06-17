let userModel = require("../Models/UsersModel");
let validate = require("../Utils/loginValidation");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

class LoginController{

  loginUser = async (req, res) => {
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

        user_id: checkUser._id,
      },
      "token"
    );

  

    res.header("X-Auth-Token", `Bearer ${Token}`);
    res.header("Access-Control-Expose-Headers", "*");
    
    await res.json({ message: "login successfully", checkUser });
  }

 
};

}
module.exports = new LoginController();