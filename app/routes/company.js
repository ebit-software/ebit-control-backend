const express = require('express');
const app = express.Router();
const controller = require('../controllers/company');

app.post('/create', controller.create);

module.exports = app;