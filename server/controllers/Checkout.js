// const express = require("express");
// const router = express.Router();
// const stripe = require("stripe")(
//   "sk_test_51Pk5z9Rwi0eCgPobAK5Vlxrt5IFKnbAXxFgmqdSIUWjGbof12YvgqfQBohdBvXQ8bt7nwCEzdO9utGFEkaPrfOqM00MABvkCGZ"
// );
// const Flight = require("../model/flight");
// const User = require("../model/User");

// router.post("/checkout", async (req, res) => {
//   try {
//     const { flightId } = req.body; 

//     if (!flightId) {
//       return res.status(400).json({ error: "Flight ID is required." });
//     }

//     const flight = await Flight.findById(flightId);
//     if (!flight) {
//       return res.status(404).json({ error: "Flight not found." });
//     }

//     // Create line item for the flight
//     const lineItem = {
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: flight.flightName,
//           description: `Flight Number: ${flight.flightNumber}, From: ${flight.passengers[0].from} To: ${flight.passengers[0].to}`,
//         },
//         unit_amount: flight.price * 100, // Price in cents
//       },
//       quantity: 1, // Assuming 1 ticket per checkout
//     };

//     // Create Stripe Checkout Session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [lineItem],
//       mode: "payment",
//       success_url: "http://localhost:3000/success",
//       cancel_url: "http://localhost:3000/cancel",
//     });

//     // Update the flight's status to "Payment Pending" while awaiting payment confirmation
//     flight.passengers[0].status = "Payment Pending";
//     await flight.save();

//     res.json({ id: session.id });
//   } catch (error) {
//     console.error("Error creating Stripe checkout session:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// module.exports = router;
