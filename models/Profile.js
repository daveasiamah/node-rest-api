const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");
const moment = require("moment");
const createdDate = moment().format("llll");
const updatedDate = moment().format("llll");

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", //referencing the User model (ref:'case-sensitive')
  },
  status: {
    type: String,
    required: true,
  },
  date_created: {
    type: String,
    default: createdDate,
  },
  date_updated: {
    type: String,
    default: updatedDate,
  },
});

ProfileSchema.plugin(timestamp);
module.exports = Profile = mongoose.model("Profile", ProfileSchema);
