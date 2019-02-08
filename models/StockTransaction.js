const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_name",
    required: true
  }
  // [purchase_type] [varchar](10) NULL,
  // [business_partnerId] [varchar](100) NULL,
  // [transaction_type] [varchar](10) NULL,
  // [waybill_no] [varchar](100) NULL,
  // [remarks] [text] NULL,
  // [created_at] [smalldatetime] NULL,
  // [updated_at] [smalldatetime] NULL,
});

orderSchema.plugin(timestamp);
module.exports = mongoose.model("Order", orderSchema);
