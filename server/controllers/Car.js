const Car = require('../model/Car');
const User = require('../model/User');

exports.carBookingController = async (req, res) => {
    try {
        const {
            carName,
            carNumber,
            price,
            passengers,
        } = req.body;

        const userId = req.user._id;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized', message: 'User not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const requiredFields = [carName, carNumber, price, passengers];
        if (requiredFields.some(field => !field)) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (!Array.isArray(passengers) || passengers.length === 0) {
            return res.status(400).json({ message: 'At least one passenger is required.' });
        }

        const carBooking = new Car({
            carName,
            carNumber,
            price,
            passengers,
        });

        await carBooking.save();

        return res.status(201).json({ message: 'Car Booking successful', carBooking });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
