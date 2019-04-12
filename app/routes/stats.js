const express = require('express');
const app = express.Router();
const controller = require('../controllers/stats');
const isAuth = require('../middlewares//auth');

app.get('/get', isAuth, controller.get);

module.exports = app;