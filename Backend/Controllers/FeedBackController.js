// Requires
const validate = require("../Utils/FeedBackValidation");
let FeedBackModel = require("../Models/FeedBacksModel");

// Get all menu
let getAllFeedBack = async (req, res) => {
  let id = req.params.id_store;
  let feedbacks = await FeedBack.where('_id').equals(id).select('feedback').exec();

  res.status(201).json(feedbacks);
};

//creatr menu item
let CreateFeedBack = async (req, res) => {
  // let id = req.params.id;
  let newfeedback = req.body;
  console.log(newfeedback);
  if (validate(newfeedback)) {
  try {
      const result = await StoreModel.updateOne(
        { _id: id },
        // { $push: { feedback: { $each: newfeedback.feedback }  } }
        { $push: { feedback:newfeedback  } }

      );
      console.log(result);
      res.status(200).send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
  else {
    res.status(301).send(validate.errors);
  }
};



//delete item from menu
var deleteFeedBackByID = async (req, res) => {
    // var id = req.params.id_feedback;
    // // var feedbackId = req.params.feedbackId;
    // try {
    //   const result = await StoreModel.updateOne(
    //     { _id: id },
    //     { $pull: {feedback : { _id: feedbackId } } }
    //   );
    //   console.log(result);
    //   res.status(201).send("delete success");
    // } catch (err) {
    //   console.error(err);
    //   res.status(500).send(err);
    // }
  };

//Export to route
module.exports = {
  getAllFeedBack,
  deleteFeedBackByID,
  CreateFeedBack

};
