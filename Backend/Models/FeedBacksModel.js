// Requires
const mongoose = require("mongoose");
const { Schema } = mongoose;
const dotenv = require("dotenv").config();

// Connect to DB
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

//Stores schema
let FeedBackSchema = new mongoose.Schema({
  store_id: {
    type: Schema.Types.ObjectId,
    ref: "stores",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  comment: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  stars: {
    type: Number,
    min: 0,
    max: 5,
  },
});

//Export to controller
module.exports = mongoose.model("feedbacks", FeedBackSchema);
