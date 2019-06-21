
exports.get = async (req,res) => {

    const User = require('../models/user');
    let unregistred = Boolean(req.params.unregistred);

    if(unregistred === true) {
        try {
            const users = await User.find({'mail':null}).select({role:1}).exec();
            let count = await User.countDocuments({"mail":null}).exec();
            res.status(200).json({ok:true, data:{count,results:users}})
        } catch (error) {
            res.status(500).json({ok:false, error})
        }
    }else{
        try {
            const results = await User.find({}).exec();
            let count = await User.countDocuments({"mail":{ $ne: null }}).exec();
            let filteredResults = results.filter((user) => { if(user.mail != null) return user; })
            res.status(200).json({ok:true, data:{count, results:filteredResults}});
        } catch (error) {
            res.status(500).json({ok:false, error});
        }
    }
};

exports.count = async (req,res) => {

    try {
        const User = require('../models/user');
        let count = await User.countDocuments({"mail":{ $ne: null }}).exec();
        res.status(200).json({ok:true, count});
    } catch (error) {
        res.status(500).json({ok:false, error});
    } 

}

exports.update = async (req,res) => {

    const User = require('../models/user');

    if(req.params.id) {
        //aqui se registrara normalmente
        try {
            let user = await User.findByIdAndUpdate(req.params.id,req.body).exec();
            res.status(200).json({ok:true,user});
        } catch (error) {
            res.status(500).json({ok:false, error});
        }
    }else{
        //aqui se registrara a un usuario nuevo , que solo tenga id y role
        let ObjectId = require('mongoose').Types.ObjectId;
        let id = req.body._id;

        let update = {
            displayname:req.body.displayname,
            name:req.body.name,
            surname:req.body.surname,
            mail:req.body.mail,
            password:req.body.password
        };

        if(ObjectId.isValid(id) === false) return res.status(400).json({ok:false, message:'Invalid id'});
        if(id.length < 24) return res.status(400).json({ok:false, message:'Invalid id'});

        try {
            //estas dos lineas verifican que el codigo no haya sido usado 
            let user = await User.findById(id).exec();
            if(user === null) return res.status(400).json({ok:false, message:'Invalid id'});
            if(user.mail != null ) return res.status(400).json({ok:false,message:'Id was alerady used'});

            //estas dos lineas verifican que el correo no se repita
            let mailTaken = await User.findOne({mail:req.body.mail}).exec();
            if(mailTaken != null) return res.status(303).json({ok:false,message:'Mail already exists'});

            await User.findByIdAndUpdate(id,update).exec();
            res.status(200).json({ok:true,user});
        } catch (error) {
            res.status(500).json({ok:false, error});
        }
    }
}

exports.delete = async (req,res) => {
    const User = require('../models/user');

    try {
        user = await User.findByIdAndDelete(req.params.id).exec();
        res.status(200).json({ok:true, user})
    } catch (error) {
        res.status(500).json({ok:false, error})
    }
}

exports.search = async (req,res) => {
    const User = require('../models/user');

    if(req.params.value == null) {
        try {
            const users = await User.find({'mail':null}).select({role:1}).exec();
            res.status(200).json({ok:true, data:{count,results:users}});
        } catch (error) {
            res.status(500).json({ok:false, error})
        };

    }else{
        res.status(200).json({ok:true,message:'else'}); 
    }
};


