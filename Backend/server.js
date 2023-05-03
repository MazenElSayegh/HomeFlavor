const express = require("express");
const app = express();
const PORT = process.env.PORT || 7005;
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let UsersRoute = require("./Routes/UsersRouter");

//#region UserRoutes
app.use("/api/users", UsersRoute);
//#endregion

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
