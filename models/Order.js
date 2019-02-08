const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  customer_details: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  }
});

orderSchema.plugin(timestamp);
module.exports = mongoose.model("Order", orderSchema);
