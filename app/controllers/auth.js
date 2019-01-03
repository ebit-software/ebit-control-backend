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
        res.status(500).json({ok:false,error:error});
    }

}

exports.login = async (req,res,next) => {
    res.status(200).json({ok:true,response:200});
}