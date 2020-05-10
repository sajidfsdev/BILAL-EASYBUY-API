const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const VendorMessages = new Schema({
  vendorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Vendor",
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "PENDING", //pending, //replied
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model("VendorMessages", VendorMessages);
