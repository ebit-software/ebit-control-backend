const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Company = require('./company');

const model = mongoose.model('Notification', new Schema({
  package:{ type:mongoose.Types.ObjectId, ref: Company },
  type:{ type:String },
  state:{ type:String },
  read:{ type:Boolean },
  message:{ type:String },
  created_at:{ type:String }
},{ versionKey:false }));

module.exports = model;