const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subSubCatSchema = new Schema({
  type: {
    type: String,
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

  prods: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("SubSubCat", subSubCatSchema);
