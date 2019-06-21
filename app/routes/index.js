exports.init = (app) => {
    const auth = require('./auth');
    const user = require('./user');
    const company = require('./company');
    const package = require('./package');
    const notification = require('./notification');
    const mail = require('./mail');
    const location = require('./location');

    app.use('/api/auth',auth);
    app.use('/api/user',user);
    app.use('/api/company',company);
    app.use('/api/package',package);
    app.use('/api/notification',notification);
    app.use('/api/mail',mail);
    app.use('/api/location',location);
}