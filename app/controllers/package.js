exports.create = async (req,res,next) => {
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
        next(error);
    }
}

exports.delete = async (req,res,next) => {
    const Package = require('../models/package');
    const id = req.params.id;

    try {
        const package = await Package.findByIdAndDelete(id).exec();
        res.status(200).json({ok:true,package});
    } catch (error) {
        res.status(500).json({ok:false,error});
    }
};

exports.get = async (req,res,next) => {
    const Package = require('../models/package');

    try {
        let packages = await Package.find().exec();
        res.status(200).json({ok:true,data:{results:packages}});
    } catch (error) {
        next(error);
    }
}

