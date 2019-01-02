const config = require('./core/config');
const express = require('./core/express');
const db = require('./core/mongo');


express.listen(config.express.port);
db.connect(config.mongodb.uri);
