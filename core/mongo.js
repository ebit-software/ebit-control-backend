exports.connect = (uri) => {
    const mongoose = require('mongoose');
    //Global Config
    // mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    mongoose.connect(uri, {useNewUrlParser: true}, (error) => {
        if(error) throw error;
        console.log(`conectado a : ${uri}`);

        mongoose.Promise = global.Promise;
    })
}