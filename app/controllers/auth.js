exports.register = async (req,res) => {
    const User = require('../models/user');

    const user = new User({
        displayname:req.body.displayname,
        name:req.body.name,
        surname:req.body.surname,
        mail:req.body.mail,
        password:req.body.password,
        nick:req.body.nick,
        role:req.body.role
    });

    try {
        if(user.mail === null){
            await user.save();
            res.status(201).json({ok:true,user});
        }else{
            let mailTaken = await User.findOne({mail:req.body.mail}).exec();
            if(mailTaken != null) return res.status(303).json({ok:false,message:'Mail already exists'});

            await user.save();
            res.status(201).json({ok:true,user});
        }

    } catch (error) {
        res.status(500).json({ok:false,error});
    }

}

exports.login = async (req,res) => {
    const User = require('../models/user');
    const jwt = require('../services/jwt');

    try {
        const user = await User.findOne({mail:req.body.mail}).exec();
        if(!user) return res.status(403).json({ok:false, message:'Unauthorized'});
        if(user.password != req.body.password) return res.status(403).json({ok:false, message:'Unauthorized'});
 
        //update last login

        const update = await User.findByIdAndUpdate(user._id,{lastLogin:Date.now()}).exec();

        user.password = 'hash'
        res.status(202).json({ok:true,token:jwt.createToken(user),user,update});
        
    } catch (error) {
        res.status(500).json({ok:false, error:error});
    }
}

