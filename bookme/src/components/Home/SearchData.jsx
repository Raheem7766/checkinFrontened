import React, { useEffect, useRef, useState } from "react";
import { Wifi } from "lucide-react";
import arrow from "../../images/arrow.svg";
import coin from "../../images/coin.svg";
import {
  MdOutlineAirlineSeatReclineExtra,
  MdOndemandVideo,
} from "react-icons/md";
import { CiHeadphones } from "react-icons/ci";
import { TbPlug } from "react-icons/tb";
import { GiKnifeFork } from "react-icons/gi";
import { useBusSearch } from "../context/context";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Footer from "./Footer";
import BusPreviewPanel from "./BusPreviewPanel";
import Navbar from "./Navbar";
import loader from "../../images/giff.gif";

export default function SearchData({ searchParams }) {
  const dropdownRef = useRef(null);
  const {
    selectedFrom,
    selectedTo,
    departureDate,
    handleEditClick,
    range,
    setRange,
    isDragging,
    setIsDragging,
    selectedBusTypes,
    isOpen,
    setIsOpen,
    selectedSort,
    setSelectedSort,
    selectedTab,
    setSelectedTab,
    filteredAndSortedBuses,
    tabSummary,
    setSelectedFrom,
    setSelectedTo,
    setDepartureDate,
    setSelectedFromCity,
    setSelectedToCity,
    handleCheckboxChange,
  } = useBusSearch();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);
  
  const sortOptions = [
    "Sort By: Recommended",
    "Sort by: Price - Low to High",
    "Sort by: Price - High to Low",
    "Sort by: Departure - Earliest",
  ];

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const from = urlSearchParams.get("from");
    const to = urlSearchParams.get("to");

    if (from) {
      setSelectedFromCity({
        cityName: from,
        cityShort: from.substring(0, 3).toUpperCase(),
        cityCode: from.substring(0, 3).toUpperCase(),
      });
    }

    if (to) {
      setSelectedToCity({
        cityName: to,
        cityShort: to.substring(0, 3).toUpperCase(),
        cityCode: to.substring(0, 3).toUpperCase(),
      });
    }
  }, [setSelectedFromCity, setSelectedToCity]);

  const getCityAbbreviation = (cityName) => {
    return cityName ? cityName.substring(0, 3).toUpperCase() : "";
  };

  useEffect(() => {
    const storedSelectedFrom = localStorage.getItem("selectedFrom");
    const storedSelectedTo = localStorage.getItem("selectedTo");
    const storeddeparturedate = localStorage.getItem("departuredate");

    if (storedSelectedFrom) {
      setSelectedFrom(storedSelectedFrom);
    }

    if (storedSelectedTo) {
      setSelectedTo(storedSelectedTo);
    }
    if (storeddeparturedate) {
      setDepartureDate(storeddeparturedate);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedFrom", selectedFrom);
    localStorage.setItem("selectedTo", selectedTo);
    localStorage.setItem("departuredate", departureDate);
  }, [selectedFrom, selectedTo, departureDate]);

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src={loader} alt="Loading..." />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="w-full h-auto bg-[#FCEB03] flex items-center justify-center px-4 lg:h-[100px] lg:px-11 pb-4 lg:pb-0">
            <div className="bg-white text-black w-full lg:w-[93.5%] mt-4 lg:mt-0 pl-3 pb-4 rounded-[10px] shadow-md flex flex-col lg:flex-row justify-between pr-2">
              <div>
                <div className="flex items-center space-x-2 pt-1">
                  <p className="flex items-center text-[16px] lg:text-[18px] font-semibold text-[#121619]">
                    <span>{selectedFrom}</span>
                    <span className="mx-2 text-[14px] lg:text-[18px]">
                      <FaArrowRightLong />
                    </span>
                    <span>{selectedTo}</span>
                  </p>
                </div>
                <p className="text-[12px] lg:text-[13px] font-medium text-[#667085]">
                  <strong className="text-black font-normal">Departure:</strong>{" "}
                  {departureDate}
                </p>
                {/* Uncomment if needed */}
                {/* {tripType === 'roundTrip' && returnDate && (
        <span>, <strong className='text-black font-normal'>Return:</strong> {returnDate}</span>
      )} */}
              </div>
              <button
                className="text-[#FCEB03] text-[20px] lg:text-[22px] mt-2 lg:mt-0 hidden lg:block"
                onClick={handleEditClick}
              >
                <FaEdit />
              </button>
            </div>
          </div>

          <div className="text-black w-full bg-[#F2F4F7] py-4">
            <div className="w-[93.5%] mx-auto flex flex-wrap lg:flex-nowrap lg:pl-8">
              <div className="w-full lg:w-[197px] h-full bg-white pl-6 pt-2 pb-4 rounded-lg shadow-md">
                <h3 className="text-[16px] font-medium">Price</h3>
                <p className="text-[13px] font-medium text-[#667085] mt-1">
                  Rs 1,990 - Rs 2,000
                </p>
                <div className="relative h-2 bg-gray-200 rounded w-[77%] mt-3 ml-2">
                  <div
                    className="absolute h-[8px] bg-[#FCEB03] rounded"
                    style={{
                      left: `${((range[0] - 1990) / (2054 - 1990)) * 100}%`,
                      right: `${
                        100 - ((range[1] - 1990) / (2054 - 1990)) * 100
                      }%`,
                    }}
                  />
                  <div
                    className={`absolute w-4 h-4 bg-white rounded-full shadow-md cursor-pointer -ml-2 -mt-1.5 ${
                      isDragging ? "ring-2 ring-blue-300" : ""
                    }`}
                    style={{
                      left: `${((range[0] - 1990) / (2054 - 1990)) * 100}%`,
                    }}
                  />
                  <div
                    className={`absolute w-4 h-4 bg-white rounded-full shadow-md cursor-pointer -ml-2 -mt-1.5 ${
                      isDragging ? "ring-2 ring-blue-300" : ""
                    }`}
                    style={{
                      left: `${((range[1] - 1990) / (2054 - 1990)) * 100}%`,
                    }}
                  />
                  <input
                    type="range"
                    min="1990"
                    max="2054"
                    value={range[0]}
                    onChange={(e) =>
                      setRange([parseInt(e.target.value), range[1]])
                    }
                    className="absolute w-full h-1 opacity-0 cursor-pointer"
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                  />
                  <input
                    type="range"
                    min="1990"
                    max="2054"
                    value={range[1]}
                    onChange={(e) =>
                      setRange([range[0], parseInt(e.target.value)])
                    }
                    className="absolute w-full h-1 opacity-0 cursor-pointer"
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                  />
                </div>
                <div className="w-full lg:w-[86%] border-t-2 border-b-2 border-[#D0D5DD] mt-3 pb-4">
                  <div className="text-[16px] font-medium mt-3">
                    Bus Services
                  </div>
                  <div className="space-y-2">
                    {[
                      "Silk Line",
                      "Road Master Bus",
                      "Al Makkah",
                      "Daewoo Express",
                    ].map((busType) => (
                      <div className="flex items-center mt-1" key={busType}>
                        <input
                          type="checkbox"
                          id={busType}
                          checked={selectedBusTypes.includes(busType)}
                          onChange={() => handleCheckboxChange(busType)}
                          className="mr-2 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={busType}
                          className="text-[#667085] text-[13px] font-medium"
                        >
                          {busType}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-[16px] font-medium mt-3">Bus Types</div>
                <div className="space-y-2">
                  {[
                    "Luxury",
                    "Premium Cruise",
                    "Luxury 49",
                    "Gold Class",
                    "Super Luxury",
                  ].map((busType) => (
                    <div className="flex items-center mt-1" key={busType}>
                      <input
                        type="checkbox"
                        id={busType}
                        checked={selectedBusTypes.includes(busType)}
                        onChange={() => handleCheckboxChange(busType)}
                        className="mr-2 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor={busType}
                        className="text-[#667085] text-[13px] font-medium"
                      >
                        {busType}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className=" h-full w-full lg:w-[83.5%] lg:pl-5 pt-3">
                <div className="w-full flex items-center justify-between lg:px-0 h-12">
                  <p className="text-sm lg:text-base font-medium">
                    {filteredAndSortedBuses.length} Buses{" "}
                    <span className="font-normal">found</span>
                  </p>
                  <div
                    className="relative w-[190px] lg:max-w-[232px] h-full"
                    ref={dropdownRef}
                  >
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full h-full bg-white border border-gray-200 rounded text-left text-sm lg:text-base pl-2 font-medium text-gray-800 shadow-sm"
                    >
                      {selectedSort}
                    </button>

                    {isOpen && (
                      <div className="absolute z-50 w-full mt-0.5 border border-gray-300 divide-y divide-gray-200 rounded bg-white shadow-lg overflow-hidden">
                        {sortOptions.map((option, index) => (
                          <div
                            key={index}
                            onClick={() => {
                              setSelectedSort(option);
                              setIsOpen(false);
                            }}
                            className={`text-sm lg:text-base pb-1 pl-4 cursor-pointer ${
                              selectedSort === option
                                ? "bg-gray-600 text-white"
                                : "bg-white text-gray-800 hover:bg-gray-600 hover:text-white"
                            } transition-colors duration-150`}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full h-[103px] rounded-[10px] bg-white mt-4 overflow-x-auto lg:overflow-visible">
                  <div className="flex w-full h-full border rounded-lg bg-white">
                    {["Recommended", "Cheapest", "Earliest"].map((tab) => (
                      <div
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`flex-none lg:flex-1 h-full cursor-pointer transition-all duration-200 relative border-r
                    ${selectedTab === tab ? "bg-blue-50" : "hover:bg-gray-50"}`}
                        style={{ minWidth: "200px" }}
                      >
                        <div className="pl-4 pt-2">
                          <div className="text-[14px] font-medium text-[#747679]">
                            {tab}
                          </div>
                          <div className="text-xl font-medium mt-1">
                            Rs {tabSummary.price}
                          </div>
                          <div className="text-[14px] font-medium mt-1 text-[#747679]">
                            {tabSummary.time}
                          </div>
                        </div>
                        {selectedTab === tab && (
                          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FCEB03]" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {filteredAndSortedBuses.length > 0 ? (
                  filteredAndSortedBuses.map((bus) => (
                    <div
                      key={bus.id}
                      className="border rounded-lg mt-4 bg-white sm:min-h-[204px] md:h-[204px]"
                    >
                      <div className="flex flex-col sm:flex-col md:flex-row justify-between items-start md:items-center w-full md:h-[33px] md:border-b-2 border-[#D0D5DD] p-4 md:p-0">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:pl-4">
                          <span className="text-[16px] md:text-[18px] font-semibold">
                            {bus.name}
                          </span>
                          <span className="text-[12px] md:text-[14px] font-normal text-[#667085]">
                            {bus.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500 text-[13px] font-medium mt-2 md:mt-0 md:pr-5">
                          {bus.icon}
                          <span>{bus.gold}</span>
                        </div>
                      </div>

                      <div className="w-full md:h-[98px] md:border-b-2 border-[#D0D5DD]">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between h-full p-4 md:p-0">
                          <div className="w-full md:w-[50%] flex flex-col md:flex-row md:items-center">
                            <div className="flex justify-center md:h-full md:w-[24.1%] md:flex md:items-center md:justify-center">
                              <img
                                className="rounded-full h-16 w-16 md:h-[70%] md:w-[70%]"
                                src={bus.image}
                                alt={bus.name}
                              />
                            </div>
                            <div className="flex flex- justify-between md:flex-row md:h-full md:w-max mt-4 md:mt-0">
                              <div className="text-center md:text-left md:pl-9 md:pt-5">
                                <h3 className="text-[16px] md:text-[18px] font-semibold">
                                  {getCityAbbreviation(selectedFrom)}
                                </h3>
                                <h4 className="text-[12px] md:text-[14px] font-medium text-[#667085]">
                                  {selectedFrom}
                                </h4>
                              </div>
                              <div className="flex justify-center my-4 md:my-0 md:pt-10 md:pl-[73px]">
                                <img src={arrow} alt="Arrow" className="" />
                              </div>
                              <div className="text-center md:text-left md:pl-[70px] md:pt-5">
                                <h3 className="text-[16px] md:text-[18px] font-semibold">
                                  {getCityAbbreviation(selectedTo)}
                                </h3>
                                <h4 className="text-[12px] md:text-[14px] font-medium text-[#667085]">
                                  {selectedTo}
                                </h4>
                              </div>
                            </div>
                          </div>
                          <div className="md:h-full md:w-[45%] flex justify-center md:justify-end mt-4 md:mt-0">
                            <div className="text-center md:text-left md:pt-5 md:pr-4">
                              <h3 className="text-[16px] md:text-[18px] font-semibold md:ml-2">
                                {bus.time}
                              </h3>
                              <h4 className="text-[12px] md:text-[14px] font-medium text-[#667085]">
                                {bus.seat} seats left
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:h-[72px] flex flex-col md:flex-row justify-between p-4 md:p-0">
                        <div className="md:h-full md:w-max flex flex-col md:flex-row items-center md:pl-4">
                          <div className="flex items-center gap-1 text-gray-600">
                            <span className="text-[12px] md:text-[14px] font-medium text-[#667085]">
                              Earn upto
                            </span>
                            <span className="text-[12px] md:text-[14px] font-medium text-[#121619]">
                              {bus.earn}
                            </span>
                            <img src={coin} className="h-4 w-4 ml-2" alt="" />
                          </div>
                          <div className="flex gap-3 mt-4 md:mt-0 md:ml-4">
                            <MdOutlineAirlineSeatReclineExtra
                              size={18}
                              className="text-[#121619]"
                            />
                            <Wifi size={18} className="text-[#121619]" />
                            <CiHeadphones
                              size={18}
                              className="text-[#121619]"
                            />
                            <MdOndemandVideo
                              size={18}
                              className="text-[#121619]"
                            />
                            <TbPlug size={18} className="text-[#121619]" />
                            <GiKnifeFork size={18} className="text-[#121619]" />
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-3 mt-4 md:mt-0 md:pr-5 md:h-full">
                          <div className="text-center md:text-left">
                            <h3 className="text-[12px] md:text-[14px] font-medium md:ml-4 text-[#667085]">
                              Rs{" "}
                              <span className="line-through">{bus.price}</span>
                            </h3>
                            <h2 className="text-[16px] md:text-[18px] font-medium mt-[-2px]">
                              Rs {bus.price1}
                            </h2>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedBus(bus);
                              setIsPanelOpen(true);
                            }}
                            className="w-full md:w-[87px] h-[45px] text-[15px] font-medium text-[#121619] bg-[#FCEB03] rounded-[10px]"
                          >
                            Bookme
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-white mt-4 rounded-lg">
                    <p className="text-gray-500">
                      No buses found for this route. Please try different search
                      criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <BusPreviewPanel
            isOpen={isPanelOpen}
            onClose={() => setIsPanelOpen(false)}
            busData={selectedBus}
            selectedFrom={selectedFrom}
            selectedTo={selectedTo}
            departureDate={departureDate}
            getCityAbbreviation={getCityAbbreviation}
          />
        </>
      )}
      <Footer />
    </>
  );
}
