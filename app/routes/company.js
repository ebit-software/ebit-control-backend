const express = require('express');
const app = express.Router();
const controller = require('../controllers/company');
const isAuth = require('../middlewares/auth');

app.post('/create', isAuth, controller.create);
app.put('/update/:id', isAuth, controller.update);
app.delete('/delete/:id', isAuth, controller.delete);
app.get('/get/:id?', isAuth, controller.get);
app.get('/count', isAuth, controller.count);
app.get('/search/:value', isAuth, controller.search);

module.exports = app;