// Requires
const mongoose = require("mongoose");
const { Schema } = mongoose;
var DB_URL = "mongodb://127.0.0.1:27017/homeflavor";

// Connect to DB

mongoose.connect(DB_URL, { useNewUrlParser: true });

//Stores schema
let StoresSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    // type: String,
  },
  menu: [
    {
      product_title: String,
      product_image: String,
      price: Number,
      product_details: String,
    },
  ],

  feedback: [
    {
      user_id: {
        type: Schema.Types.ObjectId,
        ref: "users",
        // type: String,
      },
      comment: String,
      date: String,
      stars: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  ],
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  image: { type: String, required: true },
  city: { type: String, required: true },
});

//Export to controller
module.exports = mongoose.model("stores", StoresSchema);
