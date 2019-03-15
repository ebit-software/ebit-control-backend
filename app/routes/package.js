const express = require('express');
const app = express.Router();
const controller = require('../controllers/package');

app.post('/create', controller.create);
app.delete('/delete/:id', controller.delete);
app.get('/get',controller.get);

module.exports = app;