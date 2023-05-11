// Requires
const mongoose = require("mongoose");
const { Schema } = mongoose;
var DB_URL = "mongodb://127.0.0.1:27017/homeflavor";

// Connect to DB

mongoose.connect(DB_URL, { useNewUrlParser: true });

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
        // type: String,
      },
          comment: { type: String, required: true },
          date: { type: Date, required: true, default: Date.now },
          stars: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
          },
});

//Export to controller
module.exports = mongoose.model("feedbacks", FeedBackSchema);
