import { ChevronDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { IoMdAirplane } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { countries } from "../../Data/Data";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FlightForm from "./FlightForm";
import loader from "../../../images/giff.gif";
import Footer from "../../Home/Footer";
import Navbar from "../../Home/Navbar";

export default function FlightDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const { flightDetails, tripOption, returnDate } = location.state || {};

  const flightImg = flightDetails?.flightImg;

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const citynameFrom = flightDetails?.citynameFrom || "";
  const citynameTo = flightDetails?.citynameTo || "";

  const fromCity = citynameFrom.split(",")[0] || "";
  const toCity = citynameTo.split(",")[0] || "";
  const airlineName = flightDetails?.airline

  const travelers = flightDetails?.travelers;

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      navigate("/");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div>
        {isLoading ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <img src={loader} alt="" />
          </div>
        ) : (
          <>
            <Navbar />
            <div className="w-full h-auto bg-[#F2F4F7] fp px-4 lg:px-[106px] pt-6">
              <h2 className="text-xl lg:text-[25px] font-semibold text-[#101828] tracking-[0.5px] cursor-default">
                Fill out passenger information
              </h2>

              <div className="w-full h-auto pt-4 pb-4 bg-yellow-50 mt-3 border-2 border-[#121619] rounded-[10px] flex flex-col sm:flex-row items-center gap-2 p-3">
                <div className="w-full sm:w-[62px] h-[50%] rounded-[20px] bg-yellow-50 border-[4px] border-[#121619] text-[14px] font-medium text-[#121619] flex items-center justify-center">
                  Note
                </div>
                <p className="text-[14px] font-medium text-[#121619] tracking-[0.3px] text-center sm:text-left">
                  Spelling of name must match government-issued photo ID
                </p>
              </div>

              <div className="w-full h-auto mt-[14px] flex flex-col lg:flex-row lg:justify-between gap-4">
                <div className="w-full lg:w-[66.5%]">
                  <FlightForm fromCity={fromCity} toCity={toCity} airlineName={airlineName}/>
                </div>

                <div className="w-full lg:w-[32.3%] pb-6 space-y-4">
                  <div className="w-full h-auto pb-4 px-4 lg:px-5 bg-white rounded-[10px] border-2 border-[#D2D2D2]">
                    <div className="w-full pt-5 flex justify-between">
                      <div className="flex gap-2">
                        <div className="h-6 w-6 rounded-[50%] bg-[#FCEB03] flex items-center justify-center">
                          <BiSolidPlaneAlt color="#121619" />
                        </div>
                        <h3 className="text-[16px] lg:text-[18px] font-bold text-[#212529]">
                          Flight
                        </h3>
                      </div>
                      <p
                        className="text-[14px] font-medium text-[#121619] underline cursor-pointer"
                        onClick={() => setShowDialog(true)}
                      >
                        Details
                      </p>
                    </div>

                    <div className="w-full border-t-2 border-[#D2D2D2] mt-3">
                      <div className="w-full flex flex-row sm:flex-row justify-between">
                        <div className="flex gap-3">
                          <img
                            src={flightImg}
                            alt="SVG"
                            className="w-8 lg:w-10 mt-3"
                          />
                          <div>
                            <p className="text-[14px] font-bold text-[#212529] cursor-default mt-3">
                              {flightDetails?.departureTime} -{" "}
                              {flightDetails?.arrivalTime}
                            </p>
                            <p className="text-[14px] font-medium text-[#212529] cursor-default">
                              {flightDetails?.departureCityCode} -{" "}
                              {flightDetails?.arrivalCityCode}
                            </p>
                          </div>
                        </div>
                        <div className="sm:text-right">
                          <h3 className="text-[14px] font-bold tracking-[0.4px] text-[#212529] cursor-default mt-3 uppercase">
                            {flightDetails?.travelClass}
                          </h3>
                          <p className="text-[14px] font-medium text-[#212529] cursor-default sm:ml-5">
                            {flightDetails?.duration}
                          </p>
                        </div>
                      </div>
                    </div>

                    {tripOption === "Return" && returnDate && (
                      <div className="w-full mt-3">
                        <div className="w-full flex flex-row sm:flex-row justify-between">
                          <div className="flex gap-3">
                            <img
                              src={flightImg}
                              alt="SVG"
                              className="w-8 lg:w-10 mt-3"
                            />
                            <div>
                              <p className="text-[14px] font-bold text-[#212529] cursor-default mt-3">
                                {flightDetails?.departureTime} -{" "}
                                {flightDetails?.arrivalTime}
                              </p>
                              <p className="text-[14px] font-medium text-[#212529] cursor-default">
                                {flightDetails?.arrivalCityCode} -{" "}
                                {flightDetails?.departureCityCode}
                              </p>
                            </div>
                          </div>
                          <div className="sm:text-right">
                            <h3 className="text-[14px] font-bold tracking-[0.4px] text-[#212529] cursor-default mt-3 uppercase">
                              {flightDetails?.travelClass}
                            </h3>
                            <p className="text-[14px] font-medium text-[#212529] cursor-default sm:ml-5">
                              {flightDetails?.duration}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {showDialog && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                      <div className="bg-white rounded-lg p-4 lg:p-6 w-full max-w-[492px] relative max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b pb-4">
                          <h3 className="text-lg lg:text-xl font-bold">
                            Flight Details
                          </h3>
                          <button
                            onClick={() => setShowDialog(false)}
                            className="text-gray-500 hover:text-gray-700 p-1"
                          >
                            ✖
                          </button>
                        </div>

                        <div className="mt-3 px-4">
                          <h2 className="text-[14px] font-bold text-[#667085]">
                            {fromCity} - {toCity}
                          </h2>
                          <p className="text-[13px] font-normal text-[#667085]">
                            Non-Stop - Duration: {flightDetails?.duration}
                          </p>
                        </div>

                        <div className="flex items-start mt-3">
                          <div className="w-21 px-4">
                            <h2 className="text-[14px] font-medium text-[#667085]">
                              {flightDetails?.departureTime}
                            </h2>
                            <p className="text-sm text-gray-500">
                              {new Date(
                                flightDetails?.departureDate
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                            <p className="text-[13px] font-normal text-[#667085] mt-8">
                              {flightDetails?.duration}
                            </p>
                            <h2 className="text-[14px] font-medium text-[#667085] mt-8">
                              {flightDetails?.arrivalTime}
                            </h2>
                            <p className="text-sm text-gray-500">
                              {new Date(
                                flightDetails?.departureDate
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>

                          <div className="ml-[-7px] mt-1 relative">
                            <div className="h-2 w-2 bg-black rounded-full"></div>
                            <div className="h-[65px] w-[2px] ml-[3px] bg-black"></div>
                            <IoMdAirplane
                              className="rotate-180 ml-[-5px] mt-[2px]"
                              size={18}
                            />
                            <div className="h-[60px] w-[2px] ml-[3px] bg-black"></div>
                            <div className="h-2 w-2 bg-black rounded-full"></div>
                          </div>

                          <div className="ml-3 flex-1">
                            <h2 className="text-[14px] font-medium text-[#667085]">
                              {flightDetails?.fromCity}
                            </h2>
                            <p className="text-[13px] font-normal text-[#667085]">
                              {citynameFrom}
                            </p>
                            <div className="flex gap-4 mt-7">
                              <img
                                className="w-10 h-auto object-contain"
                                src={flightImg}
                                alt={flightDetails?.name}
                              />
                              <div>
                                <h2 className="text-[14px] font-medium text-[#667085]">
                                  {flightDetails?.airline}
                                </h2>
                                <p className="text-[13px] font-normal text-[#667085]">
                                  (360) - {flightDetails?.travelClass}
                                </p>
                              </div>
                            </div>
                            <h2 className="text-[14px] font-medium text-[#667085] mt-[14px]">
                              {flightDetails?.toCity}
                            </h2>
                            <p className="text-[13px] font-normal text-[#667085]">
                              {citynameTo}
                            </p>
                          </div>
                        </div>

                        {tripOption === "Return" && returnDate && (
                          <>
                            <div className="mt-6 px-4 pt-4 border-t">
                              <h2 className="text-[14px] font-bold text-[#667085]">
                                {toCity} - {fromCity}
                              </h2>
                              <p className="text-[13px] font-normal text-[#667085]">
                                Non-Stop - Duration: {flightDetails?.duration}
                              </p>
                            </div>

                            <div className="flex items-start mt-3">
                              <div className="w-21 px-4">
                                <h2 className="text-[14px] font-medium text-[#667085]">
                                  {flightDetails?.departureTime}
                                </h2>
                                <p className="text-sm text-gray-500">
                                  {new Date(
                                    flightDetails?.departureDate
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                                <p className="text-[13px] font-normal text-[#667085] mt-8">
                                  {flightDetails?.duration}
                                </p>
                                <h2 className="text-[14px] font-medium text-[#667085] mt-8">
                                  {flightDetails?.arrivalTime}
                                </h2>
                                <p className="text-sm text-gray-500">
                                  {new Date(
                                    flightDetails?.departureDate
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>

                              <div className="ml-[-7px] mt-1 relative">
                                <div className="h-2 w-2 bg-black rounded-full"></div>
                                <div className="h-[65px] w-[2px] ml-[3px] bg-black"></div>
                                <IoMdAirplane
                                  className="rotate-180 ml-[-5px] mt-[2px]"
                                  size={18}
                                />
                                <div className="h-[60px] w-[2px] ml-[3px] bg-black"></div>
                                <div className="h-2 w-2 bg-black rounded-full"></div>
                              </div>

                              <div className="ml-3 flex-1">
                                <h2 className="text-[14px] font-medium text-[#667085]">
                                  {flightDetails?.toCity}
                                </h2>
                                <p className="text-[13px] font-normal text-[#667085]">
                                  {citynameTo}
                                </p>
                                <div className="flex gap-4 mt-7">
                                  <img
                                    className="w-10 h-auto object-contain"
                                    src={flightImg}
                                    alt={flightDetails?.name}
                                  />
                                  <div>
                                    <h2 className="text-[14px] font-medium text-[#667085]">
                                      {flightDetails?.airline}
                                    </h2>
                                    <p className="text-[13px] font-normal text-[#667085]">
                                      (360) - {flightDetails?.travelClass}
                                    </p>
                                  </div>
                                </div>
                                <h2 className="text-[14px] font-medium text-[#667085] mt-[14px]">
                                  {flightDetails?.fromCity}
                                </h2>
                                <p className="text-[13px] font-normal text-[#667085]">
                                  {citynameFrom}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  <div
                    className={`w-full transition-all duration-300 px-4 lg:px-5 pr-3 pb-2 bg-white rounded-[10px] border-2 border-[#D2D2D2] ${
                      isOpen ? "h-auto" : "h-auto"
                    }`}
                  >
                    <div className="flex justify-between mt-4">
                      <h3 className="text-[16px] lg:text-[18px] font-bold cursor-default text-[#212529]">
                        Price Details
                      </h3>
                      <ChevronDownIcon
                        onClick={toggleDetails}
                        className="cursor-pointer"
                      />
                    </div>
                    <p className="text-[14px] font-medium text-[#212529] cursor-default mt-1 tracking-[0.4px]">
                      Rates, taxes and fees included
                    </p>

                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        isOpen ? "max-h-[1000px]" : "max-h-0"
                      }`}
                    >
                      <div className="space-y-2 pt-3">
                        <div className="flex justify-between">
                          <p className="text-[14px] font-medium text-[#212529]">
                            Rate
                          </p>
                          <p className="text-[14px] font-medium text-[#212529]">
                            Rs {flightDetails?.price}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-[14px] font-medium text-[#212529]">
                            Taxes
                          </p>
                          <p className="text-[14px] font-medium text-[#212529]">
                            Rs 0
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-[14px] font-medium text-[#212529]">
                            Fees
                          </p>
                          <p className="text-[14px] font-medium text-[#212529]">
                            Rs 0
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-[14px] font-medium text-[#198754]">
                            Discount
                          </p>
                          <p className="text-[14px] font-medium text-[#198754]">
                            Rs 0
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`w-full ${
                        isOpen ? "border-t-2 border-[#D2D2D2]" : ""
                      } mt-3`}
                    >
                      <div className="space-y-2 pt-3">
                        <div className="flex justify-between">
                          <p className="text-[14px] font-medium text-[#212529]">
                            Price before discount
                          </p>
                          <p className="text-[14px] font-medium text-[#212529]">
                            Rs {flightDetails?.price}
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-[14px] font-medium text-[#198754]">
                            Total discount
                          </p>
                          <p className="text-[14px] font-medium text-[#198754]">
                            Rs 0
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-[16px] lg:text-[18px] font-bold text-[#212529]">
                            Total price
                          </p>
                          <p className="text-[16px] lg:text-[18px] font-bold text-[#212529]">
                            Rs {flightDetails?.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  );
}
