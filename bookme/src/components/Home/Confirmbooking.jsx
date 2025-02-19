import React, { useEffect, useState } from "react";
import { LuHome } from "react-icons/lu";
import { IoChevronForwardOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import arrow from "../../images/arrow.svg";
import coin from "../../images/coin.svg";
import {
  MdOutlineAirlineSeatReclineExtra,
  MdOndemandVideo,
} from "react-icons/md";
import { CiHeadphones } from "react-icons/ci";
import { TbPlug } from "react-icons/tb";
import { GiKnifeFork } from "react-icons/gi";
import { Wifi } from "lucide-react";
import { MapPin } from "lucide-react";
import { IoChevronDownSharp } from "react-icons/io5";
import Footer from "./Footer";
import Navbar from "./Navbar";
import loader from "../../images/giff.gif";

export default function Confirmbooking() {
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    busName,
    busType,
    busImage,
    selectedFrom,
    selectedTo,
    departureTime,
    seats,
    seatsLeft,
    totalPrice,
    departureDate,
    // totalPrice,
    selectedSeats,
    fromAbbreviation,
    toAbbreviation,
    droptime,
    drop,
    pick,
    formData: {
      title,
      fullName,
      cnicOrPassport,
      saveDetails,
      nickName,
      phoneNumber,
      email,
    },
  } = state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const amenities = [
    { icon: "🪑", label: "Regular seat" },
    { icon: "📶", label: "Free WIFI" },
    { icon: "🎧", label: "Headphones" },
    { icon: "🎮", label: "Individual entertainment system" },
    { icon: "🔌", label: "Mobile Charging" },
    { icon: "🍽️", label: "Meal is served" },
  ];

  const { formData, setFormData } = state || {};

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCompleteBooking = () => {
    const bookingData = {
      busName,
      busType,
      busNumber: "ABC123",
      price: totalPrice,
      title,
      fullName,
      cnicOrPassport,
      saveDetails,
      nickName,
      phoneNumber,
      email,
      departureDate,
      arrivalDate: departureDate,
      seatNumber: selectedSeats,
      from: selectedFrom,
      to: selectedTo,
      status: "booked",
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    navigate("/busPayment", { state: { bookingData } });
  };

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src={loader} alt="Loading..." />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="w-full h-auto min-h-[56px] border-b px-3 sm:px-4 lg:w-[100%] lg:h-[56px] lg:px-14">
            <div className="flex items-center flex-wrap gap-y-2 py-2 lg:h-[22px] lg:mt-2 lg:flex-nowrap">
              <LuHome color="#9097A6" size={20} className="shrink-0" />
              <IoChevronForwardOutline
                color="#9097A6"
                className="ml-2 shrink-0"
                size={16}
              />
              <h2 className="ml-3 text-[10px] lg:text-[14px] md:text-[14px] sm:text-[14px] font-medium text-[#9097A6] whitespace-nowrap">
                Search
              </h2>
              <IoChevronForwardOutline
                color="#9097A6"
                className="ml-2 shrink-0"
                size={16}
              />
              <h2 className="ml-3 text-[10px] lg:text-[14px] md:text-[14px] sm:text-[14px] font-medium text-[#9097A6] whitespace-nowrap">
                Seat Selection
              </h2>
              <IoChevronForwardOutline
                color="#9097A6"
                className="ml-2 shrink-0"
                size={16}
              />
              <h2 className="ml-3 text-[10px] lg:text-[14px] md:text-[14px] sm:text-[14px] font-medium text-[#9097A6] whitespace-nowrap">
                Booking Review
              </h2>
            </div>
            <div className="w-full px-1 flex items-end justify-between gap-1 mb-2 lg:w-[97.7%] lg:h-[17px] lg:mt-[2px] lg:mb-0">
              <div className="w-[33%] h-[13px] lg:h-[80%] bg-[#FCEB03] rounded-[10px]"></div>
              <div className="w-[33%] h-[13px] lg:h-[80%] bg-[#FCEB03] rounded-[10px]"></div>
              <div className="w-[33%] h-[13px] lg:h-[80%] bg-[#FCEB03] rounded-[10px]"></div>
            </div>
          </div>
          <div className="w-[100%] h-max flex flex-wrap justify p-[1px] pl- pt-5 bg-[#F2F4F7] pb-[50px] lg:px-14">
            <div className="w-[98%] sm:w-[98%] md:w-[98%] m-auto lg:w-[65.5%] h-full pb-2">
              <h2 className="text-[#101828] font-semibold text-[18px]">
                Outbound Ticket
              </h2>
              <div
                className="w-full border-[1px] border-[#D2D2D2] rounded-[10px] bg-white"
                style={{
                  maxHeight: isAmenitiesOpen ? "max-content" : "641px",
                  paddingBottom: isAmenitiesOpen ? "30px" : "16px",
                }}
              >
                <div className="w-full sm:w-[98%] h-[50px] m-auto px-2 lg:px-0 flex items-center justify-between border-b-[1px] border-[#D0D5DD]">
                  <div className="flex items-center gap-4 lg:gap-1">
                    <h4 className="font-semibold text-[14px] sm:text-lg">
                      {busName}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {busType}
                    </p>
                  </div>
                  <p className="text-sm sm:text-base">{departureDate}</p>
                </div>
                <div className="w-full lg:w-[93%] h-auto lg:h-[95px] m-auto flex flex-wrap lg:flex-nowrap md:flex-nowrap items-center pl-0 sm:pl-0 md:pl-[25px] lg:pl-0 border-b-[1px] border-[#D2D2D2] py-4 lg:py-0">
                  <img
                    src={busImage}
                    alt="busData.name"
                    className="w-16 h-20 object-contain rounded-full mx-auto lg:mx-0"
                  />
                  <div className="h-full w-full lg:w-max flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-normal md:justify-center gap-3 lg:gap-0">
                    <div className="pl-0 lg:pl-9 md:pl-9 pt-2 lg:pt-0 text-center lg:text-left">
                      <h3 className="text-[18px] font-semibold">
                        {fromAbbreviation}
                      </h3>
                      <h4 className="text-[14px] font-medium">
                        {selectedFrom}
                      </h4>
                    </div>
                    <div className="pt-2 lg:pt-0 pl-0 lg:pl-[73px] md:pl-[50px]">
                      <img
                        src={arrow}
                        alt="Arrow"
                        className="mx-auto lg:mx-0"
                      />
                    </div>
                    <div className="pl-0 lg:pl-[70px] md:pl-[40px] pt-2 lg:pt-0 text-center lg:text-left">
                      <h3 className="text-[18px] font-semibold">
                        {toAbbreviation}
                      </h3>
                      <h4 className="text-[14px] font-medium">{selectedTo}</h4>
                    </div>
                  </div>
                  <div className="h-full w-full lg:w-[45%] flex lg:justify-end justify-center mt-4 lg:mt-0">
                    <div className="pt-2 lg:pt-5 md:pt-0 pr-4 text-center lg:text-right">
                      <h3 className="text-[18px] font-semibold ml-2">
                        {departureTime}
                      </h3>
                      <h4 className="text-[14px] font-medium">
                        {seatsLeft} seats left
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-[93%] h-auto lg:h-[70px] m-auto border-b-[1px] border-[#D2D2D2] px-2 lg:px-0 py-4 md:pl-[25px] lg:pl-0 lg:py-0">
                  <div className="flex flex-wrap lg:flex-nowrap items-center lg:pt-3 gap-2">
                    <span className="flex items-center gap-2 text-sm">
                      <span className="text-black font-medium">Earn upto</span>
                      <span className="text-[#121619] font-medium">149</span>
                      <img src={coin} className="h-4 w-4" alt="Coin" />
                    </span>
                    <div className="flex gap-3">
                      <MdOutlineAirlineSeatReclineExtra
                        size={18}
                        className="text-[#121619]"
                      />
                      <Wifi size={18} className="text-[#121619]" />
                      <CiHeadphones size={18} className="text-[#121619]" />
                      <MdOndemandVideo size={18} className="text-[#121619]" />
                      <TbPlug size={18} className="text-[#121619]" />
                      <GiKnifeFork size={18} className="text-[#121619]" />
                    </div>
                  </div>
                  <p className="text-[14px] font-medium text-[#212529] mt-2 lg:mt-0">
                    Seat(s) No.{" "}
                    <span className="text-[#121619]">{selectedSeats}</span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 p-2 sm:pl-2 lg:pl-7 md:pl-0 plll">
                  <img
                    src={busImage}
                    alt={busName}
                    className="w-16 h-16 sm:h-20 object-contain rounded-full"
                  />
                  <h4 className="font-semibold text-base sm:text-lg text-center sm:text-left">
                    {busName}
                  </h4>
                </div>
                <div className="pb-2 flex flex-col sm:flex-row w-[93%] m-auto">
                  <div
                    className={`flex sm:flex-col justify-between ${
                      isAmenitiesOpen
                        ? "gap-4 sm:gap-[107px]"
                        : "gap-4 sm:gap-6"
                    } transition-all duration-300`}
                  >
                    <p className="text-base sm:text-[17.5px] font-medium">
                      {departureTime}
                    </p>
                    <p className="text-xs sm:text-[14px] font-medium text-[#667085]">
                      03h 30m
                    </p>
                    <p className="text-base sm:text-lg font-medium">
                      {droptime}
                    </p>
                  </div>
                  <div className="hidden sm:block h-full ml-10">
                    <div className="h-3 w-3 rounded-full border-[1px] border-[#e8dd40]"></div>
                    <div
                      className={`w-1 ${
                        isAmenitiesOpen ? "h-[270px]" : "h-[100px]"
                      } transition-all duration-300 ml-1 bg-[#FCEB03]`}
                    ></div>
                    <div className="h-3 w-3 rounded-full border-[1px] border-[#e8dd40]"></div>
                  </div>
                  <div className="flex-1 sm:pl-8 flex flex-col gap-4">
                    <div className="flex justify-between items-center gap-2 sm:gap-28">
                      <p className="text-[14px] sm:text-[18px] font-medium text-[#101828]">
                        {pick}
                      </p>
                      <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full flex items-center justify-center text-[#121619] bg-[#FCEB03]">
                        <MapPin size={16} className="sm:size-20" />
                      </div>
                    </div>
                    <button
                      onClick={() => setIsAmenitiesOpen(!isAmenitiesOpen)}
                      className="w-full h-[30px] rounded-[10px] border-[1px] border-[#D2D2D2] flex justify-between items-center pr-2"
                    >
                      <div className="flex items-center pl-2 sm:pl-3 gap-2 sm:gap-3 h-full">
                        <MdOutlineAirlineSeatReclineExtra
                          size={16}
                          className="sm:size-18 text-[#121619]"
                        />
                        <Wifi size={16} className="sm:size-18 text-[#121619]" />
                        <CiHeadphones
                          size={16}
                          className="sm:size-18 text-[#121619]"
                        />
                        <MdOndemandVideo
                          size={16}
                          className="sm:size-18 text-[#121619]"
                        />
                        <TbPlug
                          size={16}
                          className="sm:size-18 text-[#121619]"
                        />
                        <GiKnifeFork
                          size={16}
                          className="sm:size-18 text-[#121619]"
                        />
                      </div>
                      <IoChevronDownSharp />
                    </button>
                    <div
                      className={`space-y-2 mt-[-15px] transition-all duration-300 overflow-hidden ${
                        isAmenitiesOpen ? "max-h-54" : "max-h-0"
                      }`}
                    >
                      {amenities.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-xs sm:text-sm text-gray-600"
                        >
                          <span>{item.icon}</span>
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center gap-2 sm:gap-28">
                      <p className="text-[14px] sm:text-[18px] font-medium text-[#101828]">
                        {drop}
                      </p>
                      <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full flex items-center justify-center text-[#121619] bg-[#FCEB03]">
                        <MapPin size={16} className="sm:size-20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full h-auto lg:h-[185px] mt-7 bg-white border-[1px] border-[#D2D2D2] pl-2 lg:pl-4 pb-4 lg:pb-0 rounded-[10px]">
                  <h2 className="text-[#101828] font-semibold text-[16px] sm:text-[18px] pt-2">
                    Passenger Details
                  </h2>
                  <h3 className="text-[#667085] font-semibold text-[16px] sm:text-[18px] pt-5">
                    Passenger
                  </h3>
                  <p className="text-[14px] sm:text-[14px] font-bold">
                    Basic Information:{" "}
                    <span className="font-medium">
                      {fullName}, {cnicOrPassport}
                    </span>
                  </p>
                  <h3 className="text-[#667085] font-semibold text-[16px] sm:text-[18px] pt-4">
                    Contacts
                  </h3>
                  <p className="text-[14px] font-medium">
                    {email}, {phoneNumber}
                  </p>
                </div>

                <div className="w-full h-auto pb-4 bg-white border-[1px] pl-2 lg:pl-4 border-[#D2D2D2] rounded-[10px] mt-4">
                  <p className="text-[14px] font-medium text-[#212529] pt-4 tracking-[0.5px]">
                    By selecting Complete Booking you agree to the{" "}
                    <span className="text-[#667085]">Terms and Conditions</span>{" "}
                    and <span className="text-[#667085]">Privacy Policy</span>
                  </p>
                  <div className="w-[98%] m-auto border-t-[1px] flex flex-col sm:flex-row justify-between mt-6 pt-3 border-[#D2D2D2]">
                    <p className="text-[16px] sm:text-[18px] font-semibold text-[#101828]">
                      Amount to be paid
                    </p>
                    <p className="text-[16px] sm:text-[18px] font-semibold text-[#101828]">
                      Rs {totalPrice}
                    </p>
                  </div>
                  <button
                    className="w-[100%]  mt-2 h-[40px] rounded-[10px] text-[#121619] bg-[#FCEB03]"
                    onClick={handleCompleteBooking}
                  >
                    Complete Booking
                  </button>
                </div>
              </div>
            </div>

            <div className="w-[98%] lg:w-[32.3%] h-auto m-auto lg:m-0 lg:h-[216px] bg-white rounded-[10px] border-[1px] border-[#D2D2D2] lg:ml-3 pb-4">
              <h2 className="text-[16px] sm:text-[18px] font-semibold ml-2 lg:ml-4 mt-2">
                Bus
              </h2>
              <div className="w-full flex justify-between px-2 lg:px-4 pt-1">
                <p className="text-[14px] font-medium text-[#212529]">
                  {fromAbbreviation}-{toAbbreviation}
                </p>
                <p className="text-[#212529] text-[14px] font-medium">Oneway</p>
              </div>
              <div className="w-full h-auto lg:h-[87px] border-t-[1px] border-b-[1px] mt-4 border-[#D0D5DD]">
                <h2 className="text-[16px] sm:text-[18px] font-semibold ml-2 lg:ml-4 mt-2">
                  Subtotal
                </h2>
                <div className="w-full flex justify-between px-2 lg:px-4 pt-1">
                  <p className="text-[14px] font-medium text-[#212529]">
                    Outbound
                  </p>
                  <p className="text-[#212529] text-[14px] font-medium">
                    Rs {totalPrice}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-between items-center px-2 lg:px-4 pt-2">
                <h2 className="text-[16px] sm:text-[18px] font-semibold lg:ml-4">
                  Total
                </h2>
                <p className="text-[16px] sm:text-[18px] font-semibold text-[#121619]">
                  Rs {totalPrice}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
