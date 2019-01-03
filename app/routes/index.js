exports.init = (app) => {
    const auth = require('./auth');
    const user = require('./user');

    app.use('/api/auth',auth);
    app.use('/api/user',user);
}