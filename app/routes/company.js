const express = require('express');
const app = express.Router();
const controller = require('../controllers/company');
const isAuth = require('../middlewares/auth');

app.post('/create', isAuth, controller.create);
app.get('/get', isAuth, controller.get);
app.delete('/delete/:id', isAuth, controller.delete);
app.get('/search/:value', isAuth, controller.search);

module.exports = app;