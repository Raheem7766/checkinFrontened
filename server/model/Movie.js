const mongoose = require('mongoose');
const validator = require('validator');

const customerSchema = new mongoose.Schema({
    title: {
        type: String,
        enum: ['Mr.', 'Mrs.', 'Miss.'],
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
        required: true
    },
    saveDetails: {
        type: Boolean,
        default: false
    },
    nickName: {
        type: String
    },
    phoneNumber: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String, 
        required: true
    },
    city: {
        type: String,
        required: true
    },
    seat: {
        type: Number,
        required: true
    },
    ticket: {
        type: String,
        required: true
    }
}, { _id: false });

const movieSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    customers: [customerSchema]
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
