exports.create = async (req,res) => {
    const Company = require('../models/company');

    const company = new Company({
        ruc:req.body.ruc,
        name:req.body.name,
        mail:req.body.mail,
        phone:req.body.phone,
        owner:req.body.owner,
        city:req.body.city,
        account:req.body.account,
        coords:req.body.coords
    });


    try {    
        //para crear una empresa no se debe perminitir crear si es que ya existe ruc o dominio
        let domain = await Company.find({"account.domain.name":req.body.account.domain.name}).exec(); //dominio de la empresa
        // let ruc = await Company.find({'ruc':req.body.ruc}).exec(); 
        let username = await Company.find({'account.cpanel.username':req.body.account.cpanel.username}).exec(); //usuario de whm

        if(domain.length != 0) return res.status(400).json({ok:false,message:'Domain already exists'});
        // if(ruc.length != 0) return res.status(400).json({ok:false,message:'Ruc already exists'});
        if(username.length != 0) return res.status(400).json({ok:false,message:'Username already exists'});

        //si es un dominio que no existe 
        await company.save();
        res.status(201).json({ok:true,company})
    } catch (error) {
        res.status(500).json({ok:false,error})
    };  
}

exports.update = async (req,res) => {
    const Company = require("../models/company");
    const id = req.params.id;
    const body = req.body;

    try {
        const company = await Company.findByIdAndUpdate(id,body).exec();
        res.status(200).json({ok:true,company});
    } catch (error) {
        res.status(500).json({ok:false,error});
    }
};

exports.delete = async (req,res) => {
    const Company = require('../models/company');
    const id = req.params.id;

    try {
        const company = await Company.findByIdAndDelete(id).exec();
        res.status(200).json({ok:true,company});
    } catch (error) {
        res.status(500).json({ok:false,error});
    }
};

exports.get = async (req,res) => {
    const Company = require('../models/company');

    if(req.params.id){
        try {
            let company = await Company.findById(req.params.id).populate({path:'account.cpanel.package', select:'name'});
            
            res.status(200).json({ok:true, company});
        } catch (error) {
            res.status(500).json({ok:false,error});
        }
    }else{
        try {
            let companies = await Company.find({}).exec();
            let count = await Company.estimatedDocumentCount().exec();
    
            res.status(200).json({ok:true, data:{count,results:companies}});
        } catch (error) {
            res.status(500).json({ok:false,error});
        }
    }
};

exports.count = async (req,res) => {
    try {
        const Company = require('../models/company');
        let count = await Company.estimatedDocumentCount().exec();
        res.status(200).json({ok:true, count});
    } catch (error) {
        res.status(500).json({ok:false});
    }
}

exports.search = async (req,res) => {
    const Company = require('../models/company');
    let value = new RegExp(req.params.value,'i');//usando regex i se transforma a minuscula
    try {
        let companies =  await Company.find(
            { $or: [ { 'name': { $in: value } }, { 'ruc': value } ] }
        )
        .exec();
        let count = await Company.estimatedDocumentCount().exec();
        res.status(200).json({ok:true, data:{count,results:companies}});
    } catch (error) {
        res.status(500).json({ok:false,error})
    }
};