// Requires
const mongoose = require("mongoose");
const { Schema } = mongoose;
const dotenv = require("dotenv").config();

// Connect to DB

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });

//Stores schema
let StoresSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    // type: String,
  },

  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  image: { type: String, required: true },
  city: { type: String, required: true },
});

//Export to controller
module.exports = mongoose.model("stores", StoresSchema);
