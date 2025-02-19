import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import FlightFilter from "./FlightFilter";
import loader from "../../../images/giff.gif";
import { ReactComponent as Logo } from "../../../images/Checkin Logo-02.svg";
import Footer from "../../Home/Footer";
import Navbar from "../../Home/Navbar";

export default function FlightSearchData() {
  const [searchData, setSearchData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const data = localStorage.getItem("flightSearchData");
      if (data) {
        setSearchData(JSON.parse(data));
      }
      setIsLoading(false);
    };

    const loadingTimeout = setTimeout(loadData, 6 * 1000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src={loader} alt="Loading..." />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="bg-[#E4E7EC] h-full w-full px-4 pp lg:px-[106px]">
            <div className="w-full h-auto pb-[14px] bg-[#FCEB03] flex items-center justify-center">
              <div className="bg-white text-black w-[97.5%] lg:w-[97.5%] m-auto mt-5 pl-3 pb-4 rounded-[10px] shadow-md flex flex-col lg:flex-row justify-between pr-2">
                <div>
                  <div className="flex items-center space-x-2 pt-1">
                    <p className="flex items-center text-[16px] lg:text-[18px] font-semibold">
                      <span>{searchData?.fromCity}</span>
                      <span className="mx-2">
                        <FaArrowRightLong />
                      </span>
                      <span>{searchData?.toCity}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-y-1 lg:gap-0">
                    <p className="text-[12px] lg:text-[13px] font-medium text-[#667085]">
                      <strong className="text-black font-medium">
                        Departure:
                      </strong>{" "}
                      {searchData?.departureDate}
                    </p>
                    {searchData?.tripOption === "Return" &&
                      searchData?.returnDate && (
                        <span className="text-[12px] lg:text-[13px] font-medium text-[#667085]">
                          ,{" "}
                          <strong className="text-black font-medium">
                            Return:
                          </strong>{" "}
                          {searchData?.returnDate}
                        </span>
                      )}
                    <span className="border-l border-gray-400 ml-2 text-[12px] lg:text-[13px] font-medium text-[#667085]">
                      <strong className="text-black font-medium ml-1">
                        Trip:
                      </strong>{" "}
                      {searchData?.tripOption}
                    </span>
                    <span className="border-l border-gray-400 ml-2 text-[12px] lg:text-[13px] font-medium text-[#667085]">
                      <strong className="text-black font-medium ml-1">
                        Travellers:
                      </strong>{" "}
                      {Object.entries(searchData?.travelers || {})
                        .filter(([_, value]) => value > 0)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ")}
                    </span>
                    <span className="border-l border-gray-400 ml-2 text-[12px] lg:text-[13px] font-medium text-[#667085]">
                      <strong className="text-black font-medium ml-1">
                        Class:
                      </strong>{" "}
                      {searchData?.travelClass}
                    </span>
                  </div>
                </div>
                <button className="text-[#FCEB03] hidden lg:hidden text-[22px]">
                  <FaEdit />
                </button>
              </div>
            </div>
            <div>
              <FlightFilter
                tripOption={searchData?.tripOption}
                returnDate={searchData?.returnDate}
              />
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
