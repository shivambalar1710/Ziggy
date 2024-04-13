const express = require("express");
const { getAllCoupons, createCoupon } = require("../controller/discount");
const router = express.Router();

router.post("/coupons", createCoupon);
router.get("/coupons", getAllCoupons);

module.exports = router;
