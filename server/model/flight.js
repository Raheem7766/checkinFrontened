const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  arrivalCityCode: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  citynameFrom: { type: String, required: true },
  citynameTo: { type: String, required: true },
  departureCityCode: { type: String, required: true },
  departureDate: { type: Date, required: true },
  departureTime: { type: String, required: true }, 
  duration: { type: String, required: true },
  flightId: { type: Number, required: true },
  flightImg: { type: String, required: true },
  fromCity: { type: String, required: true },
  price: { type: String, required: true },
  selectedCardType: { type: String, required: true },
  toCity: { type: String, required: true },
  travelClass: { type: String, required: true },
  travelers: {
    adult: { type: Number, required: true },
    children: { type: Number, required: true },
    infant: { type: Number, required: true },
  },
  passengers: [
    {
      category: { type: String, required: true },
      title: { type: String, required: true },
      fullName: { type: String, required: true },
      lastName: { type: String, required: true },
      nationality: { type: String, required: true },
      dob: { type: Date, required: true },
      gender: { type: String, required: true },
      passport: { type: String, required: true },
      passportCountry: { type: String, required: true },
      issuanceDate: { type: Date, required: true },
      expiryDate: { type: Date, required: true },
    },
  ],
  contactDetails: {
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
  },
});

const FlightData = mongoose.model("Flight", flightSchema);

module.exports = FlightData;

