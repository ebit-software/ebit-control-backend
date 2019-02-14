exports.init = (app) => {
    const auth = require('./auth');
    const user = require('./user');
    const company = require('./company');
    const package = require('./package');

    app.use('/api/auth',auth);
    app.use('/api/user',user);
    app.use('/api/company',company);
    app.use('/api/package',package);
}