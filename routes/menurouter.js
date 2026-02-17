const express = require('express');
const router = express.Router();
const menuitem = require('./../models/menu');

router.post('/', async (req , res) => {
    try{
        const data = req.body;

        const newmenuitem = new menuitem(data);

        const response = await newmenuitem.save();
        console.log('data saved');
        res.status(500).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/',async (req,res) => {
    try{
        const data = await menuitem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/:tastetype',async (req,res) => {
    try{
        const tastetype = req.params.tastetype;
        if(tastetype == 'spicy' || tastetype == 'sweat' || tastetype == 'sour'){
            const data = await menuitem.find({taste: tastetype});
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
        const menuid = req.params.id;
        const updateddata = req.body;

        const response = await menuitem.findByIdAndUpdate(menuid,updateddata, {
            new: true,
            runvalidator: true
        })

        if(!response){
            return res.status(404).json({error: 'menuitem not found'});
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
        const menuid = req.params.id;

        const response = await menuitem.findByIdAndDelete(menuid)

        if(!response){
            return res.status(404).json({error: 'menuitem not found'});
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