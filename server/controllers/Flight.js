const FlightData = require("../model/flight");

const submitForm = async (req, res) => {
  try {
    const flightDetails = req.body;

    const flightData = new FlightData(flightDetails);
    await flightData.save();

    res
      .status(200)
      .json({ message: "Flight and passenger details saved successfully!" });
  } catch (err) {
    console.error("Error saving flight data:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getFlight = async (req, res) => {
  try {
    const bookings = await FlightData.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching bookings." });
  }
};

const deleteFlight = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await FlightData.findByIdAndDelete(id);
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

module.exports = { submitForm, getFlight, deleteFlight };
