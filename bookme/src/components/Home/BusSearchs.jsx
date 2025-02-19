import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useBusSearch } from "../context/context";
import DatePicker from "./Date";

export default function BusSearchs({ initialData }) {
  const navigate = useNavigate();
  const {
    tripType,
    setTripType,
    showFromDropdown,
    setShowFromDropdown,
    showToDropdown,
    setShowToDropdown,
    selectedFrom,
    setSelectedFrom,
    selectedTo,
    setSelectedTo,
    departureDate,
    returnDate,
    setIsSummaryVisible,
    pakistanCities,
    toggleFromDropdown,
    toggleToDropdown,
    toggleCalendar,
    handleDepartureDateSelect,
    handleSearchClick: contextHandleSearchClick,
    setReturnDate,
    setDepartureDate,
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
      className={`grid gap-4 px-2 pb-8 lg:px-8 md:px-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 bg-[#fbfae8] rounded-[20px]`}
    >
      <div>
        <div className="h-auto">
          <label className="block text-[15px] mt-0 md:mt-6 font-medium text-[#666666]">
            Depart From
          </label>
          <div
            className={`${getWidthClass(
              tripType
            )} mt-[8px] w-full relative cursor-pointer`}
            ref={fromRef}
          >
            <div
              className="relative rounded cursor-pointer"
              onClick={toggleFromDropdown}
            >
              <input
                type="text"
                placeholder="Lahore"
                value={selectedFrom}
                readOnly
                className="w-full h-full pb-7 text-black bg-[#fbfae8] outline-none border-b border-[#9D9595] placeholder:text-black text-[30px] placeholder:font-semibold font-medium"
              />  
            </div>

            {showFromDropdown && (
              <div className="absolute top-0 w-[150px] md:w-full bg-white rounded-b shadow-lg z-10 mt-1">
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
                      {city}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div>
          <label className="block text-[15px] mt-0 md:mt-6 font-medium text-[#666666]">
            Going To
          </label>
          <div
            className={`${getWidthClass1(
              tripType
            )} mt-[8px] relative cursor-pointer w-full h-full`}
            ref={toRef}
          >
            <div
              className="relative rounded cursor-pointer"
              onClick={toggleToDropdown}
            >
              <input
                type="text"
                placeholder="Karachi"
                value={selectedTo}
                readOnly
                className="w-full h-full pb-7 border-b border-[#9D9595] text-black bg-[#fbfae8] outline-none placeholder:text-black text-[30px] placeholder:font-semibold font-medium"
              />
            </div>

            {showToDropdown && (
              <div className="absolute top-0 w-[150px] md:w-full bg-white rounded-b shadow-lg z-10 mt-1">
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
                      {city}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="flex gap-[6px] text-[15px] mt-1 md:mt-[22px] font-medium text-[#666666] ">
          Depart Date <ChevronDown />
        </label>
        <div
          className={`${getWidthClass(tripType)} mt-[8px] relative w-full`}
          ref={calendarRef}
        >
          <DatePicker
            toggleCalendar={toggleCalendar}
            getWidthClass2={getWidthClass2(tripType)}
            onDateSelect={handleDepartureDateSelect}
            handleDateChange={handleDateChange}
          />
        </div>
      </div>

      <div className="flex justify-start md:justify-end lg:justify-start items-end ">
        <button
          onClick={handleSearchClick}
          className="bg-[#FCEB03] text-[#121619] px-5 py-4 rounded-md font-medium hover:bg-[#f8ec42]"
        >
          Search
        </button>
      </div>
    </div>
  );
}
