const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();


const url = 'mongodb://localhost:27017/project01';
const config = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

expressApp.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200')
    res.setHeader('Access-Control-Allow-Medthods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Option, Authorization')
    return next()
});

expressApp.use(expressFunction.json());


expressApp.use((req, res, next)=>{
    mongoose.connect(url, config)
    .then(()=>{
        console.log('Connected to MongoDB...');
        next();
    })
    .catch(err=>{
        console.log('Cannot connet to MogoDB...');
        res.status(501).send('Cannot connect to MongoDB')
    });
});

expressApp.use('/bookstore', require('./routes/sigup'))
expressApp.use('/bookstore', require('./routes/signin'))
expressApp.use('/bookstore', require('./routes/bool'))
expressApp.use('/bookstore', require('./routes/order'))


expressApp.listen(3000, function(){
    console.log('Listening on port 3000');
});