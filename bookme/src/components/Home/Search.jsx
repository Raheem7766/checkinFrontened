import React, { useEffect, useRef, useState } from "react";
import img from "../../images/download (11).svg";
import img1 from "../../images/download (12).svg";
import DatePicker from "./Date";
import ReturnDate from "./ReturnDate";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useBusSearch } from "../context/context";
import { useNavigate } from "react-router-dom";

const BusSearchForm = ({ onSearch, initialData }) => {
  const navigate = useNavigate();
  // const location = useLocation(); 
  const {
    tripType,
    setTripType,
    showFromDropdown,
    setShowFromDropdown,
    showToDropdown,
    setShowToDropdown,
    showCalendar,
    selectedFrom,
    setSelectedFrom,
    selectedTo,
    setSelectedTo,
    departureDate,
    returnDate,
    isSummaryVisible,
    setIsSummaryVisible,
    pakistanCities,
    toggleFromDropdown,
    toggleToDropdown,
    toggleCalendar,
    handleDepartureDateSelect,
    handleReturnDateSelect,
    handleSearchClick: contextHandleSearchClick,
    handleEditClick,
    setReturnDate,
    setDepartureDate,
    handleSearch,
  } = useBusSearch();

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const calendarRef = useRef(null);

  const formatDateForUrl = (date) => {
    if (!date) return "";
    return date.replace(/\//g, "-");
  };

  const handleSearchClick = () => {
    if (!selectedFrom || !selectedTo || !departureDate) {
      alert("Please fill in all required fields");
      return;
    }

    const searchData = {
      from: selectedFrom,
      to: selectedTo,
      departureDate: departureDate,
      returnDate: returnDate,
      tripType: tripType,
      fromCity: {
        cityName: selectedFrom,
        cityShort: selectedFrom.substring(0, 3).toUpperCase(),
        cityCode: selectedFrom.substring(0, 3).toUpperCase(),
      },
      toCity: {
        cityName: selectedTo,
        cityShort: selectedTo.substring(0, 3).toUpperCase(),
        cityCode: selectedTo.substring(0, 3).toUpperCase(),
      },
    };
    localStorage.setItem("busSearchData", JSON.stringify(searchData));

    setIsSummaryVisible(true);

    const formattedDepartureDate = formatDateForUrl(departureDate);
    const formattedReturnDate = formatDateForUrl(returnDate);

    const searchParams = new URLSearchParams();
    searchParams.append("from", selectedFrom);
    searchParams.append("to", selectedTo);
    searchParams.append("departure", formattedDepartureDate);

    if (tripType === "roundTrip" && returnDate) {
      searchParams.append("return", formattedReturnDate);
    }

    navigate(`/search?${searchParams.toString()}`);

    if (contextHandleSearchClick) {
      contextHandleSearchClick();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromRef.current && !fromRef.current.contains(event.target)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(event.target)) {
        setShowToDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowFromDropdown, setShowToDropdown]);

  useEffect(() => {
    if (initialData) {
      setSelectedFrom(initialData.from);
      setSelectedTo(initialData.to);
      setDepartureDate(initialData.departureDate);
      setReturnDate(initialData.returnDate || "");
      setTripType(initialData.returnDate ? "roundTrip" : "oneWay");
      setIsSummaryVisible(true);
    }
  }, [
    initialData,
    setSelectedFrom,
    setSelectedTo,
    setDepartureDate,
    setReturnDate,
    setTripType,
    setIsSummaryVisible,
  ]);

  const getWidthClass = (type) => {
    return type === "roundTrip" ? "20%" : "w-[26.3%]";
  };

  const getWidthClass1 = (type) => {
    return type === "roundTrip" ? "20%" : "w-[26.6%]";
  };

  const getWidthClass2 = (type) => {
    return type === "roundTrip" ? "w-[245px]" : "w-[100%]";
  };

  const getWidthClass3 = (type) => {
    return type === "roundTrip" ? "w-[245px]" : "w-[100%]";
  };

  const handleDateChange = (e, type) => {
    if (type === "departure") {
      setDepartureDate(e.target.value);
    } else if (type === "return") {
      setReturnDate(e.target.value);
    }
  };

  return (
    <div
      className="pt-5 pl-[45px] pb-6 bg-[#FCEB03] text-[#121619] "
      style={{ height: isSummaryVisible ? "100px" : "265px" }}
    >
      <h1 className="text-[30px] font-semibold">Search for Bus</h1>
      <p className="text-[18.5px] font-normal mt-[4px]">
        Find the best deals for your bus travel
      </p>
      <div className="flex gap-6 mb-6 mt-5">
        <label className="flex items-center">
          <input
            type="radio"
            name="tripType"
            value="oneWay"
            checked={tripType === "oneWay"}
            onChange={(e) => setTripType(e.target.value)}
            className="mr-2 w-4 h-4 "
          />
          <span className="text-[15px] font-medium">One Way</span>
        </label>
        <label className="flex items-center">
          <input 
            type="radio"
            name="tripType"
            value="roundTrip"
            // checked={tripType === "roundTrip"}
            // onChange={(e) => setTripType(e.target.value)}
            className="mr-2 w-4 h-4 "
          />
          <span className="text-[15px] font-medium">Round Trip</span>
        </label>
      </div>

      <div className="flex flex-wrap gap-[6px] relative">
        <div
          className={`${getWidthClass(
            tripType
          )} mt-[8px] relative cursor-pointer`}
          ref={fromRef}
        >
          <div
            className="relative rounded cursor-pointer"
            onClick={toggleFromDropdown}
          >
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <img src={img} alt="SVG" />
            </div>
            <input
              type="text"
              placeholder="From"
              value={selectedFrom}
              readOnly
              className="w-full h-[45px] p-1 pl-12 rounded-[10px] text-black outline-none bg-white placeholder:text-black text-[14px] placeholder:font-normal font-medium"
            />
          </div>

          {showFromDropdown && (
            <div className="absolute top-0 left-[2px] w-full bg-white rounded-b shadow-lg z-10 mt-1">
              <div className="p-3 border-b">
                <h3 className="font-normal text-black text-[20px]">From</h3>
              </div>
              <div className="max-h-[305px] pb-4 overflow-y-auto">
                {pakistanCities.map((city) => (
                  <div
                    key={city}
                    className="flex items-center pl-3 pt-4 hover:bg-gray-100 cursor-pointer text-black text-[15px] font-medium gap-2"
                    onClick={() => {
                      setSelectedFrom(city);
                      setShowFromDropdown(false);
                    }}
                  >
                    <img src={img1} alt="SVG" />
                    {city}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          className={`${getWidthClass1(
            tripType
          )} mt-[8px] relative cursor-pointer`}
          ref={toRef}
        > 
          <div
            className="relative rounded cursor-pointer"
            onClick={toggleToDropdown}
          >
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <img src={img} alt="SVG" />
            </div>
            <input
              type="text"
              placeholder="To"
              value={selectedTo}
              readOnly
              className="w-full h-[45px] p-1 pl-12 rounded-[10px] text-black outline-none bg-white placeholder:text-black text-[14px] placeholder:font-normal font-medium"
            />
          </div>

          {showToDropdown && (
            <div className="absolute top-0 left-[2px] w-full bg-white rounded-b shadow-lg z-10 mt-1">
              <div className="p-3 border-b">
                <h3 className="font-normal text-black text-[20px]">To</h3>
              </div>
              <div className="max-h-[305px] pb-4 overflow-y-auto">
                {pakistanCities.map((city) => (
                  <div
                    key={city}
                    className="flex items-center pl-3 pt-4 hover:bg-gray-100 cursor-pointer text-black text-[15px] font-medium gap-2"
                    onClick={() => {
                      setSelectedTo(city);
                      setShowToDropdown(false);
                    }}
                  >
                    <img src={img1} alt="SVG" />
                    {city}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          className={`${getWidthClass(tripType)} mt-[8px] relative`}
          ref={calendarRef}
        >
          <DatePicker
            toggleCalendar={toggleCalendar}
            getWidthClass2={getWidthClass2(tripType)}
            onDateSelect={handleDepartureDateSelect}
            handleDateChange={handleDateChange}
          />
        </div>

        {tripType === "roundTrip" && (
          <ReturnDate
            widthClass={getWidthClass3(tripType)}
            onDateSelect={handleReturnDateSelect}
          />
        )}

        <button
          className="min-w-[15.6%] h-[45px] px-6 py-3 ml-1 mt-2 bg-[#121619] text-[#FCEB03] text-[16px] rounded-[10px] font-semibold transition-colors flex items-center justify-center gap-2"
          onClick={handleSearchClick}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search
        </button>
      </div>

      <div className="mt-1 flex items-center gap-2 text-sm">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>
          <span className="font-bold text-[15px]">
            <span className="underline font-medium">Subscribe</span>
            BookmeBro
          </span>{" "}
          and get 2% Off on a return ticket
        </span>
      </div>
    </div>
  );
};

export default BusSearchForm;
