exports.register = async (req,res,next) => {
    const User = require('../models/user');

    const user = new User({
        name:req.body.name,
        surname:req.body.surname,
        mail:req.body.mail,
        password:req.body.password,
        displayname:req.body.displayname,
        avatar:null
    });

    try {
        let newUser = await user.save();
        res.status(201).json({ok:true,response:newUser});
    } catch (error) {
        next(error);
    }

}

exports.login = async (req,res,next) => {
    const User = require('../models/user');
    const jwt = require('../services/jwt');

    try {
        const user = await User.findOne({mail:req.body.mail}).exec();
        if(!user) return res.status(401).json({ok:false, message:'Unauthorized'});
        if(user.password != req.body.password) return res.status(401).json({ok:false, message:'Unauthorized'});
        res.status(200).json({ok:true,token:jwt.createToken(user),response:user});
        
    } catch (error) {
        res.status(500).json({ok:false, error:error});
    }
}