import React, { useState } from "react";
import { GiSteeringWheel } from "react-icons/gi";

const SeatSelection = ({ handleSeatClick, seats, selectedSeats }) => {
  return (
    <div className="bg-white h-auto pb-6 flex flex-col border-[1px] border-[#D2D2D2] items-center w-full">
      <div className="flex flex-col md:flex-row w-full gap-3">
        {/* Left Section */}
        <div className="flex flex-col w-full md:w-[51%] bg-white px-3 lg:px-0 lg:pl-5 pt-2 rounded-lg">
          <h1 className="text-[18px] font-semibold mb-1">
            Seat selection{" "}
            <span className="text-gray-500 text-[15px]">(Outbound)</span>
          </h1>
          <div className="w-full md:w-[98%] lg:ml-2 rounded-[10px] pb-[30px] border-[1px] border-[#D2D2D2]">
            <GiSteeringWheel
              size={50}
              className="ml-[62%] mt-3 text-[#C2C2C2]"
            />
            <div className="w-[90%] md:w-[50%] m-auto mt-5">
              <div className="grid grid-cols-4 gap-1">
                {seats.map((seat) => (
                  <button
                    key={seat.number}
                    className={`w-7 h-6 font-semibold flex items-center justify-center rounded-t-[8px] ${
                      selectedSeats.includes(seat.number)
                        ? "bg-yellow-500 text-white"
                        : seat.status === "male"
                        ? "bg-blue-800 text-white"
                        : seat.status === "female"
                        ? "bg-pink-500 text-white"
                        : "border border-blue-700 text-blue-700"
                    }`}
                    onClick={() => handleSeatClick(seat.number)}
                    disabled={seat.status !== "available"}
                  >
                    {seat.number}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4 w-full md:w-[46%]">
          {/* Seat Status */}
          <div className="bg-white p-2 pl-4 pb-5 rounded-lg mt-10 border-[1px] border-[#D2D2D2]">
            <h4 className="text-lg font-semibold mb-2">Seat Status</h4>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between pr-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-t-[8px] bg-pink-500"></span>
                  <span className="text-[13px] font-medium">
                    Booked by <br /> Female
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-t-[8px] bg-blue-800"></span>
                  <span className="text-[13px] font-medium">
                    Booked by <br /> Male
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-t-[8px] border border-blue-700"></span>
                  <span className="text-[13px] font-medium">
                    Seat Available
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-t-[8px] bg-yellow-500"></span>
                  <span className="text-[13px] font-medium">Seat Selected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-white p-2 pl-4 rounded-lg border-[1px] border-[#D2D2D2]">
            <h4 className="text-lg font-semibold ">Booking Details</h4>
            <p className="text-sm font-medium text-gray-600 mb-4">
              Your selected seats will appear here. You can select a maximum of
              4 seats per booking.
            </p>
            <div className="flex justify-center gap-2 mb-1">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={`w-7 h-6 border-[1px] ${
                    selectedSeats[index]
                      ? "bg-yellow-500 border-yellow-500"
                      : "border-yellow-500"
                  } rounded-t-[8px] flex items-center justify-center text-lg font-medium text-white`}
                >
                  {selectedSeats[index] || ""}
                </div>
              ))}
            </div>
          </div>

          {/* Seat Arrangement */}
          <div className="bg-white p-2 pl-4 rounded-lg border-[1px] border-[#D2D2D2]">
            <h4 className="text-lg font-semibold">Seat arrangement</h4>
            <div className="text-[13px] font-medium text-[#101828] space-y-2">
              <p className="border-b-[1px] pb-2">
                Green - Seat 1 - 16{" "}
                <span className="lg:ml-[21%] md:ml-[21%] sm:ml-[21%] ml-[8%]">Starting from Rs 1782</span>
                <br />
                *Served with Regular Snacks & Drinks
              </p>
              <p className="border-b-[1px] pb-2">
                Yellow - Seat 17 - 28{" "}
                <span className="lg:ml-[18%] md:ml-[18%] sm:ml-[18%] ml-[8%]">Starting from Rs 1683</span>
                <br />
                *Served with Regular Snacks & Drinks
              </p>
              <p className="border-b-[1px] pb-2">
                Orange - Seat 29 - 40{" "}
                <span className="lg:ml-[16%] md:ml-[16%] sm:ml-[16%] ml-[6%]">Starting from Rs 1593</span>
                <br />
                *Served with Drinks Only
              </p>
              <p>
                Grey - Seat 41 - 49{" "}
                <span className="lg:ml-[21%] md:ml-[21%] sm:ml-[21%] ml-[8%]">Starting from Rs 1494</span>
                <br />
                *Served with Drinks Only
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
