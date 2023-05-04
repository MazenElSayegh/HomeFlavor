const mongoose = require("mongoose");
var valid = require("validator");
// const autoIncrement = require("mongoose-auto-increment");
var DB_URL = "mongodb://127.0.0.1:27017/homeflavor";

mongoose.connect(DB_URL, { useNewUrlParser: true });

var userSchema = new mongoose.Schema({
  user_name: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (val) => {
        return valid.isEmail(val);
      },
      message: "{Email} Not Valid",
      unique: true,
    },
  },
  password: { type: String, minlength: 5, required: true },
  user_image: { type: String },
  gender: { type: String, enum: ["male", "female"], required: true },
  role: { type: String, enum: ["admin", "seller", "buyer"], required: true },
});

module.exports = mongoose.model("users", userSchema);
