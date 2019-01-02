exports.connect = (uri) => {
    const mongoose = require('mongoose');
    
    mongoose.connect(uri, {useNewUrlParser: true}, (error) => {
        if(error) throw error;
        console.log(`conectado a : ${uri}`);

        mongoose.Promise = global.Promise;
    })

}


var uri =  'mongodb://127.0.0.1:27017/MailControl';