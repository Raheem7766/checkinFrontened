import React, { useEffect, useState } from "react";
import { IoPartlySunnyOutline, IoSunnyOutline } from "react-icons/io5";
import { MdWbSunny } from "react-icons/md";
import { GiSunCloud } from "react-icons/gi";
import { flightData } from "../../Data/Data";

import { FaPlane, FaShoppingBag } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { LuBaggageClaim } from "react-icons/lu";
import { FaBullhorn } from "react-icons/fa";
import { IoMdAirplane } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const FlightFilter = ({ tripOption, returnDate }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("");
  const [selectedStops, setSelectedStops] = useState([]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [searchData, setSearchData] = useState(null);
  const [selected, setSelected] = useState("Recommended");
  const tabs = ["Cheapest", "Recommended", "Quickest"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedFlightId, setExpandedFlightId] = useState(null);
  const [selectedCard, setSelectedCard] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCards, setSelectedCards] = useState({});
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [selectedDiv, setSelectedDiv] = useState(1);
  const navigate = useNavigate();

  const selectTab = (tab) => {
    setSelected(tab);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const data = localStorage.getItem("flightSearchData");
    if (data) {
      setSearchData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");
    setIsUserAuthenticated(isAuthenticated);
  }, []);

  if (!searchData) {
    return <div>Loading search data...</div>;
  }

  const {
    fromCity,
    toCity,
    fromCode,
    toCode,
    citynameFrom,
    citynameTo,
    departureDate,
    travelClass,
    travelers,
  } = searchData;

  const cards = [
    {
      id: 1,
      title: "LITE",
      priceKey: "price1",
      baggage: [
        "Check in Baggage: Not included",
        "Carry in Baggage: 1 piece of hand",
      ],
    },
    {
      id: 2,
      title: "VALUE",
      priceKey: "price2",
      baggage: [
        "Check in Baggage: 30kg BAG INCLUDED",
        "Check in Baggage: 1 piece of hand",
      ],
    },
    {
      id: 3,
      title: "FLEX",
      priceKey: "price3",
      baggage: [
        "Check in Baggage: 40kg BAG INCLUDED",
        "Check in Baggage: 1 piece of hand",
      ],
    },
  ];

  const formatPrice = (price) => {
    return Number(price).toLocaleString();
  };

  const handleSelectCard = (flight, card) => {
    setSelectedCards((prev) => ({
      ...prev,
      [flight.id]: card,
    }));
    const selectedPrice = flight[card.priceKey];
  };

  const toggleDetails = (flightId) => {
    setExpandedFlightId(expandedFlightId === flightId ? null : flightId);
  };

  const toggleModal = (flightId, e) => {
    e?.stopPropagation();
    setIsModalOpen(isModalOpen === flightId ? null : flightId);
  };

  const openModal = (card) => {
    setCurrentCard(card);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentCard(null);
  };

  const getFilteredCards = () => {
    if (travelClass === "Economy") return cards.slice(0, 1);
    if (travelClass === "Premium Economy") return cards.slice(0, 2);
    if (travelClass === "Business") return cards.slice(0, 3);
    return [];
  };

  const handleStopsToggle = (stop) => {
    setSelectedStops((prevStops) =>
      prevStops.includes(stop)
        ? prevStops.filter((selectedStop) => selectedStop !== stop)
        : [...prevStops, stop]
    );
  };

  const resetFilters = () => {
    setSelectedTimeRange("");
    setSelectedStops([]);
    setSelectedAirlines([]);
  };

  const timeRanges = {
    Morning: { start: "6:00 AM", end: "12:00 PM" },
    Noon: { start: "12:00 PM", end: "6:00 PM" },
    Evening: { start: "6:00 PM", end: "11:59 PM" },
    Night: { start: "12:00 AM", end: "6:00 AM" },
  };

  const handleAirlineToggle = (airlineName) => {
    setSelectedAirlines((prevSelected) =>
      prevSelected.includes(airlineName)
        ? prevSelected.filter((name) => name !== airlineName)
        : [...prevSelected, airlineName]
    );
  };

  const filterFlights = () => {
    if (!flightData || !Array.isArray(flightData)) {
      console.error("Flight data is not available or invalid");
      return [];
    }

    const currentDateTime = new Date();
    const currentTime = currentDateTime.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    const endOfDay = "23:59";

    const convertTo24HourFormat = (time) => {
      try {
        const [timePart, modifier] = time.split(" ");
        let [hours, minutes] = timePart.split(":");

        hours = parseInt(hours, 10);

        if (modifier === "pm" && hours !== 12) {
          hours += 12;
        }
        if (modifier === "am" && hours === 12) {
          hours = 0;
        }

        const paddedHours = hours.toString().padStart(2, "0");

        return `${paddedHours}:${minutes}`;
      } catch (err) {
        console.error("Error converting time:", time, err);
        return null;
      }
    };

    const filteredFlights = flightData.filter((flight) => {
      const departureTime = convertTo24HourFormat(flight.departureTime);
      if (!departureTime) {
        console.warn("Skipping flight with invalid time:", flight);
        return false;
      }

      if (departureTime < currentTime || departureTime > endOfDay) {
        return false;
      }

      if (selectedTimeRange) {
        const { start, end } = timeRanges[selectedTimeRange];
        const formattedDepartureTime = convertTo24HourFormat(
          flight.departureTime
        );

        const isWithinTimeRange =
          (start <= end &&
            formattedDepartureTime >= start &&
            formattedDepartureTime <= end) ||
          (start > end &&
            (formattedDepartureTime >= start || formattedDepartureTime <= end));

        if (!isWithinTimeRange) return false;
      }

      if (
        selectedStops.length > 0 &&
        !selectedStops.includes(parseInt(flight.stops))
      ) {
        return false;
      }

      if (
        selectedAirlines.length > 0 &&
        !selectedAirlines.includes(flight.name)
      ) {
        return false;
      }

      return true;
    });

    const sortedFlights = filteredFlights.sort((a, b) => {
      if (selected === "Cheapest") {
        return a.price - b.price; 
      }
      if (selected === "Quickest") {
        return b.price - a.price; 
      }
      if (selected === "Recommended") {
        return 0; 
      } 
  
      const timeA = convertTo24HourFormat(a.departureTime);
      const timeB = convertTo24HourFormat(b.departureTime);
      return timeA.localeCompare(timeB);
    });
  
    return sortedFlights;
  };

  const handleBookmeClick = (flight) => {
    const selectedCard = selectedCards[flight.id];

    if (selectedCard) {
      const selectedPrice = flight[selectedCard.priceKey];

      if (isUserAuthenticated) {
        const params = new URLSearchParams({
          RefID: "4a79135c-60da-43c6-becf-86cad4c7212b",
          ItineraryRefID: "01JD3XNM1B6GWDEH2WBA6X6REM",
          [`Flights[0][Sequence]`]: "1",
          [`Flights[0][FlightFare]`]: "01JD3XNM22ZCNAGK18ESMF160C",
        }).toString();
        navigate(`/flights/v2/passenger-detail?${params}`, {
          state: {
            flightDetails: {
              flightId: flight.id,
              selectedCardType: selectedCard.title,
              price: `PKR ${Number(selectedPrice).toLocaleString()}`,
              departureTime: flight.departureTime,
              arrivalTime: flight.arrivalTime,
              departureCityCode: flight.departureCityCode,
              arrivalCityCode: flight.arrivalCityCode,
              airline: flight.name,
              flightImg: flight.img,
              travelClass: travelClass,
              duration: flight.duration,
              citynameFrom: citynameFrom,
              citynameTo: citynameTo,
              departureDate: departureDate,
              fromCity: fromCity,
              toCity: toCity,
              travelers: travelers,
            },
            tripOption,
            returnDate,
          },
        });
      } else {
        navigate("/login");
      }

    } else {
      console.log("Please select a card first");
    }
  };

  const filteredFlights = filterFlights();

  return (
    <div className="w-[97.5%] h-auto m-auto pb-4 mt-7 par flex flex-col lg:flex-row gap-5">
      <div className="h-auto lg:w-[23.7%] par1 md:w-[50%] sm:w-full rounded-[10px] px-4 bg-white pb-10">
        <div className="w-full border-b-2 border-[#D0D5DD] pt-3 flex justify-between items-center pb-4">
          <h2 className="font-bold text-[18px]">Filter</h2>
          <h3
            className="font-bold text-[18px] text-[#FCEB03] cursor-pointer"
            onClick={resetFilters}
          >
            Reset
          </h3>
        </div>
        <h4 className="text-[#212529] text-[15px] font-medium mt-3">
          Departure Time
        </h4>
        <div className="w-full pt-1 flex justify-between flex-wrap">
          {Object.keys(timeRanges).map((timeRangeKey, index) => (
            <div
              key={index}
              className={`w-[47%] h-[75px] mt-3 border-2 rounded-[5px] flex justify-center items-center flex-col cursor-pointer ${
                selectedTimeRange === timeRangeKey
                  ? "border-blue-500"
                  : "border-[#D0D5DD]"
              }`}
              onClick={() =>
                setSelectedTimeRange(
                  selectedTimeRange === timeRangeKey ? "" : timeRangeKey
                )
              }
            >
              {timeRangeKey === "Morning" && <IoPartlySunnyOutline />}
              {timeRangeKey === "Noon" && <IoSunnyOutline />}
              {timeRangeKey === "Evening" && <MdWbSunny />}
              {timeRangeKey === "Night" && <GiSunCloud />}
              <h3 className="text-[14px] font-medium text-[#212529]">
                {timeRangeKey}
              </h3>
              <p className="text-[12px] font-normal text-[#212529]">
                {timeRanges[timeRangeKey].start} -{" "}
                {timeRanges[timeRangeKey].end}
              </p>
            </div>
          ))}
        </div>
        <h4 className="text-[#212529] text-[15px] font-medium mt-4">Stops</h4>
        <div className="flex gap-1 mt-2 flex-col">
          {[0, 1, 2].map((stop) => (
            <label
              key={stop}
              className="flex items-center gap-2 text-black text-[13px] font-medium"
            >
              <input
                type="checkbox"
                checked={selectedStops.includes(stop)}
                onChange={() => handleStopsToggle(stop)}
                className="mr-2 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>
                {stop === 0 ? "Non-stop" : `${stop} Stop${stop > 1 ? "s" : ""}`}
              </span>
            </label>
          ))}
        </div>
        <h4 className="text-[#212529] text-[15px] font-medium mt-4">
          Airlines
        </h4>
        <div className="flex flex-wrap flex-col gap-1 mt-2">
          {Array.from(new Set(flightData.map((flight) => flight.name))).map(
            (airlineName, index) => (
              <label
                key={index}
                className="flex items-center gap-1 text-black text-[13px] font-medium"
              >
                <input
                  type="checkbox"
                  value={airlineName}
                  checked={selectedAirlines.includes(airlineName)}
                  onChange={() => handleAirlineToggle(airlineName)}
                  className="mr-2 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>{airlineName}</span>
              </label>
            )
          )}
        </div>
      </div>
      <div className="w-full lg:w-[74.7%] par2 pb-10">
        <div className="w-full h-auto lg:h-[70px] bg-white px-2 lg:px-4 rounded-[10px] overflow-x-auto scrollbar-hide">
          <div className="flex min-w-max lg:min-w-0 lg:w-full">
            {tabs.map((tab) => (
              <div
                key={tab}
                onClick={() => selectTab(tab)}
                className={`w-[170px] lg:w-[33.34%] py-2 lg:pt-4 border-b-4 ${
                  selected === tab ? "border-[#FCEB03]" : "border-transparent"
                } cursor-pointer text-center lg:text-left whitespace-nowrap`}
              >
                <h2 className="font-semibold text-[16px] lg:text-[18px]">
                  {tab}
                </h2>
                <p className="text-sm lg:mt-[-5px]">Rs 4824 · 9h 45m</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full mt-4 lg:mt-7">
          <div className="space-y-4">
            {filteredFlights.length > 0 ? (
              filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  className={`w-full transition-all duration-300 ${
                    expandedFlightId === flight.id
                      ? "h-auto pb-6"
                      : tripOption === "Return"
                      ? "h-auto lg:h-[242px] pb-2"
                      : "h-auto lg:h-[170px] pb-2"
                  } pt-4 lg:pt-6 px-3 lg:px-5 bg-white rounded-[10px] shadow-md`}
                >
                  <div className="flex justify-between items-center">
                    <div className="bg-[#E0F2FE] text-[11px] font-normal text-[#1476D1] w-auto px-2 lg:w-[11.5%] h-[20px] rounded-[5px] flex items-center justify-center">
                      Recommended
                    </div>
                  </div>

                  <div className="w-full mt-4">
                    <div className="flex flex-col lg:flex-row lg:gap-[70px]">
                      <div className="flex items-center gap-4 lg:w-[16.5%] lg:gap-6">
                        <div className="w-[40px] lg:w-[40.7%] h-full pt-5">
                          <img
                            src={flight.img}
                            alt={flight.name}
                            className="w-full"
                          />
                        </div>
                        <h2 className="text-[#667085] text-[14px] font-medium ">
                          {flight.name}
                        </h2>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:w-[52%] lg:pt-7 lg:pl-3 flex flex-col lg:flex-row">
                        <div className="flex justify-between lg:justify-start w-full">
                          <div>
                            <h2 className="text-[14px] lg:text-[18px] font-semibold">
                              {flight.departureTime}
                            </h2>
                            <h3 className="text-[13px] lg:text-[14px] font-medium text-[#212529]">
                              {fromCode}
                            </h3>
                          </div>

                          <div className="flex flex-col items-center mx-2 lg:mx-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-gray-400" />
                              <div className="flex items-center">
                                <div className="h-px w-12 lg:w-20 border-t-2 border-dashed border-gray-300" />
                                <div className="w-max px-2 lg:px-3 py-1 rounded-full bg-[#FCEB03] text-[#121619] text-[11px] lg:text-[12px] font-medium">
                                  {flight.stops === "0"
                                    ? "Non-stop"
                                    : `${flight.stops}-stop`}
                                </div>
                                <div className="h-px w-12 lg:w-20 border-t-2 border-dashed border-gray-300" />
                              </div>
                              <div className="w-2 h-2 rounded-full bg-gray-400" />
                            </div>
                            <div className="text-xs lg:text-sm text-gray-500 mt-1 lg:mt-[4px]">
                              {flight.duration}
                            </div>
                          </div>

                          <div>
                            <h2 className="text-[14px] lg:text-[18px] font-semibold">
                              {flight.arrivalTime}
                            </h2>
                            <h3 className="text-[13px] lg:text-[14px] font-medium text-[#212529]">
                              {toCode}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`mt-4 lg:mt-0 ${
                          tripOption === "Return" ? "hidden" : ""
                        }`}
                      >
                        <div className="flex flex-col items-center lg:items-start lg:pl-2">
                          <h3 className="text-[14px] font-medium text-[#667085] lg:mt-[-4px]">
                            starting from
                          </h3>
                          <p className="text-[22px] lg:text-[24px] font-bold text-[#121619] mt-[-4px] lg:mt-[-8px]">
                            ₨ {flight.price}
                          </p>
                          <button
                            onClick={() => toggleDetails(flight.id)}
                            className="h-[40px] bg-[#FCEB03] w-full lg:w-[92px] rounded-[5px] mt-2 flex items-center justify-center text-[#121619] hover:bg-[#f2e750]"
                          >
                            Select
                            <ChevronDown className="ml-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {tripOption === "Return" && returnDate && (
                      <>
                        <div className="w-full pt-6 flex gap-[70px]">
                          <div className="h-full w-[16.5%] flex items-center gap-6">
                            <div className="w-[40.7%] h-full pt-2">
                              <img
                                src={flight.img}
                                alt={flight.name}
                                className=""
                              />
                            </div>
                            <h2 className="text-[#667085] text-[14px] font-medium">
                              {flight.name}
                            </h2>
                          </div>
                          <div className="h-full w-[52%] pt-2 pl-3 flex">
                            <div>
                              <h2 className="text-[18px] font-semibold">
                                {flight.departureTime}
                              </h2>
                              <h3 className="text-[14px] font-medium text-[#212529] mt-[-3px]">
                                {toCode}
                              </h3>
                            </div>
                            <div className="flex items-center justify-center flex-col gap-2 ml-4 mt-[1px]">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-gray-400" />
                                <div className="flex items-center">
                                  <div className="h-px w-20 border-t-2 border-dashed border-gray-300" />
                                  <div className="px-3 py-1 rounded-full bg-[#FCEB03] text-[#121619] text-[12px] font-medium">
                                    {flight.stops === "0"
                                      ? "Non-stop"
                                      : `${flight.stops}-stop`}
                                  </div>
                                  <div className="h-px w-20 border-t-2 border-dashed border-gray-300" />
                                </div>
                                <div className="w-2 h-2 rounded-full bg-gray-400" />
                              </div>
                              <div className="text-sm text-gray-500 ml-1 mt-[-8px]">
                                {flight.duration}
                              </div>
                            </div>
                            <div className="ml-3">
                              <h2 className="text-[18px] font-semibold">
                                {flight.arrivalTime}
                              </h2>
                              <h3 className="text-[14px] font-medium text-[#212529] mt-[-3px] ml-11">
                                {fromCode}
                              </h3>
                            </div>
                          </div>
                          <div
                            className={`${
                              tripOption === "Return" ? "mt-[-28px]" : "mt-0"
                            }`}
                          >
                            <h3 className="text-[14px] font-medium pl-12 text-[#667085]">
                              starting from
                            </h3>
                            <p className="text-[24px] font-bold text-[#FCEB03] pl-5 mt-[-8px]">
                              ₨ {flight.price}
                            </p>
                            <button
                              onClick={() => toggleDetails(flight.id)}
                              className="h-[40px] bg-[#FCEB03] w-[92px] ml-10 rounded-[5px] mt-2 flex items-center justify-center text-[#121619] hover:bg-[#ede24b]"
                            >
                              Select
                              <ChevronDown />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {expandedFlightId === flight.id && (
                    <div className="pt-4">
                      <div className="w-full h-auto lg:h-[57px] bg-[#121619] flex flex-col lg:flex-row items-center justify-between px-4 py-3 lg:py-0">
                        <p className="text-[14px] font-medium text-[#F5F5F5] tracking-[0.2px] text-center lg:text-left mb-2 lg:mb-0">
                          Explore your flight details in a click – your journey,
                          your way!
                        </p>
                        <button
                          onClick={(e) => toggleModal(flight.id, e)}
                          className="text-[14px] font-bold underline text-[#F5F5F5]"
                        >
                          Flight Details
                        </button>

                        {isModalOpen === flight.id && (
                          <div
                            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4 lg:px-0"
                            onClick={(e) => toggleModal(flight.id, e)}
                          >
                            <div className="bg-white rounded-lg shadow-md py-2 px-4 pb-6 w-full max-w-[492px] max-h-[90vh] overflow-y-auto">
                              <div className="flex justify-between items-center border-b pb-4 sticky top-0 bg-white">
                                <h3 className="text-xl font-bold">
                                  Flight Details
                                </h3>
                                <button
                                  onClick={(e) => toggleModal(flight.id, e)}
                                  className="text-gray-500 hover:text-gray-700"
                                >
                                  ✖
                                </button>
                              </div>

                              <div className="mt-3 px-3 lg:px-5">
                                <h2 className="text-[14px] font-bold text-[#667085]">
                                  {citynameFrom.split(",")[0]} -{" "}
                                  {citynameTo.split(",")[0]}
                                </h2>
                                <p className="text-[13px] font-normal text-[#667085]">
                                  {flight.stops === "0"
                                    ? "Non-Stop"
                                    : `${flight.stops}-Stop`}{" "}
                                  - Duration: {flight.duration}
                                </p>

                                {/* Timeline Section */}
                                <div className="mt-4 flex flex-wrap lg:flex-nowrap gap-4 lg:gap-0">
                                  {/* Time Column */}
                                  <div className="w-full lg:w-auto">
                                    <div className="flex lg:block">
                                      <div className="w-1/2 lg:w-auto">
                                        <h2 className="text-[14px] font-medium text-[#667085]">
                                          {flight.departureTime}
                                        </h2>
                                        <p className="text-[13px] font-normal text-[#667085]">
                                          {new Date(
                                            departureDate
                                          ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                          })}
                                        </p>
                                      </div>
                                      <p className="text-[13px] font-normal text-[#667085] mt-8 hidden lg:block">
                                        {flight.duration}
                                      </p>
                                      <div className="w-1/2 lg:w-auto lg:mt-8">
                                        <h2 className="text-[14px] font-medium text-[#667085]">
                                          {flight.arrivalTime}
                                        </h2>
                                        <p className="text-[13px] font-normal text-[#667085]">
                                          {new Date(
                                            departureDate
                                          ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                          })}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Timeline */}
                                  <div className="hidden lg:block ml-4 mt-1">
                                    <div className="h-2 w-2 bg-black rounded-[50%]"></div>
                                    <div className="h-[65px] w-[2px] ml-[3px] bg-black"></div>
                                    <IoMdAirplane
                                      className="rotate-180 ml-[-5px] mt-[2px]"
                                      size={18}
                                    />
                                    <div className="h-[60px] w-[2px] ml-[3px] bg-black"></div>
                                    <div className="h-2 w-2 bg-black rounded-[50%]"></div>
                                  </div>

                                  {/* Location Details */}
                                  <div className="w-full lg:w-auto lg:ml-3">
                                    <h2 className="text-[14px] font-medium text-[#667085]">
                                      {fromCity}
                                    </h2>
                                    <p className="text-[13px] font-normal text-[#667085]">
                                      {citynameFrom}
                                    </p>

                                    {/* Airline Info */}
                                    <div className="flex gap-4 mt-7">
                                      <img
                                        className="w-10"
                                        src={flight.img}
                                        alt={flight.name}
                                      />
                                      <div>
                                        <h2 className="text-[14px] font-medium text-[#667085]">
                                          {flight.name}
                                        </h2>
                                        <p className="text-[13px] font-normal text-[#667085]">
                                          (360) - {travelClass}
                                        </p>
                                      </div>
                                    </div>

                                    <h2 className="text-[14px] font-medium text-[#667085] mt-[14px]">
                                      {toCity}
                                    </h2>
                                    <p className="text-[13px] font-normal text-[#667085]">
                                      {citynameTo}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {tripOption === "Return" && returnDate && (
                                <div className="mt-6 border-t pt-4 px-3 lg:px-5">
                                  <h2 className="text-[14px] font-bold text-[#667085]">
                                    {citynameFrom.split(",")[0]} -{" "}
                                    {citynameTo.split(",")[0]}
                                  </h2>
                                  <p className="text-[13px] font-normal text-[#667085]">
                                    {flight.stops === "0"
                                      ? "Non-Stop"
                                      : `${flight.stops}-Stop`}{" "}
                                    - Duration: {flight.duration}
                                  </p>

                                  {/* Timeline Section */}
                                  <div className="mt-4 flex flex-wrap lg:flex-nowrap gap-4 lg:gap-0">
                                    {/* Time Column */}
                                    <div className="w-full lg:w-auto">
                                      <div className="flex lg:block">
                                        <div className="w-1/2 lg:w-auto">
                                          <h2 className="text-[14px] font-medium text-[#667085]">
                                            {flight.departureTime}
                                          </h2>
                                          <p className="text-[13px] font-normal text-[#667085]">
                                            {new Date(
                                              departureDate
                                            ).toLocaleDateString("en-US", {
                                              month: "short",
                                              day: "numeric",
                                            })}
                                          </p>
                                        </div>
                                        <p className="text-[13px] font-normal text-[#667085] mt-8 hidden lg:block">
                                          {flight.duration}
                                        </p>
                                        <div className="w-1/2 lg:w-auto lg:mt-8">
                                          <h2 className="text-[14px] font-medium text-[#667085]">
                                            {flight.arrivalTime}
                                          </h2>
                                          <p className="text-[13px] font-normal text-[#667085]">
                                            {new Date(
                                              departureDate
                                            ).toLocaleDateString("en-US", {
                                              month: "short",
                                              day: "numeric",
                                            })}
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Timeline */}
                                    <div className="hidden lg:block ml-4 mt-1">
                                      <div className="h-2 w-2 bg-black rounded-[50%]"></div>
                                      <div className="h-[65px] w-[2px] ml-[3px] bg-black"></div>
                                      <IoMdAirplane
                                        className="rotate-180 ml-[-5px] mt-[2px]"
                                        size={18}
                                      />
                                      <div className="h-[60px] w-[2px] ml-[3px] bg-black"></div>
                                      <div className="h-2 w-2 bg-black rounded-[50%]"></div>
                                    </div>

                                    {/* Location Details */}
                                    <div className="w-full lg:w-auto lg:ml-3">
                                      <h2 className="text-[14px] font-medium text-[#667085]">
                                        {fromCity}
                                      </h2>
                                      <p className="text-[13px] font-normal text-[#667085]">
                                        {citynameFrom}
                                      </p>

                                      {/* Airline Info */}
                                      <div className="flex gap-4 mt-7">
                                        <img
                                          className="w-10"
                                          src={flight.img}
                                          alt={flight.name}
                                        />
                                        <div>
                                          <h2 className="text-[14px] font-medium text-[#667085]">
                                            {flight.name}
                                          </h2>
                                          <p className="text-[13px] font-normal text-[#667085]">
                                            (360) - {travelClass}
                                          </p>
                                        </div>
                                      </div>

                                      <h2 className="text-[14px] font-medium text-[#667085] mt-[14px]">
                                        {toCity}
                                      </h2>
                                      <p className="text-[13px] font-normal text-[#667085]">
                                        {citynameTo}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 flex overflow-x-auto">
                        {[1, 2].map((id) => (
                          <div
                            key={id}
                            onClick={() => setSelectedDiv(id)}
                            className={`min-w-[150px] lg:w-[14.2%] h-[45px] cursor-pointer transition-colors duration-300 ${
                              selectedDiv === id
                                ? "bg-[#f2e532] border-b border-[#121619]"
                                : ""
                            }`}
                          >
                            <div className="flex items-center justify-center gap-3 font-medium">
                              {id === 1 ? (
                                <>
                                  {fromCode} <FaPlane color="#121619" />{" "}
                                  {toCode}
                                </>
                              ) : (
                                <>
                                  {toCode} <FaPlane color="#121619" />{" "}
                                  {fromCode}
                                </>
                              )}
                            </div>
                            <p className="text-[13px] font-medium text-[#475467] text-center lg:ml-[17px] lg:mt-[-3px]">
                              {cards.find((card) => card.id === selectedCard)
                                ?.title || "LITE"}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col lg:flex-row items-stretch gap-4 mt-4 overflow-x-auto">
                        {getFilteredCards().map((card) => (
                          <div
                            key={card.id}
                            className={`min-w-[280px] lg:min-w-0 lg:w-1/3 border rounded-md p-4 pt-3 ${
                              selectedCards[flight.id]?.id === card.id
                                ? "bg-yellow-50 border-yellow-500"
                                : ""
                            }`}
                          >
                            <h4 className="font-bold text-sm border-b-2 pb-4">
                              {card.title}
                            </h4>
                            <p className="text-sm mt-2">
                              <strong>Baggage:</strong>
                            </p>
                            {card.baggage.map((item, index) => (
                              <div
                                key={index}
                                className="mt-3 text-[12px] font-medium text-[#475467] flex items-center gap-3"
                              >
                                <LuBaggageClaim size={14} color="#475467" />
                                {item}
                              </div>
                            ))}
                            <p className="text-[12px] font-medium text-[#475467] mt-1">
                              Baggage
                            </p>
                            <p className="text-[13px] font-semibold mt-4">
                              Fare Rules
                            </p>
                            <p
                              className="text-[14px] font-medium text-[#121619] mt-5 cursor-pointer"
                              onClick={() => openModal(card)}
                            >
                              Details
                            </p>
                            <p className="font-bold text-lg mt-[-2px]">
                              Rs {formatPrice(flight[card.priceKey])}
                            </p>
                            {showModal && currentCard && (
                              <div className="fixed inset-0 flex items-start sm:items-center justify-end bg-black bg-opacity-20 z-50 h-full">
                                <div className="bg-white h-full w-full sm:w-[90%] lg:max-w-[760px] overflow-y-auto">
                                  <div className="relative p-3 lg:p-6 lg:pl-3 lg:pt-3">
                                    <button
                                      onClick={closeModal}
                                      className="absolute top-2 right-2 text-xl font-bold text-gray-600"
                                    >
                                      &times;
                                    </button>

                                    <h2 className="text-lg font-medium mb-2">
                                      Baggage Allowance & Policies
                                    </h2>

                                    <p className="mt-6 font-medium text-[19px]">
                                      {travelClass}
                                    </p>
                                    <p className="text-[15px] font-semibold text-[#212529]">
                                      Baggage Allowance
                                    </p>

                                    <div className="px-3 sm:px-5 lg:pr-0 mt-6">
                                      <div className="flex items-center justify-between">
                                        <p className="text-[14px] font-bold text-[#667085]">
                                          {citynameFrom.split(",")[0]} -{" "}
                                          {citynameTo.split(",")[0]}
                                        </p>
                                        <ChevronDown
                                          color="#667085"
                                          onClick={() =>
                                            setIsExpanded(!isExpanded)
                                          }
                                          className="cursor-pointer"
                                        />
                                      </div>
                                      <p className="text-[13px] font-normal text-[#667085] mt-[-3px]">
                                        {flight.stops === "0"
                                          ? "Non-Stop"
                                          : `${flight.stops}-Stop`}{" "}
                                        - Duration: {flight.duration}
                                      </p>
                                    </div>

                                    <div
                                      className={`transition-all duration-300 ${
                                        isExpanded
                                          ? "max-h-[500px] py-4"
                                          : "max-h-0"
                                      } overflow-hidden`}
                                    >
                                      <div className="w-full px-4 sm:px-9 flex gap-3">
                                        <FaShoppingBag
                                          size={18}
                                          color="#FCEB03"
                                        />
                                        <div>
                                          <h2 className="text-[14px] font-medium text-[#212529] mt-[-3px]">
                                            Carry Baggage
                                          </h2>
                                          <p className="text-[13px] font-medium text-[#667085]">
                                            1x7 kg
                                          </p>
                                          <p className="text-[13px] font-medium text-[#667085]">
                                            1 piece of Hand Baggage
                                          </p>
                                        </div>
                                      </div>

                                      <div className="w-full px-4 sm:px-9 pt-2 flex gap-3">
                                        <LuBaggageClaim
                                          size={18}
                                          color="#FCEB03"
                                        />
                                        <div>
                                          <h2 className="text-[14px] font-medium text-[#212529]">
                                            Checked Baggage
                                          </h2>
                                          <p className="text-[13px] font-medium text-[#667085]">
                                            1x30 kg
                                          </p>
                                          <p className="text-[13px] font-medium text-[#667085]">
                                            30 KG checked baggage
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="w-full mt-12 px-3 sm:px-5 lg:pr-0">
                                      <div className="flex gap-3">
                                        <FaBullhorn color="#FCEB03" size={15} />
                                        <p className="text-[14px] mt-[-3px] font-medium text-[#212529]">
                                          Regulations on Special Baggage
                                          Allowance
                                        </p>
                                      </div>
                                      <p className="text-[13px] font-medium text-[#667085]">
                                        Each airline has different regulations
                                        on special baggage (such as musical
                                        instruments, sports equipment, etc.).
                                        Therefore, for baggage other than
                                        regular backpacks and suitcases, we
                                        recommend checking the baggage
                                        regulations on the airline's website or
                                        contacting our customer support before
                                        traveling.
                                      </p>
                                    </div>

                                    <div>
                                      <h2 className="text-[15px] font-medium text-[#212529] mt-9">
                                        Cancellation and Change Policies
                                      </h2>
                                      <h3 className="text-[14px] font-semibold text-[#212529] ml-3 sm:ml-5 mt-5">
                                        Cancellation Policies
                                      </h3>
                                      <li className="text-[14px] font-medium text-[#667085] ml-5 sm:ml-8 mt-2">
                                        Cancellation can be done for a fee of
                                        PKR 18160.
                                      </li>
                                      <h3 className="text-[14px] font-semibold text-[#212529] ml-3 sm:ml-5 mt-14">
                                        Change Policies
                                      </h3>
                                      <li className="text-[14px] font-medium text-[#667085] ml-5 sm:ml-8 mt-2">
                                        Rebooking can be done for a fee of PKR
                                        12580.
                                      </li>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            <button
                              className="w-full h-[40px] rounded-[8px] text-[#121619] bg-[#FCEB03] mt-1 hover:bg-[#f7ec4e]"
                              onClick={() => handleSelectCard(flight, card)}
                            >
                              Select
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => handleBookmeClick(flight)}
                        className="w-full h-[45px] bg-[#FCEB03] rounded-[8px] mt-3 text-[#121619] hover:bg-[#f7ec4e]"
                      >
                        Bookme
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No flights available for the selected date and time.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightFilter;
