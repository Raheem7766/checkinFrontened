const Search = require("../model/Search");
const City = require("../model/citySchema");
const cityProvinceMap = require("../data/city");

exports.searchController = async (req, res) => {
  try {
    const { oneWay, roundTrip, from, to, departureDate, arrivalDate } =
      req.body;

    if (!oneWay && !roundTrip) {
      return res
        .status(400)
        .json({ error: "Please select either one-way or round trip" });
    }

    const saveCityIfNotExists = async (cityName) => {
      const province = cityProvinceMap[cityName];
      if (!province) {
        throw new Error(`Province not found for city: ${cityName}`);
      }

      let city = await City.findOne({ name: cityName });
      if (!city) {
        city = new City({ name: cityName, province });
        await city.save();
      }
    };

    if (from) await saveCityIfNotExists(from);
    if (to) await saveCityIfNotExists(to);

    const newTrip = new Search({
      oneWay,
      roundTrip,
      from,
      to,
      departureDate: new Date(departureDate),
      arrivalDate: arrivalDate ? new Date(arrivalDate) : null,
    });

    await newTrip.save();

    res.status(201).json({ message: "Trip saved successfully", trip: newTrip });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
