import React, { useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Home/Footer";
import loader from "../../../images/giff.gif";
import Navbar from "../../Home/Navbar";

export default function SafarCheckout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { price, counter, selectedDate, name } = location.state || {};
  const totalPrice = price + 14;
  const [isLoading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "Mr",
    fullName: "",
    email: "",
    cnicOrPassport: "",
    contact: "",
    saveDetails: false,
    nickName: "",
    cities: Array(counter).fill(""),
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCityChange = (index, value) => {
    setFormData((prev) => {
      const updatedCities = [...prev.cities];
      updatedCities[index] = value;
      return { ...prev, cities: updatedCities };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const eventDetails = {
      title: formData.title,
      fullName: formData.fullName,
      cnic: formData.cnicOrPassport,
      phoneNumber: formData.contact,
      emailAddress: formData.email,
      saveDetails: formData.saveDetails,
      nickName: formData.nickName,
      city: formData.cities,
      eventDate: selectedDate,
      totalCount: counter,
      name:name
    };

    const token = localStorage.getItem("token");
    console.log(token);

    try {
      const response = await fetch("http://localhost:5001/api/v1/event", {
        method: "POST",
        headers: {
          Authorization: ` ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const data = await response.json();
      console.log("Event created:", data);

      setTimeout(() => {
        setLoading(false);
        navigate("/safarReview", {
          state: {
            formData: eventDetails,
            price,
            counter,
            selectedDate,
            totalPrice,
            eventId: data.eventId,
            name,
          },
        });
      }, 4000);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src={loader} alt="" />
        </div>
      )}
      <Navbar />
      <div className="w-full">
        <div className="w-full h-[56px] bg-white pl-2 md:pl-[70px] px-2 md:px-10">
          <div className="flex items-center h-[22px] mt-2">
            <LuHome color="#9097A6" size={20} />
            <IoChevronForwardOutline
              color="#9097A6"
              className="ml-2"
              size={16}
            />
            <h2 className="ml-3 text-sm md:text-[14px] font-medium text-[#9097A6]">
              Event
            </h2>
            <IoChevronForwardOutline
              color="#9097A6"
              className="ml-2"
              size={16}
            />
            <h2 className="ml-3 text-sm md:text-[14px] font-medium text-[#9097A6]">
              Customer Detail
            </h2>
          </div>
          <div className="w-[97.7%] h-[17px] flex items-end justify-between mt-[2px]">
            <div className="w-1/3 h-[80%] bg-[#FCEB03] rounded-[10px]"></div>
            <div className="w-1/3 h-[80%] bg-[#FCEB03] rounded-[10px]"></div>
            <div className="w-1/3 h-[80%] bg-[#121619] rounded-[10px]"></div>
          </div>
        </div>
        <div className="w-full pb-10 flex flex-col lg:flex-row bg-[#F2F4F7] px-2 md:px-12">
          <div className="w-full lg:w-[66%] h-auto pt-4 lg:pt-[18px] pl-0 lg:pl-[22px]">
            <div className="w-full h-auto lg:h-[72px] flex flex-col lg:flex-row items-start lg:items-center pl-3 gap-2 bg-yellow-50 border border-[#121619] rounded-[10px] p-3 lg:p-0">
              <div className="w-max px-3 lg:px-0 lg:w-[8%] h-auto lg:h-[40%] border-[5px] text-[14px] font-medium ml-0 lg:ml-3 text-[#121619] flex items-center justify-center border-[#121619] rounded-[40px]">
                Note
              </div>
              <p className="text-[14px] font-medium text-[#121619] tracking-[0.3px]">
                Please enter correct details for your booking. Your booking
                details will be sent to this email address and mobile number.
              </p>
            </div>
            <div className="mt-6 pb-2 pl-3 pt-2 rounded-[10px] bg-white border-[1px] border-[#D2D2D2]">
              <h2 className="text-[18px] font-semibold mb-4">
                Passenger Details
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap items-center space-x-4 mb-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="title"
                      value="Mr"
                      className="mr-2"
                      checked={formData.title === "Mr"}
                      onChange={handleInputChange}
                    />
                    Mr.
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="title"
                      value="Mrs"
                      className="mr-2"
                      checked={formData.title === "Mrs"}
                      onChange={handleInputChange}
                    />
                    Mrs.
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="title"
                      value="Miss"
                      className="mr-2"
                      checked={formData.title === "Miss"}
                      onChange={handleInputChange}
                    />
                    Miss.
                  </label>
                </div>
                <div className="flex flex-wrap gap-4 w-full mt-5">
                  <div className="mb-1 w-[96.5%] lg:w-[48.5%]">
                    <label
                      htmlFor="fullName"
                      className="block font-medium mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                    />
                  </div>
                  <div className="mb-1 w-[96.5%] lg:w-[48%]">
                    <label htmlFor="email" className="block font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 w-full mt-2">
                  <div className="mb-1 w-[96.5%] lg:w-[48.5%]">
                    <label
                      htmlFor="CNIC / Passport"
                      className="block font-medium mb-2"
                    >
                      CNIC / Passport
                    </label>
                    <input
                      type="text"
                      name="cnicOrPassport"
                      value={formData.cnicOrPassport}
                      onChange={handleInputChange}
                      className="w-full border-[1px] border-[#D2D2D2] outline-none rounded-md px-3 py-2"
                    />
                  </div>
                  <div className="mb-1 w-[96.5%] lg:w-[48%]">
                    <label htmlFor="contact" className="block font-medium mb-2">
                      Contact
                    </label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                    />
                  </div>
                </div>
                <div className="w-full border-t border-b border-[#D0D5DD] mt-3 pt-7">
                  {Array.from({ length: counter }, (_, index) => (
                    <div key={index} className="w-[96.5%] lg:w-full mb-3">
                      <h2 className="text-[14px] font-medium text-[#212529] tracking-[0.4px]">
                        {index + 1}- General Admission Rs 3000
                      </h2>
                      <h3 className="text-[18px] font-semibold text-[#101828] mt-4">
                        Other Details
                      </h3>
                      <div className="mt-4">
                        <label
                          htmlFor={`City-${index}`}
                          className="text-[14px] font-medium text-[#212529] tracking-[0.4px]"
                        >
                          City
                        </label>
                      </div>
                      <select
                        id={`City-${index}`}
                        value={formData.cities[index]}
                        onChange={(e) =>
                          handleCityChange(index, e.target.value)
                        }
                        className="w-full h-[44px] border border-[#D0D5DD] rounded-[5px] appearance-none bg-transparent outline-none"
                      >
                        <option value=""></option>
                        <option value="Lahore">Lahore</option>
                      </select>
                    </div>
                  ))}
                </div>
                <div className="mb-2 ml-3 mt-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="saveDetails"
                      checked={formData.saveDetails}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Save Details for future use
                  </label>
                </div>
                <div className="mb-4 pl-1 w-[96.5%] lg:w-[98.5%] mt-3">
                  <label htmlFor="nickName" className="block font-medium mb-2">
                    Nick Name
                  </label>
                  <input
                    type="text"
                    id="nickName"
                    name="nickName"
                    value={formData.nickName}
                    onChange={handleInputChange}
                    className="w-full border-[1px] border-[#D2D2D2] outline-none rounded-md px-3 py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-[96.5%] lg:w-[98%] bg-[#FCEB03] hover:bg-[#ede247] text-[#121619] font-medium py-2 ml-1 rounded-md"
                >
                  Next
                </button>
              </form>
            </div>
          </div>

          <div className="w-full lg:w-[32.3%] h-max mt-5 rounded-[10px] bg-white border-[1px] border-[#D2D2D2] ml-0 lg:ml-3 pb-4">
            <h2 className="text-[18px] font-semibold ml-4 mt-2">Event</h2>
            <p className="text-[14px] font-medium pl-4 text-[#212529]">
              The Safar Tour | Bayaan Live in Concert
            </p>
            <div className="w-full flex flex-row justify-between px-4 pt-3">
              <p className="text-[14px] font-medium text-[#212529]">Lahore</p>
              <p className="text-[#212529] text-[14px] font-medium">
                {selectedDate}
              </p>
            </div>
            <div className="w-full h-auto lg:h-[80px] border-t-[1px] border-b-[1px] mt-4 border-[#D0D5DD]">
              <h2 className="text-[18px] font-semibold ml-4 mt-2">Subtotal</h2>
              <div className="w-full flex flex-row justify-between px-4 pt-1">
                <p className="text-[14px] font-medium text-[#212529]">
                  General Admission{" "}
                  <span className="text-[#121619]">({counter}x)</span>
                </p>
                <p className="text-[#212529] text-[14px] font-medium">
                  Rs {price}
                </p>
              </div>
            </div>
            <div className="w-full h-auto lg:h-[70px] border-b-[1px] border-[#D0D5DD]">
              <h2 className="text-[18px] font-semibold ml-4 mt-2">Extras</h2>
              <div className="w-full flex flex-row justify-between px-4 pt-1">
                <p className="text-[14px] font-medium text-[#212529]">
                  Service Fee
                </p>
                <p className="text-[#212529] text-[14px] font-medium">Rs 14</p>
              </div>
            </div>
            <div className="w-full flex flex-row justify-between items-center px-4 pl-1 pt-2">
              <h2 className="text-[18px] font-semibold ml-4">Total</h2>
              <p className="text-[18px] font-semibold text-[#121619]">
                Rs {totalPrice}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
