const mongoose = require("mongoose");

const OrderHistorySchema = new mongoose.Schema({
  productId: { type: String}, 
    userId: { type: String}, 
    image:{type:String},
    name: { type: String, required: true },
    price: { type: Number }, 
    quantity: { type: Number, required: true, default: 1 }, 
    restaurant : {type : String},
    type:{type:Number},
},{ timestamps: true });

module.exports = mongoose.model("OrderHistory", OrderHistorySchema);
