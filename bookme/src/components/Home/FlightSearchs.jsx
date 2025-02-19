import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { airports } from "../Data/Data";
import { MdFlightLand, MdFlightTakeoff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import MultiCityTrip from "./MultiCityTrip";

const FlightSearch = () => {
  const [tripType, setTripType] = useState("One Way");
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

  const handleOptionChange = (option) => {
    setTripType(option);
  };

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
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-1 max-w-[200px]">
          <span className="text-[#333333] text-[16px] md:text-[30px] truncate overflow-hidden whitespace-nowrap font-medium">
            {city.city || "Allama Iqbal International Airport"}
          </span>
        </div>
        <span className="text-[#333333] max-w-[200px] text-[12px] md:text-[15px] mt-2 md:mt-0 font-normal truncate overflow-hidden whitespace-nowrap">
          {city.name}
        </span>
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
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month}'${year}`;
  };

  const getDayName = (date) => {
    if (!date) return "";
    return date.toLocaleString("en-US", { weekday: "long" });
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
      tripOption: tripType,
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
        tripType === "Round Trip" && selectedReturnDate
          ? selectedReturnDate.toISOString().split("T")[0]
          : "",
      travelers,
      travelClass: selectedClass,
    };

    localStorage.setItem("flightSearchData", JSON.stringify(searchData));

    navigate(`/FlightSearchData`, { searchData });
  };

  return (
    <div className="sm:p-0 md:p-0 lg:p-6 pb-3 px-2 lg:pb-8 w-full bg-[#fbfae8] rounded-b-[20px]">
      <div className="flex gap-7 mb-4 text-[12px] md:text-[18px] font-normal mt-0 md:mt-1 ml-1">
        {["One Way", "Round Trip", "Multi City"].map((type) => (
          <label
            key={type}
            className={`flex items-center gap-2 cursor-pointer ${
              tripType === type ? "text-[#121619]" : "text-[#333333]"
            }`}
          >
            <input
              type="radio"
              value={type}
              checked={tripType === type}
              onChange={() => setTripType(type)}
              className="form-radio accent-[#FCEB03] text-[#FCEB03] w-4 h-4"
            />
            {type}
          </label>
        ))}
      </div>

      <div
        className={`grid-rows-1 gap-4 sm:p-0 md:p-0 lg:p-4 lg:pt-0 px-2 lg:px-3 md:px-0 ${
          tripType === "Round Trip"
            ? "flex flex-wrap items-center justify-between gap-0 lg:gap-2"
            : "grid gap-4 lg:gap-6"
        } ${
          tripType === "Multi City" ? "gap-4" : "gap-28"
        } lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-2`}
      >
        <div ref={fromRef} className="relative ">
          <div onClick={handleFromClick}>
            <label className="block text-[15px] font-medium text-[#666666]">
              From
            </label>
            <div
              className={`${
                tripType === "Round Trip" ? "w-[130px] md:w-full" : "w-full"
              } h-[75px] pb-0 md:pb-[5px] overflow-hidden border-b border-[#9D9595] flex items-center justify-between cursor-default`}
            >
              <div>
                {fromCity ? (
                  renderSelectedCity(fromCity)
                ) : (
                  <>
                    <div className="flex items-center gap-1 max-w-[200px]">
                      <span className="text-[#333333] text-[16px] md:text-[30px] truncate overflow-hidden whitespace-nowrap font-medium">
                        {"Lahore Pakistan"}
                      </span>
                    </div>
                    <span className="text-[#333333] max-w-[200px] text-[12px] md:text-[15px] font-normal truncate overflow-hidden whitespace-nowrap">
                      {"Allama Iqbal International..."}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          {fromDropdownOpen && (
            <div className="absolute bg-white border rounded-lg shadow-lg z-10 max-h-[300px] w-[305px] md:w-[380px] overflow-y-auto">
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
                  <MdFlightTakeoff size={16} className="text-gray-400" />
                  <div>
                    <div className="font-medium">{city.name}</div>
                    <div className="text-sm text-gray-500">{city.city}</div>
                  </div>
                  <div className="ml-auto text-gray-400">{city.code}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div ref={toRef} className="relative ">
          <div onClick={handleToClick}>
            <label className="block text-[15px] font-medium text-[#666666]">
              To
            </label>
            <div className="w-full h-[75px] pb-0 md:pb-[5px] overflow-hidden border-b border-[#9D9595] flex items-center justify-between cursor-default ">
              <div>
                {toCity ? (
                  renderSelectedCity(toCity)
                ) : (
                  <>
                    <div className="flex items-center gap-1 max-w-[200px]">
                      <span className="text-[#333333] text-[16px] md:text-[30px] truncate overflow-hidden whitespace-nowrap font-medium">
                        {"Multan Pakistan"}
                      </span>
                    </div>
                    <span className="text-[#333333] max-w-[200px] text-[12px] md:text-[15px] font-normal truncate overflow-hidden whitespace-nowrap">
                      {"Multan Iqbal International..."}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          {toDropdownOpen && (
            <div className="absolute max-h-[300px] w-[305px] md:w-[380px] ml-[-160px] md:ml-14 lg:ml-0 overflow-y-auto bg-white border rounded-lg shadow-lg z-10">
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
                    !isCityDisabled(city, "to") && handleCitySelect(city, "to")
                  }
                >
                  <MdFlightLand size={16} className="text-gray-400" />
                  <div>
                    <div className="font-medium">{city.name}</div>
                    <div className="text-sm text-gray-500">{city.city}</div>
                  </div>
                  <div className="ml-auto text-gray-400">{city.code}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div ref={calendarRef} className="relative">
          <div onClick={() => setShowCalendar(!showCalendar)}>
            <label className="flex gap-[6px] text-[15px] font-medium text-[#666666]">
              Departure Date <ChevronDown />
            </label>
            <div className="w-full h-[75px] border-b border-[#9D9595] flex items-center justify-between cursor-default ">
              <div>
                <div className="flex items-center gap-1 max-w-[200px]">
                  <span className="text-[#333333] text-[18px] md:text-[30px] truncate overflow-hidden whitespace-nowrap font-medium">
                    {formatDate(selectedDate)}
                  </span>
                </div>
                <span className="text-[#333333] max-w-[200px] text-[15px] font-normal truncate overflow-hidden whitespace-nowrap">
                  {getDayName(selectedDate) || "Select a date"}
                </span>
              </div>
            </div>
          </div>
          {showCalendar && (
            <div className="absolute top-15 left-2 md:left-0 w-72 z-10 bg-white border rounded-lg shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold">
                  {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
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

        {tripType === "Round Trip" && (
          <>
            <div ref={returnCalendarRef} className="relative">
              <div onClick={() => setShowReturnCalendar(!showReturnCalendar)}>
                <label className="flex gap-[6px] text-[15px] font-medium text-[#666666]">
                  Return Date <ChevronDown />
                </label>
                <div className="w-full h-[75px] border-b border-[#9D9595] flex items-center justify-between cursor-default ">
                  <div>
                    <div className="flex items-center gap-1 max-w-[200px]">
                      <span className="text-[#333333] text-[18px] md:text-[30px] truncate overflow-hidden whitespace-nowrap font-medium">
                        {formatDate(selectedReturnDate)}
                      </span>
                    </div>
                    <span className="text-[#333333] max-w-[200px] text-[15px] font-normal truncate overflow-hidden whitespace-nowrap">
                      {getDayName(selectedReturnDate) || "Select a date"}
                    </span>
                  </div>
                </div>
              </div>
              {showReturnCalendar && (
                <div className="absolute top-[98px] left-[-150px] md:left-0 w-72 bg-white border rounded-lg shadow-lg p-4 z-10">
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
          </>
        )}

        <div ref={dropdownRef} className="relative">
          <div>
            <label className="flex gap-[6px] text-[13px] md:text-[15px] font-medium text-[#666666]">
              Travellers & Class <ChevronDown />
            </label>
            <div className="w-full h-[75px] border-b border-[#9D9595] flex items-center justify-between cursor-default ">
              <button
                className="flex items-center gap-2 px-4 py-2 pl-0 rounded-md h-full w-max"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="w-full flex items-start flex-col ">
                  <span className="text-[#333333] text-[18px] md:text-[30px] truncate overflow-hidden whitespace-nowrap font-medium flex">
                    {totalTravelers} Travelers
                  </span>
                  <div className="w-full text-start text-gray-700 text-[12px]">
                    {selectedClass}
                  </div>
                </div>
              </button>
            </div>
          </div>
          {showDropdown && (
            <div className="absolute top-15 left-[-160px] md:left-0 w-[305px] md:w-[347px] bg-white border rounded-lg shadow-lg p-4">
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
                    <p className="text-sm font-medium text-gray-700">{label}</p>
                    {description && (
                      <p className="text-xs text-gray-500">{description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className={`p-1 rounded-full border ${
                        travelers[type] === 0
                          ? "text-[#121619] border-[#121619]"
                          : "text-[#121619] border-[#FCEB03]"
                      }`}
                      onClick={() => decrementTraveler(type)}
                      disabled={travelers[type] === 0}
                    >
                      -
                    </button>
                    <span>{travelers[type]}</span>
                    <button
                      className="p-1 rounded-full border text-[#121619] border-[#FCEB03]"
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
                className="w-full mt-4 bg-[#FCEB03] text-[#121619] py-2 rounded-md hover:bg-[#faee42]"
                onClick={() => setShowDropdown(false)}
              >
                Done
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-start md:justify-end items-end">
          <button
            onClick={handleSearch}
            className={`bg-[#121619] ${
              tripType === "Multi City" ? "hidden md:block":"block"
            } text-white px-5 py-4 rounded-md font-medium hover:text-[#FCEB03]`}
          >
            Search
          </button>
        </div>
      </div>

      {tripType === "Multi City" && (
        <>
          <MultiCityTrip
            tripType={tripType}
            toCity={toCity}
            renderSelectedCity={renderSelectedCity}
            airports={airports}
            isCityDisabled={isCityDisabled}
            handleCitySelect={handleCitySelect}
            handleSearch={handleSearch}
          />
        </>
      )} 

      <div className="w-full mt-4 px-[6px] flex gap-4">
        <div className="h-[45px] w-max px-2 md:px-[26px] flex items-center justify-center gap-2 bg-[#f9f4ac] border border-[#FCEB03] rounded-[10px]">
          <input
            type="radio"
            name=""
            id=""
            className="form-radio accent-[#FCEB03] text-[#FCEB03] w-4 h-4 mt-[-14px]"
            checked
          />
          <div>
            <h3 className="text-[13px] font-medium text-[#333333]">Regular</h3>
            <h4 className="text-[12px] font-medium text-[#666666]">
              Regular Fares
            </h4>
          </div>
        </div>
        <div className="flex  items-center gap-2">
          <input
            type="checkbox"
            name=""
            id=""
            checked
            className="accent-[#FCEB03] h-5 w-5"
          />
          <h1 className="text-[16px] font-normal text-[#1E1E1E]">
            Non-Stop Flights
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
