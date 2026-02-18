const moongosse = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new moongosse.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        required: true,
        type: String,
        enum: ['chef','waiter','manager'],
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

personSchema.pre('save',async function(){
    const person = this;
    if(!person.isModified('password')) return;

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(person.password,salt);
        person.password = hashedpassword;
        return;
    }
    catch(err){
        throw err;
    }
})

personSchema.methods.comparePassword = async function(candidatepassword){
    try{
        const isMatch = await bcrypt.compare(candidatepassword,this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}

const person = moongosse.model('person',personSchema);
module.exports = person;