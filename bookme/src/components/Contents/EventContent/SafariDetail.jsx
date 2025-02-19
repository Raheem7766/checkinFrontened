import { Minus, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../../../images/giff.gif";

export default function SafariDetail({ closeModal, customScrollbarStyles }) {
  const [tickets, setTickets] = useState({
    PalourCar: { count: 0, price: 5000 },
    EconomyClass: { count: 0, price: 3500 },
  });
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const name = "Rawalpindi to Attock Safari Tourist Train";
  useEffect(() => {
    setTotalCount(tickets.PalourCar.count + tickets.EconomyClass.count);
  }, [tickets]);

  const handleIncrease = (ticketType) => {
    setTickets((prev) => ({
      ...prev,
      [ticketType]: {
        ...prev[ticketType],
        count: prev[ticketType].count + 1,
      },
    }));
  };

  const handleDecrease = (ticketType) => {
    setTickets((prev) => ({
      ...prev,
      [ticketType]: {
        ...prev[ticketType],
        count: prev[ticketType].count > 0 ? prev[ticketType].count - 1 : 0,
      },
    }));
  };

  const totalPrice = Object.values(tickets).reduce(
    (total, ticket) => total + ticket.count * ticket.price,
    0
  );

  const handleContinue = () => {
    if (!totalPrice) {
      alert("Please select the number of tickets.");
      return;
    }
    setLoading(true);
    const data = {
      selectedDate,
      tickets,
      totalPrice,
    };
    console.log("Selected Data:", data);
    localStorage.setItem("eventData", JSON.stringify(data));
    setTimeout(() => {
      setLoading(false);
      navigate("/safariCheckout", {
        state: {
          price: totalPrice,
          count: tickets,
          selectedDate: selectedDate,
          totalCount: totalCount,
          name: name,
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
      <div className="h-[52px] flex justify-between items-center p-4 pt-1 border-b">
        <h2 className="text-xl font-semibold">Event Preview</h2>
        <button
          onClick={closeModal}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="w-full m-auto pt-9 px-4 sm:px-[18px] h-[calc(100vh-100px)] overflow-y-auto">
        <style>{customScrollbarStyles}</style>

        <div className="w-full h-auto sm:h-[190px] bg-white rounded-[10px] border border-[#D2D2D2] flex flex-col sm:flex-row items-center p-4 sm:pl-[14px] gap-3">
          <div className="h-[200px] sm:h-[85%] w-full sm:w-[23%]">
            <img
              src="https://storage.googleapis.com/bookmepk/static/custom/upload/events/bg/safaritrain-180424.png"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-full w-full pt-3">
            <h2 className="text-[18px] font-semibold text-[#101828]">{name}</h2>
            <h3 className="text-[#212529] text-[15px] pt-2 font-semibold">
              Railway Station, Rawalpindi
            </h3>
            <p className="text-[#212529] text-[15px] pt-1 font-medium">
              Date: Sun, 24 Nov 2024 - Sun, 29 Dec 2024
            </p>
            <p className="text-[#212529] text-[15px] pt-1 font-medium">
              Note: 8:30 AM onward
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
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border border-[#D2D2D2] outline-none mt-2 h-[43px] rounded-[10px] px-2"
          >
            <option value="24 Nov, 2024">24 Nov, 2024</option>
            <option value="01 Dec, 2024">01 Dec, 2024</option>
            <option value="08 Dec, 2024">08 Dec, 2024</option>
            <option value="15 Dec, 2024">15 Dec, 2024</option>
            <option value="22 Dec, 2024">22 Dec, 2024</option>
            <option value="29 Dec, 2024">29 Dec, 2024</option>
          </select>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
            <div>                                     
              <p className="text-[14px] font-bold text-[#212529] pt-7 tracking-[0.3px]">
                Palour Car + Foods Charges <br /> (3500+1500)
              </p>
              <h3 className="text-[14px] font-medium text-[#344054] tracking-[0.4px]">
                Rs 5,000
              </h3>
            </div>
            <div className="w-full sm:w-[18.5%] border border-[#D2D2D2] h-[45px] rounded-[10px] mt-2 sm:mt-7 flex">
              <div
                onClick={() => handleDecrease("PalourCar")}
                className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center font-black text-[#667085] cursor-pointer"
              >
                <Minus size={18} />
              </div>
              <div className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center text-[14px] text-black">
                {tickets.PalourCar.count}
              </div>
              <div
                onClick={() => handleIncrease("PalourCar")}
                className="h-full w-[33.34%] flex items-center justify-center font-black text-[#667085] cursor-pointer"
              >
                <Plus size={18} />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
            <div>
              <p className="text-[14px] font-bold text-[#212529] pt-7 tracking-[0.3px]">
                Economy Class + Foods Charges <br /> (2000+1500)
              </p>
              <h3 className="text-[14px] font-medium text-[#344054] tracking-[0.4px]">
                Rs 3,500
              </h3>
            </div>
            <div className="w-full sm:w-[18.5%] border border-[#D2D2D2] h-[45px] rounded-[10px] mt-2 sm:mt-7 flex">
              <div
                onClick={() => handleDecrease("EconomyClass")}
                className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center font-black text-[#667085] cursor-pointer"
              >
                <Minus size={18} />
              </div>
              <div className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center text-[14px] text-black">
                {tickets.EconomyClass.count}
              </div>
              <div
                onClick={() => handleIncrease("EconomyClass")}
                className="h-full w-[33.34%] flex items-center justify-center font-black text-[#667085] cursor-pointer"
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
          <p className="text-[14px] font-bold text-[#212529] tracking-[0.4px] mt-[10px] underline">
            SCHEDULE OF RUNNING OF ATTOCK SAFARI TRAIN
          </p>
          <ul className="text-[14px] font-medium ol ml-4 pt-4 text-[#212529] tracking-[0.4px]">
            <li>Departure from Rawalpindi 8.30 hours.</li>
            <li className="pt-5">Arrival Golra Sharif 8.50 hours</li>
            <li className="pt-5">
              Visit of 2 galleries of Railway Museum And Horse Dance Show up to
              9.25 hours
            </li>
            <li className="pt-5">Departure from Golra Sharif 09:30 hours</li>
            <li className="pt-5">
              Breakfast will be served in train after departure of train from
              Golra Sharif
            </li>
            <li className="pt-5">Arrival Hassan Abdal 10.14 hours</li>
            <li className="pt-5">Luhdi Perform</li>
            <li className="pt-5">Departure Hassan Abdal 10:25 hours</li>
            <li className="pt-5">Arrival Attock Khurd 11:35 hours</li>
            <li className="pt-5">
              Visit of Museum from 11:30 hours to 12:00 hours
            </li>
            <li className="pt-5">
              Lunch will be served 12:10 Hours To 13:00 Hours
            </li>
            <li className="pt-5">
              Horse Riding, Camel Riding etc. From 13:05 hours to 14:15 hours
            </li>
            <li className="pt-5">Attock Khurd Departure 14:20 hours</li>
            <li className="pt-5">Arrival Rawalpindi 16:30 hours</li>
            <li className="pt-5">Ticket Rates</li>
            <li className="pt-5">Economy Class Rs. 3500/-</li>
            <li className="pt-5">
              This includes breakfast, lunch Horse riding/camel riding and games
              at Attock Khurd
            </li>
            <li className="pt-5">AC Parlor Rs. 5000/-</li>
            <li className="pt-5">
              This includes breakfast, lunch Horse riding/camel riding and games
              at Attock Khurd.
            </li>
            <li className="pt-5">For more details and reservations.</li>
          </ul>
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
  );
}
