const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    fullName: { type: String, required: true },
    cnicOrPassport: { type: String, required: true },
    saveDetails: { type: Boolean, default: false },
    nickName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    busName: { type: String, required: true },
    busType: { type: String, required: true },
    selectedFrom: { type: String, required: true },
    selectedTo: { type: String, required: true },
    departureTime: { type: String, required: true },
    departureDate: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    selectedSeats: { type: [String], required: true },
    droptime: { type: String, required: true },
    drop: { type: String, required: true },
    pick: { type: String, required: true },
    fromAbbreviation: { type: String, required: true },
    toAbbreviation: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Bus", busSchema);

module.exports = Booking;
