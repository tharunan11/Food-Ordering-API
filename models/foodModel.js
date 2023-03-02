const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Mention the name of the food'],
      unique: true,
      trim: true
    },
    FoodType: {
      type: String,
      required: [true, 'Food must be specified either veg or non veg'],
      enum: {
        values: ['veg', 'non-veg']
      }
    },
    Tag: {
      type: String,
      enum: {
        values: ['Bestseller', 'Must try', "Today's offer"]
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'Mention the price of the food']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
    },
    decription: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

foodSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

const Food = mongoose.model('Foods', foodSchema);

module.exports = Food;
