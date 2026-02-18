const express = require('express');
const router = express.Router();
const person = require('./../models/person');
const {jwtauthware,generatetoken} = require('./../jwt');

router.post('/signup', async (req , res) => {
    try{
        const data = req.body;

        const newperson = new person(data);

        const response = await newperson.save();
        console.log('data saved');

        const payload = {
            id: response.id,
            username: response.username
        }

        console.log(JSON.stringify(payload));
        const token = generatetoken(payload);
        console.log('token is : ',token);

        res.status(500).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.post('/login', async (req,res) => {
    try{
        const {username, password} = req.body;
        const user = await person.findOne({username: username});
        if(!user || !await user.comparePassword(password)){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generatetoken(payload);

        res.json({token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.get('/profile',jwtauthware,async (req,res) => {
    try{
        const userData = req.user;
        console.log("User Data: ",userData);

        const userId = userData.id;
        const user = await person.findById(userId);

        res.status(200).json({user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/',jwtauthware,async (req,res) => {
    try{
        const data = await person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/:worktype',async (req,res) => {
    try{
        const worktype = req.params.worktype;
        if(worktype == 'chef' || worktype == 'waiter' || worktype == 'manager'){
            const data = await person.find({work: worktype});
            console.log('data fetched');
            res.status(200).json(data);
        }else{
            res.status(200).json({error: 'Invalid work type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.put('/:id',async (req,res) => {
    try{
        const personid = req.params.id;
        const updateddata = req.body;

        const response = await person.findByIdAndUpdate(personid,updateddata, {
            new: true,
            runvalidator: true
        })

        if(!response){
            return res.status(404).json({error: 'person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
        }
        catch(err){
            console.log(err);
            res.status(500).json({error: 'Internal server error'});
        }
})

router.delete('/:id',async (req,res) => {
    try{
        const personid = req.params.id;

        const response = await person.findByIdAndDelete(personid)

        if(!response){
            return res.status(404).json({error: 'person not found'});
        }

        console.log('data deleted');
        res.status(200).json({message: 'person deleted succssfully'});
        }
        catch(err){
            console.log(err);
            res.status(500).json({error: 'Internal server error'});
        }
})

module.exports = router;