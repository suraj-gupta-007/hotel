const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const passport = require('./auth');

const logRequest = (req,res,next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next();
}

app.use(passport.initialize());
const localauthmiddleware = passport.authenticate('local', {session: false});

app.get('/',(req,res) => {
    res.send('Welcome Sir!!');
})

const personroute = require('./routes/personrouter');
app.use('/person',localauthmiddleware,personroute);

const menuroute = require('./routes/menurouter');
app.use('/menu',menuroute);

app.listen(PORT,()=> {console.log('listening to port 3000')});