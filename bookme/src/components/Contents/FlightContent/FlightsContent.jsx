import React, { useEffect, useRef, useState } from "react";
import flight from "../../../images/flight.webp";
import { MdFlightLand, MdFlightTakeoff } from "react-icons/md";
import { airports } from "../../Data/Data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoPersonSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import FlightCenter from "./FlightCenter";
import Footer from "../../Home/Footer";

export default function FlightsContent() {
  const [selectedOption, setSelectedOption] = useState("One Way");
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showReturnCalendar, setShowReturnCalendar] = useState(false);
  const [selectedReturnDate, setSelectedReturnDate] = useState(null);
  const [returnMonth, setReturnMonth] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);
  const [travelers, setTravelers] = useState({
    adult: 1,
    children: 0,
    infant: 0,
  });
  const [selectedClass, setSelectedClass] = useState("Economy");
  const navigate = useNavigate();

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const calendarRef = useRef(null);
  const returnCalendarRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromRef.current && !fromRef.current.contains(event.target)) {
        setFromDropdownOpen(false);
      }
      if (toRef.current && !toRef.current.contains(event.target)) {
        setToDropdownOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (
        returnCalendarRef.current &&
        !returnCalendarRef.current.contains(event.target)
      ) {
        setShowReturnCalendar(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFromClick = () => {
    setToDropdownOpen(false);
    setFromDropdownOpen(!fromDropdownOpen);
    setShowCalendar(false);
  };

  const handleToClick = () => {
    setFromDropdownOpen(false);
    setToDropdownOpen(!toDropdownOpen);
    setShowCalendar(false);
  };

  const handleCitySelect = (city, type) => {
    if (type === "from") {
      setFromCity(city);
      setFromDropdownOpen(false);
      if (toCity && toCity.code === city.code) {
        setToCity("");
      }
    } else {
      setToCity(city);
      setToDropdownOpen(false);
    }
  };

  const isCityDisabled = (city, type) => {
    if (type === "to") {
      return fromCity && fromCity.code === city.code;
    }
    return false;
  };

  const renderSelectedCity = (city) => {
    if (!city) return null;
    return (
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="font-medium">{city.city}</span>
          <span className="text-black">({city.code})</span>
        </div>
        <span className="text-xs text-gray-500 leading-tight">{city.name}</span>
      </div>
    );
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

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

  const handleDateClick = (day, isReturn) => {
    if (day) {
      const date = new Date(
        (isReturn ? returnMonth : currentMonth).getFullYear(),
        (isReturn ? returnMonth : currentMonth).getMonth(),
        day
      );
      if (date >= today && (!isReturn || date >= selectedDate)) {
        if (isReturn) {
          setSelectedReturnDate(date);
          setShowReturnCalendar(false);
        } else {
          setSelectedDate(date);
          setShowCalendar(false);

          if (selectedReturnDate && date > selectedReturnDate) {
            setSelectedReturnDate(null);
          }
        }
      }
    }
  };

  const isDateDisabled = (day, isReturn) => {
    if (!day) return true;
    const date = new Date(
      (isReturn ? returnMonth : currentMonth).getFullYear(),
      (isReturn ? returnMonth : currentMonth).getMonth(),
      day
    );
    return date < today || (isReturn && date < selectedDate);
  };

  const changeMonth = (offset, isReturn = false) => {
    const setMonth = isReturn ? setReturnMonth : setCurrentMonth;
    const month = isReturn ? returnMonth : currentMonth;
    setMonth(new Date(month.getFullYear(), month.getMonth() + offset, 1));
  };

  const formatDate = (date) => {
    if (!date) return "Select Date";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const incrementTraveler = (type) => {
    setTravelers((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const decrementTraveler = (type) => {
    if (travelers[type] > 0) {
      setTravelers((prev) => ({ ...prev, [type]: prev[type] - 1 }));
    }
  };

  const totalTravelers = Object.values(travelers).reduce((a, b) => a + b, 0);

  const seatClasses = ["Economy", "Premium Economy", "Business"];

  const handleSearch = () => {
    const searchData = {
      tripOption: selectedOption,
      fromCity: fromCity ? fromCity.name : "",
      toCity: toCity ? toCity.name : "",
      fromCode: fromCity ? fromCity.code : "",
      toCode: toCity ? toCity.code : "",
      citynameFrom: fromCity ? fromCity.city : "",
      citynameTo: toCity ? toCity.city : "",
      departureDate: selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : "",
      returnDate:
        selectedOption === "Return" && selectedReturnDate
          ? selectedReturnDate.toISOString().split("T")[0]
          : "",
      travelers,
      travelClass: selectedClass,
    };

    // Save data in localStorage
    localStorage.setItem("flightSearchData", JSON.stringify(searchData));

    navigate(`/FlightSearchData`);

  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-[252px] relative">
        <img src={flight} alt="SVG" className="h-full w-full object-cover " />
        <div className="w-[98%] h-[95%] rounded-[10px] bg-white absolute top-28 left-[1%] shadow pl-4 pt-5">
          <div className="flex space-x-1">
            <label
              className={`px-3 py-2 rounded-full flex justify-center items-center gap-1 cursor-pointer transition-colors duration-300 ${
                selectedOption === "One Way"
                  ? "bg-[#FCEB03] text-[#121619] font-semibold"
                  : "text-gray-600"
              }`}
              onClick={() => handleOptionChange("One Way")}
            >
              <input
                type="radio"
                name="tripType"
                value="One Way"
                checked={selectedOption === "One Way"}
                onChange={() => {}}
                className=""
              />
              One Way
            </label>
            <label
              className={`px-4 py-2 rounded-full flex justify-center items-center gap-1 cursor-pointer transition-colors duration-300 ${
                selectedOption === "Return"
                  ? "bg-[#FCEB03] text-[#121619] font-semibold"
                  : "text-gray-600"
              }`}
              onClick={() => handleOptionChange("Return")}
            >
              <input
                type="radio"
                name="tripType"
                value="Return"
                checked={selectedOption === "Return"}
                onChange={() => {}}
                className=""
              />
              Return
            </label>
            <label
              className={`px-4 py-2 rounded-full flex justify-center items-center gap-1 cursor-pointer transition-colors duration-300 ${
                selectedOption === "Multi City"
                  ? "bg-[#FCEB03] text-[#121619] font-semibold"
                  : "text-gray-600"
              }`}
              onClick={() => handleOptionChange("Multi City")}
            >
              <input
                type="radio"
                name="tripType"
                value="Multi City"
                checked={selectedOption === "Multi City"}
                onChange={() => {}}
                className=""
              />
              Multi City
            </label>
          </div>

          <div className="w-[98%] h-[60px] m-auto mt-5 flex gap-3">
            {selectedOption === "One Way" && (
              <>
                {/* From Dropdown */}
                <div ref={fromRef} className="relative w-[282px]">
                  <div
                    onClick={handleFromClick}
                    className="w-full h-full p-3 border rounded-lg flex items-center justify-between cursor-pointer "
                  >
                    <div className="flex items-center gap-3">
                      <MdFlightTakeoff className="text-gray-400" size={20} />
                      {fromCity ? (       
                        renderSelectedCity(fromCity)
                      ) : ( 
                        <span className="text-gray-700">City or airport</span>
                      )}
                    </div>
                  </div>

                  {fromDropdownOpen && (
                    <div className="absolute bg-white border rounded-lg shadow-lg z-10 max-h-[300px] w-[380px] overflow-y-auto">
                      {airports.map((city) => (
                        <div
                          key={city.code}
                          className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 
                  ${
                    isCityDisabled(city, "from")
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                          onClick={() =>
                            !isCityDisabled(city, "from") &&
                            handleCitySelect(city, "from")
                          }
                        >
                          <MdFlightTakeoff
                            size={16}
                            className="text-gray-400"
                          />
                          <div>
                            <div className="font-medium">{city.name}</div>
                            <div className="text-sm text-gray-500">
                              {city.city}
                            </div>
                          </div>
                          <div className="ml-auto text-gray-400">
                            {city.code}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* To Dropdown */}
                <div ref={toRef} className="relative w-[282px]">
                  <div
                    onClick={handleToClick}
                    className="w-full h-full p-3 border rounded-lg flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <MdFlightLand className="text-gray-400" size={20} />
                      {toCity ? (
                        renderSelectedCity(toCity)
                      ) : (
                        <span className="text-gray-700">City or airport</span>
                      )}
                    </div>
                  </div>

                  {toDropdownOpen && (
                    <div className="absolute max-h-[300px] w-[380px] overflow-y-auto bg-white border rounded-lg shadow-lg z-10">
                      {airports.map((city) => (
                        <div
                          key={city.code}
                          className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 
                  ${
                    isCityDisabled(city, "to")
                      ? "opacity-50 cursor-not-allowed hover:bg-white"
                      : ""
                  }`}
                          onClick={() =>
                            !isCityDisabled(city, "to") &&
                            handleCitySelect(city, "to")
                          }
                        >
                          <MdFlightLand size={16} className="text-gray-400" />
                          <div>
                            <div className="font-medium">{city.name}</div>
                            <div className="text-sm text-gray-500">
                              {city.city}
                            </div>
                          </div>
                          <div className="ml-auto text-gray-400">
                            {city.code}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* To Date */}
                <div ref={calendarRef} className="relative w-[410px]">
                  <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full h-full flex items-center gap-3 px-4 py-2 border rounded-md"
                  >
                    <svg
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="text-gray-700">
                      {formatDate(selectedDate)}
                    </span>
                  </button>

                  {showCalendar && (
                    <div className="absolute top-15 left-0 w-72 bg-white border rounded-lg shadow-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="font-semibold">
                          {months[currentMonth.getMonth()]}{" "}
                          {currentMonth.getFullYear()}
                        </div>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => changeMonth(-1)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <ChevronLeft className="h-5 w-5 text-gray-500" />
                          </button>
                          <button
                            onClick={() => changeMonth(1)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <ChevronRight className="h-5 w-5 text-gray-500" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                          (day) => (
                            <div key={day} className="text-xs text-gray-500">
                              {day}
                            </div>
                          )
                        )}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {generateDates().map((day, index) => (
                          <button
                            key={index}
                            onClick={() => handleDateClick(day)}
                            disabled={isDateDisabled(day)}
                            className={`
                  p-2 text-sm rounded-md
                  ${!day ? "invisible" : ""}
                  ${
                    isDateDisabled(day)
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }
                  ${
                    selectedDate &&
                    day === selectedDate.getDate() &&
                    currentMonth.getMonth() === selectedDate.getMonth()
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : ""
                  }
                `}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* To seat */}
                <div ref={dropdownRef} className="relative">
                  <button
                    className="flex items-center gap-2 px-4 py-2 border rounded-md h-full w-48"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <IoPersonSharp size={24} color="#6E7491" />
                    <div className="w-full flex items-start flex-col ">
                      <span className="text-black text-[14px] font-bold flex">
                        {totalTravelers} Travelers
                      </span>
                      <div className="w-full text-start text-gray-700 text-[12px]">
                        {selectedClass}
                      </div>
                    </div>
                  </button>

                  {showDropdown && (
                    <div className="absolute top-15 right-0 w-[347px] bg-white border rounded-lg shadow-lg p-4">
                      {[
                        { label: "Adult", type: "adult", description: "" },
                        {
                          label: "Children",
                          type: "children",
                          description: "(Aged 2 - 12 yrs)",
                        },
                        {
                          label: "Infant",
                          type: "infant",
                          description: "(Below 2 yrs)",
                        },
                      ].map(({ label, type, description }) => (
                        <div
                          key={type}
                          className="flex items-center justify-between py-2 border-b last:border-none"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {label}
                            </p>
                            {description && (
                              <p className="text-xs text-gray-500">
                                {description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              className={`p-1 rounded-full border ${
                                travelers[type] === 0
                                  ? "text-gray-300 border-gray-300"
                                  : "text-blue-500 border-blue-500"
                              }`}
                              onClick={() => decrementTraveler(type)}
                              disabled={travelers[type] === 0}
                            >
                              -
                            </button>
                            <span>{travelers[type]}</span>
                            <button
                              className="p-1 rounded-full border text-blue-500 border-blue-500"
                              onClick={() => incrementTraveler(type)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Seat Class
                        </label>
                        <select
                          className="w-full border rounded-md px-3 py-2"
                          value={selectedClass}
                          onChange={(e) => setSelectedClass(e.target.value)}
                        >
                          {seatClasses.map((seatClass) => (
                            <option key={seatClass} value={seatClass}>
                              {seatClass}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                        onClick={() => setShowDropdown(false)}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {selectedOption === "Return" && (
              <>
                {/* From Dropdown */}
                <div ref={fromRef} className="relative w-[282px]">
                  <div
                    onClick={handleFromClick}
                    className="w-full h-full p-3 border rounded-lg flex items-center justify-between cursor-pointer "
                  >
                    <div className="flex items-center gap-3">
                      <MdFlightTakeoff className="text-gray-400" size={20} />
                      {fromCity ? (
                        renderSelectedCity(fromCity)
                      ) : (
                        <span className="text-gray-700">City or airport</span>
                      )}
                    </div>
                  </div>

                  {fromDropdownOpen && (
                    <div className="absolute bg-white border rounded-lg shadow-lg z-10 max-h-[300px] w-[380px] overflow-y-auto">
                      {airports.map((city) => (
                        <div
                          key={city.code}
                          className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 
                  ${
                    isCityDisabled(city, "from")
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                          onClick={() =>
                            !isCityDisabled(city, "from") &&
                            handleCitySelect(city, "from")
                          }
                        >
                          <MdFlightTakeoff
                            size={16}
                            className="text-gray-400"
                          />
                          <div>
                            <div className="font-medium">{city.name}</div>
                            <div className="text-sm text-gray-500">
                              {city.city}
                            </div>
                          </div>
                          <div className="ml-auto text-gray-400">
                            {city.code}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* To Dropdown */}
                <div ref={toRef} className="relative w-[282px]">
                  <div
                    onClick={handleToClick}
                    className="w-full h-full p-3 border rounded-lg flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <MdFlightLand className="text-gray-400" size={20} />
                      {toCity ? (
                        renderSelectedCity(toCity)
                      ) : (
                        <span className="text-gray-700">City or airport</span>
                      )}
                    </div>
                  </div>

                  {toDropdownOpen && (
                    <div className="absolute max-h-[300px] w-[380px] overflow-y-auto bg-white border rounded-lg shadow-lg z-10">
                      {airports.map((city) => (
                        <div
                          key={city.code}
                          className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 
                  ${
                    isCityDisabled(city, "to")
                      ? "opacity-50 cursor-not-allowed hover:bg-white"
                      : ""
                  }`}
                          onClick={() =>
                            !isCityDisabled(city, "to") &&
                            handleCitySelect(city, "to")
                          }
                        >
                          <MdFlightLand size={16} className="text-gray-400" />
                          <div>
                            <div className="font-medium">{city.name}</div>
                            <div className="text-sm text-gray-500">
                              {city.city}
                            </div>
                          </div>
                          <div className="ml-auto text-gray-400">
                            {city.code}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* To Date */}
                <div ref={calendarRef} className="relative w-[205px]">
                  <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full h-full flex items-center gap-3 px-4 py-2 border rounded-md"
                  >
                    <svg
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="text-gray-700">
                      {formatDate(selectedDate)}
                    </span>
                  </button>

                  {showCalendar && (
                    <div className="absolute top-15 left-0 w-72 bg-white border rounded-lg shadow-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="font-semibold">
                          {months[currentMonth.getMonth()]}{" "}
                          {currentMonth.getFullYear()}
                        </div>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => changeMonth(-1)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <ChevronLeft className="h-5 w-5 text-gray-500" />
                          </button>
                          <button
                            onClick={() => changeMonth(1)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <ChevronRight className="h-5 w-5 text-gray-500" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                          (day) => (
                            <div key={day} className="text-xs text-gray-500">
                              {day}
                            </div>
                          )
                        )}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {generateDates().map((day, index) => (
                          <button
                            key={index}
                            onClick={() => handleDateClick(day)}
                            disabled={isDateDisabled(day)}
                            className={`
                  p-2 text-sm rounded-md
                  ${!day ? "invisible" : ""}
                  ${
                    isDateDisabled(day)
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }
                  ${
                    selectedDate &&
                    day === selectedDate.getDate() &&
                    currentMonth.getMonth() === selectedDate.getMonth()
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : ""
                  }
                `}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Return Date */}
                <div ref={returnCalendarRef} className="relative w-[205px]">
                  <button
                    onClick={() => setShowReturnCalendar(!showReturnCalendar)}
                    className="w-full h-full flex items-center gap-3 px-4 py-2 border rounded-md "
                  >
                    <svg
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="text-gray-700">
                      {formatDate(selectedReturnDate)}
                    </span>
                  </button>

                  {showReturnCalendar && (
                    <div className="absolute top-12 left-0 w-72 bg-white border rounded-lg shadow-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={() => changeMonth(-1, true)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <ChevronLeft className="h-5 w-5 text-gray-500" />
                        </button>
                        <div className="font-semibold">
                          {months[returnMonth.getMonth()]}{" "}
                          {returnMonth.getFullYear()}
                        </div>
                        <button
                          onClick={() => changeMonth(1, true)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                          (day) => (
                            <div key={day} className="text-xs text-gray-500">
                              {day}
                            </div>
                          )
                        )}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {generateDates(returnMonth).map((day, index) => (
                          <button
                            key={index}
                            onClick={() => handleDateClick(day, true)}
                            disabled={isDateDisabled(day, true)}
                            className={`p-2 text-sm rounded-md ${
                              !day ? "invisible" : ""
                            } ${
                              isDateDisabled(day, true)
                                ? "text-gray-300 cursor-not-allowed"
                                : "hover:bg-gray-100"
                            } ${
                              selectedReturnDate &&
                              day === selectedReturnDate.getDate() &&
                              returnMonth.getMonth() ===
                                selectedReturnDate.getMonth()
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

                {/* To seat */}
                <div ref={dropdownRef} className="relative">
                  <button
                    className="flex items-center gap-2 px-4 py-2 border rounded-md h-full w-48"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <IoPersonSharp size={24} color="#6E7491" />
                    <div className="w-full flex items-start flex-col ">
                      <span className="text-black text-[14px] font-bold flex">
                        {totalTravelers} Travelers
                      </span>
                      <div className="w-full text-start text-gray-700 text-[12px]">
                        {selectedClass}
                      </div>
                    </div>
                  </button>

                  {showDropdown && (
                    <div className="absolute top-15 right-0 w-[347px] bg-white border rounded-lg shadow-lg p-4">
                      {[
                        { label: "Adult", type: "adult", description: "" },
                        {
                          label: "Children",
                          type: "children",
                          description: "(Aged 2 - 12 yrs)",
                        },
                        {
                          label: "Infant",
                          type: "infant",
                          description: "(Below 2 yrs)",
                        },
                      ].map(({ label, type, description }) => (
                        <div
                          key={type}
                          className="flex items-center justify-between py-2 border-b last:border-none"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {label}
                            </p>
                            {description && (
                              <p className="text-xs text-gray-500">
                                {description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              className={`p-1 rounded-full border ${
                                travelers[type] === 0
                                  ? "text-gray-300 border-gray-300"
                                  : "text-blue-500 border-blue-500"
                              }`}
                              onClick={() => decrementTraveler(type)}
                              disabled={travelers[type] === 0}
                            >
                              -
                            </button>
                            <span>{travelers[type]}</span>
                            <button
                              className="p-1 rounded-full border text-blue-500 border-blue-500"
                              onClick={() => incrementTraveler(type)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Seat Class
                        </label>
                        <select
                          className="w-full border rounded-md px-3 py-2"
                          value={selectedClass}
                          onChange={(e) => setSelectedClass(e.target.value)}
                        >
                          {seatClasses.map((seatClass) => (
                            <option key={seatClass} value={seatClass}>
                              {seatClass}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                        onClick={() => setShowDropdown(false)}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {selectedOption === "Multi City" && (
              <>
                {/* From Dropdown */}
                <div ref={fromRef} className="relative w-[282px]">
                  <div
                    onClick={handleFromClick}
                    className="w-full h-full p-3 border rounded-lg flex items-center justify-between cursor-pointer "
                  >
                    <div className="flex items-center gap-3">
                      <MdFlightTakeoff className="text-gray-400" size={20} />
                      {fromCity ? (
                        renderSelectedCity(fromCity)
                      ) : (
                        <span className="text-gray-700">City or airport</span>
                      )}
                    </div>
                  </div>

                  {fromDropdownOpen && (
                    <div className="absolute bg-white border rounded-lg shadow-lg z-10 max-h-[300px] w-[380px] overflow-y-auto">
                      {airports.map((city) => (
                        <div
                          key={city.code}
                          className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 
               ${
                 isCityDisabled(city, "from")
                   ? "opacity-50 cursor-not-allowed"
                   : ""
               }`}
                          onClick={() =>
                            !isCityDisabled(city, "from") &&
                            handleCitySelect(city, "from")
                          }
                        >
                          <MdFlightTakeoff
                            size={16}
                            className="text-gray-400"
                          />
                          <div>
                            <div className="font-medium">{city.name}</div>
                            <div className="text-sm text-gray-500">
                              {city.city}
                            </div>
                          </div>
                          <div className="ml-auto text-gray-400">
                            {city.code}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* To Dropdown */}
                <div ref={toRef} className="relative w-[282px]">
                  <div
                    onClick={handleToClick}
                    className="w-full h-full p-3 border rounded-lg flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <MdFlightLand className="text-gray-400" size={20} />
                      {toCity ? (
                        renderSelectedCity(toCity)
                      ) : (
                        <span className="text-gray-700">City or airport</span>
                      )}
                    </div>
                  </div>

                  {toDropdownOpen && (
                    <div className="absolute max-h-[300px] w-[380px] overflow-y-auto bg-white border rounded-lg shadow-lg z-10">
                      {airports.map((city) => (
                        <div
                          key={city.code}
                          className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 
               ${
                 isCityDisabled(city, "to")
                   ? "opacity-50 cursor-not-allowed hover:bg-white"
                   : ""
               }`}
                          onClick={() =>
                            !isCityDisabled(city, "to") &&
                            handleCitySelect(city, "to")
                          }
                        >
                          <MdFlightLand size={16} className="text-gray-400" />
                          <div>
                            <div className="font-medium">{city.name}</div>
                            <div className="text-sm text-gray-500">
                              {city.city}
                            </div>
                          </div>
                          <div className="ml-auto text-gray-400">
                            {city.code}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* To Date */}
                <div ref={calendarRef} className="relative w-[410px]">
                  <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full h-full flex items-center gap-3 px-4 py-2 border rounded-md"
                  >
                    <svg
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="text-gray-700">
                      {formatDate(selectedDate)}
                    </span>
                  </button>

                  {showCalendar && (
                    <div className="absolute top-15 left-0 w-72 bg-white border rounded-lg shadow-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="font-semibold">
                          {months[currentMonth.getMonth()]}{" "}
                          {currentMonth.getFullYear()}
                        </div>
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => changeMonth(-1)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <ChevronLeft className="h-5 w-5 text-gray-500" />
                          </button>
                          <button
                            onClick={() => changeMonth(1)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <ChevronRight className="h-5 w-5 text-gray-500" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                          (day) => (
                            <div key={day} className="text-xs text-gray-500">
                              {day}
                            </div>
                          )
                        )}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {generateDates().map((day, index) => (
                          <button
                            key={index}
                            onClick={() => handleDateClick(day)}
                            disabled={isDateDisabled(day)}
                            className={`
               p-2 text-sm rounded-md
               ${!day ? "invisible" : ""}
               ${
                 isDateDisabled(day)
                   ? "text-gray-300 cursor-not-allowed"
                   : "hover:bg-gray-100"
               }
               ${
                 selectedDate &&
                 day === selectedDate.getDate() &&
                 currentMonth.getMonth() === selectedDate.getMonth()
                   ? "bg-blue-500 text-white hover:bg-blue-600"
                   : ""
               }
             `}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* To seat */}
                <div ref={dropdownRef} className="relative">
                  <button
                    className="flex items-center gap-2 px-4 py-2 border rounded-md h-full w-48"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <IoPersonSharp size={24} color="#6E7491" />
                    <div className="w-full flex items-start flex-col ">
                      <span className="text-black text-[14px] font-bold flex">
                        {totalTravelers} Travelers
                      </span>
                      <div className="w-full text-start text-gray-700 text-[12px]">
                        {selectedClass}
                      </div>
                    </div>
                  </button>

                  {showDropdown && (
                    <div className="absolute top-15 right-0 w-[347px] bg-white border rounded-lg shadow-lg p-4">
                      {[
                        { label: "Adult", type: "adult", description: "" },
                        {
                          label: "Children",
                          type: "children",
                          description: "(Aged 2 - 12 yrs)",
                        },
                        {
                          label: "Infant",
                          type: "infant",
                          description: "(Below 2 yrs)",
                        },
                      ].map(({ label, type, description }) => (
                        <div
                          key={type}
                          className="flex items-center justify-between py-2 border-b last:border-none"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {label}
                            </p>
                            {description && (
                              <p className="text-xs text-gray-500">
                                {description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              className={`p-1 rounded-full border ${
                                travelers[type] === 0
                                  ? "text-gray-300 border-gray-300"
                                  : "text-blue-500 border-blue-500"
                              }`}
                              onClick={() => decrementTraveler(type)}
                              disabled={travelers[type] === 0}
                            >
                              -
                            </button>
                            <span>{travelers[type]}</span>
                            <button
                              className="p-1 rounded-full border text-blue-500 border-blue-500"
                              onClick={() => incrementTraveler(type)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Seat Class
                        </label>
                        <select
                          className="w-full border rounded-md px-3 py-2"
                          value={selectedClass}
                          onChange={(e) => setSelectedClass(e.target.value)}
                        >
                          {seatClasses.map((seatClass) => (
                            <option key={seatClass} value={seatClass}>
                              {seatClass}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                        onClick={() => setShowDropdown(false)}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="w-full flex justify-end pr-8 pt-5">
            <button
              onClick={handleSearch}
              className="bg-[#FCEB03] text-[#121619] h-[58px] w-[140px] rounded-[10px] font-medium text-[18px]"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <FlightCenter />
      <Footer />
    </div>
  );
}
