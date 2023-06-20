const express = require("express");
const Router = express.Router();
const FeedBackController = require("../Controllers/FeedBackController");
let buyerauth = require("../Middlewares/buyerMW");



Router.get("/:id_store", FeedBackController.getAllFeedBack);
Router.delete("/:id_feedback",buyerauth, FeedBackController.deleteFeedBackByID);
Router.post("/create", buyerauth,FeedBackController.CreateFeedBack );

module.exports = Router;