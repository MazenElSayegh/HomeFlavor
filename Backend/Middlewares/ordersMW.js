let jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  // var token = req.header("X-Auth-Token");
  var token = req.headers.authorization?.split(" ")[1];

  // console.log(token);
  if (!token) {
    console.log("not logged");
    return res.status(400).send("Not Logged in");
  }

  var decodePayload = jwt.verify(token, "token");
  if (
    decodePayload.role === "seller" ||
    decodePayload.role === "buyer" ||
    decodePayload.role === "admin"
  ) {
    console.log("msh denied");

    next();
  } else {
    console.log("denied");
    return res.send("Access Denied...");
  }
};
