const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const VendorAuth = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("Vendor", VendorAuth);
