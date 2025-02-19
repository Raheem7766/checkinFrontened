import React, { useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Home/Footer";
import loader from "../../../images/giff.gif";
import Navbar from "../../Home/Navbar";

export default function ParaReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const { price, counter, selectedDate, formData, totalPrice, ticketDetails } =
    location.state || {};

  const CompleteBooking = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/ParaPayment", {
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
        <div className="h-full w-full lg:w-[66%] pt-4">
          <h2 className="text-[18px] font-semibold text-[#101828]">
            Event Details
          </h2>

          <div className="w-full bg-white border border-[#D2D2D2] px-3 mt-3 rounded-[10px]">
            <div className="w-full h-max border-b border-[#D2D2D2] flex flex-wrap gap-6 lg:flex-nowrap lg:gap-[176px] py-3">
              <div>
                <h3 className="text-[14px] font-medium text-[#667085]">
                  Event Date
                </h3>
                <p className="text-[14px] font-medium text-[#101828]">
                  {ticketDetails?.selectedDate}
                </p>
              </div>
              <div>
                <h3 className="text-[14px] font-medium text-[#667085]">
                  No. of Tickets
                </h3>
                <p className="text-[14px] font-medium text-[#101828]">
                  {ticketDetails?.counter}x
                </p>
              </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-4 pt-3">
              <div className="w-full lg:w-[23.4%] h-[183px]">
                <img
                  src="https://storage.googleapis.com/bookmepk/static/custom/upload/events/bg/paragliding120824.png"
                  alt="Paragliding"
                  className="h-full w-full rounded-[10px]"
                />
              </div>

              <div className="w-full lg:w-[75%] pb-11 pt-3">
                <h2 className="text-[18px] font-semibold text-[#101828]">
                  Paragliding in Pakistan
                </h2>
                <h3 className="text-[14px] font-medium text-[#101828] pt-1">
                  Pir Chinasi
                </h3>

                <h3 className="text-[18px] font-semibold text-[#101828] pt-3">
                  Event Description
                </h3>
                <h3 className="text-[14px] font-bold text-[#212529] mt-1">
                  Flight Details
                </h3>
                <ul className="text-[14px] font-medium pt-2 text-[#212529] list-disc pl-5">
                  <li>Paragliding Passenger Flight (15 to 20 Min Duration)</li>
                  <li>
                    Takeoff from Pir Chinasi (9,500ft) and landing on
                    Muzaffarabad Airport.
                  </li>
                  <li>We provide safety equipment for flight.</li>
                  <li>HD GoPro video of your flight is included.</li>
                  <li>Transportation back to takeoff location included.</li>
                  <li>
                    Self-arrival required at takeoff location (Pir Chinasi).
                  </li>
                  <li>
                    No training required; instructions provided before flight.
                  </li>
                </ul>

                <h2 className="text-[14px] font-bold text-[#101828] mt-5">
                  Company Policies
                </h2>
                <ul className="text-[14px] font-medium text-[#212529] list-disc pl-5">
                  <li>Passenger safety is our priority.</li>
                  <li>Experienced pilots with 12+ years of experience.</li>
                  <li>Equipment certified by international bodies.</li>
                  <li>Reserve parachute available for emergencies.</li>
                  <li>Pilot flies with passengers for safety assurance.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full bg-white border border-[#D2D2D2] rounded-[10px] mt-3 p-4">
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

          <div className="w-full bg-white border border-[#D2D2D2] rounded-[10px] mt-4 p-4">
            <p className="text-[14px] font-medium text-[#212529]">
              By selecting Complete Booking you agree to the{" "}
              <span className="text-[#667085]">Terms and Conditions</span> and{" "}
              <span className="text-[#667085]">Privacy Policy</span>
            </p>

            <div className="w-full border-t border-[#D2D2D2] flex justify-between mt-3 pt-3">
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
            Pir Chinasi
          </p>
          <div className="w-full flex justify-between px-4 pt-2">
            <p className="text-[14px] font-medium text-[#212529] tracking-[0.3px]">
              Paragliding in Pakistan
            </p>
            <p className="text-[#212529] text-[14px] font-medium">
              {ticketDetails?.selectedDate}
            </p>
          </div>
          <div className="w-full h-auto pb-[16px] border-t-[1px] border-b-[1px] mt-4 border-[#D0D5DD]">
            <h2 className="text-[18px] font-semibold ml-4 mt-2">Subtotal</h2>

            <div className="w-full flex justify-between px-4 pt-1">
              <p className="text-[14px] font-medium text-[#212529]">
                Single (15% Discount <br /> Applied)
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
