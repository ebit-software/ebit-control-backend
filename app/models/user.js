const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

//ROLES : user,admin

const model = mongoose.model('User', new Schema({
    name:{type: String, lowercase: true, trim: true},
    surname:{type: String, lowercase: true,trim: true},
    mail:{type: String, required: true, unique:true, lowercase: true, trim: true},
    password:{type: String, required: true},
    displayname:{type: String, trim: true , default:null},
    avatar:{type: String, default: null},
    role:{type: String, default:'admin'},
    lastLogin:{type: Date , default:null}
},{versionKey:false}).plugin(uniqueValidator));


module.exports = model;



