let jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  var token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Not Login");

  var decodePayload = jwt.verify(token, "token");
  if (decodePayload.role == "admin") {
    next();
  } else {
    return res.send("Access Denied...");
  }
};
