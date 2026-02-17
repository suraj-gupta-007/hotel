const moongosse = require('mongoose');

const mongourl = 'mongodb://localhost:27017/hotel'

moongosse.connect(mongourl,{
    
})

const db = moongosse.connection;

db.on('connected',() => {
    console.log('Connected to Mongodb Server');
})

db.on('error',(err) => {
    console.error('Mongodb connection error',err);
})

db.on('disconnected',() => {
    console.log('Mongodb disconneted');
})

module.exports = db;
