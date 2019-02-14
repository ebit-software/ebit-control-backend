const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//ROLES : user,admin

const model = mongoose.model('User', new Schema({
    name:{type: String, lowercase: true, trim: true},
    surname:{type: String, lowercase: true,trim: true},
    mail:{type: String, required: true, lowercase: true, trim: true},
    password:{type: String, required: true},
    avatar:{type: String, default: null},
    role:{type: String, default:'admin'},
    lastLogin:{type: Date , default:null}
},{versionKey:false}));


module.exports = model;



