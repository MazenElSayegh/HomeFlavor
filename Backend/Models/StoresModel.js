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
      product_image: { type: String, required: true },
      product_title: { type: String, required: true },
      price: { type: Number, required: true },
      product_details: { type: String, required: true },
    },
  ],

  feedback: [
    {
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
    },
  ],
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  image: { type: String, required: true },
  city: { type: String, required: true },
});

//Export to controller
module.exports = mongoose.model("stores", StoresSchema);
