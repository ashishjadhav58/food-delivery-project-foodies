const mongoose = require("mongoose")
const Business = new mongoose.Schema({
    resname: String,
    resemail: String,
    address: String,
    password: String
})
const BusinessData = mongoose.model("BusinessData",Business);
module.exports= BusinessData;