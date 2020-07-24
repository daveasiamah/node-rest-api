const mongoose = require("mongoose");
// const timestamp = require("mongoose-timestamp");
const moment = require("moment");

const Schema = mongoose.Schema;
const createdDate = moment().format("MMMM Do YYYY, h:mm:ss a");
const updatedDate = moment().format("MMMM Do YYYY, h:mm:ss a");

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
  min_stock: {
    type: Number
  },
  units: {
    type: String
  },
  category: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  transaction_type: {
    type: String,
    required: true
  },
  purchase_type: {
    type: String,
    required: true
  },
  supplier: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
   remarks: {
   type: String
    },
  waybill_no: {
    type: String,
    unique: true
  },
  part_number: {
    type: String,
    unique: true
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
    default: 0,
    required: true
  },
  createdAt: {
    type: String,
    default: createdDate
  },
  updatedAt: {
    type: String,
    default: updatedDate
  }
});

// InventorySchema.plugin(timestamp);
module.exports = mongoose.model("Inventory", InventorySchema);
