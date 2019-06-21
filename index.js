const config = require('./core/config');
const express = require('./core/express');
const db = require('./core/mongo');


express.listen(config.port,config.host);
db.connect(config.db);

const tasks = require('./app/tasks');
tasks.init();



