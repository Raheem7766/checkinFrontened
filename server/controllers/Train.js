const Train = require("../model/Train");
const User = require("../model/User");

exports.trainController = async (req, res) => {
  try {
    const {
      trainName,
      trainNumber,
      price,
      availableSeats,
      title,
      fullName,
      cnic,
      saveDetails,
      country,
      phoneNumber,
      emailAddress,
      departureDate,
      arrivalDate,
      seatNumber,
      from,
      to,
      status,
    } = req.body;

    const userId = req.user._id;

    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized", message: "User not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const availableSeat = availableSeats.find(
      (seat) => seat.seatNumber === seatNumber
    );
    if (!availableSeat || availableSeat.status !== "available") {
      return res.status(400).json({ error: "Seat not available" });
    }

    availableSeat.status = "booked";

    const train = new Train({
      trainName,
      trainNumber,
      price,
      availableSeats,
      passengers: [
        {
          title,
          fullName,
          cnic,
          saveDetails,
          country,
          phoneNumber,
          emailAddress,
          departureDate,
          arrivalDate,
          seatNumber,
          from,
          to,
          status: "booked",
        },
      ],
    });

    try {
      await train.save();
      await user.save();

      return res
        .status(201)
        .json({ message: "Train Booking successful", train });
    } catch (error) {
      return res.status(409).json({ message: error.message });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
