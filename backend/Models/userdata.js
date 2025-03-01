const mongoose = require("mongoose");

const userdataSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    password: String
});

const userdata = mongoose.model("userdata", userdataSchema);
module.exports = userdata;
