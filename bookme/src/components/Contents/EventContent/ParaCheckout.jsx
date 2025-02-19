import React, { useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Home/Footer";
import loader from "../../../images/giff.gif";
import Navbar from "../../Home/Navbar";

export default function ParaCheckout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setLoading] = useState(false);
  const { ticketDetails } = location.state || {};
  const selectedDate = ticketDetails?.selectedDate;

  const [formData, setFormData] = useState({
    title: "Mr",
    fullName: "",
    email: "",
    cnicOrPassport: "",
    contact: "",
    saveDetails: false,
    nickName: "",
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
      city: "Rawalpindi",
      totalCount: ticketDetails?.counter,  
      name: ticketDetails?.name,
      eventDate: ticketDetails?.selectedDate,
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
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/ParaReview", {
          state: {
            formData: eventDetails,
            selectedDate,
            ticketDetails,
            eventId: data.eventId,
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
          <div className="w-full lg:w-[66.2%] h-auto pt-4 lg:pt-[18px] pl-0 lg:pl-[22px]">
            <div className="w-full h-auto py-4 flex items-center flex-col lg:flex-row p-3 gap-2 bg-yellow-50 border border-[#121619] rounded-[10px]">
              <div className="w-full lg:w-[8%] h-[0%] py-1 border-[5px] text-sm lg:text-[14px] font-medium text-[#121619] flex items-center justify-center border-[#121619] rounded-full">
                Note
              </div>
              <p className="text-sm lg:text-[14px] font-medium text-[#121619] tracking-[0.3px]">
                Please enter correct details for your booking. Your booking
                details will be sent to this email address and mobile number.
              </p>
            </div>

            <div className="mt-6 pb-2 pl-3 pt-2 rounded-[10px] bg-white border border-[#D2D2D2]">
              <h2 className="text-lg lg:text-[18px] font-semibold mb-4">
                Customer Details
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="flex items-center space-x-4 mb-4">
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

                <div className="flex flex-col lg:flex-row gap-4 w-full mt-5">
                  <div className="mb-1 w-[98%] lg:w-[48.5%]">
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
                      className="w-full outline-none rounded-md px-3 py-2 border border-[#D2D2D2]"
                    />
                  </div>
                  <div className="mb-1 w-[98%] lg:w-[48%]">
                    <label htmlFor="email" className="block font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full outline-none rounded-md px-3 py-2 border border-[#D2D2D2]"
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 w-full mt-2">
                  <div className="mb-1 w-[98%] lg:w-[48.5%]">
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
                      className="w-full border border-[#D2D2D2] outline-none rounded-md px-3 py-2"
                    />
                  </div>
                  <div className="mb-1 w-[98%] lg:w-[48%]">
                    <label htmlFor="contact" className="block font-medium mb-2">
                      Contact
                    </label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="w-full outline-none rounded-md px-3 py-2 border border-[#D2D2D2]"
                    />
                  </div>
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

                <div className="mb-4 pl-1 w-[98%] lg:w-full mt-3">
                  <label htmlFor="nickName" className="block font-medium mb-2">
                    Nick Name
                  </label>
                  <input
                    type="text"
                    id="nickName"
                    name="nickName"
                    value={formData.nickName}
                    onChange={handleInputChange}
                    className="w-full border border-[#D2D2D2] outline-none rounded-md px-3 py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-[98%] bg-[#FCEB03] hover:bg-[#e8dd47] text-[#121619] font-medium py-2 rounded-md"
                >
                  Next
                </button>
              </form>
            </div>
          </div>

          <div className="w-full lg:w-[31.6%] h-max mt-5 rounded-[10px] bg-white border-[1px] border-[#D2D2D2] lg:ml-[14px] pb-4">
            <h2 className="text-[18px] font-semibold ml-4 mt-2">Event</h2>
            <p className="text-[14px] font-medium pl-4 text-[#212529] tracking-[0.3px] pt-1">
              Paragliding in Pakistan
            </p>
            <div className="w-full flex justify-between px-4 pt-2">
              <p className="text-[14px] font-medium text-[#212529] tracking-[0.3px]">
                Pir Chinasi
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
    </>
  );
}
