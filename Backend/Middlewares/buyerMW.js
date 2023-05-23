let jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  // var token = req.header("X-Auth-Token");
  var token = req.headers.authorization?.split(" ")[1];

  // console.log(token);
  if (!token) {
    console.log("not logged");
    return res.status(400).send("Not Logged in");
  }

  var loggedUser = jwt.verify(token, "token");
  if (loggedUser.role === "admin" || loggedUser.role === "seller" || loggedUser.role === "buyer") {
    console.log("msh denied");
    next();
  } else {
    console.log("denied");
    return res.send("Access Denied...");
  }
};
