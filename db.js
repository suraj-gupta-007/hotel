const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const moongosse = require('mongoose');
require('dotenv').config();

//const mongourl = 'mongodb://127.0.0.1:27017/hotel'
const mongoUrl = process.env.DB_URL;

moongosse.connect(mongoUrl);

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
