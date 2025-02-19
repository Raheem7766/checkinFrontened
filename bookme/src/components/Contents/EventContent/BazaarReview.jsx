import React, { useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Home/Footer";
import loader from "../../../images/giff.gif";
import Navbar from "../../Home/Navbar";

export default function BazaarReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { price, counter, selectedDate, formData, totalPrice, ticketDetails } =
    location.state || {};
  const [isLoading, setLoading] = useState(false);

  const CompleteBooking = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/BazaarPayment", {
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
        <div className="h-full w-full lg:w-[66%] px- pr-0 pt-4">
          <h2 className="text-[18px] font-semibold text-[#101828]">
            Event Details
          </h2>
          <div className="w-full h-max bg-white border border-[#D2D2D2] px-3 mt-3 rounded-[10px]">
            <div className="w-full h-[70px] border-b border-[#D2D2D2] flex gap-6 lg:gap-[176px]">
              <div className="pt-[13px] pl-1">
                <h3 className="text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                  Event Date
                </h3>
                <p className="text-[14px] font-medium text-[#101828] tracking-[0.4px]">
                  {ticketDetails?.selectedDate}
                </p>
              </div>
              <div className="pt-[13px] pl-1">
                <h3 className="text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                  No. of Tickets
                </h3>
                <p className="text-[14px] font-medium text-[#101828] tracking-[0.4px]">
                  {ticketDetails?.counter}x
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-[22px] pt-3">
              <div className="w-full lg:w-[23.4%] h-[183px]">
                <img
                  src="https://storage.googleapis.com/bookmepk/static/custom/upload/events/bg/mixthings251124.jpg?1"
                  alt="Event"
                  className="h-full w-full rounded-[10px]"
                />
              </div>
              <div className="w-full lg:w-[75%] h-full pb-11 pt-3">
                <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.4px]">
                  A Mix of All Things Festive by The Happiness Bazaar
                </h2>
                <h2 className="text-[14px] font-medium text-[#101828] tracking-[0.4px] pt-1">
                  PNCA, F-5/1, Islamabad
                </h2>
                <h3 className="text-[18px] font-semibold text-[#101828] tracking-[0.4px] pt-3">
                  Event Description
                </h3>
                <p className="text-[14px] font-medium pt-1 text-[#212529] tracking-[0.4px]">
                  Lo and behold - The Happiness Bazaar - Festive Edition 2024 is
                  back!
                </p>
                <p className="text-[14px] font-medium mt-9 text-[#212529] tracking-[0.4px]">
                  With the holiday season just around the corner, THB is
                  bringing All Things Festive under one roof!
                </p>
                <p className="text-[14px] font-medium mt-9 text-[#212529] tracking-[0.4px]">
                  Whether you are someone looking for wonderful presents for
                  your friends and family, a mommy, a teenager, joining in with
                  a group of friends or with your grandparents, we have
                  something planned for everyone!
                </p>
              </div>
            </div>
          </div>
          <div className="w-full h-auto mt-3 pb-4 bg-white border-[1px] px-3 lg:px-0 lg:pl-6 pt-[10px] border-[#D2D2D2] rounded-[10px]">
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
          <div className="w-full h-auto lg:h-[160px] pb-4 lg:pb-0 bg-white border-[1px] border-[#D2D2D2] rounded-[10px] mt-4">
            <p className="text-[14px] font-medium text-[#212529] pl-2 lg:pl-4 pt-4 tracking-[0.5px]">
              By selecting Complete Booking you agree to the{" "}
              <span className="text-[#667085]">Terms and Conditions</span> and{" "}
              <span className="text-[#667085]">Privacy Policy</span>
            </p>
            <div className="w-[96%] m-auto border-t-[1px] flex justify-between mt-[14px] pt-3 border-[#D2D2D2]">
              <p className="text-[18px] font-semibold text-[#101828]">Total</p>
              <p className="text-[18px] font-semibold text-[#101828]">
                Rs {ticketDetails?.totalPrice}
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

        <div className="w-full lg:w-[31.6%] h-max mt-5 rounded-[10px] bg-white border-[1px] border-[#D2D2D2] lg:ml-[14px] pb-4">
          <h2 className="text-[18px] font-semibold ml-4 mt-2">Event</h2>
          <p className="text-[14px] font-medium pl-4 text-[#212529] tracking-[0.3px] pt-1">
            A Mix of All Things Festive by The Happiness Bazaar
          </p>
          <div className="w-full flex justify-between px-4 pt-2">
            <p className="text-[14px] font-medium text-[#212529] tracking-[0.3px]">
              Islamabad
            </p>
            <p className="text-[#212529] text-[14px] font-medium">
              {ticketDetails?.selectedDate}
            </p>
          </div>
          <div className="w-full h-auto pb-[16px] border-t-[1px] border-b-[1px] mt-4 border-[#D0D5DD]">
            <h2 className="text-[18px] font-semibold ml-4 mt-2">Subtotal</h2>

            <div className="w-full flex justify-between px-4 pt-1">
              <p className="text-[14px] font-medium text-[#212529]">
                Single
                <span className="text-[#121619]">
                  {" "}
                  ({ticketDetails?.counter}x)
                </span>
              </p>
              <p className="text-[#212529] text-[14px] font-medium">
                Rs {ticketDetails?.totalPrice}
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
              Rs {((ticketDetails?.totalPrice || 0) + 14).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
