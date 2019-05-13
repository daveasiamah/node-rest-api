const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const moment = require("moment");
const Schema = mongoose.Schema;

const transaction_date = moment().format("llll");

const ReportSchema = new Schema({
  item_name: {
    type: String,
    required: true
  },
  price: { type: Number },
  category: { type: String },
  units: { type: String },
  user_name: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  transaction_date: { type: String, default: transaction_date },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  purchase_type: { type: String },
  description: { type: String },
  country: { type: String },
  city: { type: String },
  manufacture_date: { type: Date },
  expiry_date: { type: Date }
});

mongoose.plugin(timestamp);
module.exports = Reports = mongoose.model("Report", ReportSchema);
