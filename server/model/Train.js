const mongoose = require('mongoose');
const validator = require('validator');

const trainSchema = new mongoose.Schema({
    trainName: {
        type: String,
        required: true
    },
    trainNumber: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availableSeats: [
        {
            seatNumber: { type: Number, required: true },
            status: { type: String, default: 'available' }
        }
    ],
    passengers: [
        {
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
            country: {
                type: String,
                required: true
            },
            phoneNumber: {
                type: String,
                required: true
            },
            emailAddress: {
                type: String,
                required: true,
                validate: [validator.isEmail, 'Please enter valid email address']
            },
            departureDate: {
                type: Date,
                required: true
            },
            arrivalDate: {
                type: Date,
                required: true
            },
            seatNumber: {
                type: Number,
                required: true
            },
            from: {
                type: String,
                required: true
            },
            to: {
                type: String,
                required: true
            },
            status: {
                type: String,
                default: 'booked'
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Train', trainSchema);
