exports.create = async (req,res) => {
    const Company = require('../models/company');

    const company = new Company({
        name:req.body.name,
        ruc:req.body.ruc,
        owner:req.body.owner,
        contacts:req.body.contacts,
        domain:req.body.domain,
        account:req.body.account,
        package:req.body.packageId,
        coords:req.body.coords
    });

    try {    
        //para crear una empresa no se debe perminitir crear si es que ya existe ruc o dominio
        let domain = await Company.find({"domain.name":req.body.domain.name}).exec(); //dominio de la empresa
        let ruc = await Company.find({'ruc':req.body.ruc}).exec(); // ruc de la emoresa
        let username = await Company.find({'account.username':req.body.account.username}).exec(); //usuario de whm

        if(domain.length != 0) return res.status(400).json({ok:false,message:'Domain already exists'});
        if(ruc.length != 0) return res.status(400).json({ok:false,message:'Ruc already exists'});
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
}

exports.delete = async (req,res) => {
    const Company = require('../models/company');
    const id = req.params.id;

    try {
        const company = await Company.findByIdAndDelete(id).exec();
        res.status(200).json({ok:true,company});
    } catch (error) {
        res.status(500).json({ok:false,error});
    }
}

exports.get = async (req,res) => {
    const Company = require('../models/company');

    try {
        let companies = await Company.find({}).exec();
        let count = await Company.estimatedDocumentCount().exec();

        res.status(200).json({ok:true, data:{count,results:companies}});
    } catch (error) {
        res.status(500).json({ok:false,error});
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
}