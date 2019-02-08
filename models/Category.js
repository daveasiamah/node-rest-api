const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const Schema = mongoose.Schema;

//Create Schema
const CategorySchema = new Schema({
  category_name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    default: "enabled"
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  }
});

CategorySchema.plugin(timestamp);
module.exports = Category = mongoose.model("Category", CategorySchema);
