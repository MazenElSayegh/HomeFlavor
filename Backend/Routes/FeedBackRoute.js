const express = require("express");
const Router = express.Router();
const FeedBackController = require("../Controllers/FeedBackController");
let auth = require("../Middlewares/authMW");

Router.get("/:id_store", FeedBackController.getAllFeedBack);
Router.delete(
  "/:id_feedback",
  auth(["admin", "seller", "buyer"]),
  FeedBackController.deleteFeedBackByID
);
Router.post(
  "/create",
  auth(["admin", "seller", "buyer"]),
  FeedBackController.CreateFeedBack
);

module.exports = Router;
