const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    oneWay: {
        type: Boolean,
        required: true
    },
    roundTrip: {
        type: Boolean,
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
    departureDate: {
        type: Date,
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true
    }

});

module.exports = mongoose.model('Trip', tripSchema);