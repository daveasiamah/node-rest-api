const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const Schema = mongoose.Schema;

//Create Schema
const InventorySchema = new Schema({
  item_name: {
    type: String,
    required: true
  },
  price: {
    type: Number
  },
  description: {
    type: String
  },
  quantity: {
    type: Number
  },
  min_stock: {
    type: Number
  },
  max_stock: {
    type: Number
  },
  units: {
    type: String
  },
  category: {
    type: String
  },
  remarks: {
    type: String
  },
  status: {
    type: String
  },
  transaction_type: {
    type: String
  },
  purchase_type: {
    type: String
  },
  supplier: {
    type: String
  },
  location: {
    type: String
  },

  waybill_no: {
    type: String
  },
  part_number: {
    type: String
  },
  manufacture_date: {
    type: String
  },
  expiry_date: {
    type: String
  },
  quantity: {
    type: Number,
    min: 0,
    max: 999999,
    default: 0
  }
});

InventorySchema.plugin(timestamp);
module.exports = Inventory = mongoose.model("Inventory", InventorySchema);
