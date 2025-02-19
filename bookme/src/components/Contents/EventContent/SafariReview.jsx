import React, { useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Home/Footer";
import loader from "../../../images/giff.gif";
import Navbar from "../../Home/Navbar";

export default function SafariReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

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
  console.log(formData);

  const CompleteBooking = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/safariPayment", {
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
      <div className="w-full h-auto bg-[#F2F4F7] flex flex-col lg:flex-row pb-10 px-2 lg:px-12">
        <div className="w-full lg:w-[66%] lg:px-5 pt-4">
          <h2 className="text-[18px] font-semibold text-[#101828]">
            Event Details
          </h2>
          <div className="bg-white border border-[#D2D2D2] px-3 mt-3 pb-4 rounded-[10px]">
            <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-4 border-b border-[#D2D2D2] py-4">
              <div>
                <h3 className="text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                  Event Date
                </h3>
                <p className="text-[14px] font-medium text-[#101828] tracking-[0.4px]">
                  {selectedDate}
                </p>
              </div>
              <div>
                <h3 className="text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                  No. of Tickets
                </h3>
                <p className="text-[14px] font-medium text-[#101828] tracking-[0.4px]">
                  {totalCount}x
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 pt-4">
              <div className="lg:w-[23.4%] w-full h-[183px]">
                <img
                  src="https://storage.googleapis.com/bookmepk/static/custom/upload/events/bg/safaritrain-180424.png"
                  alt=""
                  className="h-full w-full rounded-[10px]"
                />
              </div>
              <div className="lg:w-[75%] w-full">
                <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.4px]">
                  Rawalpindi to Attock Safari Tourist Train
                </h2>
                <h3 className="text-[14px] font-medium text-[#101828] tracking-[0.4px] pt-1">
                  Railway Station, Rawalpindi
                </h3>
                <h2 className="text-[18px] mt-3 font-semibold text-[#101828] tracking-[0.4px]">
                  Event Description
                </h2>
                <p className="text-[14px] font-bold text-[#212529] tracking-[0.4px] mt-[4px] underline">
                  SCHEDULE OF RUNNING OF ATTOCK SAFARI TRAIN
                </p>
                <ul className="text-[14px] font-medium list-disc ml-4 pt-5 text-[#212529] tracking-[0.4px]">
                  <li>Departure from Rawalpindi 8.30 hours.</li>
                  <li className="pt-5">Arrival Golra Sharif 8.50 hours</li>
                  <li className="pt-5">
                    Visit of 2 galleries of Railway Museum And Horse Dance Show
                    up to 9.25 hours
                  </li>
                  <li className="pt-5">
                    Departure from Golra Sharif 09:30 hours
                  </li>
                  <li className="pt-5">
                    Breakfast will be served in train after departure of train
                    from Golra Sharif
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
                    Horse Riding, Camel Riding etc. From 13:05 hours to 14:15
                    hours
                  </li>
                  <li className="pt-5">Attock Khurd Departure 14:20 hours</li>
                  <li className="pt-5">Arrival Rawalpindi 16:30 hours</li>
                  <li className="pt-5">Ticket Rates</li>
                  <li className="pt-5">Economy Class Rs. 3500/-</li>
                  <li className="pt-5">
                    This includes breakfast, lunch Horse riding/camel riding and
                    games at Attock Khurd
                  </li>
                  <li className="pt-5">AC Parlor Rs. 5000/-</li>
                  <li className="pt-5">
                    This includes breakfast, lunch Horse riding/camel riding and
                    games at Attock Khurd.
                  </li>
                  <li className="pt-5">For more details and reservations.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-white border border-[#D2D2D2] rounded-[10px] mt-3 p-4">
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
          <div className="bg-white border border-[#D2D2D2] pb-4 rounded-[10px] mt-4">
            <p className="text-[14px] font-medium text-[#212529] px-4 pt-4">
              By selecting Complete Booking you agree to the{" "}
              <span className="text-[#9097A6]">Terms and Conditions</span> and{" "}
              <span className="text-[#9097A6]">Privacy Policy</span>
            </p>
            <div className="border-t border-[#D2D2D2] flex justify-between px-4 py-3">
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
        <div className="w-full lg:w-[31.6%] h-max mt-5 rounded-[10px] bg-white border border-[#D2D2D2] lg:ml-[14px] pb-4">
          <h2 className="text-[18px] font-semibold ml-4 mt-2">Event</h2>
          <p className="text-[14px] font-medium pl-4 text-[#212529] tracking-[0.3px] pt-1">
            Rawalpindi to Attock Safari Tourist Train
          </p>
          <div className="w-full flex flex-wrap justify-between px-4 pt-2">
            <p className="text-[14px] font-medium text-[#212529] tracking-[0.3px]">
              Rawalpindi
            </p>
            <p className="text-[#212529] text-[14px] font-medium">
              {selectedDate}
            </p>
          </div>
          <div className="w-full h-auto pb-4 border-t border-b mt-4 border-[#D0D5DD]">
            <h2 className="text-[18px] font-semibold ml-4 mt-2">Subtotal</h2>
            {count?.EconomyClass?.count > 0 && (
              <div className="w-full flex flex-wrap justify-between px-4 pt-1">
                <p className="text-[14px] font-medium text-[#212529]">
                  Palour Car + Foods <br /> Charges (3500+1500)
                  <br />
                  <span className="text-[#121619]">
                    ({count?.EconomyClass?.count}x)
                  </span>
                </p>
                <p className="text-[#212529] text-[14px] font-medium">
                  Rs {count?.EconomyClass?.price}
                </p>
              </div>
            )}
            {count?.PalourCar?.count > 0 && (
              <div className="w-full flex flex-wrap justify-between px-4 pt-2">
                <p className="text-[14px] font-medium text-[#212529]">
                  Economy Class + Foods <br /> Charges (2000+1500)
                  <br />
                  <span className="text-[#121619]">
                    ({count?.PalourCar?.count}x)
                  </span>
                </p>
                <p className="text-[#212529] text-[14px] font-medium">
                  Rs {count?.PalourCar?.price}
                </p>
              </div>
            )}
          </div>
          <div className="w-full h-auto border-b border-[#D0D5DD]">
            <h2 className="text-[18px] font-semibold ml-4 mt-2">Extras</h2>
            <div className="w-full flex flex-wrap justify-between px-4 pt-1">
              <p className="text-[14px] font-medium text-[#212529]">
                Service Fee
              </p>
              <p className="text-[#212529] text-[14px] font-medium">Rs 14</p>
            </div>
          </div>
          <div className="w-full flex flex-wrap justify-between items-center px-4 pt-2">
            <h2 className="text-[18px] font-semibold ">Total</h2>
            <p className="text-[18px] font-semibold text-[#121619]">
              Rs {totalPrice}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
