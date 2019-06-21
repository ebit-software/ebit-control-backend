const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Package = require('../models/package');

//ROLES : user,admin

// const contacts = new Schema({
//     name:{type:String, trim:true, lowercase:true},
//     phone:{type:String, trim:true, lowercase:true}
// });



const coords = new Schema({
    name:{type:String, trim:true, lowercase:true},
    lat:{type:Number},
    lng:{type:Number}
});

const model = mongoose.model('Company', new Schema({
    ruc:{type:String, lowercase:true, trim:true},
    name:{type:String, lowercase:true, trim:true},
    mail:{type:String, lowercase:false, trim:true},
    phone:{type:String, lowercase:true, trim:true},
    account:{
        domain:{
            name:{type:String, lowercase:true, trim:true},
            activated_date:{type:String},
            expired_date:{type:String}
        },
        cpanel:{
            package:{type:mongoose.Types.ObjectId, ref: Package},
            username:{type:String},
            setup_date:{type:String},
            activated_date:{type:String},
            expired_date:{type:String},
            state:{type:Boolean, default:true}
        }
    },
    coords:[coords]
},{versionKey:false}));

module.exports = model;

