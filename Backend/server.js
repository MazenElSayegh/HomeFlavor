const express = require("express");
const app = express();
const PORT = process.env.PORT || 7005;
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// let UsersRoute = require("./Routes/UsersRouter");
let LoginRoute = require("./Routes/LoginRoute");
let OrdersRoute = require("./Routes/OrdersRoutes");

//#region Routes
//app.use("/api/users", UsersRoute);
app.use("/api/orders", OrdersRoute);
//#endregion

// ###################################  LoginRoute   ###################################################

//app.use("/api/login", LoginRoute);

// End region

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
