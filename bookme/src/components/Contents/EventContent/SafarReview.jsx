import React, { useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Home/Footer";
import loader from "../../../images/giff.gif";
import Navbar from "../../Home/Navbar";

export default function SafarReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { price, counter, selectedDate, formData, totalPrice, name } =
    location.state || {};
  const [isLoading, setLoading] = useState(false);

  const CompleteBooking = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/SafarPayment", {
        state: {
          price: price,
          counter: counter,
          selectedDate: selectedDate,
          formData: formData,
          totalPrice: totalPrice,
          name,
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
      <Navbar />
      <div className="w-[100%] h-[56px] pl-2 md:pl-[70px] px-2 md:px-10 border-b">
        <div className="flex items-center h-[22px] mt-2">
          <LuHome color="#9097A6" size={20} />
          <IoChevronForwardOutline
            color="#9097A6"
            className=" ml-2"
            size={16}
          />
          <h2 className="ml-3 text-[14px] font-medium text-[#9097A6]">
            Events
          </h2>
          <IoChevronForwardOutline
            color="#9097A6"
            className=" ml-2"
            size={16}
          />
          <h2 className="ml-3 text-[14px] font-medium text-[#9097A6]">
            Customer Detail
          </h2>
          <IoChevronForwardOutline
            color="#9097A6"
            className=" ml-2"
            size={16}
          />
          <h2 className="ml-3 text-[14px] font-medium text-[#9097A6]">
            Booking Review
          </h2>
        </div>
        <div
          className={`w-[97.7%] h-[17px] flex items-end justify-between mt-[2px]`}
        >
          <div className="w-[33%] h-[60%] bg-[#FCEB03] rounded-[10px]"></div>
          <div className="w-[33%] h-[60%] bg-[#FCEB03] rounded-[10px]"></div>
          <div className="w-[33%] h-[60%] bg-[#FCEB03] rounded-[10px]"></div>
        </div>
      </div>
      <div className="w-full h-auto bg-[#F2F4F7] flex flex-col lg:flex-row pb-10 lg:px-12">
        <div className="h-full w-full lg:w-[66%] px-2  pt-4">
          <h2 className="text-[18px] font-semibold text-[#101828]">
            Event Details
          </h2>
          <div className="w-full bg-white border border-[#D2D2D2] px-3 mt-3 rounded-[10px]">
            <div className="w-full h-max flex flex-col lg:flex-row lg:gap-[178px] border-b border-[#D2D2D2] pb-3">
              <div className="pt-3 lg:pt-[13px]">
                <h3 className="text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                  Event Date
                </h3>
                <p className="text-[14px] font-medium text-[#101828] tracking-[0.4px]">
                  {selectedDate}
                </p>
              </div>
              <div className="pt-3 lg:pt-[13px]">
                <h3 className="text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                  No. of Tickets
                </h3>
                <p className="text-[14px] font-medium text-[#101828] tracking-[0.4px]">
                  {counter}x
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:gap-[18px] pt-3">
              <div className="w-full lg:w-[23.4%] h-[183px]">
                <img
                  src="https://storage.googleapis.com/bookmepk/static/custom/upload/events/bg/bayaansafar-211124-1.jpg?3"
                  alt=""
                  className="h-full w-full rounded-[10px]"
                />
              </div>
              <div className="w-full lg:w-[75%] pt-3">
                <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.4px]">
                  The Safar Tour | Bayaan Live in Concert
                </h2>
                <h3 className="text-[14px] font-medium text-[#101828] tracking-[0.4px] pt-1">
                  Different Cities
                </h3>
                <h2 className="text-[18px] mt-3 font-semibold text-[#101828] tracking-[0.4px]">
                  Event Description
                </h2>
                <p className="text-[14px] font-medium text-[#101828] tracking-[0.4px] pt-1">
                  The Bayaan experience you know and love is evolving into a new
                  era. Don't miss this dramatic performance of an entirely new
                  album for the first time ever LIVE in concert, uniquely
                  curated as the THE SAFAR TOUR
                </p>
                {/* City details */}
                {[
                  {
                    city: "Lahore",
                    date: "14th December",
                    venue:
                      "Open Air Theatre, Baagh-e-Jinnah, Punjab Council of the Arts, Lahore",
                  },
                  {
                    city: "Islamabad",
                    date: "21st December",
                    venue: "The Hill Joint, Lok Virsa Amphitheatre, Islamabad",
                  },
                  {
                    city: "Karachi",
                    date: "28th December",
                    venue: "Arts Council of Pakistan Karachi Amphitheatre",
                  },
                ].map(({ city, date, venue }, idx) => (
                  <div key={idx} className="mt-5">
                    <h2 className="text-[14px] font-bold text-[#101828] tracking-[0.4px]">
                      {city}
                    </h2>
                    <p className="text-[14px] font-medium text-[#101828] tracking-[0.4px]">
                      Date: {date}
                    </p>
                    <p className="text-[14px] font-medium text-[#101828] tracking-[0.4px]">
                      Venue: {venue}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full bg-white border border-[#D2D2D2] rounded-[10px] mt-3 px-6 pt-[10px] pb-6">
            <h2 className="text-[#101828] font-semibold text-[18px]">
              Customer Details
            </h2>
            <p className="text-[14px] font-bold pt-4 text-[#212529]">
              Basic Information:{" "}
              <span className="font-medium">
                {formData?.fullName}, {formData.phoneNumber}, {formData.cnic}
              </span>
            </p>
          </div>
          <div className="w-full bg-white border border-[#D2D2D2] rounded-[10px] mt-4 px-4 pt-4 pb-4">
            <p className="text-[14px] font-medium text-[#212529] tracking-[0.5px]">
              By selecting Complete Booking you agree to the{" "}
              <span className="text-[#667085]">Terms and Conditions</span> and{" "}
              <span className="text-[#667085]">Privacy Policy</span>.
            </p>
            <div className="w-[96%] m-auto border-t border-[#D2D2D2] flex justify-between mt-4 pt-3">
              <p className="text-[18px] font-semibold text-[#101828]">Total</p>
              <p className="text-[18px] font-semibold text-[#101828]">
                Rs {totalPrice}
              </p>
            </div>
            <button
              onClick={CompleteBooking}
              className="w-[96%] ml-[2%] mt-2 h-[45px] rounded-[10px] text-[#121619] font-medium text-[14px] bg-[#FCEB03]"
            >
              Complete Booking
            </button>
          </div>
        </div>
        <div className="px-2">
          <div className="w-full lg:w-[32%] h-max mt-5 rounded-[10px] bg-white border-[1px] border-[#D2D2D2] lg:ml-3 pb-4">
            <h2 className="text-[18px] font-semibold ml-4 mt-2">Event</h2>
            <p className="text-[14px] font-medium pl-4 text-[#212529]">
              The Safar Tour | Bayaan Live in Concert
            </p>
            <div className="w-full flex justify-between px-4 pt-3">
              <p className="text-[14px] font-medium text-[#212529]">Lahore</p>
              <p className="text-[#212529] text-[14px] font-medium">
                {selectedDate}
              </p>
            </div>
            <div className="w-full h-[80px] border-t-[1px] border-b-[1px] mt-4 border-[#D0D5DD]">
              <h2 className="text-[18px] font-semibold ml-4 mt-2">Subtotal</h2>
              <div className="w-full flex justify-between px-4 pt-1">
                <p className="text-[14px] font-medium text-[#212529]">
                  General Admission{" "}
                  <span className="text-[#121619]">({counter}x)</span>
                </p>
                <p className="text-[#212529] text-[14px] font-medium">
                  Rs {price}
                </p>
              </div>
            </div>
            <div className="w-full h-[70px] border-b-[1px] border-[#D0D5DD]">
              <h2 className="text-[18px] font-semibold ml-4 mt-2">Extras</h2>
              <div className="w-full flex justify-between px-4 pt-1">
                <p className="text-[14px] font-medium text-[#212529]">
                  Service Fee
                </p>
                <p className="text-[#212529] text-[14px] font-medium">Rs 14</p>
              </div>
            </div>
            <div className="w-full flex justify-between items-center px-4 pl-1 pt-2">
              <h2 className="text-[18px] font-semibold ml-4">Total</h2>
              <p className="text-[18px] font-semibold text-[#121619]">
                Rs {totalPrice}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
