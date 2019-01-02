
exports.listen = (port) => {
    const express = require('express');
    const cors = require('cors');
    const http = require('http');
    const path = require('path');

    const app = express();
    const server = http.createServer(app);

    app.use(express.static(path.join(__dirname , '../public')));
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.use(cors());
    
    const routes = require('../app/routes');
    routes.init(app);


    server.listen(port,() => {
        console.log(`escuchando en el puerto ${port}`);
    })
}


