const mongoose = require("mongoose");
const validator = require("validator");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ["Mr", "Mrs", "Miss"],
      required: true,
    },
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
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
    city: {
      type: Array,
      required: true,
    },
    totalCount: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    eventDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
