const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.registerUser = catchAsyncErrors(async (req, res) => {
  try {
    const { name, email, password, number } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    user = await User.create({
      name,
      email,
      number,
      password,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

exports.loginUser = catchAsyncErrors(async (req, res) => {
  try {
    const { number, password } = req.body;

    if (!number || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide number and password",
      });
    }

    const user = await User.findOne({ number }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid number or password" });
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid number or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "PRODUCTION",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    user.token = token;
    await user.save();

    res.status(200).json({
      success: true,
      //   token: `Bearer ${token}`,
      role: user.role,
      id: user._id,
      user,
      message: "Login Successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .send({ message: "Please provide an email address." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found. Please register first." });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const receiver = {
      from: process.env.MY_GMAIL,
      to: email,
      subject: "Password Reset Request",
      text: `Click the link below to reset your password:\n${process.env.CLIENT_URL}/${token}`,
    };

    await transporter.sendMail(receiver);

    return res.status(200).send({
      message: "Password reset link sent successfully to your email address.",
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res
      .status(500)
      .send({ message: "Failed to send the password reset email." });
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res
        .status(400)
        .send({ message: "Please provide a new password." });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return res.status(400).send({ message: "Invalid or expired token." });
    }

    const user = await User.findOne({ email: decoded.email }).select(
      "+password"
    );
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    // Update password - this will trigger the pre-save middleware
    user.password = password;
    await user.save();

    return res.status(200).send({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res
      .status(500)
      .send({ message: "An error occurred while resetting the password." });
  }
});

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getUserDetails = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUser = catchAsyncErrors(async (req, res) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

exports.deleteUser = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

exports.logoutUser = catchAsyncErrors((req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});
