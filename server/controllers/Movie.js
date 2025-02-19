const Movie = require("../model/Movie");
const User = require("../model/User");

exports.createMovieBooking = async (req, res) => {
  try {
    const { movieName, price, customers } = req.body;

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

    const requiredFields = [movieName, price, customers];
    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const movieBooking = new Movie({
      movieName,
      price,
      customers,
    });

    await movieBooking.save();

    return res
      .status(201)
      .json({ message: "Movie booking successful", movieBooking });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
