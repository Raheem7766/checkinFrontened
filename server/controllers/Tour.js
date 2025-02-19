const Tour = require("../model/Tour");

exports.createTourBooking = async (req, res) => {
  const {
    tourName,
    price,
    passengers,
    contactDetails,
    departureDate,
    arrivalDate,
    city,
    person,
  } = req.body;
  
  console.log('Received tour booking data:', JSON.stringify(req.body, null, 2));

  try {
    if (!Array.isArray(passengers)) {
      return res.status(400).json({ message: "Passengers must be an array" });
    }

    if (!contactDetails || 
        !contactDetails.title || 
        !contactDetails.fullName || 
        !contactDetails.email || 
        !contactDetails.cnic || 
        !contactDetails.contactNumber
    ) {
      return res.status(400).json({ message: "Missing required contact details" });
    }

    const newTour = new Tour({
      tourName,
      price,
      passengers,  
      contactDetails,
      departureDate,
      arrivalDate,
      city,
      person,
    });

    await newTour.save();

    res.status(201).json({
      message: "Tour created successfully",
      tourId: newTour._id,
    });

  } catch (err) {
    console.error('Validation error:', err);
    res.status(400).json({
      message: "Failed to create tour",
      error: err.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const bookings = await Tour.find();
    res.status(200).json(bookings);
    console.log("Fetched Events:", bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching bookings." });
  } 
};

exports.deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await Tour.findByIdAndDelete(id);
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
