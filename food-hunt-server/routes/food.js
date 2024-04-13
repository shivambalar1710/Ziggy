const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  createFood,
  getAllFoods,
  getFoodById,
  getNewFoods,
  getFoodsFromDistinctCatagory,
  getTopRating,
  removeFoodById,
} = require("../controller/food");

router = express.Router();

router.post("/addfood", protect, createFood);
router.get("/getAllFoods", getAllFoods);
router.get("/getNewFoods", getNewFoods);
router.get("/getToRated", getTopRating);
router.get("/specialFoods", getFoodsFromDistinctCatagory);
router.get("/getFood/:id", getFoodById);
router.delete("/foods/:id", removeFoodById);
module.exports = router;
