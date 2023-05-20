const express = require("express");
const app = express();
const PORT = process.env.PORT || 7005;
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require("cors");
const session = require("express-session");
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(
  session({
    secret: "token",
    resave: true,
    saveUninitialized: true,
  })
);

let UsersRoute = require("./Routes/UsersRouter");
let LoginRoute = require("./Routes/LoginRoute");
let OrdersRoute = require("./Routes/OrdersRoutes");
let StoresRoute = require("./Routes/StoresRoutes");
let MenuRoute = require("./Routes/MenuRoute");
let FeedBackRoute = require("./Routes/FeedBackRoute");

//#region Routes
app.use("/api/users", UsersRoute);
app.use("/api/login", LoginRoute);
app.use("/api/orders", OrdersRoute);
app.use("/api/stores", StoresRoute);
app.use("/api/menu", MenuRoute);
app.use("/api/feedback", FeedBackRoute);
//#endregion

// End region

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
