import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import BusContent from "./components/Contents/BusContent/BusContent";
import BusPayment from "./components/Contents/BusContent/BusPayment";
import FlightsContent from "./components/Contents/FlightContent/FlightsContent";
import VisitContent from "./components/Contents/VisitContent/VisitContent";
import TrainsContent from "./components/Contents/TrainsContent";
import CarContent from "./components/Contents/CarContent";
import HotelsContent from "./components/Contents/HotelContent/HotelsContent";
import HotelCheckout from "./components/Contents/HotelContent/HotelCheckout";
import MoviesContent from "./components/Contents/MoviesContent";
import SearchData from "./components/Home/SearchData";
import SignUp from "./components/auth/signUp";
import Login from "./components/auth/Login";
import SeatMap from "./components/Home/SeatMap";
import Confirmbooking from "./components/Home/Confirmbooking";
import FlightSearchData from "./components/Contents/FlightContent/FlightSearchData";
import Help from "./components/Main/Help";
import FlightDetail from "./components/Contents/FlightContent/FlightDetail";
import FlightReview from "./components/Contents/FlightContent/FlightReview";
import Payment from "./components/Contents/FlightContent/Payment";
import EventsContent from "./components/Contents/EventContent/EventsContent";
import SafarCheckout from "./components/Contents/EventContent/SafarCheckout";
import SafarReview from "./components/Contents/EventContent/SafarReview";
import SafarPayment from "./components/Contents/EventContent/SafarPayment";
import SafariCheckout from "./components/Contents/EventContent/SafariCheckout";
import SafariReview from "./components/Contents/EventContent/SafariReview";
import SafariPayment from "./components/Contents/EventContent/SafariPayment";
import BayanCheckout from "./components/Contents/EventContent/BayanCheckout";
import BayanReview from "./components/Contents/EventContent/BayanReview";
import BayanPayment from "./components/Contents/EventContent/BayanPayment";
import LahoreCheckout from "./components/Contents/EventContent/LahoreCheckout";
import LahoreReview from "./components/Contents/EventContent/LahoreReview";
import LahorePayment from "./components/Contents/EventContent/LahorePayment";
import ScubaCheckout from "./components/Contents/EventContent/ScubaCheckout";
import ScubaReview from "./components/Contents/EventContent/ScubaReview";
import ScubaPayment from "./components/Contents/EventContent/ScubaPayment";
import ParaCheckout from "./components/Contents/EventContent/ParaCheckout";
import ParaReview from "./components/Contents/EventContent/ParaReview";
import ParaPayment from "./components/Contents/EventContent/ParaPayment";
import BazaarCheckout from "./components/Contents/EventContent/BazaarCheckout";
import BazaarReview from "./components/Contents/EventContent/BazaarReview";
import BazaarPayment from "./components/Contents/EventContent/BazaarPayment";
import ToursContent from "./components/Contents/TourContent/ToursContent";
import SwatCheckout from "./components/Contents/TourContent/SwatCheckout";
import SwatReview from "./components/Contents/TourContent/SwatReview";
import SwatPayment from "./components/Contents/TourContent/SwatPayment";
import NaranCheckout from "./components/Contents/TourContent/NaranCheckout";
import NaranReview from "./components/Contents/TourContent/NaranReview";
import NaranPayment from "./components/Contents/TourContent/NaranPayment";
import SkarduCheckout from "./components/Contents/TourContent/SkarduCheckout";
import SkarduReview from "./components/Contents/TourContent/SkarduReview";
import SkarduPayment from "./components/Contents/TourContent/SkarduPayment";
import DubaiCheckout from "./components/Contents/TourContent/DubaiCheckout";
import DubaiReview from "./components/Contents/TourContent/DubaiReview";
import DubaiPayment from "./components/Contents/TourContent/DubaiPayment";
import DesertCheckout from "./components/Contents/TourContent/DesertCheckout";
import DesertReview from "./components/Contents/TourContent/DesertReview";
import DesertPayment from "./components/Contents/TourContent/DesertPayment";
import Forget from "./components/auth/Forget";
import ResetPassword from "./components/auth/ResetPassword";
import HotelSearchData from "./components/Contents/HotelContent/HotelSearchData";
import HotelReview from "./components/Contents/HotelContent/HotelReview";
import HotelPayment from "./components/Contents/HotelContent/HotelPayment";
import UmrahSelect from "./components/Contents/VisitContent/Umrah/UmrahSelect";
import Itinerary from "./components/Contents/VisitContent/Umrah/Itinerary";
import Detail from "./components/Contents/VisitContent/Umrah/Detail";
import Review from "./components/Contents/VisitContent/Umrah/Review";
import UmrahPayment from "./components/Contents/VisitContent/Umrah/UmrahPayment";
import SaudiaVariant from "./components/Contents/VisitContent/Saudia/SaudiaVariant";
import SaudiaItinerary from "./components/Contents/VisitContent/Saudia/SaudiaItinerary";
import SaudiaDetail from "./components/Contents/VisitContent/Saudia/SaudiaDetail";
import SaudiaReview from "./components/Contents/VisitContent/Saudia/SaudiaReview";
import SaudiaPayment from "./components/Contents/VisitContent/Saudia/SaudiaPayment";
import MajVariant from "./components/Contents/VisitContent/Maj/MajVariant";
import MajItinerary from "./components/Contents/VisitContent/Maj/MajItinerary";
import MajDetail from "./components/Contents/VisitContent/Maj/MajDetail";
import MajReview from "./components/Contents/VisitContent/Maj/MajReview";
import MajPayment from "./components/Contents/VisitContent/Maj/MajPayment";
import LuxVariant from "./components/Contents/VisitContent/Lux/LuxVariant";
import LuxItinerary from "./components/Contents/VisitContent/Lux/LuxItinerary";
import LuxDetail from "./components/Contents/VisitContent/Lux/LuxDetail";
import LuxReview from "./components/Contents/VisitContent/Lux/LuxReview";
import LuxPayment from "./components/Contents/VisitContent/Lux/LuxPayment";
import ArabVariant from "./components/Contents/VisitContent/Arab/ArabVariant";
import ArabItinerary from "./components/Contents/VisitContent/Arab/ArabItinerary";
import ArabDetail from "./components/Contents/VisitContent/Arab/ArabDetail";
import ArabReview from "./components/Contents/VisitContent/Arab/ArabReview";
import ArabPayment from "./components/Contents/VisitContent/Arab/ArabPayment";
import Booking from "./components/Main/Booking";
import Care from "./components/Main/Care";
import SuccessPage from "./components/Home/Success";
import CancelSuccess from "./components/Home/Cancel";
import AdminDashboard from "./components/Admin/AdminDashboard";
import { PrivateAdminRoute } from "./components/utils/PrivateRoute";
import Profile from "./components/Main/Profile";
import FlightSuccess from "./components/Contents/FlightContent/FlightSuccess";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="user/forgot-password" element={<Forget />} />
        <Route path="/user/reset-password/:token" element={<ResetPassword />} />
        <Route 
          path="/admin/dashboard"
          element={
            <PrivateAdminRoute>
              <AdminDashboard />
            </PrivateAdminRoute>
          }
        />
        <Route path="/search" element={<SearchData />} />
        <Route path="seatmap" element={<SeatMap />} />
        <Route path="bus/confirm-booking" element={<Confirmbooking />} />
        <Route path="bus" element={<BusContent />} />
        <Route path="busPayment" element={<BusPayment />} />
        <Route path="flights" element={<FlightsContent />} />
        <Route path="FlightSearchData" element={<FlightSearchData />} />
        <Route path="/flights/v2/passenger-detail" element={<FlightDetail />} />
        <Route path="/flightsreview" element={<FlightReview />} />
        <Route path="payment" element={<Payment />} />
        <Route path="FlightSuccess" element={<FlightSuccess />} />
        <Route path="visit-saudi" element={<VisitContent />} />
        <Route path="select-variant" element={<UmrahSelect />} />
        <Route path="Itinerary" element={<Itinerary />} />
        <Route path="Detail" element={<Detail />} />
        <Route path="Review" element={<Review />} />
        <Route path="UmrahPayment" element={<UmrahPayment />} />
        <Route path="SaudiaVariant" element={<SaudiaVariant />} />
        <Route path="SaudiaItinerary" element={<SaudiaItinerary />} />
        <Route path="SaudiaDetail" element={<SaudiaDetail />} />
        <Route path="SaudiaReview" element={<SaudiaReview />} />
        <Route path="SaudiaPayment" element={<SaudiaPayment />} />
        <Route path="MajVariant" element={<MajVariant />} />
        <Route path="MajItinerary" element={<MajItinerary />} />
        <Route path="MajDetail" element={<MajDetail />} />
        <Route path="MajReview" element={<MajReview />} />
        <Route path="MajPayment" element={<MajPayment />} />
        <Route path="LuxVariant" element={<LuxVariant />} />
        <Route path="LuxItinerary" element={<LuxItinerary />} />
        <Route path="LuxDetail" element={<LuxDetail />} />
        <Route path="LuxReview" element={<LuxReview />} />
        <Route path="ArabVariant" element={<ArabVariant />} />
        <Route path="ArabItinerary" element={<ArabItinerary />} />
        <Route path="ArabDetail" element={<ArabDetail />} />
        <Route path="ArabReview" element={<ArabReview />} />
        <Route path="ArabPayment" element={<ArabPayment />} />
        <Route path="LuxPayment" element={<LuxPayment />} />
        <Route path="events" element={<EventsContent />} />
        <Route path="safarCheckout" element={<SafarCheckout />} />
        <Route path="safarReview" element={<SafarReview />} />
        <Route path="safarPayment" element={<SafarPayment />} />
        <Route path="safariCheckout" element={<SafariCheckout />} />
        <Route path="safariReview" element={<SafariReview />} />
        <Route path="safariPayment" element={<SafariPayment />} />
        <Route path="BayanCheckout" element={<BayanCheckout />} />
        <Route path="BayanReview" element={<BayanReview />} />
        <Route path="BayanPayment" element={<BayanPayment />} />
        <Route path="LahoreCheckout" element={<LahoreCheckout />} />
        <Route path="LahoreReview" element={<LahoreReview />} />
        <Route path="LahorePayment" element={<LahorePayment />} />
        <Route path="ScubaCheckout" element={<ScubaCheckout />} />
        <Route path="ScubaReview" element={<ScubaReview />} />
        <Route path="ScubaPayment" element={<ScubaPayment />} />
        <Route path="ParaCheckout" element={<ParaCheckout />} />
        <Route path="ParaReview" element={<ParaReview />} />
        <Route path="ParaPayment" element={<ParaPayment />} />
        <Route path="BazaarCheckout" element={<BazaarCheckout />} />
        <Route path="BazaarReview" element={<BazaarReview />} />
        <Route path="BazaarPayment" element={<BazaarPayment />} />
        <Route path="trains" element={<TrainsContent />} />
        <Route path="car-rental" element={<CarContent />} />
        <Route path="hotels" element={<HotelsContent />} />
        <Route path="hotelSearchData" element={<HotelSearchData />} />
        <Route path="HotelCheckout" element={<HotelCheckout />} />
        <Route path="HotelReview" element={<HotelReview />} />
        <Route path="HotelPayment" element={<HotelPayment />} />
        <Route path="tours" element={<ToursContent />} />
        <Route path="swat" element={<SwatCheckout />} />
        <Route path="swatReview" element={<SwatReview />} />
        <Route path="swatPayment" element={<SwatPayment />} />
        <Route path="naranCheckout" element={<NaranCheckout />} />
        <Route path="naranReview" element={<NaranReview />} />
        <Route path="naranPayment" element={<NaranPayment />} />
        <Route path="skarduCheckout" element={<SkarduCheckout />} />
        <Route path="skarduReview" element={<SkarduReview />} />
        <Route path="skarduPayment" element={<SkarduPayment />} />
        <Route path="DubaiCheckout" element={<DubaiCheckout />} />
        <Route path="DubaiReview" element={<DubaiReview />} />
        <Route path="DubaiPayment" element={<DubaiPayment />} />
        <Route path="DesertCheckout" element={<DesertCheckout />} />
        <Route path="DesertReview" element={<DesertReview />} />
        <Route path="DesertPayment" element={<DesertPayment />} />
        <Route path="movies" element={<MoviesContent />} />
        <Route path="help" element={<Help />} />
        <Route path="Booking" element={<Booking />} />
        <Route path="Care" element={<Care />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="success" element={<SuccessPage />} />
        <Route path="cancel" element={<CancelSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}
