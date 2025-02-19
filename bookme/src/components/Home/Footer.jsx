import React from "react";
import {
  FaXTwitter,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";
import app from "../../images/app.svg";
import goog from "../../images/goog.svg";
import logo from "../../images/Checkin Logo-02.svg";

export default function Footer() {
  return (
    <>
      <div className="w-full bg-[#000] py-8 pb-16 md:px-[74px] lg:px-[74px] md:pt-[92px] lg:pt-[92px]">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <h3 className="text-[13px] tracking-[0.5px] font-medium text-[#98a2b3]">
              Services
            </h3>
            <h4 className="text-[14px] tracking-[0.5px] font-medium text-white mt-5">
              Bus Booking
            </h4>
            <ul className="mt-5 space-y-3 cursor-pointer">
              {[
                "Flights Booking",
                "Visit Saudi",
                "Event Booking",
                "Hotels Booking",
                "Tours Booking",
              ].map((item, index) => (
                <li
                  key={index}
                  className="text-[14px] tracking-[0.5px] pb-2 font-medium text-white"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[13px] font-medium text-[#98a2b3]">Company</h3>
            <ul className="mt-5 space-y-3 cursor-pointer">
              {[
                "About us",
                "FAQ",
                "Contact us",
                "Blogs",
                "Announcements",
                "Terms & Conditions",
                "Privacy Policy",
              ].map((item, index) => (
                <li
                  key={index}
                  className="text-[14px] tracking-[0.5px] pb-2 font-medium text-white"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[13px] font-medium text-[#98a2b3]">
              Top Flights
            </h3>
            <ul className="mt-5 space-y-5">
              {[
                "PIA Booking",
                "Serene Air Booking",
                "AirBlue Booking",
                "Emirates Booking",
                "Etihad Booking",
                "Qatar Airways Booking",
                "Turkish Airlines Booking",
                "Air Sial Booking",
                " FlyDubai Booking",
                "FlyJinnah Booking",
                "Jazeera Airways Booking",
                "Malindo Air Booking",
                "Oman Air Booking",
                "Srilankan Airlines Booking",
                "Kuwait Airways Booking",
                "Saudi Airline Booking",
                "Flynas Airline Booking",
                "SalamAir Booking",
                "Thai Airways Booking",
                "Air Al Arabia Booking",
                "Gulf Air Airlines Booking",
                "China Southern Airlines Booking",
                "Azal Air - Azerbaijan Airlines",
              ].map((item, index) => (
                <li key={index} className="text-[14px] font-medium text-white">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[13px] font-medium text-[#98a2b3]">
              Top Buses
            </h3>
            <ul className="mt-5 space-y-5">
              {[
                "Road Master Booking",
                "Kainat Travels Booking",
                "Silk Line Booking",
                "Raja Travels 99 Booking",
                "FM Bilal Travel Booking",
                "NATCO Booking",
                "Daewoo Express Booking",
                "Rajput Travels Rathore Group",
                " Bashir Sons Booking",
                "Al Makkah President Coaches",
                "Niazi Express Booking",
                "Ak Movers Booking",
                "Adil Express Booking",
                "Warraich Express Booking",
                "Skyways Booking",
                "QConnect Booking",
                "Crystal Lines Booking",
                "PAKLINES Booking",
                "SadaBahar Daewoo Service",
                "Shahid Coach Booking",
              ].map((item, index) => (
                <li key={index} className="text-[14px] font-medium text-white">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[13px] font-medium text-[#98a2b3]">
              Get the app
            </h3>
            <img src={goog} alt="" className="mt-3" />
            <img src={app} alt="" className="mt-2" />
          </div>
        </div>
      </div>

      <div className="w-full bg-[#F5F5F5] border-t border-[#D0D5DD] pb-10 lg:pb-0">
        <div className="container mx-auto px-10 flex flex-col sm:flex-row justify-between items-center">
          <div className="h-[140px]">
            <img
              src={logo}
              alt="SVG"
              className="cursor-pointer h-full w-[200px]"
            />
          </div>

          <div className="flex gap-4 mt-2 sm:mt-0">
            <FaFacebook className="mt-[-13px] text-[#121619] cursor-pointer" />
            <FaXTwitter className="mt-[-13px] text-[#121619] cursor-pointer" />
            <FaLinkedin className="mt-[-13px] text-[#121619] cursor-pointer" />
            <FaYoutube className="mt-[-13px] text-[#121619] cursor-pointer" />
            <FaInstagram className="mt-[-13px] text-[#121619] cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
}
