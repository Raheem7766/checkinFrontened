const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fullName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  nationality: { type: String, required: true },
  country: { type: String, required: true },
  passportNumber: { type: String, required: true },
  passportIssuance: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  visaRequired: { type: Boolean, required: true },
});

const visitSchema = new mongoose.Schema(
  {
    passengers: { type: [passengerSchema], required: true },
    contactDetails: {
      phone: { type: String, required: true },
      email: { type: String, required: true }
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    days: { type: Number, required: true },
    selectedDate: { type: Date, required: true },
    selectedOption: { type: String, required: true },
    selectedPassenger: { type: String, required: true },
    details: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Visit", visitSchema);