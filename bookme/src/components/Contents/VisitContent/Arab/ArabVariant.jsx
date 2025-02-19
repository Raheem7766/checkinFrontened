import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { BiSolidPlaneTakeOff } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import Footer from "../../../Home/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../Home/Navbar";
import loader from "../../../../images/giff.gif";

export default function LuxVariant() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("From");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPassenger, setSelectedPassenger] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const calendarRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { price4, name4 } = location.state;
  const price = price4;
  const name = name4;
  const minDate = new Date();
  const days = 7;
  minDate.setHours(0, 0, 0, 0);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const handlePassengerChange = (e) => {
    setSelectedPassenger(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    if (!selectedOption && !selectedDate && !selectedPassenger) {
      alert("Please select all field.");
    }
    const details = {
      selectedOption,
      selectedDate,
      selectedPassenger,
      price,
      name,
      days,
    };
    console.log(details);

    navigate("/ArabItinerary", {
      state: {
        details,
      },
    });
  };

  const options = ["Lahore", "Islamabad", "Karachi"];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const generateDates = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const dates = [];

    for (let i = 0; i < firstDay; i++) {
      dates.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(i);
    }

    return dates;
  };

  const handleDateClick = (day) => {
    if (day) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      if (date >= minDate) {
        setSelectedDate(date);
        setShowCalendar(false);
      }
    }
  };

  const isDateDisabled = (day) => {
    if (!day) return true;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return date < minDate;
  };

  const changeMonth = (offset) => {
    const newMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + offset,
      1
    );
    setCurrentMonth(newMonth);
  };

  const formatDate = (date) => {
    if (!date) return "Departure Date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src={loader} alt="Loading..." />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="w-full h-auto pb-4 bg-[#F2F4F7]">
            <div className="w-full h-auto lg:h-[87px] bg-[#FCEB03] flex items-center px-5 lg:px-10 py-2 lg:py-0 justify-start">
              <img
                src="https://storage.googleapis.com/bookmepk/static/custom/contact-form/images/saudi%20(8).png"
                alt=""
                className="w-[80px] lg:w-[100px] filt"
              />
            </div>
            <div className="w-full h-auto px-2 sm:px-8 lg:px-11 pt-4">
              <div className="w-full h-auto bg-white border border-[#D2D2D2] rounded-[10px] px-4 sm:px-[8px] lg:px-[11px] pt-2 pb-7">
                <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-normal text-[#101828] tracking-[0.4px]">
                  7-Day Arabian Odyssey: Divine Cultural Escape featuring
                  Jeddah, Makkah, and the Heights of Taif
                </h2>
                <div className="relative" ref={dropdownRef}>
                  <div
                    onClick={toggleDropdown}
                    className="w-full h-[43px] mt-[14px] cursor-pointer flex items-center gap-3 px-2 border border-[#D2D2D2] rounded-[10px] "
                  >
                    <BiSolidPlaneTakeOff size={24} color="#667085" />
                    <h3 className="text-[14px] font-medium text-[#101828] tracking-[0.4px]">
                      {selectedOption || "From"}
                    </h3>
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full bg-white shadow-md">
                      <ul className="list-none p-2">
                        {options.map((option) => (
                          <li
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className="p-2 hover:bg-gray-100 cursor-pointer flex gap-2 font-medium"
                          >
                            <BiSolidPlaneTakeOff size={24} color="#667085" />
                            <span>{option}</span>{" "}
                            <span className="text-[#667085]">LHE</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="w-full flex flex-col sm:flex-row justify-between mt-3 gap-3">
                  <div ref={calendarRef} className="relative w-full sm:w-[49%]">
                    <div
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="w-full h-[45px] px-2 gap-3 flex items-center border border-[#D2D2D2] rounded-[10px] "
                    >
                      <CiCalendar size={24} color="#667085" />
                      <h3 className="text-[13px] sm:text-[14px] lg:text-[15px] font-medium text-[#101828] tracking-[0.4px]">
                        <span>{formatDate(selectedDate)}</span>
                      </h3>
                    </div>
                    {showCalendar && (
                      <div className="absolute top-12 left-[30%] w-72 bg-white border rounded-lg shadow-lg p-4 z-10">
                        <div className="flex items-center justify-between mb-4">
                          <button
                            onClick={() => changeMonth(-1)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <ChevronLeft className="h-5 w-5 text-gray-500" />
                          </button>
                          <div className="font-semibold">
                            {months[currentMonth.getMonth()]}{" "}
                            {currentMonth.getFullYear()}
                          </div>
                          <button
                            onClick={() => changeMonth(1)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <ChevronRight className="h-5 w-5 text-gray-500" />
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                          {[
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun",
                          ].map((day) => (
                            <div key={day} className="text-xs text-gray-500">
                              {day}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {generateDates().map((day, index) => (
                            <button
                              key={index}
                              onClick={() => handleDateClick(day)}
                              disabled={isDateDisabled(day)}
                              className={`p-2 text-sm rounded-md ${
                                !day ? "invisible" : ""
                              } ${
                                isDateDisabled(day)
                                  ? "text-gray-300 cursor-not-allowed"
                                  : "hover:bg-gray-100"
                              } ${
                                selectedDate &&
                                day === selectedDate.getDate() &&
                                currentMonth.getMonth() ===
                                  selectedDate.getMonth()
                                  ? "bg-blue-500 text-white hover:bg-blue-600"
                                  : ""
                              }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-full sm:w-[50%] h-[45px] px-3 gap-3 flex items-center border border-[#D2D2D2] rounded-[10px]">
                    <FaRegUser size={15} color="#667085" />
                    <select
                      name=""
                      id=""
                      value={selectedPassenger}
                      onChange={handlePassengerChange}
                      className="h-full w-full outline-none"
                    >
                      <option value="" disabled>
                        Passenger
                      </option>
                      <option value="2 adult">2 adult</option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                onClick={handleContinue}
                className="w-full bg-[#FCEB03] hover:bg-[#f2e645] mt-7 text-[#121619] font-semibold py-2 pb-3 px-4 rounded-md"
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
