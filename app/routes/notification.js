const express = require('express');
const app = express.Router();
const controller = require('../controllers/notification');
const isAuth = require('../middlewares/auth');


app.get('/get', isAuth, controller.get);
app.get('/count', controller.count);

module.exports = app;