//"C:\Program Files\MongoDB\Server\8.2\bin\mongod.exe" --dbpath="c:\data\db"
const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.send('Welcome Sir!!');
})

const personroute = require('./routes/personrouter');
app.use('/person',personroute);

const menuroute = require('./routes/menurouter');
app.use('/menu',menuroute);

app.listen(3000,()=> {
    console.log('listening to port 3000');
})