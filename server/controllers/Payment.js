const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

dotenv.config();

exports.createCheckoutSession = async (req, res) => {
  try {
    const { price, busName } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: busName,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:3000/cancel",
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.verifyCheckoutSession = async (req, res) => {
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
