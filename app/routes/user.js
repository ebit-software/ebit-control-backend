const express = require('express');
const app = express.Router();
const controller = require('../controllers/user');
const isAuth = require('../middlewares/auth');

app.get('/search/:value', isAuth, controller.search);
app.get('/get/:unregistred?', isAuth, controller.get);
app.get('/count', isAuth, controller.count);
app.put('/update/:id?', controller.update);
app.delete('/delete/:id', isAuth, controller.delete);

module.exports = app;