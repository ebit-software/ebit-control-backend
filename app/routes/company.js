const express = require('express');
const app = express.Router();
const controller = require('../controllers/company');

app.post('/create', controller.create);
app.get('/get',controller.get);
app.delete('/delete/:id',controller.delete);

module.exports = app;