const Coupon = require("../model/Discount");

exports.createCoupon = async (req, res) => {
  try {
    const {
      code,
      discountType,
      expirationDate,
      minOrderAmount,
      discountAmount,
    } = req.body;
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ error: "Coupon code already exists" });
    }

    const coupon = new Coupon({
      code,
      minOrderAmount,
      discountAmount,
      discountType,
      expirationDate,
    });
    await coupon.save();

    res.status(201).json({ message: "Coupon created successfully", coupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json({ coupons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
