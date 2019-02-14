const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const model = mongoose.model('Package', new Schema({
    name:{type:String, lowercase:true, trim:true},
    diskQuota:{
        value:{type:Number},
        unlimited:{type:Boolean}
    },
    monthlyBandwidth:{
        value:{type:Number},
        unlimited:{type:Boolean},
    },
    maxFttpAccount:{
        value:{type:Number},
        unlimited:{type:Boolean}
    },
    maxEmailAccount:{
        value:{type:Number},
        unlimited:{type:Boolean}
    },
    maxQuotaEmailAdress:{
        value:{type:Number},
        unlimited:{type:Boolean}
    },
    maxEmailList:{
        value:{type:Number},
        unlimited:{type:Boolean}
    },
    maxDatabase:{
        value:{type:Number},
        unlimited:{type:Boolean}
    },
    maxSubdomain:{
        value:{type:Number},
        unlimited:{type:Boolean}
    },
    maxParkedDomain:{
        value:{type:Number},
        unlimited:{type:Boolean}
    },
    maxAddonDomain:{
        value:{type:Number},
        unlimited:{type:Boolean}
    } 
},{versionKey:false}));

module.exports = model;

