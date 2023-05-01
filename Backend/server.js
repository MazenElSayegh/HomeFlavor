const express = require("express");
const app = express();
const PORT = process.env.PORT || 7005;
const path = require("path");
const bodyParser = require("body-parser");
let UsersRoute = require("./Routes/UsersRoute")

//#region UserRoutes
app.use("/api/users", UsersRoute);
//#endregion





















app.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
  });