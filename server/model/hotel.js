const mongoose = require("mongoose");

const travelerSchema = new mongoose.Schema({
  title: String,
  firstName: String,
  lastName: String,
});

const contactSchema = new mongoose.Schema({
  email: String,
  cnic: String,
  phoneNumber: String,
  saveDetails: Boolean,
  nickName: String,
});

const hotelSchema = new mongoose.Schema({
  travelerDetails: [travelerSchema],
  contactDetails: contactSchema,
  name:String,
  departureDate: Date,
  returnDate: Date,
  roomCounts: Object,
  travelers: Object, 
  totalPrice: Number,
  totalRooms: Number,
  night: Number,
});

const Form = mongoose.model("hotel", hotelSchema);

module.exports = Form;
