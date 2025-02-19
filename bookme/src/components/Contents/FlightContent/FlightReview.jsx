import { ChevronDown, ChevronDownIcon, ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import { IoMdAirplane } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Home/Footer";
import { BiSolidPlaneAlt } from "react-icons/bi";
import loader from "../../../images/giff.gif";
import Navbar from "../../Home/Navbar";

export default function FlightReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const [model, setmodel] = useState(false);
  const [ismodel, setismodel] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { flight, flightDetails, toCity, fromCity, airlineName } =
    location.state || {};

  const toggleModel = () => {
    setmodel(!model);
  };
  const toggleModels = () => {
    setismodel(!ismodel);
  };

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlePayClick = () => {
    if (!isChecked) {
      setIsDialogVisible(true);

      setTimeout(() => {
        setIsDialogVisible(false);
      }, 500);
    } else {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        navigate("/payment", {
          state: {
            fromCity: fromCity,
            toCity: toCity,
            price: flightDetails?.price,
            airlineName: airlineName,
            flightDetails,
          },
        });
      }, 4000);
      console.log("Proceeding with payment...");
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      navigate("/");
      return;
    }
  }, [navigate]);

  const handleCloseDialog = () => {
    setIsDialogVisible(false);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src={loader} alt="" />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="w-full h-auto pb-5 fp flex flex-col lg:flex-row justify-between px-4 lg:px-[56px]">
            <div className="w-full lg:w-[66.5%] h-full pt-4 lg:pt-[14px] lg:pl-[10px]">
              <div className="w-full h-auto min-h-[50px] bg-[#121619] rounded-lg flex items-center gap-2 p-4 lg:px-[14px]">
                <GoAlertFill
                  size={15}
                  className="flex-shrink-0 text-[#F5F5F5]"
                />
                <p className="text-sm lg:text-[14px] font-medium text-[#F5F5F5] tracking-[0.3px]">
                  Please remember that it is your responsibility to have in your
                  possession all the necessary travel documents.
                </p>
              </div>

              <div className="lg:px-[22px] pt-8">
                <h2 className="text-[14px] font-bold text-[#212529]">
                  Review your booking
                </h2>

                <div className="flex justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm lg:text-[14px] font-bold text-[#667085] mt-5">
                      {fromCity} - {toCity}
                    </h3>
                    <p className="text-xs lg:text-[13px] font-normal text-[#667085]">
                      Non-Stop - Duration: {flightDetails?.duration}
                    </p>
                  </div>
                  <ChevronDown
                    className="mt-5 text-[#667085] cursor-pointer"
                    onClick={toggleModel}
                  />
                </div>

                <div
                  style={{
                    height: model ? "0" : "auto",
                    overflow: "hidden",
                    transition: "height 0.3s ease",
                  }}
                  className="flex flex-col lg:flex-row items-start mt-7"
                >
                  <div className="w-full lg:w-auto px-4">
                    <div className="flex lg:block justify-between">
                      <div>
                        <h2 className="text-[14px] font-medium text-[#667085]">
                          {flightDetails.departureTime}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {new Date(
                            flightDetails.departureDate
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <p className="text-[13px] font-normal text-[#667085] lg:mt-8">
                        {flightDetails.duration}
                      </p>
                      <div>
                        <h2 className="text-[14px] font-medium text-[#667085] lg:mt-8">
                          {flightDetails.arrivalTime}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {new Date(
                            flightDetails.departureDate
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:block ml-[5px] mt-1">
                    <div className="h-2 w-2 bg-black rounded-full"></div>
                    <div className="h-[65px] w-[2px] ml-[3px] bg-black"></div>
                    <IoMdAirplane
                      className="rotate-180 ml-[-5px] mt-[2px]"
                      size={18}
                    />
                    <div className="h-[60px] w-[2px] ml-[3px] bg-black"></div>
                    <div className="h-2 w-2 bg-black rounded-full"></div>
                  </div>

                  <div className="w-full lg:w-auto lg:ml-3 mt-4 lg:mt-0">
                    <div className="flex justify-between flex-col sm:flex-col md:flex-row lg:flex-row lg:block">
                      <div>
                        <h2 className="text-[14px] font-medium text-[#667085]">
                          {flightDetails.fromCity}
                        </h2>
                        <p className="text-[13px] font-normal text-[#667085]">
                          {flightDetails.citynameFrom}
                        </p>
                      </div>

                      <div className="flex gap-4 lg:mt-7">
                        <img
                          className="w-10"
                          src={flightDetails.flightImg}
                          alt={flightDetails.airline}
                        />
                        <div>
                          <h2 className="text-[14px] font-medium text-[#667085]">
                            {flightDetails.airline}
                          </h2>
                          <p className="text-[13px] font-normal text-[#667085]">
                            (360) - {flightDetails.travelClass}
                          </p>
                        </div>
                      </div>

                      <div className="lg:mt-[14px]">
                        <h2 className="text-[14px] font-medium text-[#667085]">
                          {flightDetails.toCity}
                        </h2>
                        <p className="text-[13px] font-normal text-[#667085]">
                          {flightDetails.citynameTo}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full pt-8 lg:pt-11">
                  <h2 className="text-[14px] font-bold text-[#212529]">
                    Baggage & Add-ons{" "}
                    <span className="text-[13px] font-bold text-[#98A2B3]">
                      (per person)
                    </span>
                  </h2>

                  <h3 className="text-[14px] font-bold text-[#667085] mt-[34px] ml-3">
                    {fromCity} - {toCity}
                  </h3>
                  <p className="text-[13px] font-normal ml-3 text-[#667085]">
                    Duration: {flightDetails.duration}
                  </p>

                  {flight.passengers.map((passenger, index) => (
                    <div key={index} className="w-full ml-0 lg:ml-3">
                      <h2 className="text-[15px] mt-1 font-semibold text-[#212529]">
                        {index + 1}. {passenger.fullName} {passenger.lastName}
                      </h2>
                      <div className="pl-0 lg:pl-[60px] flex flex-col lg:flex-row gap-2">
                        <h3 className="text-[13px] pt-6 font-semibold text-[#212529]">
                          Baggage:
                        </h3>
                        <div className="flex flex-col bag lg:flex-row gap-2">
                          <div className="w-max pr-4 h-[37px] mt-2 lg:mt-[18px] rounded-[20px] bg-[#F5F5F5] flex items-center pl-4">
                            <MdShoppingBag size={14} />
                            <p className="text-[13px] font-medium text-[#131313] ml-1">
                              Carry: 1 piece of Hand Baggage
                            </p>
                          </div>
                          <div className="w-max pr-4 h-[37px] mt-2 lg:mt-[18px] rounded-[20px] bg-[#F5F5F5] flex items-center pl-4">
                            <MdShoppingBag size={14} />
                            <p className="text-[13px] font-medium text-[#131313] ml-1">
                              Checked: 30 KG checked baggage
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="w-full pt-8 lg:pt-[46px]">
                    <h2 className="text-[14px] font-bold text-[#212529]">
                      Contact Details
                    </h2>
                    <div className="w-full h-auto min-h-[47px] bg-[#121619] rounded-[10px] mt-[14px] flex flex-row lg:flex-row items-start lg:items-center p-4 lg:pl-[14px] gap-2">
                      <div className="flex items-center text-[#F5F5F5]">
                        <FaAddressCard />
                        <p className="text-[14px] font-medium text-[#F5F5F5] ml-2">
                          {flight.email || "me@gmail.com,"}
                        </p>
                      </div>
                      <p className="text-[14px] font-medium text-[#F5F5F5] lg:ml-4 tracking-[0.5px]">
                        {flight.phoneNumber || "03240616480"}
                      </p>
                    </div>
                  </div>

                  <p className="text-[14px] font-medium text-[#121619] mt-4 tracking-[0.3px]">
                    <span className="font-semibold">Note:</span> We will send
                    your booking confirmation to{" "}
                    <span className="font-semibold">
                      {flight.email || "me@gmail.com"}
                    </span>
                  </p>

                  <h2 className="text-[14px] font-bold mt-[52px] tracking-[0.4px] text-[#212529]">
                    Passenger Details
                  </h2>
                  {flight.passengers.map((passenger, index) => (
                    <div
                      key={index}
                      className="w-full bg-white mt-[10px] rounded-[8px] p-5 shadow-md"
                      style={{
                        height: ismodel ? "66px" : "auto",
                        overflow: "hidden",
                        transition: "height 0.3s ease",
                      }}
                    >
                      <div className="flex justify-between">
                        <h2 className="text-[15px] mt-1 font-semibold text-[#212529]">
                          {index + 1}. {passenger.fullName} {passenger.lastName}
                          <span className="font-normal">
                            ({passenger.category})
                          </span>
                        </h2>
                        <ChevronDown
                          className="mt-2 cursor-pointer"
                          onClick={toggleModels}
                        />
                      </div>

                      <div
                        className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4"
                        style={{
                          height: ismodel ? "0" : "auto",
                          overflow: "hidden",
                          transition: "height 0.3s ease",
                        }}
                      >
                        <div>
                          <h2 className="text-[14px] font-medium text-[#667085]">
                            Name
                          </h2>
                          <p className="text-[14px] font-medium text-[#212529]">
                            {passenger.fullName} {passenger.lastName}
                          </p>
                        </div>
                        <div>
                          <h2 className="text-[14px] font-medium text-[#667085]">
                            Gender
                          </h2>
                          <p className="text-[14px] font-medium text-[#212529]">
                            {passenger.gender}
                          </p>
                        </div>
                        <div>
                          <h2 className="text-[14px] font-medium text-[#667085]">
                            Date of birth
                          </h2>
                          <p className="text-[14px] font-medium text-[#212529]">
                            {passenger.dob}
                          </p>
                        </div>
                        <div>
                          <h2 className="text-[14px] font-medium text-[#667085]">
                            CNIC / Passport
                          </h2>
                          <p className="text-[14px] font-medium text-[#212529]">
                            {passenger.passport}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  <h2 className="text-[14px] font-bold mt-[64px] tracking-[0.4px] text-[#212529]">
                    Rules and Policy
                  </h2>
                  <div className="mt-[18px] flex items-start lg:items-center gap-2">
                    <input
                      type="checkbox"
                      name="agree"
                      id="agree"
                      className="w-4 h-4 mt-1 lg:mt-0"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <p className="text-[14px] font-medium text-[#667085]">
                      By selecting Complete Booking you agree to the{" "}
                      <span className="text-[#121619] font-medium cursor-pointer">
                        Terms and Conditions
                      </span>
                      , and{" "}
                      <span className="text-[#121619] font-medium cursor-pointer">
                        Privacy Policy
                      </span>
                      .
                    </p>
                  </div>

                  {isDialogVisible && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-lg w-[480px] text-center">
                        <div className="flex justify-between items-center flex-col mb-4">
                          <span className="text-[50px] text-red-500 font-bold rounded-[50%]">
                            X
                          </span>
                          <span className="text-lg font-semibold">
                            Please agree to rules and policy.
                          </span>
                        </div>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={handleCloseDialog}
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="w-full flex flex- lg:flex-row justify-center gap-4 pt-9">
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="h-[42px] w-[60px] lg:w-[44px] rounded-[5px] border-[1px] border-[#FCEB03] flex items-center justify-center cursor-pointer hover:bg-[#FCEB03]"
                    >
                      <ChevronLeft size={18} className="text-[#121619]" />
                    </div>
                    <div
                      onClick={handlePayClick}
                      className="h-[42px] w-full lg:w-[210px] bg-[#FCEB03] rounded-[5px] flex items-center justify-center text-[#121619] text-[14px] hover:bg-[#e9de4a] cursor-pointer"
                    >
                      Pay
                    </div>
                  </div>

                  {isLoading && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <img src="/api/placeholder/100/100" alt="Loading..." />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[32.3%] pb-6 pt-4 lg:pt-[14px] space-y-4">
              <div className="w-full h-auto pb-4 px-4 lg:px-5 bg-white rounded-[10px] border-2 border-[#D2D2D2]">
                <div className="w-full pt-5 flex justify-between">
                  <div className="flex gap-2">
                    <div className="h-6 w-6 rounded-[50%] bg-[#FCEB03] flex items-center justify-center">
                      <BiSolidPlaneAlt color="#121619" />
                    </div>
                    <h3 className="text-[16px] lg:text-[18px] font-bold text-[#212529]">
                      Flight
                    </h3>
                  </div>
                  <p
                    className="text-[14px] font-medium text-[#121619] underline cursor-pointer"
                    onClick={() => setShowDialog(true)}
                  >
                    Details
                  </p>
                </div>

                <div className="w-full border-t-2 border-[#D2D2D2] mt-3">
                  <div className="w-full flex flex-row sm:flex-row justify-between">
                    <div className="flex gap-3">
                      <img
                        src={flightDetails?.flightImg}
                        alt="SVG"
                        className="w-8 lg:w-10 mt-3"
                      />
                      <div>
                        <p className="text-[14px] font-bold text-[#212529] cursor-default mt-3">
                          {flightDetails?.departureTime} -{" "}
                          {flightDetails?.arrivalTime}
                        </p>
                        <p className="text-[14px] font-medium text-[#212529] cursor-default">
                          {flightDetails?.departureCityCode} -{" "}
                          {flightDetails?.arrivalCityCode}
                        </p>
                      </div>
                    </div>
                    <div className="sm:text-right">
                      <h3 className="text-[14px] font-bold tracking-[0.4px] text-[#212529] cursor-default mt-3 uppercase">
                        {flightDetails?.travelClass}
                      </h3>
                      <p className="text-[14px] font-medium text-[#212529] cursor-default sm:ml-5">
                        {flightDetails?.duration}
                      </p>
                    </div>
                  </div>
                </div>

                {flightDetails?.tripOption === "Return" &&
                  flightDetails?.returnDate && (
                    <div className="w-full mt-3">
                      <div className="w-full flex flex-row sm:flex-row justify-between">
                        <div className="flex gap-3">
                          <img
                            src={flightDetails?.flightImg}
                            alt="SVG"
                            className="w-8 lg:w-10 mt-3"
                          />
                          <div>
                            <p className="text-[14px] font-bold text-[#212529] cursor-default mt-3">
                              {flightDetails?.departureTime} -{" "}
                              {flightDetails?.arrivalTime}
                            </p>
                            <p className="text-[14px] font-medium text-[#212529] cursor-default">
                              {flightDetails?.arrivalCityCode} -{" "}
                              {flightDetails?.departureCityCode}
                            </p>
                          </div>
                        </div>
                        <div className="sm:text-right">
                          <h3 className="text-[14px] font-bold tracking-[0.4px] text-[#212529] cursor-default mt-3 uppercase">
                            {flightDetails?.travelClass}
                          </h3>
                          <p className="text-[14px] font-medium text-[#212529] cursor-default sm:ml-5">
                            {flightDetails?.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
              </div>

              {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                  <div className="bg-white rounded-lg p-4 lg:p-6 w-full max-w-[492px] relative max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b pb-4">
                      <h3 className="text-lg lg:text-xl font-bold">
                        Flight Details
                      </h3>
                      <button
                        onClick={() => setShowDialog(false)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        ✖
                      </button>
                    </div>

                    <div className="mt-3 px-4">
                      <h2 className="text-[14px] font-bold text-[#667085]">
                        {fromCity} - {toCity}
                      </h2>
                      <p className="text-[13px] font-normal text-[#667085]">
                        Non-Stop - Duration: {flightDetails?.duration}
                      </p>
                    </div>

                    <div className="flex items-start mt-3">
                      <div className="w-21 px-4">
                        <h2 className="text-[14px] font-medium text-[#667085]">
                          {flightDetails?.departureTime}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {new Date(
                            flightDetails?.departureDate
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-[13px] font-normal text-[#667085] mt-8">
                          {flightDetails?.duration}
                        </p>
                        <h2 className="text-[14px] font-medium text-[#667085] mt-8">
                          {flightDetails?.arrivalTime}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {new Date(
                            flightDetails?.departureDate
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>

                      <div className="ml-[-7px] mt-1 relative">
                        <div className="h-2 w-2 bg-black rounded-full"></div>
                        <div className="h-[65px] w-[2px] ml-[3px] bg-black"></div>
                        <IoMdAirplane
                          className="rotate-180 ml-[-5px] mt-[2px]"
                          size={18}
                        />
                        <div className="h-[60px] w-[2px] ml-[3px] bg-black"></div>
                        <div className="h-2 w-2 bg-black rounded-full"></div>
                      </div>

                      <div className="ml-3 flex-1">
                        <h2 className="text-[14px] font-medium text-[#667085]">
                          {flightDetails?.fromCity}
                        </h2>
                        <p className="text-[13px] font-normal text-[#667085]">
                          {flightDetails?.citynameFrom}
                        </p>
                        <div className="flex gap-4 mt-7">
                          <img
                            className="w-10 h-auto object-contain"
                            src={flightDetails?.flightImg}
                            alt={flightDetails?.name}
                          />
                          <div>
                            <h2 className="text-[14px] font-medium text-[#667085]">
                              {flightDetails?.airline}
                            </h2>
                            <p className="text-[13px] font-normal text-[#667085]">
                              (360) - {flightDetails?.travelClass}
                            </p>
                          </div>
                        </div>
                        <h2 className="text-[14px] font-medium text-[#667085] mt-[14px]">
                          {flightDetails?.toCity}
                        </h2>
                        <p className="text-[13px] font-normal text-[#667085]">
                          {flightDetails?.citynameTo}
                        </p>
                      </div>
                    </div>

                    {flightDetails?.tripOption === "Return" &&
                      flightDetails?.returnDate && (
                        <>
                          <div className="mt-6 px-4 pt-4 border-t">
                            <h2 className="text-[14px] font-bold text-[#667085]">
                              {toCity} - {fromCity}
                            </h2>
                            <p className="text-[13px] font-normal text-[#667085]">
                              Non-Stop - Duration: {flightDetails?.duration}
                            </p>
                          </div>

                          <div className="flex items-start mt-3">
                            <div className="w-21 px-4">
                              <h2 className="text-[14px] font-medium text-[#667085]">
                                {flightDetails?.departureTime}
                              </h2>
                              <p className="text-sm text-gray-500">
                                {new Date(
                                  flightDetails?.departureDate
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                              <p className="text-[13px] font-normal text-[#667085] mt-8">
                                {flightDetails?.duration}
                              </p>
                              <h2 className="text-[14px] font-medium text-[#667085] mt-8">
                                {flightDetails?.arrivalTime}
                              </h2>
                              <p className="text-sm text-gray-500">
                                {new Date(
                                  flightDetails?.departureDate
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>

                            <div className="ml-[-7px] mt-1 relative">
                              <div className="h-2 w-2 bg-black rounded-full"></div>
                              <div className="h-[65px] w-[2px] ml-[3px] bg-black"></div>
                              <IoMdAirplane
                                className="rotate-180 ml-[-5px] mt-[2px]"
                                size={18}
                              />
                              <div className="h-[60px] w-[2px] ml-[3px] bg-black"></div>
                              <div className="h-2 w-2 bg-black rounded-full"></div>
                            </div>

                            <div className="ml-3 flex-1">
                              <h2 className="text-[14px] font-medium text-[#667085]">
                                {flightDetails?.toCity}
                              </h2>
                              <p className="text-[13px] font-normal text-[#667085]">
                                {flightDetails?.citynameTo}
                              </p>
                              <div className="flex gap-4 mt-7">
                                <img
                                  className="w-10 h-auto object-contain"
                                  src={flightDetails?.flightImg}
                                  alt={flightDetails?.name}
                                />
                                <div>
                                  <h2 className="text-[14px] font-medium text-[#667085]">
                                    {flightDetails?.airline}
                                  </h2>
                                  <p className="text-[13px] font-normal text-[#667085]">
                                    (360) - {flightDetails?.travelClass}
                                  </p>
                                </div>
                              </div>
                              <h2 className="text-[14px] font-medium text-[#667085] mt-[14px]">
                                {flightDetails?.fromCity}
                              </h2>
                              <p className="text-[13px] font-normal text-[#667085]">
                                {flightDetails?.citynameFrom}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                  </div>
                </div>
              )}

              <div
                className={`w-full transition-all duration-300 px-4 lg:px-5 pr-3 pb-2 bg-white rounded-[10px] border-2 border-[#D2D2D2] ${
                  isOpen ? "h-auto" : "h-[183px]"
                }`}
              >
                <div className="flex justify-between mt-4">
                  <h3 className="text-[16px] lg:text-[18px] font-bold cursor-default text-[#212529]">
                    Price Details
                  </h3>
                  <ChevronDownIcon
                    onClick={toggleDetails}
                    className="cursor-pointer"
                  />
                </div>
                <p className="text-[14px] font-medium text-[#212529] cursor-default mt-1 tracking-[0.4px]">
                  Rates, taxes and fees included
                </p>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-[1000px]" : "max-h-0"
                  }`}
                >
                  <div className="space-y-2 pt-3">
                    <div className="flex justify-between">
                      <p className="text-[14px] font-medium text-[#212529]">
                        Rate
                      </p>
                      <p className="text-[14px] font-medium text-[#212529]">
                        Rs {flightDetails?.price}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[14px] font-medium text-[#212529]">
                        Taxes
                      </p>
                      <p className="text-[14px] font-medium text-[#212529]">
                        Rs 0
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[14px] font-medium text-[#212529]">
                        Fees
                      </p>
                      <p className="text-[14px] font-medium text-[#212529]">
                        Rs 0
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[14px] font-medium text-[#198754]">
                        Discount
                      </p>
                      <p className="text-[14px] font-medium text-[#198754]">
                        Rs 0
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`w-full ${
                    isOpen ? "border-t-2 border-[#D2D2D2]" : ""
                  } mt-3`}
                >
                  <div className="space-y-2 pt-3">
                    <div className="flex justify-between">
                      <p className="text-[14px] font-medium text-[#212529]">
                        Price before discount
                      </p>
                      <p className="text-[14px] font-medium text-[#212529]">
                        Rs {flightDetails?.price}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[14px] font-medium text-[#198754]">
                        Total discount
                      </p>
                      <p className="text-[14px] font-medium text-[#198754]">
                        Rs 0
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[16px] lg:text-[18px] font-bold text-[#212529]">
                        Total price
                      </p>
                      <p className="text-[16px] lg:text-[18px] font-bold text-[#212529]">
                        Rs {flightDetails?.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
