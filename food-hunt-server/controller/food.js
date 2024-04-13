const Food = require("../model/Food");

const createFood = async (req, res) => {
  try {
    console.log(req.body);

    const newFood = new Food(req.body);
    const saveFood = newFood.save();
    res.status(200).json({
      message: "Food successfully added",
      success: true,
      data: {
        food: saveFood,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};

const getAllFoods = async (req, res) => {
  try {
    const { category, search } = req.query;
    console.log(category, search);

    let foodItems;
    if (category === "all") {
      foodItems = await Food.find();
    } else {
      foodItems = await Food.find({ catagory: category });
    }

    res.status(200).json({
      message: "Foods retrieved successfully",
      success: true,
      data: {
        food: foodItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};

const getNewFoods = async (req, res) => {
  try {
    const foodItems = await Food.find().sort({ createdAt: -1 }).limit(12);

    res.status(200).json({
      message: "12 register food showing",
      success: true,
      data: {
        food: foodItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};
const getFoodsFromDistinctCatagory = async (req, res) => {
  try {
    const distinctCatagory = await Food.distinct("catagory");
    const distinctfood = await Promise.all(
      distinctCatagory.slice(0, 4).map(async (catagory) => {
        const food = await Food.findOne({ catagory });
        return food;
      })
    );

    res.status(200).json({
      message: "4 different catagory food",
      success: true,
      data: {
        food: distinctfood,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};
const getTopRating = async (req, res) => {
  try {
    const topRatedFoods = await Food.find()
      .sort({ "reviews.rating": -1 })
      .limit(4);

    res.status(200).json({
      message: "4 different catagory food",
      success: true,
      data: {
        food: topRatedFoods,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};
const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;

    const foodItems = await Food.findById(id);

    res.status(200).json({
      message: "Food detaitls",
      success: true,
      data: {
        food: foodItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};

const removeFoodById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFood = await Food.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({
        error: "Food not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Food successfully removed",
      success: true,
      data: {
        food: deletedFood,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  createFood,
  getAllFoods,
  getFoodById,
  getNewFoods,
  getFoodsFromDistinctCatagory,
  getTopRating,
  removeFoodById,
};
