const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  address: String,
  email:String,
  discount:Number,
  availableSeats:Number,
  contact: String,
  openingTime: String,
  closingTime: String,
  rating: Number,
  image: String,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
