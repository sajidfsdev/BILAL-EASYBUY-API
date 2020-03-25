const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
  vendorId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  cat: {
    type: String,
    required: true
  },
  subCat: {
    type: String,
    required: true
  },
  subSubCat: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  att: {
    type: Schema.Types.Array,
    required: true
  },
  images: {
    type: Schema.Types.Array,
    required: true
  },
  installmentPlan: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model("Product", Product);
