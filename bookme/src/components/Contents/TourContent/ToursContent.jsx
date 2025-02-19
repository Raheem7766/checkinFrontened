import React, { useState, useEffect } from "react";
import Footer from "../../Home/Footer";
import safari from "../../../images/safaritrain-180424.png";
import bayan from "../../../images/bayaan181024-1.png";
import lahore from "../../../images/lahorefest211024-1.jpg";
import scuba from "../../../images/scubadiving241024.png";
import para from "../../../images/paragliding120824.png";
import malam from "../../../images/malam080824.png";
import android from "../../../images/android-app.A115Y25Z.svg";
import ios from "../../../images/ios-app.BsEkpCCk.svg";
import app from "../../../images/bookme-app.B0stX0tq.svg";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import loader from "../../../images/giff.gif";
import Sawat from "./Sawat";
import Naran from "./Naran";
import Skardu from "./Skardu";
import Dubai from "./Dubai";
import Desert from "./Desert";
import Navbar from "../../Home/Navbar";

export default function ToursContent() {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [toggleHeight, settoggleHeight] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const toggleModel = () => {
    settoggleHeight(!toggleHeight);
  };

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

  const events = [
    {
      id: 1,
      title: "3 Days Trip to Swat Kalam",
      location: "Rawalpindi",
      days: "3 Days & 2 Nights",
      price: "19,500",
      image:
        "https://storage.googleapis.com/bookmepk/static/custom/upload/tours/V5/swatkalam-global_normal220824.png?v1",
      description: (
        <Sawat
          closeModal={closeModal}
          customScrollbarStyles={customScrollbarStyles}
        />
      ),
    },
    {
      id: 2,
      title: "By Air 05 Days Hunza Tour With Air Tickets",
      location: "Islamabad",
      image:
        "https://storage.googleapis.com/bookmepk/static/custom/upload/tours/V5/5daysskardutournew_cus260824.png?v1",
      days: "5 Days & 4 Nights",
      price: "197,000",
      description: (
        <Naran
          closeModal={closeModal}
          customScrollbarStyles={customScrollbarStyles}
        />
      ),
    },
    {
      id: 3,
      title: "07 Days Tour to Skardu, Shangrila & Shiger",
      location: "Lahore",
      image:
        "https://storage.googleapis.com/bookmepk/static/custom/upload/tours/V5/7dayssakurdu220824.png?v1",
      days: "7 Days & 6 Nights",
      price: "35,500",
      description: (
        <Skardu
          closeModal={closeModal}
          customScrollbarStyles={customScrollbarStyles}
        />
      ),
    },
    {
      id: 4,
      title: "Dhow cruise dinner Dubai Creek",
      location: "Lahore",
      image:
        "https://storage.googleapis.com/bookmepk/static/custom/upload/tours/V5/sc-cruise220824.jpg?v1",
      days: "1 Days & 0 Nights",
      price: "12,750",
      description: (
        <Dubai
          closeModal={closeModal}
          customScrollbarStyles={customScrollbarStyles}
        />
      ),
    },
    {
      id: 5,
      title: "Evening Desert Safari Dubai",
      location: "Karachi",
      image:
        "https://storage.googleapis.com/bookmepk/static/custom/upload/tours/V5/staycationdesrt220824.jpg?v1",
      days: "1 Days & 0 Nights",
      price: "76,500",
      description: (
        <Desert
          closeModal={closeModal}
          customScrollbarStyles={customScrollbarStyles}
        />
      ),
    },
  ];

  const filteredEvents = events.filter(
    (event) =>
      (filter === "" || event.location === filter) &&
      (search === "" ||
        event.title.toLowerCase().includes(search.toLowerCase()))
  );

  const openEventDetails = (event) => {
    setSelectedEvent(event);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src={loader} alt="" />
        </div>
      )}
      <Navbar />
      <div className="w-full h-auto px-2 lg:px-12 pt-4">
        <div className="w-full flex flex-wrap lg:flex-nowrap">
          <div className="w-full lg:w-[50%] mb-4 lg:mb-0">
            <h2 className="text-[24px] lg:text-[28px] font-semibold tracking-[2px] text-[#101828]">
              Events
            </h2>
            <p className="text-[16px] lg:text-[18px] font-normal text-[#101828] pt-3 tracking-[0.3px]">
              Book the ticket of ongoing tour.
            </p>
          </div>
          <div className="w-full lg:w-[50%] flex justify-end items-center">
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full lg:w-[390px] h-[45px] pl-3 px-2 outline-none rounded-[5px] border border-[#CED4DA] placeholder:text-black"
            />
          </div>
        </div>
        <div
          className={`w-full mt-[32px] lg:mt-[52px] flex flex-wrap justify-start ${
            filteredEvents.length > 2 ? "gap-5" : ""
          }`}
        >
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="w-full sm:w-[48%] lg:w-[32.1%] h-[500px] cursor-pointer mb-6"
              onClick={() => openEventDetails(event)}
            >
              <div className="w-full h-[76%]">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover rounded-[10px]"
                />
              </div>
              <h2 className="text-[16px] lg:text-[18px] mt-[9px] font-medium tracking-[0.4px] text-[#000000]">
                {event.title}
              </h2>
              <div className="flex justify-between mt-4 lg:mt-7">
                <h3 className="text-[12px] lg:text-[14px] font-medium text-[#7A7085]">
                  {event.days}
                </h3>
                <p className="text-[16px] lg:text-[18px] font-bold text-[#121619]">
                  Rs {event.price}
                </p>
              </div>
            </div>
          ))}
          <div className="w-full h-auto lg:h-[430px] mt-6 bg-[#1476D1] rounded-[10px] flex flex-wrap lg:flex-nowrap">
            <div className="w-full lg:w-[58.2%] lg:pl-10 pt-10 lg:pt-20 text-[#121619]">
              <h2 className="text-[20px] lg:text-[28px] text-center lg:text-start font-semibold tracking-[1px]">
                Download our app
              </h2>
              <p className="text-[14px] lg:text-[18px] text-center lg:text-start font-normal mt-3 tracking-[0.25px]">
                Get amazing deals and bundles on Bookme Application
              </p>
              <div className="mt-6 lg:mt-8 flex gap-2 pl-2 lg:pl-0">
                <img src={ios} alt="iOS" className="cursor-pointer" />
                <img src={android} alt="Android" className="cursor-pointer" />
              </div>
              <div className="flex flex-col lg:flex-row gap-2 px-2 lg:px-0 mt-6 lg:mt-10">
                <input
                  type="number"
                  placeholder="Enter your phone number"
                  className="w-full lg:w-[65.2%] h-[43px] rounded-[10px] text-black text-[14px] lg:text-[15px] pl-4 placeholder:text-black outline-none"
                />
                <button className="w-full lg:w-[25%] h-[43px] text-[14px] rounded-[10px] font-medium bg-[#FCEB03] text-[#121619]">
                  Get Download Link
                </button>
              </div>
              <p className="text-[12px] lg:text-[14px] font-normal text-center lg:text-start tracking-[0.5px] mt-2">
                Your privacy is important for us. Check our{" "}
                <span className="underline">privacy policy</span>
              </p>
            </div>
            <div className="w-full lg:w-[41.8%] flex items-center justify-center lg:justify-end">
              <img
                src={app}
                alt="App Preview"
                className="max-w-[80%] lg:max-w-full"
              />
            </div>
          </div>
          <div className="w-full h-auto pb-6 mt-4">
            <div className="w-full h-auto">
              <h2 className="text-[16px] lg:text-[18px] font-semibold text-[#101828] mt-[10px] tracking-[0.4px]">
                How to Book your Tour Ticket online through Bookme?
              </h2>
              <ul className="list-inside list-square lg:ml-4 mt-1 text-[12px] lg:text-[14px] font-medium text-[#667085] tracking-[0.4px]">
                <li>
                  Go to the event section on Bookme website or mobile
                  application.
                </li>
                <li className="mt-[6px]">Select your tour.</li>
                <li className="mt-[6px]">Select your package.</li>
                <li className="mt-[6px]">Fill in your contact details.</li>
                <li className="mt-[6px]">Select your payment method.</li>
                <li className="mt-[6px]">Confirm your booking by clicking.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-end items-center z-50">
          <div className="w-full lg:max-w-[50%] bg-[#F2F4F7] shadow-xl h-full">
            <div>{selectedEvent.description}</div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
