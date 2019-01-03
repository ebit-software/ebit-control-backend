const config = require('./core/config');
const express = require('./core/express');
const db = require('./core/mongo');


express.listen(config.port);
db.connect(config.db);
