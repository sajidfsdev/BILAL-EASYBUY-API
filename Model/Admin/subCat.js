const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subCatSchema = new Schema({
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

  prods: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("SubCat", subCatSchema);
