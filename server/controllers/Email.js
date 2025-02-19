const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const EMAIL = "raheemasthetic1@gmail.com";
const PASSWORD = "raheem@@@786";

const getbill = (req, res) => {
  const { userEmail } = req.body;

  const config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: "https://mailgen.js/",
    },
  });

  const response = {
    body: {
      name: "Daily Tuition",
      intro: "Your bill has arrived!",
      table: {
        data: [
          {
            item: "Nodemailer Stack Book",
            description: "A Backend application",
            price: "$10.99",
          },
        ],
      },
      outro: "Looking forward to doing more business",
    },
  };

  const mail = MailGenerator.generate(response);

  const message = {
    from: EMAIL,
    to: userEmail,
    subject: "Place Order",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      res.status(201).json({ msg: "You should receive an email" });
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).json({ error: error.message });
    });
};

module.exports = {
  getbill,
};
