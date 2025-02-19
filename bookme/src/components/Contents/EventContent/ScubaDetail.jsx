import { Minus, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../../../images/giff.gif";

export default function ScubaDetail({ closeModal, customScrollbarStyles }) {
  const [tickets, setTickets] = useState({
    Cliff: { count: 0, price: 55000 },
    Diving: { count: 0, price: 10500 },
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const name = "Scuba Diving";
  const totalPrice =
    tickets.Cliff.count * tickets.Cliff.price +
    tickets.Diving.count * tickets.Diving.price;

  const handleIncrement = (type) => {
    setTickets((prev) => ({
      ...prev,
      [type]: { ...prev[type], count: prev[type].count + 1 },
    }));
  };

  const handleDecrement = (type) => {
    setTickets((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        count: prev[type].count > 0 ? prev[type].count - 1 : 0,
      },
    }));
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setSelectedDate(value);
    console.log("Selected date:", value);
  };

  const handleContinue = () => {
    if (!selectedDate) {
      alert("Please select a date before continuing.");
      return;
    }
    setLoading(true);

    const ticketDetails = {
      selectedDate,
      tickets,
      totalPrice,
      name,
    };

    console.log("Ticket Details:", ticketDetails);
    localStorage.setItem("ticketDetails", JSON.stringify(ticketDetails));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/ScubaCheckout", {
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
            <div className="h-[200px] sm:h-[85%] w-full sm:w-[53%]">
              <img
                src="https://storage.googleapis.com/bookmepk/static/custom/upload/events/bg/scubadiving241024.png"
                alt=""
                className="h-full w-full object-cover rounded-[10px]"
              />
            </div>
            <div className="h-full pt-3">
              <h2 className="text-[18px] font-semibold text-[#101828]">
                {name}
              </h2>
              <h3 className="text-[#212529] text-[15px] pt-2 font-semibold">
                Teen Talwar PSO House, Karachi
              </h3>
              <p className="text-[#212529] text-[15px] pt-1 font-medium">
                Date: Sun, 24 Nov 2024 - Tue, 31 Dec 2024
              </p>
              <p className="text-[#212529] text-[15px] pt-1 font-medium">
                Note: Non-Swimmers can equally be a part of this activity by
                wearing Life-Jacket in our Life-guards and
                under the supervision our Instructors.
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
              <option value="24 Nov, 2024">24 Nov, 2024</option>
              <option value="25 Nov, 2024">25 Nov, 2024</option>
              <option value="26 Nov, 2024">26 Nov, 2024</option>
              <option value="27 Nov, 2024">27 Nov, 2024</option>
              <option value="28 Nov, 2024">28 Nov, 2024</option>
              <option value="29 Nov, 2024">29 Nov, 2024</option>
              <option value="30 Nov, 2024">30 Nov, 2024</option>
              <option value="01 Dec, 2024">01 Dec, 2024</option>
              <option value="02 Dec, 2024">02 Dec, 2024</option>
              <option value="03 Dec, 2024">03 Dec, 2024</option>
              <option value="04 Dec, 2024">04 Dec, 2024</option>
              <option value="05 Dec, 2024">05 Dec, 2024</option>
              <option value="06 Dec, 2024">06 Dec, 2024</option>
              <option value="07 Dec, 2024">07 Dec, 2024</option>
              <option value="08 Dec, 2024">08 Dec, 2024</option>
              <option value="09 Dec, 2024">09 Dec, 2024</option>
              <option value="10 Dec, 2024">10 Dec, 2024</option>
            </select>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
              <div>
                <p className="text-[14px] font-bold text-[#212529] pt-7 tracking-[0.3px]">
                  Snorkeling+ Cliff jumping+ Underwater <br /> photography (Rs.
                  500 Discount Applied)
                </p>
                <h3 className="text-[14px] font-medium text-[#344054] tracking-[0.4px]">
                  <span className="line-through">Rs 6000</span> Rs{" "}
                  {tickets.Cliff.price.toLocaleString()}
                </h3>
                <p className="text-[14px] font-medium text-[#344054]">
                  {/* Quantity: {tickets.Cliff .count} */}
                </p>
              </div>
              <div className="w-full sm:w-[18.5%] border border-[#D2D2D2] h-[45px] rounded-[10px] mt-2 sm:mt-7 flex">
                <div
                  onClick={() => handleDecrement("Cliff")}
                  className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center font-black text-[#667085] cursor-pointer"
                >
                  <Minus size={18} />
                </div>
                <div className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center text-[14px] text-black">
                  {tickets.Cliff.count}
                </div>
                <div
                  onClick={() => handleIncrement("Cliff")}
                  className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center font-black text-[#667085] cursor-pointer"
                >
                  <Plus size={18} />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
              <div>
                <p className="text-[14px] font-bold text-[#212529] pt-7 tracking-[0.3px]">
                  Scuba Diving +Snorkeling+ Cliff <br /> jumping+ Underwater
                  photography (Rs. <br /> 1000 Discount Applied)
                </p>
                <h3 className="text-[14px] font-medium text-[#344054] tracking-[0.4px]">
                  <span className="line-through">Rs 11,500</span> Rs{" "}
                  {tickets.Diving.price.toLocaleString()}
                </h3>
                <p className="text-[14px] font-medium text-[#344054]">
                  {/* Quantity: {tickets.Diving .count} */}
                </p>
              </div>
              <div className="w-full sm:w-[18.5%] border border-[#D2D2D2] h-[45px] rounded-[10px] mt-2 sm:mt-7 flex">
                <div
                  onClick={() => handleDecrement("Diving")}
                  className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center font-black text-[#667085] cursor-pointer"
                >
                  <Minus size={18} />
                </div>
                <div className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center text-[14px] text-black">
                  {tickets.Diving.count}
                </div>
                <div
                  onClick={() => handleIncrement("Diving")}
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
            <h3 className="text-[14px] font-bold text-[#212529] mt-8 tracking-[0.3px]">
              Package 1:
            </h3>
            <p className="text-[14px] font-medium pt-6 text-[#212529] tracking-[0.4px]">
              Snorkeling, cliff jumping, Underwater Photography <br /> Original
              price Rs. 6000
            </p>
            <h3 className="text-[14px] font-bold text-[#212529] mt-8 tracking-[0.3px]">
              Package 2:
            </h3>
            <p className="text-[14px] font-medium pt-6 text-[#212529] tracking-[0.4px]">
              Scuba Diving Experience, Snorkeling, cliff jumping Underwater
              photography <br /> Original price Rs. 11500
            </p>
            <p className="text-[14px] font-medium pt-6 text-[#212529] tracking-[0.4px]">
              <span className="font-bold">Note:</span> Non-Swimmers can equally
              be a part of this activity by wearing Life-Jacket in a roped area{" "}
              <br /> with our Life-guards and under the supervision of our
              Instructors.
            </p>
            <p className="text-[14px] font-medium pt-6 text-[#212529] tracking-[0.4px]">
              Standard Package Services includes: (Professional services of
              DIVERS CLUB )
            </p>
            <ul className="text-[14px] font-medium pt-6 text-[#212529] tracking-[0.4px] oll pl-2">
              <li>AC Transport</li>
              <li>Local Boat Ride</li>
              <li>Snorkeling</li>
              <li>Cliff Diving</li>
              <li>Scuba Diving pictures & Videos</li>
              <li>Safe and secure swimming (even for non-swimmers)</li>
              <li>Professional Under water photography</li>
              <li>Lunch( Biryani + Cold drinks)</li>
              <li>Snorkeling Equipment</li>
              <li className="ml-2">
                Profesionals and Educated Instructors for guide how to
                snorkeling
              </li>
              <li className="ml-2">Safety ropes</li>
              <li className="ml-2">Life-jackets</li>
              <li className="ml-2">Photography</li>
              <li className="ml-2">Separate stairs for boat</li>
              <li className="ml-2">Safety Ladder for Cliff Jumping</li>
              <li className="ml-2">Changing Room and Washroom</li>
            </ul>
            <p className="text-[14px] font-medium pt-[22px] text-[#212529] tracking-[0.4px]">
              <span className="font-bold">Timings:</span> 8:00AM to 7:30PM
            </p>
            <p className="text-[14px] font-medium pt-[22px] text-[#212529] tracking-[0.4px]">
              <span className="font-bold">Pick up point:</span> Teen Talwar PSO
              House, Karachi
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
