const jwt = require('jwt-simple');
const moment = require('moment');
const global = require('../global');

exports.createToken = (user) => {
    const payload = {
        sub:user._id,
        iat:moment().unix(),
        exp:moment().add(120,'minutes').unix(),
    }

    return jwt.encode(payload, global.SECRET_TOKEN);

}

exports.decodeToken = (token) => {
    return new Promise((resolve,reject) => {
        try {
            const payload = jwt.decode(token, global.SECRET_TOKEN);
            resolve(payload);
        } catch (error) {
            if(error == 'Error: Token expired') reject({status:401,message:'Token expired'})
            if(error == 'Error: Signature verification failed') reject({status:401,message:'Signature verification failed'})
        }
    })
}