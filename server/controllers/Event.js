const Event = require("../model/Event");

exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      fullName,
      cnic,
      saveDetails,
      nickName,
      phoneNumber,
      emailAddress,
      city,
      totalCount,
      name,
      eventDate
    } = req.body;

    const requiredFields = [
      title,
      fullName,
      cnic,
      phoneNumber,
      emailAddress,
      city,
    ];
    if (requiredFields.some((field) => field === undefined || field === null)) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newEvent = new Event({
      title,
      fullName,
      cnic,
      saveDetails: saveDetails || false,
      nickName,
      phoneNumber,
      emailAddress,
      city,
      totalCount,
      name,
      eventDate
    });

    await newEvent.save();

    return res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const bookings = await Event.find();
    res.status(200).json(bookings);
    console.log("Fetched Events:", bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching bookings." });
  }
};

exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await Event.findByIdAndDelete(id);
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
