const express = require('express');
const app = express.Router();
const controller = require('../controllers/mail');

app.post('/send/proform', controller.sendProform);
app.post('/create/message', controller.createMessage);
app.get('/get/message/:id?',controller.getMessages);
app.put('/read/message/:id', controller.readMessage);

module.exports = app;