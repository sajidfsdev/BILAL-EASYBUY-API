const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CollaboratorSchema = new Schema({
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: "Buyer",
    required: true
  },

  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  }
});
module.exports = mongoose.model("Collaborator", CollaboratorSchema);
