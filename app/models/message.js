const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = mongoose.model('Message', new Schema({
    name:{type:String, lowercase:true, trim:true},
    surname:{type:String, lowercase:true, trim:true},
    mail:{type:String, trim:true},
    company:{type:String, lowercase:true, trim:true},
    message:{type:String, lowercase:true, trim:true},
    date:{type:String},
    read:{type:Boolean, default:false}
},{versionKey:false}));

module.exports = model;

