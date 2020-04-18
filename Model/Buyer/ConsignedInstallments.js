const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConsignedSchema = new Schema({
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: "Buyer",
    required: true,
  },
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  status: {
    required: true,
    type: String,
  },
  installmentPlan: {
    type: Object,
    required: true,
  },
  product: {
    type: Object,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Consigned", ConsignedSchema);
