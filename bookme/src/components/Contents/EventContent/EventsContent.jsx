import React, { useState, useEffect } from "react";
import Footer from "../../Home/Footer";
import safari from "../../../images/safaritrain-180424.png";
import bayan from "../../../images/bayaan181024-1.png";
import lahore from "../../../images/lahorefest211024-1.jpg";
import scuba from "../../../images/scubadiving241024.png";
import para from "../../../images/paragliding120824.png";
import malam from "../../../images/malam080824.png";
import SafariDetail from "./SafariDetail";
import android from "../../../images/android-app.A115Y25Z.svg";
import ios from "../../../images/ios-app.BsEkpCCk.svg";
import app from "../../../images/bookme-app.B0stX0tq.svg";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import BayanDetail from "./BayanDetail";
import SafarDetail from "./SafarDetail";
import LahoreDetail from "./LahoreDetail";
import ScubaDetail from "./ScubaDetail";
import ParaDetail from "./ParaDetail";
import BazaarDetail from "./BazaarDetail";
import loader from "../../../images/giff.gif";
import Navbar from "../../Home/Navbar";

export default function EventsContent() {
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
      title: "Rawalpindi to Attock Safari Tourist Train",
      location: "Rawalpindi",
      image: safari,
      description: (
        <SafariDetail
          closeModal={closeModal}
          customScrollbarStyles={customScrollbarStyles}
        />
      ),
    },
    {
      id: 2,
      title: "Bayaan Exclusive",
      location: "Islamabad",
      image: bayan,
      description: (
        <BayanDetail
          closeModal={closeModal}
          customScrollbarStyles={customScrollbarStyles}
        />
      ),
    },
    {
      id: 3,
      title: "The Safar Tour | Bayaan Live in Concert",
      location: "Lahore",
      image:
        "https://storage.googleapis.com/bookmepk/static/custom/upload/events/bg/bayaansafar-211124-1.jpg?3",
      description: (
        <SafarDetail
          closeModal={closeModal}
          customScrollbarStyles={customScrollbarStyles}
        />
      ),
    },
    {
      id: 4,
      title: "Lahore Feast 2024",
      location: "Lahore",
      image: lahore,
      description: (
        <LahoreDetail
          closeModal={closeModal}
          customScrollbarStyles={customScrollbarStyles}
        />
      ),
    },
    {
      id: 5,
      title: "Scuba Diving",
      location: "Karachi",
      image: scuba,
      description: (
        <ScubaDetail
          closeModal={closeModal}
          customScrollbarStyles={customScrollbarStyles}
        />
      ),
    },
    {
      id: 6,
      title: "Paragliding in Pakistan",
      location: "Pir Chinasi",
      image: para,
      description: (
        <ParaDetail
          closeModal={closeModal}
          customScrollbarStyles={customScrollbarStyles}
        />
      ),
    },
    {
      id: 7,
      title: "A Mix of All Things Festive by The Happiness Bazaar",
      location: "Bazaar",
      image:
        "https://storage.googleapis.com/bookmepk/static/custom/upload/events/bg/mixthings221124.jpg?1",
      description: (
        <BazaarDetail
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
    setIsLoading(true); 
    setTimeout(() => {
      setSelectedEvent(event); 
      setIsLoading(false); 
    }, 4000);
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
      <div className="w-full h-auto px-4 lg:pl-10 lg:pr-7 pt-4 pb-4">
        <div className="w-full flex flex-col lg:flex-row lg:justify-between">
          <div className="w-full lg:w-[50%]">
            <h2 className="text-[24px] lg:text-[28px] font-semibold tracking-[2px] text-[#101828]">
              Events
            </h2>
            <p className="text-[16px] lg:text-[18px] font-normal text-[#101828] pt-3 tracking-[0.3px]">
              Book the ticket of ongoing events
            </p>
          </div>
          <div className="pt-6 lg:pt-0 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-2">
            <select
              name="filter"
              id="filter"
              onChange={(e) => setFilter(e.target.value)}
              className="w-full lg:w-[191px] h-[45px] px-2 outline-none rounded-[5px] border border-[#CED4DA]"
            >
              <option value="">All</option>
              <option value="Lahore">Lahore</option>
              <option value="Karachi">Karachi</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Pir Chinasi">Pir Chinasi</option>
              <option value="Malam Jabba">Malam Jabba</option>
            </select>
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full lg:w-[386px] placeholder:text-black h-[45px] px-2 outline-none rounded-[5px] border border-[#CED4DA]"
            />
          </div>
        </div>
        <div
          className={`w-full mt-[30px] flex flex-wrap ${
            filteredEvents.length <= 2
              ? "justify-start gap-5"
              : "justify-between"
          }`}
        >
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="w-full sm:w-[48%] lg:w-[32.1%] cursor-pointer h-[400px] lg:h-[440px]"
              onClick={() => openEventDetails(event)}
            >
              <div className="w-full h-[87%]">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover rounded-[10px]"
                />
              </div>
              <h2 className="text-[15px] lg:text-[18px] mt-3 font-medium tracking-[0.4px] text-[#000000]">
                {event.title}
              </h2>
            </div>
          ))}
        </div>
        <div
          className={`w-full ${
            toggleHeight ? "h-[76px]" : "h-[143px]"
          } cursor-pointer border-t border-b border-[#DEE2E6] mt-7`}
          style={{ overflow: "hidden", transition: "height 0.3s ease" }}
          onClick={toggleModel}
        >
          <div className="flex justify-between pt-[18px] pr-2">
            <h2 className="text-[18px] lg:text-[21px] font-semibold tracking-[0.7px] text-[#101828]">
              Bookme Event Services
            </h2>
            {toggleHeight ? (
              <ChevronDown
                className="mt-2 text-[#345482]"
                onClick={toggleModel}
              />
            ) : (
              <ChevronUp
                className="mt-2 text-[#345482]"
                onClick={toggleModel}
              />
            )}
          </div>
          <ul className="flex w-full mt-[36px] text-[14px] lg:text-[16px] text-[#121619] font-medium">
            <li className="w-[33%] text-center">Events in Lahore</li>
            <li className="w-[33%] text-center">Events in Karachi</li>
            <li className="w-[33%] text-center">Events in Islamabad</li>
          </ul>
        </div>
        <div className="w-full lg:w-[99.3%] h-auto lg:h-[430px] mt-6 bg-[#1476D1] rounded-[10px] flex flex-col lg:flex-row">
          <div className="h-full w-full lg:w-[58.2%] lg:pl-10 pt-6 lg:pt-20 text-[#121619]">
            <h2 className="text-[20px] lg:text-[28px] text-center lg:text-start font-semibold tracking-[1px]">
              Download our app
            </h2>
            <p className="text-[16px] lg:text-[18px] font-normal mt-3 text-center lg:text-start tracking-[0.25px]">
              Get amazing deals and bundles on Bookme Application
            </p>
            <div className="mt-8 flex gap-2">
              <img src={ios} alt="SVG" className="cursor-pointer" />
              <img src={android} alt="SVG" className="cursor-pointer" />
            </div>
            <div className="flex flex-col lg:flex-row gap-2 mt-10 px-2 lg:px-0">
              <input
                type="number"
                placeholder="Enter your phone number"
                className="w-full lg:w-[65.2%] h-[43px] rounded-[10px] text-black text-[15px] pl-4 placeholder:text-black outline-none"
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
          <div className="h-full w-full lg:w-[41.8%] flex items-center lg:items-end justify-center pl-4 lg:pl-11">
            <img src={app} alt="" className="w-full lg:w-auto" />
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-end items-center z-50">
          <div className="w-full sm:w-full md:max-w-[50%] bg-[#F2F4F7] shadow-xl h-full">
            <div className="mt-4">{selectedEvent.description}</div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
