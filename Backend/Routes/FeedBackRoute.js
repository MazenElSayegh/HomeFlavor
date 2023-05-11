const express = require("express");
const Router = express.Router();
const FeedBackController = require("../Controllers/FeedBackController");



Router.get("/:id_store", FeedBackController.getAllFeedBack);
Router.delete("/:id_feedback", FeedBackController.deleteFeedBackByID);
Router.post("/create", FeedBackController.CreateFeedBack );

module.exports = Router;