const moongosse = require('mongoose');

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
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    }
})

const person = moongosse.model('person',personSchema);
module.exports = person;