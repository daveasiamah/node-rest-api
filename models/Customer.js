const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Schema = mongoose.Schema;

//Create Schema
const CustomerSchema = new Schema({
    customer_name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        default: "enabled"
    }

});

CustomerSchema.plugin(timestamp);
module.exports = Customer = mongoose.model('Customer', CustomerSchema);