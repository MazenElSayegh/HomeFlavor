let jwt = require("jsonwebtoken");
module.exports = (requiredRoles) => (req, res, next) => {
  var token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).send("Not Logged in");
  }

  var loggedUser = jwt.verify(token, "token");
  console.log(requiredRoles);
  if (requiredRoles.includes(loggedUser.role)) {
    console.log("success");
    next();
  } else {
    return res.send("Access Denied...");
  }
};
