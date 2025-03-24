const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  address: String,
  seat:Number,
  email:String,
  contact: String,
  openingHours: String,
  rating: Number,
  latitude: Number,
  longitude: Number,
  image: String,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
