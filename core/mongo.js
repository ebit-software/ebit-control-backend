exports.connect = (uri) => {
    const mongoose = require('mongoose');
    
    // mongoose.set('useCreateIndex', true);

    mongoose.connect(uri, {useNewUrlParser: true}, (error) => {
        if(error) throw error;
        console.log(`conectado a : ${uri}`);

        mongoose.Promise = global.Promise;
    })
}