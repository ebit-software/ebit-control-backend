
exports.search = async (req,res) => {
    const Package = require('../models/package');
    let value = new RegExp(req.params.value,'i');//usando regex i se transforma a minuscula
    try {
        let companies =  await Company.find({"name":{$in:value}}).exec();
        let count = await Company.estimatedDocumentCount().exec();
        res.status(200).json({ok:true, data:{count,results:companies}});
    } catch (error) {
        res.status(500).json({ok:false,error});
    }
};

exports.get = async (req,res,next) => {
    const Package = require('../models/package');
    const count = await Package.estimatedDocumentCount().exec();

    try {
        let packages = await Package.find().exec();
        res.status(200).json({ok:true, data:{count,results:packages}});
    } catch (error) {
        next(error);
    }
};

exports.count = async (req,res) => {
    try {
        const Package = require('../models/package');
        let count = await Package.estimatedDocumentCount().exec();
        res.status(200).json({ok:true, count});
    } catch (error) {
       res.status(500).json({ok:false, error});
    }
}

exports.create = async (req,res) => {
    const Package = require('../models/package');
    
    const package = new Package({
        name:req.body.name,
        diskQuota:req.body.diskQuota,
        monthlyBandwidth:req.body.monthlyBandwidth,
        maxFttpAccount:req.body.maxFttpAccount,
        maxEmailAccount:req.body.maxEmailAccount,
        maxQuotaEmailAdress:req.body.maxQuotaEmailAdress,
        maxEmailList:req.body.maxEmailList,
        maxDatabase:req.body.maxDatabase,
        maxSubdomain:req.body.maxSubdomain,
        maxParkedDomain:req.body.maxParkedDomain,
        maxAddonDomain:req.body.maxAddonDomain
    });

    try {
        await package.save();
        res.status(201).json({ok:true, response:package});
    } catch (error) {
        res.status(500).json({ok:false, error});
    }
};

exports.delete = async (req,res) => {
    const Package = require('../models/package');
    const id = req.params.id;

    try {
        let name = await Package.find({'name':req.body.name}).exec(); //usuario de whm
        if(name.length != 0) return res.status(400).json({ok:false,message:'Package already exists'});

        const package = await Package.findByIdAndDelete(id).exec();
        res.status(200).json({ok:true,package});
    } catch (error) {
        res.status(500).json({ok:false,error});
    }
};


