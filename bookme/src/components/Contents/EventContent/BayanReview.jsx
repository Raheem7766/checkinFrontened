import React, { useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Home/Footer";
import loader from "../../../images/giff.gif";
import Navbar from "../../Home/Navbar";

export default function BayanReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    price,
    counter,
    selectedDate,
    formData,
    totalPrice,
    count,
    totalCount,
    name,
  } = location.state || {};
  const [isLoading, setLoading] = useState(false);

  const CompleteBooking = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/BayanPayment", {
        state: {
          price: price,
          counter: counter,
          selectedDate: selectedDate,
          formData: formData,
          totalPrice: totalPrice,
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
        <div className="h-full w-full lg:w-[66%] lg:px-5 lg:pr-0 pt-4">
          <h2 className="text-[18px] font-semibold text-[#101828]">
            Event Details
          </h2>
          <div className="w-full h-max bg-white lg:pb-[14px] border border-[#D2D2D2] px-3 mt-3 rounded-[10px]">
            <div className="w-full h-[70px] border-b border-[#D2D2D2] flex flex-row justify-between lg:justify-normal lg:gap-[176px]">
              <div className="pt-[13px] pl-1">
                <h3 className="text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                  Event Date
                </h3>
                <p className="text-[14px] font-medium text-[#101828] tracking-[0.4px]">
                  {selectedDate}
                </p>
              </div>
              <div className="pt-[13px] pl-1">
                <h3 className="text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                  No. of Tickets
                </h3>
                <p className="text-[14px] font-medium text-[#101828] tracking-[0.4px]">
                  {totalCount}x
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-[22px] pt-3">
              <div className="w-full lg:w-[23.4%] h-[183px]">
                <img
                  src="https://storage.googleapis.com/bookmepk/static/custom/upload/events/bg/bayaan181024-1.png?2"
                  alt=""
                  className="h-full w-full rounded-[10px]"
                />
              </div>
              <div className="w-full lg:w-[75%] h-full pb-4 lg:pb-11 pt-3">
                <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.4px]">
                  Bayaan Exclusive
                </h2>
                <h3 className="text-[14px] font-medium text-[#101828] tracking-[0.4px] pt-1">
                  Al hamra, Mall Road, Lahore
                </h3>
                <h2 className="text-[18px] mt-3 font-semibold text-[#101828] tracking-[0.4px]">
                  Event Description
                </h2>
                <h3 className="text-[14px] font-medium text-[#101828] tracking-[0.4px] pt-1">
                  Exclusive Bayaan Concert
                </h3>
              </div>
            </div>
          </div>
          <div className="w-full h-auto mt-3 pb-4 bg-white border-[1px] px-2 lg:pl-6 pt-[10px] border-[#D2D2D2] rounded-[10px]">
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
            <p className="text-[14px] font-medium text-[#212529] pl-2 lg:pl-4 pt-4 tracking-[0.5px] ">
              By selecting Complete Booking you agree to the{" "}
              <span className="text-[#667085]">Terms and Conditions</span> and{" "}
              <span className="text-[#667085]">Privacy Policy</span>
            </p>
            <div className="w-[96%] m-auto border-t-[1px] flex flex-row justify-between mt-[14px] pt-3 border-[#D2D2D2]">
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
        
        <div className="w-full lg:w-[31.6%] h-max mt-5 rounded-[10px] bg-white border-[1px] border-[#D2D2D2] ml-0 lg:ml-[14px] pb-2">
          <h2 className="text-[18px] font-semibold ml-4 mt-2">Event</h2>
          <p className="text-[14px] font-medium pl-4 text-[#212529] tracking-[0.3px] pt-1">
            Bayaan Exclusive
          </p>
          <div className="w-full flex justify-between px-4 pt-2">
            <p className="text-[14px] font-medium text-[#212529] tracking-[0.3px]">
              Lahore
            </p>
            <p className="text-[#212529] text-[14px] font-medium">
              {selectedDate}
            </p>
          </div>
          <div className="w-full h-auto pb-[23px] border-t-[1px] border-b-[1px] mt-4 border-[#D0D5DD]">
            <h2 className="text-[18px] font-semibold ml-4 mt-[10px]">
              Subtotal
            </h2>
            {count?.vip?.count > 0 && (
              <div className="w-full flex justify-between px-4 pt-1">
                <p className="text-[14px] font-medium text-[#212529]">
                  VIP
                  <span className="text-[#121619]">
                    {" "}
                    ({count?.vip?.count}x)
                  </span>
                </p>
                <p className="text-[#212529] text-[14px] font-medium">
                  Rs {count?.vip?.price}
                </p>
              </div>
            )}
            {count?.backstage?.count > 0 && (
              <div className="w-full flex justify-between px-4 pt-2">
                <p className="text-[14px] font-medium text-[#212529] tracking-[0.3px]">
                  Backstage Pass
                  <span className="text-[#121619] ml-1">
                    ({count?.backstage?.count}x)
                  </span>
                </p>
                <p className="text-[#212529] text-[14px] font-medium">
                  Rs {count?.backstage?.price}
                </p>
              </div>
            )}
          </div>
          <div className="w-full h-[63px] border-b-[1px] border-[#D0D5DD]">
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
              Rs {totalPrice.toLocaleString()}
            </p>
          </div>
        </div>
      </div>   
      <Footer />
    </div>
  );
}
