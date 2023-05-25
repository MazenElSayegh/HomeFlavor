let jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  // var token = req.header("X-Auth-Token");
  var token = req.headers.authorization?.split(" ")[1];

  // console.log(token);
  if (!token) {
    return res.status(400).send("Not Logged in");
  }

  var loggedUser = jwt.verify(token, "token");
  if (loggedUser.role === "admin" || loggedUser.role === "seller") {
    next();
  } else {
    return res.send("Access Denied...");
  }
};
