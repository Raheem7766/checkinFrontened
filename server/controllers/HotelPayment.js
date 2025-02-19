const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

dotenv.config();

exports.HotelcreateCheckoutSession = async (req, res) => {
  try {
    const { price, name } = req.body;
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

    const priceInCents = Math.round(price * 100);
    console.log("Price in cents:", priceInCents);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name,
              description: `Hotel booking with ${name}`,
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

    console.log("Created session:", session.id);
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Stripe session creation error:", error);
    res.status(500).json({
      error: "Failed to create checkout session",
      message: error.message,
    });
  }
};

exports.HotelverifyCheckoutSession = async (req, res) => {
  try {
    const { session_id } = req.query;

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      res.status(200).json({
        success: true,
        message: "Payment successful!",
        bookingId: "BOK-2024-8756",
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
