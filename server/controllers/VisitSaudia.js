const Visit = require("../model/VisitSaudia");

const visitController = async (req, res) => {
  try {
    const { passengerData, contactDetails, details } = req.body;

    const booking = await Visit.create({
      passengers: passengerData,
      contactDetails: {
        phone: contactDetails.phone,
        email: contactDetails.email,
      },
      price: details.price,
      name: details.name,
      days: details.days,
      selectedDate: details.selectedDate,
      selectedOption: details.selectedOption,
      selectedPassenger: details.selectedPassenger,
      details: details,
      // days
    });

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const getVisit = async (req, res) => {
  try {
    const bookings = await Visit.find();
    res.status(200).json(bookings);
    console.log("Fetched Visits:", bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching bookings." });
  }
};
 
const deleteVisit = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await Visit.findByIdAndDelete(id);
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

module.exports = {
  visitController,deleteVisit,getVisit
};
