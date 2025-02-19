import React, { useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Home/Footer";
import loader from "../../../images/giff.gif";
import Navbar from "../../Home/Navbar";

export default function ScubaReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const {
    price,
    counter,
    selectedDate,
    formData,
    totalPrice,
    bookingDetails,
    ticketDetails,
  } = location.state || {};

  const totalCount =
    ticketDetails?.tickets?.Cliff?.count +
    ticketDetails?.tickets?.Diving?.count;

  const CompleteBooking = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/ScubaPayment", {
        state: {
          price: price,
          counter: counter,
          selectedDate: selectedDate,
          formData: formData,
          totalPrice: totalPrice,
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
      <div className="w-full h-auto bg-[#F2F4F7] flex flex-col lg:flex-row pb-10 px-2 lg:px-12">
        <div className="h-full w-full lg:w-[66%] pr-0 pt-4">
          <h2 className="text-[18px] font-semibold text-[#101828]">
            Event Details
          </h2>
          <div className="w-full bg-white border border-[#D2D2D2] px-3 mt-3 rounded-[10px]">
            <div className="w-full h-[70px] border-b border-[#D2D2D2] flex flex-wrap gap-5 lg:gap-[176px]">
              <div className="pt-[13px] pl-1">
                <h3 className="text-[14px] font-medium text-[#667085]">
                  Event Date
                </h3>
                <p className="text-[14px] font-medium text-[#101828]">
                  {ticketDetails?.selectedDate}
                </p>
              </div>
              <div className="pt-[13px] pl-1">
                <h3 className="text-[14px] font-medium text-[#667085]">
                  No. of Tickets
                </h3>
                <p className="text-[14px] font-medium text-[#101828]">
                  {totalCount}x
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-5 pt-3">
              <div className="w-full lg:w-[23.4%] h-[183px]">
                <img
                  src="https://storage.googleapis.com/bookmepk/static/custom/upload/events/bg/scubadiving241024.png"
                  alt=""
                  className="h-full w-full rounded-[10px]"
                />
              </div>
              <div className="w-full lg:w-[75%] h-full pb-11 pt-3">
                <h2 className="text-[18px] font-semibold text-[#101828]">
                  Scuba Diving
                </h2>
                <h2 className="text-[14px] font-medium text-[#101828] pt-1">
                  Teen Talwar PSO House, Karachi
                </h2>
                <h3 className="text-[18px] font-semibold text-[#101828] pt-3">
                  Event Description
                </h3>
                <h3 className="text-[14px] font-bold text-[#212529] mt-6">
                  Package 1:
                </h3>
                <p className="text-[14px] font-medium pt-5 text-[#212529]">
                  Snorkeling, cliff jumping, Underwater Photography <br />
                  Original price Rs. 6000
                </p>
                <h3 className="text-[14px] font-bold text-[#212529] mt-5">
                  Package 2:
                </h3>
                <p className="text-[14px] font-medium pt-6 text-[#212529]">
                  Scuba Diving Experience, Snorkeling, cliff jumping Underwater
                  photography <br />
                  Original price Rs. 11500
                </p>
                <p className="text-[14px] font-medium pt-5 text-[#212529]">
                  <span className="font-bold">Note:</span> Non-Swimmers can
                  participate safely with a Life-Jacket.
                </p>
                <p className="text-[14px] font-medium pt-5 text-[#212529]">
                  Standard Package Services include:
                </p>
                <ul className="text-[14px] font-medium pt-6 text-[#212529] list-disc pl-5">
                  <li>AC Transport</li>
                  <li>Local Boat Ride</li>
                  <li>Snorkeling</li>
                  <li>Cliff Diving</li>
                  <li>Scuba Diving pictures & Videos</li>
                  <li>Safe swimming (even for non-swimmers)</li>
                  <li>Professional Underwater Photography</li>
                  <li>Lunch (Biryani + Cold Drinks)</li>
                  <li>Snorkeling Equipment</li>
                  <li>Guided instructions</li>
                  <li>Safety ropes & Life-jackets</li>
                  <li>Photography & Separate stairs for boat</li>
                  <li>Safety Ladder for Cliff Jumping</li>
                  <li>Changing Room and Washroom</li>
                </ul>
                <p className="text-[14px] font-medium pt-[22px] text-[#212529]">
                  <span className="font-bold">Timings:</span> 8:00 AM to 7:30 PM
                </p>
                <p className="text-[14px] font-medium pt-[22px] text-[#212529]">
                  <span className="font-bold">Pick-up point:</span> Teen Talwar
                  PSO House, Karachi
                </p>
              </div>
            </div>
          </div>
          <div className="w-full mt-3 pb-4 bg-white border border-[#D2D2D2] rounded-[10px] p-4">
            <h2 className="text-[#101828] font-semibold text-[18px]">
              Customer Details
            </h2>
            <p className="text-[14px] font-bold pt-4 text-[#212529]">
              Basic Information:{" "}
              <span className="font-medium">
                {formData.fullName}, {formData?.phoneNumber || "N/A"},{" "}
                {formData?.cnic || "N/A"}
              </span>
            </p>
          </div>
          <div className="w-full h-auto bg-white border border-[#D2D2D2] rounded-[10px] mt-4 p-4">
            <p className="text-[14px] font-medium text-[#212529]">
              By selecting Complete Booking, you agree to the{" "}
              <span className="text-[#667085]">Terms and Conditions</span> and{" "}
              <span className="text-[#667085]">Privacy Policy</span>.
            </p>
            <div className="w-full border-t border-[#D2D2D2] flex justify-between mt-4 pt-3">
              <p className="text-[18px] font-semibold text-[#101828]">Total</p>
              <p className="text-[18px] font-semibold text-[#101828]">
                Rs {ticketDetails?.totalPrice}
              </p>
            </div>
            <button
              onClick={CompleteBooking}
              className="w-full mt-2 h-[45px] rounded-[10px] text-[#121619] font-medium text-[14px] bg-[#FCEB03]"
            >
              Complete Booking
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[31.6%] h-max mt-5 rounded-[10px] bg-white border-[1px] border-[#D2D2D2] lg:ml-[14px] pb-4">
          <h2 className="text-[18px] font-semibold ml-4 mt-2">Event</h2>
          <p className="text-[14px] font-medium pl-4 text-[#212529] tracking-[0.3px] pt-1">
            Scuba Diving
          </p>
          <div className="w-full flex justify-between px-4 pt-2">
            <p className="text-[14px] font-medium text-[#212529] tracking-[0.3px]">
              Karachi
            </p>
            <p className="text-[#212529] text-[14px] font-medium">
              {ticketDetails?.selectedDate}
            </p>
          </div>
          <div className="w-full h-auto pb-[16px] border-t-[1px] border-b-[1px] mt-4 border-[#D0D5DD]">
            <h2 className="text-[18px] font-semibold ml-4 mt-2">Subtotal</h2>

            {ticketDetails?.tickets?.Cliff?.count > 0 && (
              <div className="w-full flex justify-between px-4 pt-1">
                <p className="text-[14px] font-medium text-[#212529]">
                  Snorkeling+ Cliff <br /> jumping+ Underwater <br />{" "}
                  photography (Rs. 500 <br />
                  Discount Applied)
                  <span className="text-[#121619]">
                    {" "}
                    ({ticketDetails?.tickets?.Cliff?.count}x)
                  </span>
                </p>
                <p className="text-[#212529] text-[14px] font-medium">
                  Rs {ticketDetails?.tickets?.Cliff?.price}
                </p>
              </div>
            )}

            {ticketDetails?.tickets?.Diving?.count > 0 && (
              <div className="w-full flex justify-between px-4 pt-2">
                <p className="text-[14px] font-medium text-[#212529] tracking-[0.3px]">
                  Scuba Diving <br /> +Snorkeling+ Cliff <br /> jumping+
                  Underwater <br />
                  photography (Rs. 1000 <br /> Discount Applied)
                  <span className="text-[#121619] ml-1">
                    ({ticketDetails?.tickets?.Diving?.count}x)
                  </span>
                </p>
                <p className="text-[#212529] text-[14px] font-medium">
                  Rs {ticketDetails?.tickets?.Diving?.price}
                </p>
              </div>
            )}
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
              Rs {ticketDetails?.totalPrice + 14}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
