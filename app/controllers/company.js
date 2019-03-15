exports.create = async (req,res) => {
    const Company = require('../models/company');

    const company = new Company({
        name:req.body.name,
        ruc:req.body.ruc,
        owner:req.body.owner,
        domain:req.body.domain,
        account:req.body.account,
        package:req.body.packageId,
        coords:req.body.coords
    });

    try {    
        await company.save();
        res.status(201).json({ok:true,response:company})
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
        let companies = await Company.find({})
        .exec();
        res.status(200).json({ok:true,data:{results:companies}});
    } catch (error) {
        res.status(500).json({ok:false,error});
    }
}