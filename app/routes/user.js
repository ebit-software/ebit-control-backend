const express = require('express');
const app = express.Router();
const controller = require('../controllers/user');
const isAuth = require('../middlewares/auth');

app.get('/get/:unregistred?', isAuth, controller.get);//el parametro null es para obtener todos los correos nulos
app.get('/search/:value', isAuth, controller.search);
app.put('/update/:id?', controller.update);
app.delete('/delete/:id', isAuth, controller.delete);

module.exports = app;