const mongoose = require("mongoose");
const validator = require("validator");

const carSchema = new mongoose.Schema(
  {
    carName: {
      type: String,
      required: true,
    },
    carNumber: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    passengers: [
      {
        fullName: {
          type: String,
          required: true,
        },
        cnic: {
          type: String,
          required: true,
        },
        saveDetails: {
          type: Boolean,
          default: false,
        },
        nickName: {
          type: String,
        },
        phoneNumber: {
          type: String,
          required: true,
        },
        emailAddress: {
          type: String,
          required: true,
          validate: [validator.isEmail, "Please enter valid email address"],
        },
        address: {
          type: String,
          required: true,
        },
        days: {
          type: [Boolean],
          required: true,
        },
        pickupDate: {
          type: Date,
          required: true,
        },
        dropDate: {
          type: Date,
          required: true,
        },
        pickuptime: {
          type: String,
          required: true,
        },
        droptime: {
          type: String,
          required: true,
        },
        seatNumber: {
          type: Number,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
