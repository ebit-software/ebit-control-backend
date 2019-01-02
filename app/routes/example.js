const express = require('express');

const app = express.Router();
const controller = require('../controllers/example');

app.get('/example',controller.example);

module.exports = app;
