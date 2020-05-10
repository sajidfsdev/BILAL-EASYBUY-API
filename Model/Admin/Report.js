const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReportModel = new Schema({
  product: {
    type: Object,
    required: true,
  },
  buyerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Buyer",
  },
  reason: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Report", ReportModel);
