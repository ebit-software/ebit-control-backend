module.exports.create = async (req,res,next) => {
    let Company = require('../models/company');

    let newCoord = {
        name: req.body.name,
        lat:  req.body.lat,
        lng:  req.body.lng
    };

    try {
        Company.findOneAndUpdate(
            { "_id" : req.params.id },
            { $push: { coords: newCoord } }
        ).exec();

        res.status(200).json({ok:true});
        
    } catch (error) {
        res.status(500).json({ok:false})
    };

};

module.exports.delete = async (req,res,next) => {
    let Company = require('../models/company');

    try {
        Company.findOneAndUpdate(
            { "_id" : req.params.companyId },
            { $pull: { coords: { _id:req.params.coordId } } }
        ).exec();

        res.status(200).json({ok:true});

    } catch (error) {
        res.status(500).json({ok:false});
    }
};