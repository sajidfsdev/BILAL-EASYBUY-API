const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  cat: {
    type: String,
    required: true
  },

  prods: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Cat", catSchema);
