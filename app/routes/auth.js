const express = require('express');
const app = express.Router();
const controller = require('../controllers/auth');

app.post('/login',controller.login);
app.post('/register',controller.register);

module.exports = app;
