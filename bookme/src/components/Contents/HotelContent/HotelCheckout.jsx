import React, { useState, useEffect } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Home/Footer";
import loader from "../../../images/giff.gif";
import Navbar from "../../Home/Navbar";

export default function HotelCheckout() {
  const location = useLocation();
  const {
    city,
    returnDate,
    departureDate,
    selectedRoom,
    roomCounts,
    travelers,
    totalPrice,
    selectedHotel,
    selected,
    hotelData
  } = location.state;

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const adultCount = travelers?.adult || 0;
  const name = selectedHotel?.name
  const totalRooms = Object.values(roomCounts).reduce(
    (sum, count) => sum + count,
    0
  );   
  const night = 1
  const [travelerDetails, setTravelerDetails] = useState(
    Array.from({ length: adultCount }, () => ({
      title: "",
      firstName: "",
      lastName: "",
    }))
  );

  const [contactDetails, setContactDetails] = useState({
    email: "",
    cnic: "",
    phoneNumber: "",
    saveDetails: false,
    nickName: "",
  });
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 6000);
  }, []);

  const handleTravelerChange = (index, field, value) => {
    setTravelerDetails((prevDetails) =>
      prevDetails.map((traveler, i) =>
        i === index ? { ...traveler, [field]: value } : traveler
      )
    );
  };

  const handleContactChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allTravelersFilled = travelerDetails.every(
      (traveler) => traveler.title && traveler.firstName && traveler.lastName
    );

    const { email, cnic, phoneNumber } = contactDetails;
    const contactDetailsFilled = email && cnic && phoneNumber;

    if (!allTravelersFilled || !contactDetailsFilled) {
      alert("Please fill out all required fields.");
      return;
    }

    const cleanedTotalPrice = parseFloat(totalPrice.replace(/,/g, ""));

    if (isNaN(cleanedTotalPrice)) {
      alert("Invalid total price value.");
      return;
    }

    const dataToSubmit = {
      travelerDetails,
      contactDetails,
      departureDate,
      returnDate,
      roomCounts,
      travelers,
      totalPrice: cleanedTotalPrice,
      totalRooms,
      name,
      night
    }; 
    console.log(dataToSubmit)

    try {
      const response = await fetch("http://localhost:5001/api/v1/hotel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);

      navigate("/HotelReview", {
        state: {
          dataToSubmit,
          selectedHotel,
          selectedRoom,
          selected,
          hotelData
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error.message);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <div className="w-full ">
      {isLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src={loader} alt="Loading..." />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="w-full bg- px-4 sm:px-6 lg:px-[55px] py-3 lg:py-0 lg:h-[56px]">
            <div className="flex flex-wrap items-center gap-2 lg:h-[22px] lg:mt-[12px]">
              <LuHome color="#9097A6" size={20} className="flex-shrink-0" />
              <IoChevronForwardOutline
                color="#9097A6"
                size={16}
                className="flex-shrink-0"
              />
              <h2 className="text-[14px] font-medium text-[#9097A6] flex-shrink-0">
                Hotels
              </h2>
              <IoChevronForwardOutline
                color="#9097A6"
                size={16}
                className="flex-shrink-0"
              />
              <h2 className="text-[14px] font-medium text-[#9097A6] flex-shrink-0">
                Customer Detail
              </h2>
            </div>

            <div className="mt-2 lg:mt-[2px] w-full lg:w-[97.7%]">
              <div className="flex gap-2 h-[14px] lg:h-[17px]">
                <div className="flex-1 h-[80%] bg-[#FCEB03] rounded-[10px] transition-all duration-300"></div>
                <div className="flex-1 h-[80%] bg-[#FCEB03] rounded-[10px] transition-all duration-300"></div>
                <div className="flex-1 h-[80%] bg-[#121619] rounded-[10px] transition-all duration-300"></div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row bg-[#F2F4F7] px-2 sm:px-5 lg:px-7 pb-10">
            <div className="w-full lg:w-[66.3%] pt-4 lg:pt-[33px] px-2 lg:pr-0 lg:pl-[22px]">
              <div className="w-full h-auto lg:h-[63px] flex items-center p-3 lg:pl-3 gap-2 bg-yellow-50 border-[2px] border-[#121619] rounded-[10px]">
                <div className="min-w-[60px] lg:w-[8%] h-[40%] lg:py-3 border-[5px] text-[14px] font-medium text-[#121619] flex items-center justify-center border-[#FCEB03] rounded-[40px] whitespace-nowrap">
                  Note
                </div>
                <p className="text-[14px] font-medium text-[#121619] tracking-[0.3px]">
                  In case of No-show one night's room rental will be charged.
                </p>
              </div>

              <div className="mt-[14px] pb-2 p-3 lg:pl-3 lg:pt-2 rounded-[10px] bg-white border border-[#D2D2D2]">
                <h2 className="text-[18px] font-semibold mb-3">
                  Guest Details
                </h2>
                {travelerDetails.map((traveler, index) => (
                  <div key={index} className="mt-5">
                    <h3 className="text-[14px] font-medium text-[#212529]">
                      Adult {index + 1}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 mt-[14px] mb-4">
                      {["Mr", "Mrs", "Miss"].map((title) => (
                        <label
                          key={title}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={`title${index}`}
                            value={title}
                            checked={traveler.title === title}
                            onChange={(e) =>
                              handleTravelerChange(
                                index,
                                "title",
                                e.target.value
                              )
                            }
                            className="mr-2"
                          />
                          {title}.
                        </label>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full mt-5 mb-2">
                      <div className="w-full sm:w-[49%] mb-1">
                        <label className="block font-medium mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name={`firstName${index}`}
                          value={traveler.firstName}
                          onChange={(e) =>
                            handleTravelerChange(
                              index,
                              "firstName",
                              e.target.value
                            )
                          }
                          className="w-full outline-none rounded-md px-3 py-2 border border-[#D2D2D2]"
                        />
                      </div>
                      <div className="w-full sm:w-[49%] mb-1">
                        <label className="block font-medium mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name={`lastName${index}`}
                          value={traveler.lastName}
                          onChange={(e) =>
                            handleTravelerChange(
                              index,
                              "lastName",
                              e.target.value
                            )
                          }
                          className="w-full outline-none rounded-md px-3 py-2 border border-[#D2D2D2]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full bg-white mt-4 pb-10 rounded-[10px] border-2 border-[#D2D2D2] px-4 pt-2">
                <h2 className="text-[19px] font-semibold text-[#101828] cursor-default mb-4">
                  Contact Details
                </h2>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full mt-[32px]">
                  <div className="w-full sm:w-[48%] lg:w-[49%]">
                    <label className="block font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactDetails.email}
                      onChange={handleContactChange}
                      className="w-full outline-none rounded-md px-3 py-2 border border-[#D2D2D2]"
                      required
                    />
                  </div>
                  <div className="w-full sm:w-[48%] lg:w-[49%]">
                    <label className="block font-medium mb-2">CNIC</label>
                    <input
                      type="text"
                      name="cnic"
                      value={contactDetails.cnic}
                      onChange={handleContactChange}
                      className="w-full outline-none rounded-md px-3 py-2 border border-[#D2D2D2]"
                      required
                    />
                  </div>
                  <div className="w-full sm:w-[48%] lg:w-[49%]">
                    <label className="block font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={contactDetails.phoneNumber}
                      onChange={handleContactChange}
                      className="w-full outline-none rounded-md px-3 py-2 border border-[#D2D2D2]"
                      required
                    />
                  </div>
                </div>

                <div className="mb-2 mt-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="saveDetails"
                      checked={contactDetails.saveDetails}
                      onChange={handleContactChange}
                      className="mr-2"
                    />
                    Save Details for future use
                  </label>
                </div>

                <div className="mb-4 pl-1 w-full lg:w-[98.5%] mt-3">
                  <label htmlFor="nickName" className="block font-medium mb-2">
                    Nick Name
                  </label>
                  <input
                    type="text"
                    id="nickName"
                    name="nickName"
                    value={contactDetails.nickName}
                    onChange={handleContactChange}
                    className="w-full border border-[#D2D2D2] outline-none rounded-md px-3 py-2"
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-[#FCEB03] hover:bg-[#f2e645] text-[#121619] font-semibold py-2 px-4 rounded-md transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="px-2 w-full lg:w-[31.6%]">
              <div className="w-full h-max mt-6 rounded-[10px] bg-white border-[1px] border-[#D2D2D2] lg:ml-[14px] lg:pb-4 py-4 lg:p-0">
                <h2 className="text-[18px] font-semibold lg:ml-4 ml-2 md:ml-4 lg:mt-2">
                  Hotel
                </h2>
                <p className="text-[14px] font-medium lg:pl-4 pl-2 md:pl-4 text-[#212529] tracking-[0.3px] lg:pt-1">
                  {selectedHotel?.name}
                </p>

                <div className="w-full h-auto lg:pb-[16px] pb-3 border-t-[1px] px-2 md:px-4 border-b-[1px] lg:mt-[14px] mt-4 border-[#D0D5DD]">
                  <h2 className="text-[18px] font-semibold lg:ml-2 lg:mt-2 mt-4">
                    Subtotal
                  </h2>

                  <div className="lg:pr-[14px]">
                    <div className="flex justify-between">
                      <h3 className="text-[14px] font-medium lg:pl-2 text-[#212529] tracking-[0.3px] lg:pt-1">
                        Check-in
                      </h3>
                      <p className="text-[14px] font-medium lg:pl-2 text-[#212529] tracking-[0.3px] lg:pt-1">
                        {new Date(departureDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex justify-between lg:mt-[2px]">
                      <h3 className="text-[14px] font-medium lg:pl-2 text-[#212529] tracking-[0.3px] lg:pt-1">
                        Check-out
                      </h3>
                      <p className="text-[14px] font-medium lg:pl-2 text-[#212529] tracking-[0.3px] lg:pt-1">
                        {new Date(returnDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex justify-between lg:mt-[2px]">
                      <h3 className="text-[14px] font-medium lg:pl-2 text-[#212529] tracking-[0.3px] lg:pt-1">
                        Total Rooms
                      </h3>
                      <p className="text-[14px] font-medium lg:pl-2 text-[#212529] tracking-[0.3px] lg:pt-1">
                        {totalRooms}
                      </p>
                    </div>

                    <div className="flex justify-between lg:mt-[2px]">
                      <h3 className="text-[14px] font-medium lg:pl-2 text-[#212529] tracking-[0.3px] lg:pt-1">
                        Night to stay
                      </h3>
                      <p className="text-[14px] font-medium lg:pl-2 text-[#212529] tracking-[0.3px] lg:pt-1">
                        1
                      </p>
                    </div>

                    <div className="flex justify-between lg:mt-[2px]">
                      <h3 className="text-[14px] font-medium lg:pl-2 text-[#212529] tracking-[0.3px] lg:pt-1">
                        Room Price
                      </h3>
                      <p className="text-[14px] font-medium lg:pl-4 text-[#212529] tracking-[0.3px] lg:pt-1">
                        Rs {totalPrice}
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
                  <p className="text-[18px] font-semibold text-[#121619]">
                    RS {totalPrice}
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
