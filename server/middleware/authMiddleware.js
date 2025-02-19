const jwt = require("jsonwebtoken");
const User = require("../model/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  console.log("Cookies:", req.cookies);
  if (!req.cookies || !req.cookies.token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const { token } = req.cookies;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  next();
});

exports.authorizeRoles = (...roles) => { 
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
