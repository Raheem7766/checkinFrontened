import { Minus, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../../../images/giff.gif";

export default function BazaarDetail({ closeModal, customScrollbarStyles }) {
  const [counter, setcounter] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const basePrice = 500;
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const name = "A Mix of All Things Festive by The Happiness Bazaar";
  const handlePlus = () => {
    setcounter(counter + 1);
  };
  const handleMinus = () => {
    if (counter > 0) {
      setcounter(counter - 1);
    }
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setSelectedDate(value);
    console.log("Selected date:", value);
  };

  const totalPrice = counter * basePrice;

  const handleContinue = () => {
    if (!selectedDate) {
      alert("Please select a date before continuing.");
      return;
    }
    setLoading(true);
    const ticketDetails = {
      selectedDate,
      counter,
      totalPrice,
      name,
    };
    console.log("Ticket Details:", ticketDetails);
    localStorage.setItem("totalPrice", ticketDetails);
    setTimeout(() => {
      setLoading(false);
      navigate("/BazaarCheckout", {
        state: {
          ticketDetails,
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
                src="https://storage.googleapis.com/bookmepk/static/custom/upload/events/bg/mixthings221124.jpg?1"
                alt=""
                className="h-full w-full object-cover rounded-[10px]"
              />
            </div>
            <div className="h-full pt-3">
              <h2 className="text-[18px] font-semibold text-[#101828]">
                {name}
              </h2>
              <h3 className="text-[#212529] text-[15px] pt-2 font-semibold">
                PNCA, F-5/1, Islamabad
              </h3>
              <p className="text-[#212529] text-[15px] pt-1 font-medium">
                Date: Sun, 01 Dec 2024 - Sun, 01 Dec 2024
              </p>
              <p className="text-[#212529] text-[15px] pt-1 font-medium">
                Note: 11:30 AM onwards
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
              <option value="1 Dec, 2024">1 Dec, 2024</option>
              <option value="2 Dec, 2024">2 Dec, 2024</option>
            </select>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
              <div>
                <p className="text-[14px] font-bold text-[#212529] pt-7 tracking-[0.3px]">
                  Single
                </p>
                <h3 className="text-[14px] font-medium text-[#344054] tracking-[0.4px]">
                  Rs {basePrice}
                </h3>
              </div>
              <div className="w-full sm:w-[18.5%] border border-[#D2D2D2] h-[45px] rounded-[10px] mt-2 sm:mt-7 flex">
                <div
                  onClick={handleMinus}
                  className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center font-black text-[#667085] cursor-pointer"
                >
                  <Minus size={18} />
                </div>
                <div className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center text-[14px] text-black">
                  {counter}
                </div>
                <div
                  onClick={handlePlus}
                  className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center font-black text-[#667085] cursor-pointer"
                >
                  <Plus size={18} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-auto pb-12 mt-[14px] bg-white rounded-[10px] border border-[#D2D2D2] px-4 sm:pl-[21px] sm:pr-7 pt-3">
            <h2 className="text-[18px] font-semibold text-[#101828]">
              Event Details
            </h2>
            <p className="text-[14px] font-medium pt-2 text-[#212529] tracking-[0.4px]">
              Lo and behold - The Happiness Bazaar - Festive Edition 2024 is
              back!
            </p>
            <p className="text-[14px] font-medium mt-10 text-[#212529] tracking-[0.4px]">
              With the holiday season just around the corner, THB is bringing
              All Things Festive under one roof!
            </p>
            <p className="text-[14px] font-medium mt-10 text-[#212529] tracking-[0.4px]">
              Whether you are someone looking for wonderful presents for your
              friends and family, a mommy, a teenager, joining in with a group
              of friends or with your grandparents, we have something planned
              for everyone!
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
