const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//ROLES : user,admin

const contacts = new Schema({
    name:{type:String, trim:true, lowercase:true},
    phone:{type:String, trim:true, lowercase:true}
});

const coords = new Schema({
    name:{type:String, trim:true, lowercase:true},
    lat:{type:Number},
    lng:{type:Number}
});


const model = mongoose.model('Company', new Schema({
    name:{type:String, lowercase:true, trim:true},
    ruc:{type:String, lowercase:true, trim:true},
    owner:{
        name:{type:String, lowercase:true, trim:true},
        mail:{type:String, lowercase:true, trim:true},
        contacts:[contacts]
    },
    domain:{
        name:{type:String, lowercase:true, trim:true},
        created_at:{type:Date},
        expired_at:{type:Date},
        updated_at:{type:Date ,default:null}
    },
    account:{
        username:{type:String},
        setup_date:{type:Date},
        activated_at:{type:Date},
        expired_at:{type:Date},
        updated_at:{type:Date , default:null},
        state:{type:Boolean, default:false},
    },
    package:{type:mongoose.Types.ObjectId},
    coords:[coords]
},{versionKey:false}));



module.exports = model;

