const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const SupplierSchema = new mongoose.Schema({
  supplier_name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  address: {
    type: String
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  remarks: {
    type: String
  },
  status: {
    type: String
  }
});

SupplierSchema.plugin(timestamp);
module.exports = Supplier = mongoose.model("Supplier", SupplierSchema);
