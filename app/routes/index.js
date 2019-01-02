exports.init = (app) => {
    const example = require('./example');

    app.use('/api',example);
}