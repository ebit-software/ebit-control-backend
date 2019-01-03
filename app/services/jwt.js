const jwt = require('jwt-simple');
const moment = require('moment');
const global = require('../global');

exports.createToken = (user) => {
    const payload = {
        sub:user._id,
        iat:moment().unix(),
        exp:moment().add(2,'minutes').unix(),
    }

    return jwt.encode(payload, global.SECRET_TOKEN);

}

exports.decodeToken = (token) => {
    return new Promise((resolve,reject) => {
        try {
            const payload = jwt.decode(token, global.SECRET_TOKEN);
            if(payload.exp <= moment().unix()) resolve({status:401,message:'Token expired'});
            resolve(payload);
        } catch (error) {
            reject({status:500,message:'Invalid Token',error});
        }
    })
}