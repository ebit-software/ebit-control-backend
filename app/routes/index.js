exports.init = (app) => {
    const auth = require('./auth');
    const stats = require('./stats');
    const user = require('./user');
    const company = require('./company');
    const package = require('./package');
    const notification = require('./notification');
    const mail = require('./mail');

    app.use('/api/auth',auth);
    app.use('/api/stats',stats);
    app.use('/api/user',user);
    app.use('/api/company',company);
    app.use('/api/package',package);
    app.use('/api/notification',notification);
    app.use('/api/mail',mail)
}