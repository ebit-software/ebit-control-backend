const jwt = require('jwt-simple');
const moment = require('moment');
const global = require('../global');

exports.createToken = (user) => {
    const payload = {
        sub:user._id,
        iat:moment().unix(),
        exp:moment().add(1,'hours').unix(),
    }

    return jwt.encode(payload, global.SECRET_TOKEN);

}