import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cities } from "../Data/Data";

export default function HotelSearchs() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Lahore");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showReturnCalendar, setShowReturnCalendar] = useState(false);
  const [selectedReturnDate, setSelectedReturnDate] = useState(null);
  const [returnMonth, setReturnMonth] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("Room");
  const [person, setperson] = useState({
    adult: 1,
    children: 0,
    infant: 0,
    guest:0
  });
  const dropdownRef = useRef(null);
  const calendarRef = useRef(null);
  const returnCalendarRef = useRef(null);
  const personRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectCity = (city) => {
    setSelectedCity(city);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
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
      if (personRef.current && !personRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    setperson((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const decrementTraveler = (type) => {
    if (person[type] > 0) {
      setperson((prev) => ({ ...prev, [type]: prev[type] - 1 }));
    }
  };
  const totalTravelers = Object.values(person).reduce((a, b) => a + b, 0);

  const handleSearch = () => {
    const searchData = {
      city: selectedCity,
      departureDate: selectedDate.toISOString().split("T")[0],
      returnDate: selectedReturnDate.toISOString().split("T")[0],
      travelers: person,
      room: selectedRoom,
    };
    navigate("/hotelSearchData");

    localStorage.setItem("hotelSearchData", JSON.stringify(searchData));
  };
  return (
    <div>
      <div
        className={`grid gap-4 p-4 lg:px-8 pb-6 lg:grid-cols-5 bg-[#fbfae8] md:grid-cols-3 sm:grid-cols-2 grid-cols-2 rounded-[20px]`}
      >
        <div ref={dropdownRef} className="relative">
          <div onClick={toggleDropdown}>
            <label className="block text-[15px] mt-0 md:mt-6 font-medium text-[#666666]">
              Select City Name
            </label>
            <div className="w-full h-[75px] border-b border-[#9D9595] flex items-center justify-between cursor-default ">
              <div>
                <div className="flex items-center gap-1 max-w-[200px]">
                  <span className="text-[#333333] text-[26px] md:text-[30px] truncate font-medium">
                    {selectedCity}
                  </span>
                </div>
                <span className="text-[#333333] text-[15px] font-normal truncate">
                  {"LHR"}
                </span>
              </div>
            </div>
          </div>
          {isDropdownOpen && (
            <ul className="w-[300px] absolute top:[100px] md:top-[121px] left-0 bg-white border-[1px] border-[#DCDFE5] rounded-[5px] z-10 max-h-[315px] overflow-y-auto">
              {cities.map((city, index) => (
                <li
                  key={index}
                  onClick={() => selectCity(city)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-700"
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div ref={calendarRef} className="relative">
          <div onClick={() => setShowCalendar(!showCalendar)}>
            <label className="flex gap-[6px] text-[15px] mt-0 md:mt-[22px] font-medium text-[#666666]">
              Check in <ChevronDown />
            </label>
            <div className="w-full h-[75px] border-b border-[#9D9595] flex items-center justify-between cursor-default ">
              <div>
                <div className="flex items-center gap-1 max-w-[200px]">
                  <span className="text-[#333333] text-[24px] md:text-[28px] font-medium">
                    {formatDate(selectedDate)}
                  </span>
                </div>
                <span className="text-[#333333] text-[15px] font-normal truncate">
                  {getDayName(selectedDate) || "Select a date"}
                </span>
              </div>
            </div>
          </div>
          {showCalendar && (
            <div className="absolute top-15 left-[-150px] md:left-0 w-72 bg-white border rounded-lg shadow-lg p-4 z-10">
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

        <div ref={returnCalendarRef} className="relative">
          <div onClick={() => setShowReturnCalendar(!showReturnCalendar)}>
            <label className="flex gap-[6px] text-[15px] mt-1 md:mt-[22px] font-medium text-[#666666]">
              Check out <ChevronDown />
            </label>
            <div className="w-full h-[75px] border-b border-[#9D9595] flex items-center justify-between cursor-default ">
              <div>
                <div className="flex items-center gap-1 max-w-[200px]">
                  <span className="text-[#333333] text-[23px] md:text-[30px] truncate font-medium">
                    {formatDate(selectedReturnDate)}
                  </span>
                </div>
                <span className="text-[#333333] text-[15px] font-normal truncate">
                  {getDayName(selectedReturnDate) || "Select a date"}
                </span>
              </div>
            </div>
          </div>
          {showReturnCalendar && (
            <div className="absolute top-15 left-0 w-72 bg-white border rounded-lg shadow-lg p-4 z-10">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => changeMonth(-1, true)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-500" />
                </button>
                <div className="font-semibold">
                  {months[returnMonth.getMonth()]} {returnMonth.getFullYear()}
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
                      returnMonth.getMonth() === selectedReturnDate.getMonth()
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

        <div ref={personRef} className="relative">
          <div onClick={() => setShowDropdown(!showDropdown)}>
            <label className="flex gap-[6px] text-[14px] mt-1 md:mt-[22px] md:text-[15px] font-medium text-[#666666]">
              Room <ChevronDown />
            </label>
            <div className="w-full h-[75px] border-b border-[#9D9595] overflow-hidden flex items-center justify-between cursor-default ">
              <button className="flex items-center gap-2 px-4 py-2 pl-0 rounded-md h-full w-48">
                <div className="w-full flex items-start flex-col flex-wrap">
                  <span className="text-[#333333] text-[22px] md:text-[30px] truncate overflow-hidden font-medium">
                    {Object.entries(person)
                      .filter(([_, count]) => count > 0)
                      .map(
                        ([type, count]) =>
                          `${count} ${type.charAt(0).toUpperCase()}${type
                            .charAt(1)
                            .toLowerCase()}${type.charAt(2).toLowerCase()}`
                      )
                      .join(", ")}
                  </span>
                </div>
              </button>
            </div>
          </div>
          {showDropdown && (
            <div className="absolute top-15 right-0 left-[-100px] lg:left-0 md:left-0 w-[250px] md:w-[300px] bg-white border rounded-lg shadow-lg p-4 pt-2">
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
                {
                  label: "Guest",
                  type: "guest",
                  description: "",
                },
              ].map(({ label, type, description }) => (
                <div
                  key={type}
                  className="flex items-center justify-between py-2 last:border-none"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-700">{label}</p>
                    {description && (
                      <p className="text-xs text-gray-500">{description}</p>
                    )}
                  </div>
                  <div className="flex items-center w-[26.5%] h-[43px] border-[2px] border-[#E4E4E4] rounded-[5px]">
                    <button
                      className={`p-1 ${
                        person[type] === 0
                          ? "text-gray-300 border-gray-300"
                          : "text-blue-500 border-blue-500"
                      }`}
                      onClick={() => decrementTraveler(type)}
                      disabled={person[type] === 0}
                      style={{
                        height: "100%",
                        width: "33.5%",
                        borderRight: "1px solid #E4E4E4",
                      }}
                    >
                      -
                    </button>
                    <span
                      style={{
                        height: "100%",
                        width: "33%",
                        borderRight: "1px solid #E4E4E4",
                      }}
                      className="flex items-center justify-center"
                    >
                      {person[type]}
                    </span>
                    <button
                      className="p-1"
                      onClick={() => incrementTraveler(type)}
                      style={{
                        height: "100%",
                        width: "33.5%",
                        borderRight: "1px solid #E4E4E4",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <button
                className="w-full mt-1 bg-[#FCEB03] text-[#121619] py-2 rounded-md hover:bg-[#efe446]"
                onClick={() => setShowDropdown(false)}
              >
                Done
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-start md:justify-end items-end ">
          <button
            onClick={handleSearch}
            className="bg-[#FCEB03] text-[#121619] px-5 py-4 rounded-md font-medium hover:bg-[#f8ec42]"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
