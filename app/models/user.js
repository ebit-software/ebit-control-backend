const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//ROLES : user,admin

const model = mongoose.model('User', new Schema({
    displayname:{type: String, lowercase: true, trim: true, default: null},
    name:{type: String, lowercase: true, trim: true , default: null},
    surname:{type: String, lowercase: true,trim: true, default: null},
    mail:{type: String, lowercase: true, trim: true, default: null},
    password:{type: String, default: null},
    avatar:{type: String, default: null},
    role:{type: String, default:'admin'},
    lastLogin:{type: Date , default:null}
},{versionKey:false}));


module.exports = model;



