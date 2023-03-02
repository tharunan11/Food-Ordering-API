const Food = require('../models/foodModel');
const Operations = require('../utils/Operations');

exports.bestFoods = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,difficulty';
  next();
};

exports.fetchallFoods = async (req, res) => {
  try {
    const features = new Operations(Food.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const foods = await features.query;

    res.status(200).json({
      status: 'success',
      results: foods.length,
      data: {
        foods
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.fetchFoods = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        food
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createFoods = async (req, res) => {
  try {
    const newFood = await Food.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        food : newFood
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateFoods = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        food
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteFoods = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'successfully deleted',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.fetchFoodStats = async (req, res) => {
  try {
    const stats = await Food.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numFoods: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
