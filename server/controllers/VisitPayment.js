const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const nodemailer = require("nodemailer");
const PKR_TO_USD_RATE = 287;
const Visit = require("../model/VisitSaudia");

const EMAIL = "raheemasthetic1@gmail.com";
const PASSWORD = "koropldr";
dotenv.config();

exports.visitcreateCheckoutSession = async (req, res) => {
  try {
    const { price, name, contactDetails, details } = req.body;
    console.log("Backend received request body:", req.body);

    if (!price || typeof price !== "number") {
      console.error("Invalid price received:", price);
      return res.status(400).json({
        error: "Invalid price format",
        received: price,
        type: typeof price,
      });
    }

    if (!name) {
      return res.status(400).json({ error: " name is required" });
    }

    if (!contactDetails || !contactDetails.email) {
      return res.status(400).json({ error: "Contact email is required" });
    }

    if (!details || !details.selectedDate) {
      return res
        .status(400)
        .json({ error: "selectedDate is required in details" });
    }

    const priceInUSD = price / PKR_TO_USD_RATE;
    const priceInCents = Math.round(priceInUSD * 100);
    console.log("Converted price in USD (cents):", priceInCents);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name,
              description: `Visit booking with ${name} on ${details.selectedDate}`,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:3000/cancel",
    });
 
    const booking = await Visit.create({
      passengers: req.body.passengerData,
      contactDetails: {
        phone: contactDetails.phone,
        email: contactDetails.email,
      },
      price,
      name,
      selectedDate: details.selectedDate,
      selectedOption: details.selectedOption,
      selectedPassenger: details.selectedPassenger,
      details: details,
    });

    res.status(200).json({ id: session.id, bookingId: booking._id });
  } catch (error) {
    console.error("Stripe session creation error:", error);
    res.status(500).json({
      error: "Failed to create checkout session",
      message: error.message,
    });
  }
};

exports.visitverifyCheckoutSession = async (req, res) => { 
  try {
    const { contactDetails } = req.body;
    const { session_id } = req.query;

    const session = await stripe.checkout.sessions.retrieve(session_id);
 
    if (session.payment_status === "paid") {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
      });

      const booking = await Visit.create({
        contactDetails: {
          email: contactDetails.email,
        },
      });

      const mailOptions = {
        from: EMAIL,
        to: booking.contactDetails.email,
        subject: "Booking Confirmation",
        text: `Dear Customer,\n\nThank you for your booking. Your payment of ${(
          session.amount_total / 100
        ).toFixed(
          2
        )} USD has been successfully received.\n\nBooking ID: BOK-2024-8756\n\nBest regards,\nYour Company`,
      };

      await transporter.sendMail(mailOptions);
      console.log("Confirmation email sent to:", booking.contactDetails.email);

      res.status(200).json({
        success: true,
        message: "Payment successful and confirmation email sent!",
        bookingId: booking._id,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Payment not completed." });
    }
  } catch (error) {
    console.error("Error verifying checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
