const jwt = require('../services/jwt');

const isAuth = (req,res,next) => {
    if(!req.headers.authorization) return res.status(403).json({ok:false,message:'Unauthorized'});
    const token = req.headers.authorization;

    jwt.decodeToken(token).then((response) => {
       req.payload = response;
       next()
    }).catch(error => res.status(error.status).json({error}));

}

module.exports = isAuth;