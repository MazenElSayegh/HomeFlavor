// Requires
const mongoose = require("mongoose");
const { Schema } = mongoose;
var DB_URL = "mongodb://127.0.0.1:27017/homeflavor";

// Connect to DB

mongoose.connect(DB_URL, { useNewUrlParser: true });

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
