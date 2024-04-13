const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  minOrderAmount: {
    type: Number,
  },
  discountAmount: {
    type: Number,
  },
  discountType: {
    type: String,
    enum: ["percentage", "amount"],
    required: true,
  },

  expirationDate: {
    type: Date,
    required: true,
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
