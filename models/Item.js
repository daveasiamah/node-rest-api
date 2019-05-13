const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const Schema = mongoose.Schema;
const moment = require("moment");
const createdDate = moment(Date.now()).format("llll");
const updatedDate = moment(Date.now()).format("llll");

//Create Schema
const ItemSchema = new Schema({
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
    type: Number,
    default: 0
  },
  max_stock: {
    type: Number
  },
  units: {
    type: String
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  remarks: {
    type: String
  },
  status: {
    type: String,
    default: "enabled"
  },
  date_created: {
    type: String,
    default: createdDate
  },
  date_updated: {
    type: String,
    default: updatedDate
  }
});

ItemSchema.plugin(timestamp);
module.exports = Item = mongoose.model("Item", ItemSchema);
