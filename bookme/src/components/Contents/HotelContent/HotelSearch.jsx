import React, { useEffect, useRef, useState } from "react";
import { GiModernCity } from "react-icons/gi";
import { cities } from "../../Data/Data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IoPersonSharp, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function HotelSearch() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("City");
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
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

    console.log("Search Data:", searchData);
    localStorage.setItem("hotelSearchData", JSON.stringify(searchData)); // Save to localStorage
    alert("Search data has been saved to localStorage!");
  };

  return (
    <div className="w-full h-[247px] bg-[#FCEB03] px-[45px] pt-5">
      <h1 className="text-[30px] font-semibold">Search for Hotels</h1>
      <p className="text-[18.5px] font-normal mt-[8px]">
        Find the best and most affordable hotel rooms across Pakistan
      </p>
      <div className="w-full mt-[22px] pb-4 flex flex-wrap gap-2">
        <div
          className="w-[32.5%] h-[45px] bg-white rounded-[5px] cursor-pointer relative"
          ref={dropdownRef}
        >
          <div
            className="flex items-center gap-[14px] h-full w-full pl-[6px]"
            onClick={toggleDropdown}
          >
            <GiModernCity className="text-gray-400" size={20} />
            <h3 className="text-gray-700 font-medium">{selectedCity}</h3>
          </div>
          {isDropdownOpen && (
            <ul className="absolute top-[45px] left-0 w-full bg-white border-[1px] border-[#DCDFE5] rounded-[5px] z-10 max-h-[315px] overflow-y-auto">
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
        <div
          ref={calendarRef}
          className="relative w-[32.7%] bg-white rounded-[5px]"
        >
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full h-full flex items-center gap-3 px-3 py-2 border rounded-md"
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
            <span className="text-gray-700">{formatDate(selectedDate)}</span>
          </button>

          {showCalendar && (
            <div className="absolute top-15 left-0 w-72 bg-white border rounded-lg shadow-lg p-4 z-10">
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
        <div
          ref={returnCalendarRef}
          className="relative w-[32.7%] bg-white rounded-[5px]"
        >
          <button
            onClick={() => setShowReturnCalendar(!showReturnCalendar)}
            className="w-full h-full flex items-center gap-3 px-3 py-2 border rounded-md "
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
            <div className="absolute top-12 left-0 w-72 bg-white border rounded-lg shadow-lg p-4 z-10">
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
        
        <select
          name=""
          id=""
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          className="h-[45px] w-[40.9%] bg-white mt-[6px] outline-none px-2 rounded-[5px]"
        >
          <option value="Rooms">Rooms</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <div
          ref={personRef}
          className="relative w-[41.1%] h-[45px] mt-[6px] bg-white rounded-[5px]"
        >
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-md h-full w-full"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <IoPersonSharp size={24} color="#6E7491" />
            <div className="w-full flex items-start flex-col ">
              <span className="text-black text-[14px] font-bold flex">
                {Object.entries(person)
                  .filter(([_, count]) => count > 0)
                  .map(
                    ([type, count]) =>
                      `${count} ${type.charAt(0).toUpperCase() + type.slice(1)}`
                  )
                  .join(", ")}
              </span>
            </div>
          </button>

          {showDropdown && (
            <div className="absolute top-15 right-0 w-full bg-white border rounded-lg shadow-lg p-4 pt-2">
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
        <div className="flex justify-end w-[16%] h-[45px] mt-[6px]">
          <button
            onClick={handleSearch}
            className="bg-[#121619] flex items-center justify-center gap-1 text-[#FCEB03] w-full h-full rounded-[10px] font-medium text-[18px]"
          >
            <IoSearch />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
