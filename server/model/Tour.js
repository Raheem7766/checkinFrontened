const mongoose = require("mongoose");

const PassengerSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, enum: ["Mr", "Mrs", "Miss"], required: true },
  fullName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  country: { type: String, required: true },
  departureDate: { type: String, required: true },
  arrivalDate: { type: String, required: true },
  city: { type: String, required: true },
  person: { type: Number, required: true },
});

const ContactSchema = new mongoose.Schema({
  title: { type: String, enum: ["Mr", "Mrs", "Miss"], required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  cnic: { type: String, required: true },
  contactNumber: { type: String, required: true },
  nickName: { type: String },
  saveDetails: { type: Boolean, default: false },
});

const TourSchema = new mongoose.Schema(
  {
    tourName: { type: String, required: true },
    price: { type: Number, required: true },
    passengers: [PassengerSchema],
    contactDetails: ContactSchema,
    departureDate: { type: String, required: true },
    arrivalDate: { type: String, required: true },
    city: { type: String, required: true },
    person: { type: Number, required: true },
  },
  { timestamps: true }
);
 
module.exports = mongoose.model("Tour", TourSchema);
