import React, { useEffect, useRef, useState } from "react";
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
import SeatSelection from "./Seatselection";
import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";
import loader from "../../images/giff.gif";

export default function SeatMap() {
  const { state } = useLocation();
  const {
    busName,
    busType,
    busImage,
    selectedFrom,
    selectedTo,
    departureTime,
    seatsLeft,
    departureDate,
    droptime,
    drop,
    pick,
  } = state || {};
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    cnicOrPassport: "",
    saveDetails: false,
    nickName: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  function getCityAbbreviation(city) {
    return city.slice(0, 3).toUpperCase();
  }

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
      updateTotalPrice(-1);
    } else if (selectedSeats.length < 4) {
      setSelectedSeats([...selectedSeats, seatNumber]);
      updateTotalPrice(1);
    }
  };

  const updateTotalPrice = (modifier) => {
    let seatPrice = 0;
    if (selectedSeats.length >= 0 && selectedSeats.length < 17) {
      seatPrice = 1782;
    } else if (selectedSeats.length >= 17 && selectedSeats.length < 29) {
      seatPrice = 1683;
    } else if (selectedSeats.length >= 29 && selectedSeats.length < 41) {
      seatPrice = 1593;
    } else if (selectedSeats.length >= 41) {
      seatPrice = 1494;
    }

    setTotalPrice(totalPrice + seatPrice * modifier);
  };

  const allSeats = Array.from({ length: 49 }, (_, i) => i + 1);

  const [seats, setSeats] = useState(() => {
    const randomizedSeats = allSeats.sort(() => Math.random());

    return randomizedSeats.map((seat, index) => ({
      number: seat,
      status:
        index < seatsLeft
          ? "available"
          : Math.random() < 0.5
          ? "male"
          : "female",
    }));
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNextClick = async (event) => {
    event.preventDefault();

    if (!formData.fullName || !formData.phoneNumber || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!state) {
      console.error("State not found, unable to navigate.");
      return;
    }

    const {
      busName,
      busType,
      busImage,
      selectedFrom,
      selectedTo,
      departureTime,
      seatsLeft,
      departureDate,
      droptime,
      drop,
      pick,
    } = state;

    const bookingData = {
      ...formData,
      busName,
      busType,
      busImage,
      selectedFrom,
      selectedTo,
      departureTime,
      seatsLeft,
      departureDate,
      totalPrice,
      selectedSeats,
      droptime,
      drop,
      pick,
      fromAbbreviation: getCityAbbreviation(selectedFrom),
      toAbbreviation: getCityAbbreviation(selectedTo),
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/book",
        bookingData
      );

      console.log("Booking details saved:", response.data);

      navigate("/bus/confirm-booking", {
        state: {
          bookingData,
          busName,
          busType,
          busImage,
          selectedFrom,
          selectedTo,
          departureTime,
          seatsLeft,
          departureDate,
          totalPrice: totalPrice,
          selectedSeats,
          droptime,
          drop,
          pick,
          formData,
          fromAbbreviation: getCityAbbreviation(selectedFrom),
          toAbbreviation: getCityAbbreviation(selectedTo),
        },
      });
    } catch (error) {
      console.error("Error saving booking:", error);
      alert(
        "An error occurred while saving your details. Please try again later."
      );
    }
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
          <div className="w-full h-14 px-4 lg:px-14">
            <div className="flex items-center h-6 mt-2">
              <LuHome color="#9097A6" size={20} />
              <IoChevronForwardOutline
                color="#9097A6"
                className="ml-2"
                size={16}
              />
              <h2 className="ml-3 text-sm font-medium text-[#9097A6]">
                Search
              </h2>
              <IoChevronForwardOutline
                color="#9097A6"
                className="ml-2"
                size={16}
              />
              <h2 className="ml-3 text-sm font-medium text-[#9097A6]">
                Seat Selection
              </h2>
            </div>
            <div className="w-full h-4 flex items-end justify-between mt-1 lg:w-[97.7%] lg:h-[17px]">
              <div className="w-1/3 h-3 bg-[#FCEB03] rounded-lg lg:h-[80%]"></div>
              <div className="w-1/3 h-3 bg-[#FCEB03] rounded-lg lg:h-[80%]"></div>
              <div className="w-1/3 h-3 bg-[#121619] rounded-lg lg:h-[80%]"></div>
            </div>
          </div>
          <div className="w-full min-h-screen p-2 md:p-4 lg:w-[100%] lg:h-max lg:flex lg:justify lg:p-[1px] lg:px-14 lg:pt-5 bg-[#F2F4F7] lg:pb-[50px]">
            <div className="w-full lg:w-[65.5%] h-full">
              <div className="h-auto lg:h-[180px] bg-white rounded-[10px] p-3 lg:pl-5 border-[2px]">
                <h2 className="mt-2 text-base lg:text-[18px] font-semibold text-[#101828] tracking-[1px]">
                  {busName}{" "}
                  <span className="text-sm text-gray-600">{busType}</span>
                </h2>

                <div className="h-auto lg:h-[82px] w-full lg:w-[97%] mt-2 border-t-[2px] border-b-[2px]">
                  <div className="flex flex-col md:flex-row items-center py-3 lg:py-0">
                    <img
                      src={busImage}
                      alt={busName}
                      className="w-12 h-12 lg:w-16 lg:h-20 object-contain rounded-full"
                    />

                    <div className="flex flex- justify-between md:flex-row items-center mt-3 md:mt-0 md:ml-12 w-full lg:w-max md:w-max">
                      <div className="text-center md:text-left md:pl-9 md:pt-3">
                        <h3 className="text-base lg:text-[18px] font-semibold">
                          {getCityAbbreviation(selectedFrom)}
                        </h3>
                        <h4 className="text-sm lg:text-[14px] font-medium">
                          {selectedFrom}
                        </h4>
                      </div>

                      <div className="my-2 md:my-0 md:pt-8 md:pl-[96px] pl-[70px]">
                        <img
                          src={arrow}
                          alt="Arrow"
                          className="w-8 md:w-auto"
                        />
                      </div>

                      <div className="text-center md:text-left md:pl-[90px] ml1 md:pt-3">
                        <h3 className="text-base lg:text-[18px] font-semibold">
                          {getCityAbbreviation(selectedTo)}
                        </h3>
                        <h4 className="text-sm lg:text-[14px] font-medium">
                          {selectedTo}
                        </h4>
                      </div>
                    </div>
                    <div className="mt-3 md:mt-0 md:ml-[25.5%] ml text-center md:text-right">
                      <h3 className="text-base lg:text-[18px] font-semibold md:ml-2">
                        {departureTime}
                      </h3>
                      <h4 className="text-sm lg:text-[14px] font-medium">
                        {departureDate}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="h-auto lg:h-[50px] m-auto flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 py-3 lg:py-0">
                  <span className="flex items-center gap-2 text-sm">
                    <span className="text-black font-medium">Earn upto</span>
                    <span className="text-[#121619] font-medium">149</span>
                    <img src={coin} className="h-4 w-4" alt="" />
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
              </div>

              <div className="w-full h-auto mt-4 rounded-[10px] m-auto">
                <SeatSelection
                  handleSeatClick={handleSeatClick}
                  seats={seats}
                  selectedSeats={selectedSeats}
                />
              </div>

              <div className="w-full h-auto pb-4 mt-5">
                <div className="w-full max-w-full mx-auto">
                  <form onSubmit={handleNextClick}>
                    <div className="p-3 lg:pb-2 lg:pl-3 lg:pt-2 rounded-[10px] bg-white border-[1px] border-[#D2D2D2]">
                      <h2 className="text-base lg:text-[18px] font-semibold mb-4">
                        Passenger Details
                      </h2>
                      <div className="flex flex-wrap md:flex-nowrap items-center gap-4 mb-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="title"
                            value="Mr"
                            checked={formData.title === "Mr"}
                            onChange={handleInputChange}
                            className="mr-2"
                            defaultChecked
                          />
                          Mr.
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="title"
                            value="Mrs"
                            checked={formData.title === "Mrs"}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Mrs.
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="title"
                            value="Miss"
                            checked={formData.title === "Miss"}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Miss.
                        </label>
                      </div>

                      <div className="flex flex-col md:flex-row gap-4 w-full">
                        <div className="w-full md:w-[48%] mb-1">
                          <label
                            htmlFor="fullName"
                            className="block font-medium mb-2 text-sm lg:text-base"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                          />
                        </div>

                        <div className="w-full md:w-[48%] mb-1">
                          <label
                            htmlFor="cnic"
                            className="block font-medium mb-2 text-sm lg:text-base"
                          >
                            Cnic/Passport
                          </label>
                          <input
                            type="number"
                            name="cnicOrPassport"
                            value={formData.cnicOrPassport}
                            onChange={handleInputChange}
                            placeholder="Enter CNIC e.g. 12345-1234567-1"
                            className="w-full border-[1px] border-[#D2D2D2] outline-none rounded-md px-3 py-2"
                          />
                        </div>
                      </div>

                      <div className="mb-2 ml-0 md:ml-3 mt-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="saveDetails"
                            checked={formData.saveDetails}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Save Details for future use
                        </label>
                      </div>

                      <div className="mb-4 pl-0 lg:pl-1 w-full lg:w-[98.5%]">
                        <label
                          htmlFor="nickName"
                          className="block font-medium mb-2 text-sm lg:text-base"
                        >
                          Nick Name
                        </label>
                        <input
                          type="text"
                          id="nickName"
                          name="nickName"
                          value={formData.nickName}
                          onChange={handleInputChange}
                          className="w-full border-[1px] border-[#D2D2D2] outline-none rounded-md px-3 py-2"
                        />
                      </div>
                    </div>

                    <div className="mt-4 p-3 lg:pb-4 lg:pl-4 lg:pt-3 rounded-[10px] bg-white border-[1px] border-[#D2D2D2]">
                      <h2 className="text-base lg:text-[18px] font-semibold mb-5">
                        Contact Details
                      </h2>
                      <div className="flex flex-col md:flex-row gap-4 w-full">
                        <div className="w-full md:w-[48%] mb-4">
                          <label
                            htmlFor="phoneNumber"
                            className="block font-medium mb-2 text-sm lg:text-base"
                          >
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full border rounded-md px-3 py-2"
                          />
                        </div>
                        <div className="w-full md:w-[48%] mb-4">
                          <label
                            htmlFor="email"
                            className="block font-medium mb-2 text-sm lg:text-base"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border rounded-md px-3 py-2"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full lg:w-[98.5%] bg-[#FCEB03] hover:bg-[#ede24c] text-[#121619] font-medium py-2 px-4 rounded-md text-sm lg:text-base"
                        // onClick={handleNextClick}
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[32.3%] md:w-full sm:w-full h-[216px] bg-white rounded-[10px] border-[1px] border-[#D2D2D2] lg:ml-3 pb-4">
              <h2 className="text-[18px] font-semibold ml-4 mt-2">Bus</h2>
              <div className="w-full flex justify-between px-4 pt-1">
                <p className="text-[14px] font-medium text-[#212529]">
                  {getCityAbbreviation(selectedFrom)}-
                  {getCityAbbreviation(selectedTo)}
                </p>
                <p className="text-[#212529] text-[14px] font-medium">Oneway</p>
              </div>
              <div className="w-full h-[87px] border-t-[1px] border-b-[1px] mt-4 border-[#D0D5DD]">
                <h2 className="text-[18px] font-semibold ml-4 mt-2">
                  Subtotal
                </h2>
                <div className="w-full flex justify-between px-4 pt-1">
                  <p className="text-[14px] font-medium text-[#212529]">
                    Outbound
                  </p>
                  <p className="text-[#212529] text-[14px] font-medium">
                    Rs {totalPrice}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-between items-center px-4 pl-1 pt-2">
                <h2 className="text-[18px] font-semibold ml-4">Total</h2>
                <p className="text-[18px] font-semibold text-[#121619]">
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
