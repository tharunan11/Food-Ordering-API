const express = require('express');

const foodRouter = require('./routes/foodroutes');

const app = express();

// 3) ROUTES
app.use('/api/v1/foods', foodRouter);

module.exports = app;
