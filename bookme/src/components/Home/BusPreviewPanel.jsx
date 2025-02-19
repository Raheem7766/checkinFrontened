import React, { useEffect, useState } from "react";
import { X, MapPin } from "lucide-react";
import {
  MdOutlineAirlineSeatReclineExtra,
  MdOndemandVideo,
} from "react-icons/md";
import { CiHeadphones } from "react-icons/ci";
import { TbPlug } from "react-icons/tb";
import { GiKnifeFork } from "react-icons/gi";
import { Wifi } from "lucide-react";
import arrow from "../../images/arrow.svg";
import coin from "../../images/coin.svg";
import { IoChevronDownSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BusPreviewPanel = ({
  isOpen,
  onClose,
  busData,
  selectedFrom,
  selectedTo,
  departureDate,
  getCityAbbreviation,
}) => {
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");
    setIsUserAuthenticated(isAuthenticated);
  }, []);

  const handleContinueClick = () => {
    if (isUserAuthenticated) {
      navigate("/seatmap", {
        state: {
          busName: busData.name,
          busType: busData.type,
          busImage: busData.image,
          selectedFrom: selectedFrom,
          selectedTo: selectedTo,
          departureTime: busData.time,
          seatsLeft: busData.seat,
          departureDate: departureDate,
          droptime: busData.droptime,
          drop: busData.drop,
          pick: busData.pick,
        },
      });
    } else {
      navigate("/login");
    }
  };

  if (!isOpen) return null;

  const amenities = [
    { icon: "🪑", label: "Regular seat" },
    { icon: "📶", label: "Free WIFI" },
    { icon: "🎧", label: "Headphones" },
    { icon: "🎮", label: "Individual entertainment system" },
    { icon: "🔌", label: "Mobile Charging" },
    { icon: "🍽️", label: "Meal is served" },
  ];

  const customScrollbarStyles = `
      .overflow-y-auto::-webkit-scrollbar {
        width: 8px;
      }
      .overflow-y-auto::-webkit-scrollbar-track {
        background-color: #f1f1f1;
      }
      .overflow-y-auto::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 4px;
      }
      .overflow-y-auto::-webkit-scrollbar-thumb:hover {
        background-color: #555;
      }
    `;

  return (
    <div className="fixed inset-0 flex z-10">
    <div
      className="flex-1 bg-black bg-opacity-50 cursor-pointer"
      onClick={onClose}
    />
    <div className="w-full md:max-w-[75%] lg:max-w-[50%] bg-white shadow-xl h-full">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Bus Preview</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div
        className="overflow-y-auto p-2 sm:p-4 pb-32 bg-[#F2F4F7]"
        style={{ maxHeight: isAmenitiesOpen ? "700px" : "600px" }}
      >
        <style>{customScrollbarStyles}</style>
        <div className="mb-6">
          <h3 className="text-lg font-medium">Outbound Ticket</h3>
          <div className="mt-1 bg-white rounded-lg border px-2 sm:px-3 pb-2">
            <div className="w-full sm:w-[98%] h-[50px] m-auto flex items-center justify-between border-b-[1px] border-[#D0D5DD]">
              <div className="flex items-center gap-4 lg:gap-1">
                <h4 className="font-semibold text-[14px] sm:text-lg">{busData.name}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{busData.type}</p>
              </div>
              <p className="text-sm sm:text-base">{departureDate}</p>
            </div>

            <div className="w-full sm:w-[98%] pb-1 m-auto flex flex-col sm:flex-row border-b-[1px] border-[#D0D5DD]">
              <img
                src={busData.image}
                alt={busData.name}
                className="w-12 sm:w-16 h-16 sm:h-20 object-contain rounded-full mx-auto sm:mx-0"
              />
              <div className="flex-1 flex flex-col sm:flex-row">
                <div className="flex justify-center sm:justify-start gap-4 sm:gap-16 md:gap-4 gp1 lg:gap-16 mt-2 sm:mt-0">
                  <div className="text-center sm:text-left sm:pl-9 sm:pt-5">
                    <h3 className="text-base sm:text-[18px] font-semibold">
                      {getCityAbbreviation(selectedFrom)}
                    </h3>
                    <h4 className="text-xs sm:text-[14px] font-medium">{selectedFrom}</h4>
                  </div>
                  <div className="flex items-center sm:pt-2 sm:pl-[3px]">
                    <img src={arrow} alt="Arrow" className="w-8 sm:w-auto" />
                  </div>
                  <div className="text-center sm:text-left sm:pl-[0px] sm:pt-5">
                    <h3 className="text-base sm:text-[18px] font-semibold">
                      {getCityAbbreviation(selectedTo)}
                    </h3>
                    <h4 className="text-xs sm:text-[14px] font-medium">{selectedTo}</h4>
                  </div>
                </div>
                <div className="flex justify-center sm:justify-end flex-1 mt-2 sm:mt-0">
                  <div className="text-center sm:text-right sm:pt-5 sm:pr-4">
                    <h3 className="text-base sm:text-[18px] font-semibold">
                      {busData.time}
                    </h3>
                    <h4 className="text-xs sm:text-[14px] font-medium">
                      {busData.seat} seats left
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-[98%] h-auto sm:h-[50px] m-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-4 py-2 sm:py-0 border-b-[1px] border-[#D0D5DD]">
              <span className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="text-black font-medium">Earn upto</span>
                <span className="text-[#121619] font-medium">{busData.earn}</span>
                <img src={coin} className="h-3 sm:h-4 w-3 sm:w-4" alt="" />
              </span>
              <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
                <MdOutlineAirlineSeatReclineExtra size={18} className="text-[#121619]" />
                <Wifi size={18} className="text-[#121619]" />
                <CiHeadphones size={18} className="text-[#121619]" />
                <MdOndemandVideo size={18} className="text-[#121619]" />
                <TbPlug size={18} className="text-[#121619]" />
                <GiKnifeFork size={18} className="text-[#121619]" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 p-2 sm:pl-2">
              <img
                src={busData.image}
                alt={busData.name}
                className="w-12 sm:w-16 h-16 sm:h-20 object-contain rounded-full"
              />
              <h4 className="font-semibold text-base sm:text-lg text-center sm:text-left">{busData.name}</h4>
            </div>

            <div className="pl-2 sm:pl-3 flex flex-col sm:flex-row">
              <div className={`flex sm:flex-col justify-between ${isAmenitiesOpen ? "gap-4 sm:gap-[107px]" : "gap-4 sm:gap-6"} transition-all duration-300`}>
                <p className="text-base sm:text-[17.5px] font-medium">{busData.time}</p>
                <p className="text-xs sm:text-[14px] font-medium text-[#667085]">03h 30m</p>
                <p className="text-base sm:text-lg font-medium">{busData.droptime}</p>
              </div>

              <div className="hidden sm:block h-full ml-16">
                <div className="h-3 w-3 rounded-full border-[1px] border-yellow-600"></div>
                <div className={`w-1 ${isAmenitiesOpen ? "h-[270px]" : "h-[100px]"} transition-all duration-300 ml-1 bg-[#FCEB03]`}></div>
                <div className="h-3 w-3 rounded-full border-[1px] border-yellow-600"></div>
              </div>

              <div className="flex-1 sm:pl-8 flex flex-col gap-4">
                <div className="flex justify-between items-center gap-2 sm:gap-28 mt-2 sm:mt-2 md:mt-0 lg:mt-0">
                  <p className="text-[14px] sm:text-[18px] tp font-medium text-[#101828]">{busData.pick}</p>
                  <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full flex items-center justify-center text-[#121619] bg-[#FCEB03]">
                    <MapPin size={16} className="sm:size-20" />
                  </div>
                </div>

                <button
                  onClick={() => setIsAmenitiesOpen(!isAmenitiesOpen)}
                  className="w-full h-[30px] rounded-[10px] border-[1px] border-[#D2D2D2] flex justify-between items-center pr-2"
                >
                  <div className="flex items-center pl-2 sm:pl-3 gap-2 sm:gap-3 h-full">
                    <MdOutlineAirlineSeatReclineExtra size={16} className="sm:size-18 text-[#121619]" />
                    <Wifi size={16} className="sm:size-18 text-[#121619]" />
                    <CiHeadphones size={16} className="sm:size-18 text-[#121619]" />
                    <MdOndemandVideo size={16} className="sm:size-18 text-[#121619]" />
                    <TbPlug size={16} className="sm:size-18 text-[#121619]" />
                    <GiKnifeFork size={16} className="sm:size-18 text-[#121619]" />
                  </div>
                  <IoChevronDownSharp />
                </button>

                <div className={`space-y-2 mt-[-15px] transition-all duration-300 overflow-hidden ${
                  isAmenitiesOpen ? "max-h-54" : "max-h-0"
                }`}>
                  {amenities.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center gap-2 sm:gap-28 tpg">
                  <p className="text-[14px] sm:text-[18px] tp1 font-medium text-[#101828]">{busData.drop}</p>
                  <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full flex items-center justify-center text-[#121619] bg-[#FCEB03]">
                    <MapPin size={16} className="sm:size-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-24 mt-10"></div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 w-full md:max-w-[75%] lg:max-w-[50%] flex justify-between bg-white border-t p-3 pl-5">
        <div>
          <p className="text-xs sm:text-sm text-gray-600 font-medium">Starting From</p>
          <div className="flex items-center pl-2 gap-2">
            <p className="text-xs sm:text-sm text-gray-500 line-through font-medium">
              Rs {busData.price}
            </p>
            <p className="text-base sm:text-[18px] font-medium text-[#121619]">
              Rs {busData.price1}
            </p>
          </div>
        </div>
        <button
          onClick={handleContinueClick}
          className="w-[90px] sm:w-[105px] bg-[#FCEB03] text-[#121619] rounded-lg font-medium hover:bg-[#efe44c] text-sm sm:text-base"
        >
          Continue
        </button>
      </div>
    </div>
  </div> 
  );
};

export default BusPreviewPanel;
