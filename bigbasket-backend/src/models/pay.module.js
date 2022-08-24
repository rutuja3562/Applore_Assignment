const mongoose = require("mongoose");

const razorPaySchema = new mongoose.Schema(
  {
    paymentid: { type: String, required: true },
    amount: { type: Number },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("razorPay", razorPaySchema);
