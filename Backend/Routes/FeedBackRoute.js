const express = require("express");
const Router = express.Router();
const FeedBackController = require("../Controllers/FeedBackController");
let adminauth = require("../Middlewares/adminMW");
let sellerauth = require("../Middlewares/sellerMW");
let buyerauth = require("../Middlewares/buyerMW");



Router.get("/:id_store", FeedBackController.getAllFeedBack);
Router.delete("/:id_feedback",adminauth,buyerauth, FeedBackController.deleteFeedBackByID);
Router.post("/create", buyerauth,FeedBackController.CreateFeedBack );

module.exports = Router;