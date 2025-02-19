const Bus = require("../model/Bus");

const bookingController = async (req, res) => {
  const {
    title,
    fullName,
    cnicOrPassport,
    saveDetails,
    nickName,
    phoneNumber,
    email,
    busName,
    busType,
    selectedFrom,
    selectedTo,
    departureTime,
    departureDate,
    totalPrice,
    selectedSeats,
    droptime,
    drop,
    pick,
    fromAbbreviation,
    toAbbreviation,
  } = req.body;

  try {
    const newBooking = new Bus({
      title,
      fullName,
      cnicOrPassport,
      saveDetails,
      nickName,
      phoneNumber,
      email,
      busName,
      busType,
      selectedFrom,
      selectedTo,
      departureTime,
      departureDate,
      totalPrice,
      selectedSeats,
      droptime,
      drop,
      pick,
      fromAbbreviation,
      toAbbreviation,
    });

    await newBooking.save();
    res.status(200).json({ message: "Booking details saved successfully" });
  } catch (error) {
    console.error("Error saving booking:", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving booking details." });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Bus.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching bookings." });
  }
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await Bus.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting booking." });
  }
};

module.exports = { bookingController, getBookings, deleteBooking };
