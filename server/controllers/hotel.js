const Form = require("../model/hotel");

const createHotelBooking = async (req, res) => {
  const {
    travelerDetails,
    contactDetails,
    departureDate,
    returnDate,
    roomCounts,
    travelers,
    totalPrice,
    totalRooms,
    name,
    night
  } = req.body;

  try {
    let cleanedTotalPrice;

    if (typeof totalPrice === "string") {
      cleanedTotalPrice = parseFloat(totalPrice.replace(/,/g, ""));
    } else if (typeof totalPrice === "number") {
      cleanedTotalPrice = totalPrice;
    } else {
      return res.status(400).json({ message: "Invalid totalPrice value" });
    }

    if (isNaN(cleanedTotalPrice)) {
      return res.status(400).json({ message: "Invalid totalPrice" });
    }

    const formData = new Form({
      travelerDetails,
      contactDetails,
      departureDate,
      returnDate,
      roomCounts,
      travelers,
      totalPrice: cleanedTotalPrice,
      totalRooms,
      name,
      night
    });
    await formData.save();
    res
      .status(201)
      .json({ message: "Form submitted successfully", data: formData });
  } catch (error) {
    console.error("Error saving form:", error);
    res.status(500).json({ message: "Error saving form", error });
  }
};

const getHotel = async (req, res) => {
  try {
    const bookings = await Form.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching bookings." });
  }
};

const deleteHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await Form.findByIdAndDelete(id);
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

module.exports = { createHotelBooking, deleteHotel, getHotel };
