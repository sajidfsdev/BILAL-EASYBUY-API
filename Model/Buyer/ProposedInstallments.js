const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProposedSchema = new Schema({
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: "Buyer",
    required: true,
  },

  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  installmentPlan: {
    type: Object,
    required: true,
  },
  status: {
    required: true,
    type: String,
  },
});
module.exports = mongoose.model("Proposal", ProposedSchema);
