const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BuyerMessages = new Schema({
  buyerId: {
    type: Schema.Types.ObjectId,
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
module.exports = mongoose.model("BuyerMessages", BuyerMessages);
