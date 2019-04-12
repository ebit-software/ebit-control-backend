const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const model = mongoose.model('Package', new Schema({
    user : { type : Schema.ObjectId, ref : 'User' },
    title: {
        type: String,
        required: [true, 'Notfication Title']
      },
      body: {
        type: String,
        required: [true, 'Notification Message']
      },
      read : { type : Boolean, default : false }
},{versionKey:false}));
