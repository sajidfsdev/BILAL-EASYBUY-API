const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catMessagesSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserMessages", catMessagesSchema);
