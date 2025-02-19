import { Minus, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../../../images/giff.gif";

export default function LahoreDetail({ closeModal, customScrollbarStyles }) {
  const [counters, setCounters] = useState({
    stag: 0,
    vip: 0,
    family: 0,
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const name = "Lahore Feast 2024";
  const navigate = useNavigate();
  const prices = {
    stag: 2500,
    vip: 6000,
    family: 8000,
  };

  useEffect(() => {
    setTotalCount(counters.vip + counters.stag + counters.family);
  }, [counters]);

  const handlePlus = (type) => {
    setCounters((prev) => {
      const updatedCounters = {
        ...prev,
        [type]: prev[type] + 1,
      };
      console.log("Updated counters:", updatedCounters);
      return updatedCounters;
    });
  };

  const handleMinus = (type) => {
    setCounters((prev) => {
      const updatedCounters = {
        ...prev,
        [type]: prev[type] > 0 ? prev[type] - 1 : 0,
      };
      console.log("Updated counters:", updatedCounters);
      return updatedCounters;
    });
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setSelectedDate(value);
    console.log("Selected date:", value);
  };

  const totalPrice =
    counters.stag * prices.stag +
    counters.vip * prices.vip +
    counters.family * prices.family;

  const handleContinue = () => {
    if (!selectedDate) {
      alert("Please select a date before continuing.");
      return;
    }
    const bookingDetails = {
      selectedDate,
      tickets: {
        stag: { count: counters.stag, price: counters.stag * prices.stag },
        vip: { count: counters.vip, price: counters.vip * prices.vip },
        family: {
          count: counters.family,
          price: counters.family * prices.family,
        },
      },
      totalCount,
      totalPrice,
      name,
    };
    setLoading(true);

    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    setTimeout(() => {
      setLoading(false);
      navigate("/LahoreCheckout", {
        state: {
          bookingDetails,
        },
      });
    }, 4000);
  };

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src={loader} alt="" />
        </div>
      )}
      <div className="h-[66px] flex justify-between items-center bg-white mt-[-14px] p-4 pt-1 border-b">
        <h2 className="text-xl font-semibold">Event Preview</h2>
        <button
          onClick={closeModal}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="w-full m-auto h-[calc(100vh-100px)] overflow-y-auto">
        <style>{customScrollbarStyles}</style>
        <div className="w-[100%] m-auto pt-9 px-[18px] ">
          <div className="w-full h-auto sm:h-[190px] bg-white rounded-[10px] border border-[#D2D2D2] flex flex-col sm:flex-row items-center p-4 sm:pl-[14px] gap-3">
            <div className="h-[200px] sm:h-[85%] w-full sm:w-[23%]">
              <img
                src="https://storage.googleapis.com/bookmepk/static/custom/upload/events/bg/lahorefest211024-1.jpg?4"
                alt=""
                className="h-full w-full object-cover rounded-[10px]"
              />
            </div>
            <div className="h-full pt-3">
              <h2 className="text-[18px] font-semibold text-[#101828]">
                {name}
              </h2>
              <h3 className="text-[#212529] text-[15px] pt-4 font-semibold">
                Date: Tue, 31 Dec 2024 - Tue, 31 Dec 2024
              </h3>
              <p className="text-[#212529] text-[15px] pt-1 font-medium">
                Note: Lahore Feast 2024
              </p>
            </div>
          </div>
          <div className="w-full h-auto pb-4 mt-[14px] bg-white rounded-[10px] border border-[#D2D2D2] px-4 sm:pl-[21px] sm:pr-7 pt-3">
            <h2 className="text-[18px] font-semibold text-[#101828]">
              Ticket Details
            </h2>
            <h3 className="text-[14px] font-medium text-[#344054] pt-[10px]">
              Date
            </h3>
            <select
              name=""
              id=""
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full border border-[#D2D2D2] outline-none mt-2 h-[43px] rounded-[10px] px-2"
            >
              <option value="31 Dec, 2024">31 Dec, 2024</option>
              <option value="21 Dec, 2024">21 Dec, 2024</option>
              <option value="11 Dec, 2024">11 Dec, 2024</option>
            </select>

            {Object.keys(prices).map((type) => (
              <div
                key={type}
                className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0 mt-7"
              >
                <div>
                  <p className="text-[14px] font-bold text-[#212529] tracking-[0.3px] capitalize">
                    {type}
                  </p>
                  <h3 className="text-[14px] font-medium text-[#344054] tracking-[0.4px]">
                    Rs {prices[type]}
                  </h3>
                </div>
                <div className="w-full sm:w-[18.5%] border border-[#D2D2D2] h-[45px] rounded-[10px] mt-2 sm:mt-7 flex">
                  <div
                    onClick={() => handleMinus(type)}
                    className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center font-black text-[#667085] cursor-pointer"
                  >
                    <Minus size={18} />
                  </div>
                  <div className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center text-[14px] text-black">
                    {counters[type]}
                  </div>
                  <div
                    onClick={() => handlePlus(type)}
                    className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center font-black text-[#667085] cursor-pointer"
                  >
                    <Plus size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full h-auto pb-12 mt-[14px] bg-white rounded-[10px] border border-[#D2D2D2] px-4 sm:pl-[21px] sm:pr-7 pt-3">
            <h2 className="text-[18px] font-semibold text-[#101828]">
              Event Details
            </h2>
            <p className="text-[14px] font-medium pt-2 text-[#212529] tracking-[0.4px]">
              Lahore Feast 2024 – Don’t Miss Out!
            </p>
            <p className="text-[14px] font-medium pt-5 text-[#212529] tracking-[0.4px]">
              Join us for Lahore Feast on December 31, 2024, for an
              unforgettable celebration of food, fashion, and entertainment.
              Enjoy brand stalls, exciting games, and exclusive surprises for
              all ages.
            </p>
            <p className="text-[14px] font-medium pt-5 text-[#212529] tracking-[0.4px]">
              Mark your calendars and be part of the fun!
            </p>
          </div>
          <div className="mt-4 w-full h-11"></div>
          <div className="fixed bottom-0 right-0 w-full lg:max-w-[50%] flex justify-between bg-white border-t p-3 pl-6">
            <div>
              <p className="text-[15px] text-gray-600 font-medium">Total</p>
              <p className="text-[20px] font-medium text-[#121619]">
                Rs {totalPrice ? totalPrice.toLocaleString() : "--"}
              </p>
            </div>
            <button
              onClick={handleContinue}
              className="w-[105px] h-[45px] mt-1 bg-[#121619] text-white rounded-lg font-medium hover:bg-[#121619]"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
