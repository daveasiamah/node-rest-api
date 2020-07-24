const Joi = require("joi");
const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const moment = require("moment");
const Schema = mongoose.Schema;

const createdDate = moment().format("llll");
const updatedDate = moment().format("llll");

// moment(Date.now()).format("MM-DD-YYYY @ h:mm:ss A");
// moment(Date.now()).format("MM-DD-YYYY @ h:mm:ss A");
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
    unique: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
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

const validateUser = user => {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(user, schema);
};

UserSchema.plugin(timestamp);

module.exports = User = mongoose.model("User", UserSchema);
exports.validate = validateUser;
