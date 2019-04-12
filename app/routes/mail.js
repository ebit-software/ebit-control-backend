const express = require('express');
const app = express.Router();
const controller = require('../controllers/mail');

app.post('/send/proform', controller.sendProform);

module.exports = app;