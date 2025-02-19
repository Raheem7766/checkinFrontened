import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoChevronForwardOutline } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Home/Footer";
import loader from "../../../images/giff.gif";
import Navbar from "../../Home/Navbar";

export default function HotelReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { dataToSubmit, selectedHotel, selectedRoom, hotelData } =
    location.state;
  const guestTotal =
    dataToSubmit?.travelers?.adult +
    dataToSubmit?.travelers?.children +
    dataToSubmit?.travelers?.infant; 
  console.log(selectedHotel);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 6000);
  }, []);

  const handleContinue = () => {
    navigate("/HotelPayment", {
      state: {
        dataToSubmit,
        selectedHotel,
      },
    });
  };

  return (
    <div>
      {isLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src={loader} alt="Loading..." />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="w-[100%] px-4 sm:px-6 lg:px-[55px] py-3 lg:py-0 lg:h-[56px] border-b">
            <div className="flex items-center h-[22px] mt-[12px]">
              <LuHome color="#9097A6" size={20} />
              <IoChevronForwardOutline
                color="#9097A6"
                className=" ml-2"
                size={16}
              />
              <h2 className="ml-3 text-[14px] font-medium text-[#9097A6]">
                Hotels
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

          <div className="w-full h-auto bg-[#F2F4F7] px-2 sm:px-5 lg:px-7 pt-5 flex flex-col lg:flex-row pb-10">
            <div className="lg:w-[66%] w-full px-2">
              <div className="h-auto pb-5 w-full bg-white px-4 border border-[#D2D2D2] rounded-lg">
                <div className="w-full h-auto">
                  <div className="w-full h-auto pb-2 lg:pb-6 flex flex-wrap lg:flex-nowrap border-b border-[#D2D2D2]">
                    <div className="h-full w-1/2 lg:w-1/4 pt-3">
                      <h2 className="text-sm font-bold tracking-[0.3px] text-[#212529]">
                        Check-in
                      </h2>
                      <p className="text-sm font-medium text-[#212529] tracking-[0.3px]">
                        {new Date(
                          dataToSubmit?.departureDate
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <h2 className="text-sm font-bold tracking-[0.3px] text-[#212529] mt-3">
                        Children
                      </h2>
                      <p className="text-sm font-medium text-[#212529] tracking-[0.3px]">
                        {dataToSubmit?.travelers?.children}
                      </p>
                    </div>
                    <div className="h-full w-1/2 lg:w-1/4 pt-3">
                      <h2 className="text-sm font-bold tracking-[0.3px] text-[#212529]">
                        Check-out
                      </h2>
                      <p className="text-sm font-medium text-[#212529] tracking-[0.3px]">
                        {new Date(dataToSubmit?.returnDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <h2 className="text-sm font-bold tracking-[0.3px] text-[#212529] mt-3">
                        Infant
                      </h2>
                      <p className="text-sm font-medium text-[#212529] tracking-[0.3px]">
                        {dataToSubmit?.travelers?.infant}
                      </p>
                    </div>
                    <div className="h-full w-1/2 lg:w-1/4 pt-3">
                      <h2 className="text-sm font-bold tracking-[0.3px] text-[#212529]">
                        Total Nights
                      </h2>
                      <p className="text-sm font-medium text-[#212529] tracking-[0.3px]">
                        1
                      </p>
                      <h2 className="text-sm font-bold tracking-[0.3px] text-[#212529] mt-3">
                        Rooms
                      </h2>
                      <p className="text-sm font-medium text-[#212529] tracking-[0.3px]">
                        {dataToSubmit?.totalRooms}
                      </p>
                    </div>
                    <div className="h-full w-1/2 lg:w-1/4 pt-3">
                      <h2 className="text-sm font-bold tracking-[0.3px] text-[#212529]">
                        Adults
                      </h2>
                      <p className="text-sm font-medium text-[#212529] tracking-[0.3px]">
                        {dataToSubmit?.travelers?.adult}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-auto mt-3 flex gap-4">
                    <div className="lg:w-[23%] w-1/3 lg:h-[83%]">
                      <img
                        src={selectedHotel.img}
                        alt={selectedHotel.name}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-[#101828]">
                        {selectedHotel.name}
                      </h2>
                      <h3 className="text-sm font-medium text-[#667085]">
                        {selectedHotel.address}
                      </h3>
                      <div className="flex items-center mt-2">
                        {[...Array(selectedHotel.count)].map((_, i) => (
                          <FaStar
                            key={i}
                            color="#FCEB03"
                            size={20}
                            className="pt-1"
                          />
                        ))}
                        <h3 className="text-sm font-medium text-[#667085] ml-2">
                          {selectedHotel.count}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-3 border-t border-[#D0D5DD] flex gap-4 pt-2">
                    {["Free Breakfast", "Free Wifi", "Free Parking"].map(
                      (feature, index) => (
                        <h3
                          key={index}
                          className="text-sm font-medium text-[#212529] tracking-[0.4px]"
                        >
                          {feature}
                        </h3>
                      )
                    )}
                  </div>
                  <div className="w-full mt-3 border-t border-[#D0D5DD] pt-2">
                    <h2 className="text-sm font-bold text-[#1476D1]">
                      {dataToSubmit?.totalRooms}x{" "}
                      <span className="font-semibold text-[#212529]">
                        {selectedRoom} ({guestTotal} Guests)
                      </span>
                    </h2>
                  </div>
                </div>
              </div>

              <div className="w-full bg-white border border-[#D2D2D2] rounded-lg mt-3 px-4 sm:px-5 lg:px-6 pb-4">
                <h2 className="text-lg font-semibold mt-3">Guest Details</h2>
                <div>
                  {dataToSubmit?.travelerDetails?.map((guest, index) => (
                    <div key={index} className="mt-4">
                      <h3 className="text-base font-medium text-[#667085]">
                        Guest {index + 1}
                      </h3>
                      <p className="text-sm font-bold text-[#212529] mt-1">
                        Basic Information:{" "}
                        <span className="font-semibold">
                          {guest?.title}. {guest?.firstName} {guest?.lastName}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
                <h2 className="text-lg font-semibold mt-4 text-[#667085]">
                  Contacts
                </h2>
                <p className="text-sm font-semibold text-[#212529] mt-1">
                  {dataToSubmit?.contactDetails?.cnic}{" "}
                  {dataToSubmit?.contactDetails?.email}{" "}
                  {dataToSubmit?.contactDetails?.phoneNumber}
                </p>
              </div>

              <div className="w-full bg-white border border-[#D2D2D2] rounded-lg mt-3 px-4 py-4">
                <p className="text-sm font-medium text-[#212529]">
                  By selecting Complete Booking you agree to the{" "}
                  <span className="text-[#667085]">Terms and Conditions</span>{" "}
                  and <span className="text-[#667085]">Privacy Policy</span>
                </p>
                <div className="flex justify-between mt-4 border-t border-[#D2D2D2] pt-3">
                  <p className="text-lg font-semibold text-[#101828]">Total</p>
                  <p className="text-lg font-semibold text-[#101828]">
                    Rs {dataToSubmit?.totalPrice}
                  </p>
                </div>
                <button
                  onClick={handleContinue}
                  className="w-full h-12 mt-3 rounded-lg bg-[#FCEB03] text-[#101828] font-medium text-sm"
                >
                  Complete Booking
                </button>
              </div>
            </div>

            <div className="px-2 w-full mt-4 lg:mt-0 lg:w-[31.6%]">
              <div className="w-full h-max rounded-[10px] bg-white border-[1px] border-[#D2D2D2] lg:ml-[14px] lg:pb-4 py-4 lg:p-0">
                <h2 className="text-[18px] font-semibold lg:ml-4 ml-2 md:ml-4 lg:mt-2">
                  Hotel
                </h2>
                <p className="text-[14px] font-medium lg:pl-4 pl-2 md:pl-4 text-[#212529] tracking-[0.3px] lg:pt-1">
                  {selectedHotel?.name}
                </p>

                <div className="w-full h-auto lg:pb-[16px] pb-3 border-t-[1px] px-2 md:px-4 border-b-[1px] lg:mt-[14px] mt-4 border-[#D0D5DD]">
                  <h2 className="text-[18px] font-semibold lg:mt-2 mt-4">
                    Subtotal
                  </h2>

                  <div className="">
                    <div className="flex justify-between">
                      <h3 className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                        Check-in
                      </h3>
                      <p className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                        {new Date(
                          dataToSubmit?.departureDate
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex justify-between lg:mt-[2px]">
                      <h3 className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                        Check-out
                      </h3>
                      <p className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                        {new Date(dataToSubmit?.returnDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    <div className="flex justify-between lg:mt-[2px]">
                      <h3 className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                        Total Rooms
                      </h3>
                      <p className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                        {dataToSubmit?.totalRooms}
                      </p>
                    </div>

                    <div className="flex justify-between lg:mt-[2px]">
                      <h3 className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                        Night to stay
                      </h3>
                      <p className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                        1
                      </p>
                    </div>

                    <div className="flex justify-between lg:mt-[2px]">
                      <h3 className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                        Room Price
                      </h3>
                      <p className="text-[14px] font-medium lg:pl-4 text-[#212529] tracking-[0.3px] lg:pt-1">
                        Rs {dataToSubmit?.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:px-4 md:px-4 px-2 lg:pl-1 lg:pt-2 mt-4 lg:mt-0">
                  <h2 className="text-[18px] font-semibold lg:ml-3 lg:mt-[2px]">
                    Extras
                  </h2>
                  <div className="flex justify-between lg:mt-[2px]">
                    <h3 className="text-[14px] font-medium lg:pl-3 text-[#212529] tracking-[0.3px] lg:pt-1">
                      G.S.T
                    </h3>
                    <p className="text-[14px] font-medium lg:pl-4 text-[#212529] tracking-[0.3px] lg:pt-1">
                      Rs 2,070
                    </p>
                  </div>
                </div>

                <div className="w-full flex justify-between items-center lg:px-4 md:px-4 px-2 lg:pl-1 lg:pt-3 pt-2 border-t-[1px] lg:mt-3 mt-4 border-[#D0D5DD]">
                  <h2 className="text-[18px] font-semibold lg:ml-3">Total</h2>
                  <p className="text-[18px] font-semibold text-[#101828]">
                    RS {dataToSubmit?.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}
