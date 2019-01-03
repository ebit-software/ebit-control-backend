exports.init = (app) => {
    const auth = require('./auth');

    app.use('/api/auth',auth);
}