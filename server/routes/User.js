const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/User");
const { searchController } = require("../controllers/Search");
const {
  bookingController,
  getBookings,
  deleteBooking,
} = require("../controllers/Bus");
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middleware/authMiddleware");
// const { submitForm } = require("../controllers/Flight")
const { visitController, getVisit, deleteVisit } = require("../controllers/VisitSaudia");
const { createEvent, getEvent, deleteEvent } = require("../controllers/Event");
const { trainController } = require("../controllers/Train");
const { carBookingController } = require("../controllers/Car");
const {
  createHotelBooking,
  getHotel,
  deleteHotel,
} = require("../controllers/hotel");
const { createTourBooking, getTour, deleteTour } = require("../controllers/Tour");
const { createMovieBooking } = require("../controllers/Movie");
const { getbill } = require("../controllers/Email");
const {
  submitForm,
  getFlight,
  deleteFlight,
} = require("../controllers/Flight");
const { createCheckoutSession } = require("../controllers/Payment");
const { FlightcreateCheckoutSession, FlightverifyCheckoutSession } = require("../controllers/FlightPayment");
const { HotelcreateCheckoutSession } = require("../controllers/HotelPayment");
const {
  visitcreateCheckoutSession,
  visitverifyCheckoutSession,
} = require("../controllers/VisitPayment");
const { EventcreateCheckoutSession } = require("../controllers/EventPayment");
const { tourcreateCheckoutSession } = require("../controllers/TourPayment");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/logout").post(logoutUser);

router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUsers);

router.get(
  "/admin/user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  getUserDetails
);

router.put(
  "/admin/user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUser
);

router.delete(
  "/admin/user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

router.route("/search").post(searchController);
router.post("/book", bookingController);
router.get("/bookings", getBookings);
router.delete("/bookings/:id", deleteBooking);
router.post("/flight", submitForm);
router.get("/flights", getFlight);
router.delete("/flights/:id", deleteFlight);
router.post("/visit", visitController);
router.get("/visits", getVisit);
router.delete("/visits/:id", deleteVisit);
router.post("/event", createEvent);
router.get("/events", getEvent);
router.delete("/events/:id", deleteEvent);
router.post("/train", isAuthenticated, trainController);
router.post("/car", isAuthenticated, carBookingController);
router.post("/hotel", createHotelBooking);
router.get("/hotels", getHotel);
router.delete("/hotels/:id", deleteHotel);
router.get("/hotels", getHotel);
router.delete("/hotels/:id", deleteHotel);
router.post("/tour", createTourBooking);
router.get("/tours", getTour); 
router.delete("/tours/:id", deleteTour);
router.post("/movie", isAuthenticated, createMovieBooking);
router.post("/send-message", getbill);

router.post("/create-checkout-session", createCheckoutSession);
router.post("/flight-create-checkout-session", FlightcreateCheckoutSession);
router.get("/flight-verify-checkout-session", FlightverifyCheckoutSession);
router.post("/hotel-create-checkout-session", HotelcreateCheckoutSession);
router.post("/visit-create-checkout-session", visitcreateCheckoutSession);
router.post("/event-create-checkout-session", EventcreateCheckoutSession);
router.post("/tour-create-checkout-session", tourcreateCheckoutSession);
router.get("/visit-verify-checkout-session", visitverifyCheckoutSession);

module.exports = router;
