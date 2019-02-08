const mongoose = require("mongoose");
const timestamp = require('mongoose-timestamp');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

productSchema.plugin(timestamp);
module.exports = mongoose.model("Product", productSchema);
