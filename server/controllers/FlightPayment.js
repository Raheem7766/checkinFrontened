const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

dotenv.config();

exports.FlightcreateCheckoutSession = async (req, res) => {
  try {
    const { price, airlineName } = req.body;
    if (!price || typeof price !== "number") {
      return res.status(400).json({ error: "Invalid price format" });
    }
    if (!airlineName) {
      return res.status(400).json({ error: "Airline name is required" });
    }

    const priceInCents = Math.round(price * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: airlineName,
              description: `Flight with ${airlineName}`,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/FlightSuccess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:3000/cancel",
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Stripe session creation error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

exports.FlightverifyCheckoutSession = async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) {
      return res
        .status(400)
        .json({ success: false, message: "Session ID is required." });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const userEmail = session.customer_details.email;
      const bookingId = "BOK-2024-8756";

      await sendBookingConfirmationEmail(userEmail, bookingId);

      res.status(200).json({
        success: true,
        message: "Payment successful! Email sent.",
        bookingId,
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

const sendBookingConfirmationEmail = async (userEmail, bookingId) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MY_GMAIL,
      to: userEmail,
      subject: "Flight Booking Confirmation",
      html: `
        <h2>Booking Confirmed!</h2>
        <p>Thank you for booking your flight with us.</p>
        <p>Your Booking ID: <strong>${bookingId}</strong></p>
        <p>Safe travels!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${userEmail}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
