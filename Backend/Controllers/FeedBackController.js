// Requires
const validate = require("../Utils/FeedBackValidation");
let FeedBackModel = require("../Models/FeedBacksModel");

// Get all menu
let getAllFeedBack = async (req, res) => {
  let id = req.params.id_store;
  let feedbacks = await FeedBackModel.find({store_id:id}).populate('user_id');

  res.status(201).json(feedbacks);
};

//creatr menu item
let CreateFeedBack = async (req, res) => {
  let newFeedback = req.body;
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
    
  };



//delete item from menu
    var deleteFeedBackByID = async (req, res) => {
    var ID = req.params.id_feedback;
    var feedbackToDelete = await FeedBackModel.find({ _id: ID });
    await FeedBackModel.deleteOne({ _id: ID });
    res.json(feedbackToDelete || "Not Found");
  };

//Export to route
module.exports = {
  getAllFeedBack,
  deleteFeedBackByID,
  CreateFeedBack
};
