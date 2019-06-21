const express = require('express');
const app = express.Router();
const controller = require('../controllers/location');
const isAuth = require('../middlewares/auth');

app.post('/create/:id', controller.create);
app.delete('/delete/:companyId/:coordId', controller.delete);

module.exports = app;