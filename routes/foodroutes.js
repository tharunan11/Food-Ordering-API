const express = require('express');
const foodconfig = require('../controllers/foodconfig');

const router = express.Router();

router.route('/top-foods').get(foodconfig.bestFoods, foodconfig.fetchallFoods);

router.route('/food-stats').get(foodconfig.fetchFoodStats);

router
  .route('/')
  .get(foodconfig.fetchallFoods)
  .post(foodconfig.createFoods);

router
  .route('/:id')
  .get(foodconfig.fetchFoods)
  .patch(foodconfig.updateFoods)
  .delete(foodconfig.deleteFoods);

module.exports = router;
