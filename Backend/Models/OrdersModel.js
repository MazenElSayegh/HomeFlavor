// Requires
const mongoose = require("mongoose");
var DB_URL = "mongodb://127.0.0.1:27017/homeflavor";

// Connect to DB

mongoose.connect(DB_URL,{useNewUrlParser:true});    

const { Schema } = mongoose;
//Orders schema
const opts = { toJSON: { virtuals: true } };
let OrdersSchema = new mongoose.Schema({
    products:{type:[{ product_name: String, product_image: String, price: Number,product_details: String,quantity:Number}],required:true},
    // total_price:{type:Number,required:true},
    date:{type:Date,required:true,default:Date.now},
    status:{type:String, enum:['Pending', 'Accepted', 'Cancelled'],required:true,default:'Pending'},
    // user_id:{type: Schema.Types.ObjectId, ref: 'users',required:true},
    // store_id:{type: Schema.Types.ObjectId, ref: 'stores',required:true}
},
opts)

// Function to make virtual field
OrdersSchema.virtual('total_price').get(function() {
    let total_price=0;
    this.products.forEach(p => {
       total_price+=p.price*p.quantity;
    });
    return total_price;
  });

//Export to controller
module.exports = mongoose.model("orders", OrdersSchema);