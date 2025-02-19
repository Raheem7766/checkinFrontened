import React, { useState } from "react";
import { IoPartlySunnyOutline, IoSunnyOutline } from "react-icons/io5";
import { MdWbSunny } from "react-icons/md";
import { GiSunCloud } from "react-icons/gi";
import { flightData } from "../Data/Data";
import { LuBaggageClaim } from "react-icons/lu";

const FlightFilter = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("");
  const [selectedStops, setSelectedStops] = useState(null);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Cheapest");
  const [selectedCards, setSelectedCards] = useState({});
  const tabs = ["Cheapest", "Recommended", "Quickest"];

  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleSelectCard = (flight, card) => {
    setSelectedCards(prev => ({
      ...prev,
      [flight.id]: card
    }));
    const selectedPrice = flight[card.priceKey];
    console.log({selectedPrice: `PKR ${Number(selectedPrice).toLocaleString()}`,});
    
  };

  const openModal = (card) => {
    setCurrentCard(card);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentCard(null);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const formatPrice = (price) => {
    return Number(price).toLocaleString();
  };

  const getCurrentPrice = (flight) => {
    const selectedCard = selectedCards[flight.id];
    return selectedCard ? flight[selectedCard.priceKey] : flight.price1;
  };

  const timeRanges = {
    Morning: { start: "6:00 AM", end: "12:00 PM" },
    Noon: { start: "12:00 PM", end: "6:00 PM" },
    Evening: { start: "6:00 PM", end: "11:59 PM" },
    Night: { start: "12:00 AM", end: "6:00 AM" },
  };

  // Utility  functions for conversion and comparison
  const convertToMinutes = (timeStr) => {
    const [timePart, modifier] = timeStr.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    // Adjust hours for 12-hour format
    if (modifier === "pm" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "am" && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  };

  const convertPriceToNumber = (priceStr) => {
    return parseFloat(priceStr.replace("Rs ", "").replace(",", ""));
  };

  const convertDurationToMinutes = (durationStr) => {
    const [hours, minutes] = durationStr.split("h ").map(Number);
    return hours * 60 + (minutes || 0);
  };

  const handleAirlineToggle = (airlineName) => {
    setSelectedAirlines((prevSelected) =>
      prevSelected.includes(airlineName)
        ? prevSelected.filter((name) => name !== airlineName)
        : [...prevSelected, airlineName]
    );
  };

  const isTimeInRange = (time, start, end) => {
    const timeMinutes = convertToMinutes(time);
    const startMinutes = convertToMinutes(start);
    const endMinutes = convertToMinutes(end);

    // Handle range that crosses midnight
    if (startMinutes > endMinutes) {
      return timeMinutes >= startMinutes || timeMinutes <= endMinutes;
    }

    // Normal range within same day
    return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
  };

  // Get current time
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTimeMinutes = hours * 60 + minutes;
    return currentTimeMinutes;
  };

  // Filter flights based on current time
  const filterFlightsByCurrentTime = (flights) => {
    const currentTimeMinutes = getCurrentTime();

    return flights.filter((flight) => {
      const [timePart, modifier] = flight.departureTime.split(" ");
      let [hours, minutes] = timePart.split(":").map(Number);

      // Adjust hours for 12-hour format
      if (modifier === "pm" && hours !== 12) {
        hours += 12;
      }
      if (modifier === "am" && hours === 12) {
        hours = 0;
      }

      const flightTimeMinutes = hours * 60 + minutes;

      // Filter flights departing after current time
      return flightTimeMinutes > currentTimeMinutes;
    });
  };

  // Main filter function
  const filterFlights = () => {
    // First, filter flights based on selected criteria
    let filteredFlights = flightData.filter((flight) => {
      // Time range filter
      if (selectedTimeRange) {
        const { start, end } = timeRanges[selectedTimeRange];

        if (!isTimeInRange(flight.departureTime, start, end)) {
          return false;
        }
      }

      // Stops filter
      if (selectedStops !== null && flight.stops !== selectedStops.toString()) {
        return false;
      }

      // Airlines filter
      if (
        selectedAirlines.length > 0 &&
        !selectedAirlines.includes(flight.name)
      ) {
        return false;
      }

      return true;
    });

    // Filter flights by current time
    filteredFlights = filterFlightsByCurrentTime(filteredFlights);

    // Prepare sorting for different tabs
    const cheapestFlights = [...filteredFlights].sort(
      (a, b) => convertPriceToNumber(a.price) - convertPriceToNumber(b.price)
    );

    const quickestFlights = [...filteredFlights].sort(
      (a, b) =>
        convertDurationToMinutes(a.duration) -
        convertDurationToMinutes(b.duration)
    );

    const recommendedFlights = [...filteredFlights].sort((a, b) => {
      const scoreA =
        convertPriceToNumber(a.price) * 0.6 +
        convertDurationToMinutes(a.duration) * 0.4;

      const scoreB =
        convertPriceToNumber(b.price) * 0.6 +
        convertDurationToMinutes(b.duration) * 0.4;

      return scoreA - scoreB;
    });

    // Prepare tab details
    const tabDetails = {
      Cheapest:
        cheapestFlights.length > 0
          ? {
              price: cheapestFlights[0].price,
              duration: cheapestFlights[0].duration,
            }
          : { price: "N/A", duration: "N/A" },

      Recommended:
        recommendedFlights.length > 0
          ? {
              price: recommendedFlights[0].price,
              duration: recommendedFlights[0].duration,
            }
          : { price: "N/A", duration: "N/A" },

      Quickest:
        quickestFlights.length > 0
          ? {
              price: quickestFlights[0].price,
              duration: quickestFlights[0].duration,
            }
          : { price: "N/A", duration: "N/A" },
    };

    // Sort main flights for display
    const sortedFlights = filteredFlights.sort((a, b) => {
      switch (selectedTab) {
        case "Cheapest":
          return convertPriceToNumber(a.price) - convertPriceToNumber(b.price);

        case "Recommended":
          // Balanced scoring: 60% price, 40% duration
          const scoreA =
            convertPriceToNumber(a.price) * 0.6 +
            convertDurationToMinutes(a.duration) * 0.4;

          const scoreB =
            convertPriceToNumber(b.price) * 0.6 +
            convertDurationToMinutes(b.duration) * 0.4;

          return scoreA - scoreB;

        case "Quickest":
          return (
            convertDurationToMinutes(a.duration) -
            convertDurationToMinutes(b.duration)
          );

        default:
          return 0;
      }
    });

    return {
      filteredFlights: sortedFlights,
      tabDetails,
    };
  };

  // Get filtered flights and tab details
  const { filteredFlights, tabDetails } = filterFlights();

  const handleBookmeClick = (flight) => {
    const selectedCard = selectedCards[flight.id];
    
    if (selectedCard) {
      const selectedPrice = flight[selectedCard.priceKey];
      console.log({
        selectedPrice: `PKR ${Number(selectedPrice).toLocaleString()}`,
        totalPrice: selectedPrice
      });
    } else {
      console.log("Please select a card first");
    }
  };

  return (
    <div>
      <div className="w-full h-[70px] bg-white px-4 rounded-[10px] flex">
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`w-[33.34%] pt-3 border-b-4 ${
              selectedTab === tab ? "border-blue-500" : "border-transparent"
            } h-full cursor-pointer`}
          >
            <h2 className="font-semibold text-[18px]">{tab}</h2>
            <p className="mt-[-5px]">
              {filteredFlights.length > 0
                ? `Rs ${tabDetails[tab].price} • ${tabDetails[tab].duration}`
                : "No flights"}
            </p>
          </div>
        ))}
      </div>
      <h4 className="text-[#212529] text-[15px] font-medium mt-3">
        Departure Time
      </h4>
      <div className="w-full pt-1 flex justify-between flex-wrap">
        {Object.keys(timeRanges).map((timeRangeKey, index) => (
          <div
            key={index}
            className={`w-[47%] h-[75px] mt-3 border-2 rounded-[5px] flex justify-start items-center flex-col pt-2 cursor-pointer ${
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
              {timeRanges[timeRangeKey].start} - {timeRanges[timeRangeKey].end}
            </p>
          </div>
        ))}
      </div>

      <h4 className="text-[#212529] text-[15px] font-medium mt-3">Stops</h4>
      <div className="flex gap-2 mt-2">
        {[0, 1, 2].map((stop) => (
          <button
            key={stop}
            className={`px-4 py-1 border rounded ${
              selectedStops === stop ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() =>
              setSelectedStops(selectedStops === stop ? null : stop)
            }
          >
            {stop === 0 ? "Non-stop" : `${stop} Stop${stop > 1 ? "s" : ""}`}
          </button>
        ))}
      </div>

      <h4 className="text-[#212529] text-[15px] font-medium mt-3">Airlines</h4>
      <div className="flex flex-wrap gap-2 mt-2">
        {Array.from(new Set(flightData.map((flight) => flight.name))).map(
          (airlineName, index) => (
            <label key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={airlineName}
                checked={selectedAirlines.includes(airlineName)}
                onChange={() => handleAirlineToggle(airlineName)}
              />
              <span>{airlineName}</span>
            </label>
          )
        )}
      </div>

      <h4 className="text-[#212529] text-[15px] font-medium mt-4">
        Filtered Flights
      </h4>
      <div>
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight, index) => (
            <div
              key={index}
              className="border p-2 rounded mt-2 bg-gray-100 text-black"
            >

              <div className="flex items-center">
                <img
                  src={flight.img}
                  alt={flight.name}
                  className="w-10 h-10 mr-2"
                />
                <p className="text-sm font-medium">{flight.name}</p>
              </div>
              <p className="text-sm">
                <strong>Departure:</strong> {flight.departureTime} from{" "}
                {flight.departureCityCode}
              </p>
              <p className="text-sm">
                <strong>Arrival:</strong> {flight.arrivalTime} at{" "}
                {flight.arrivalCityCode}
              </p>
              <p className="text-sm">
                <strong>Stops:</strong> {flight.stops}
              </p>
              <p className="text-sm">
                <strong>Duration:</strong> {flight.duration}
              </p>
              <p className="text-sm">
                <strong>Price:</strong> {flight.price}
              </p>
              <div className="flex items-center gap-3 mt-4">
                {cards.map((card) => (
                  <div
                  className={`border rounded-md p-4 pt-3 w-1/3 ${
                    selectedCards[flight.id]?.id === card.id 
                      ? "bg-blue-50 border-blue-500" 
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
                        className="mt-3 text-xs text-gray-600 flex items-center gap-3"
                      >
                        <LuBaggageClaim className="w-4 h-4" />
                        {item}
                      </div>
                    ))}
                    <p className="text-sm font-medium text-blue-600 mt-4 cursor-pointer"
                       onClick={() => openModal(card)}>
                      Details
                    </p>
                    <p className="font-bold text-lg mt-2">
                    {formatPrice(flight[card.priceKey])}
                    </p>
                    <button
                      className="w-full h-10 rounded-lg text-white bg-blue-600 mt-2 hover:bg-blue-700"
                      onClick={() => handleSelectCard(flight, card)}
                    >
                      Select
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleBookmeClick(flight)}
                className="w-full h-[45px] bg-[#1476D1] rounded-[8px] mt-3 text-white hover:bg-[#3776F4]"
              >
                Bookme
              </button>
           </div>
           

            
          ))
        ) : (
          <p>No flights available for the selected filters.</p>
        )}
      </div>
      {showModal && currentCard && (
        <div className="fixed inset-0 flex items-center justify-end bg-black/20 z-50">
          <div className="bg-white p-6 h-full w-[90%] max-w-2xl">
            <button
              className="absolute top-2 right-2 text-xl font-bold text-gray-600"
              onClick={closeModal}
            >
              ×
            </button>
            <h2 className="text-lg font-medium mb-2">
              Baggage Allowance & Policies
            </h2>
            {/* Add your modal content here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightFilter;
