// Requires
const mongoose = require("mongoose");
const { Schema } = mongoose;
const dotenv = require("dotenv").config();

// Connect to DB

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });


//Stores schema
let MenusSchema = new mongoose.Schema({
    store_id: {
        type: Schema.Types.ObjectId,
        ref: "stores",
        required: true,
      },
      product_image: { type: String, required: true },
      product_title: { type: String, required: true },
      price: { type: Number, required: true },
      product_details: { type: String, required: true },
});

//Export to controller
module.exports = mongoose.model("menus", MenusSchema);
