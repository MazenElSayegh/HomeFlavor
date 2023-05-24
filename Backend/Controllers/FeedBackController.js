// Requires
const validate = require("../Utils/FeedBackValidation");
let FeedBackModel = require("../Models/FeedBacksModel");
let OrderModel = require("../Models/OrdersModel");
let jwt = require("jsonwebtoken");

// Get all feedback
let getAllFeedBack = async (req, res) => {
  let id = req.params.id_store;
  let feedbacks = await FeedBackModel.find({store_id:id}).populate('user_id');

  res.status(201).json(feedbacks);
};


//creatr feedback
let CreateFeedBack = async (req, res) => {
  let newFeedback = req.body;
  var token = req.headers.authorization?.split(" ")[1];
  var loggedInUser = jwt.verify(token, "token");
  var orders = await OrderModel.find({ user_id:loggedInUser.user_id });
  // console.log(loggedInUser.user_id);
  // console.log(orders);
  var flag= false;
  for(let i=0;i<=orders.length;i++){
    // console.log(orders[i]?.user_id);
  if (loggedInUser.user_id==orders[i]?.user_id._id&&req.body.store_id==orders[i]?.store_id._id) {
    
    flag=true;
    break;
  }

};
  if(flag==true){

  if (validate(newFeedback)) {
    try {
      let feedback = new FeedBackModel(newFeedback);
      await feedback.save();
      res.status(201).json(newFeedback);
    } catch (err) {
      res.status(301).send(err.message);
    }
  } else {
    res.status(301).send(validate.errors);
  }
}else{
  console.log("you don't have a permission")
}

  };



//delete feedback
    var deleteFeedBackByID = async (req, res) => {
      var ID = req.params.id_feedback;
      var feedbackToDelete = await FeedBackModel.find({ _id: ID });
      console.log(feedbackToDelete);
      var token = req.headers.authorization?.split(" ")[1];
      var loggedInUser = jwt.verify(token, "token");
      if (loggedInUser.role == "admin" ||(loggedInUser.user_id==feedbackToDelete[0].user_id._id)) {
      await FeedBackModel.deleteOne({ _id: ID });
      res.json(feedbackToDelete || "Not Found");
      }
  };

//Export to route
module.exports = {
  getAllFeedBack,
  deleteFeedBackByID,
  CreateFeedBack
};
