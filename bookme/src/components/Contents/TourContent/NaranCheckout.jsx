import React, { useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { countries } from "../../Data/Data";
import Footer from "../../Home/Footer";
import Navbar from "../../Home/Navbar";

export default function NaranCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tickets, selectedCity, selectedDate, totalPrice, name } =
    location.state || {
      tickets: {},
      selectedCity: "",
      selectedDate: "",
      totalPrice: 0,
    };
  const person = "1";
  // tickets?.adult.count + tickets?.child.count + tickets?.infant.count;

  const [formData, setFormData] = useState({
    passengers: {},
    contactDetails: {
      title: "Mr",
      fullName: "",
      email: "",
      cnic: "",
      contactNumber: "",
      nickName: "",
      saveDetails: false,
    },
  });

  const initializePassengers = () => {
    const initialPassengers = {};
    Object.entries(tickets).forEach(([category, details]) => {
      for (let i = 0; i < details.count; i++) {
        const key = `${category}-${i}`;
        initialPassengers[key] = {
          category,
          title: "Mr",
          firstName: "",
          lastName: "",
          fullName: "",
          country: "",
          emailAddress: "",
          cnicNumber: "",
          phoneNumber: "",
          nickName: "",
        };
      }
    });
    setFormData((prev) => ({
      ...prev,
      passengers: initialPassengers,
    }));
  };

  React.useEffect(() => {
    initializePassengers();
  }, [tickets]);

  const handlePassengerChange = (passengerKey, field, value) => {
    setFormData((prev) => ({
      ...prev,
      passengers: {
        ...prev.passengers,
        [passengerKey]: {
          ...prev.passengers[passengerKey],
          [field]: value,
        },
      },
    }));
  };

  const handleContactChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      contactDetails: {
        ...prev.contactDetails,
        [field]: value,
      },
    }));
  };

  const validateForm = () => {
    const contactValid =
      formData.contactDetails.title &&
      formData.contactDetails.fullName &&
      formData.contactDetails.email &&
      formData.contactDetails.cnic &&
      formData.contactDetails.contactNumber;

    const passengersValid = Object.values(formData.passengers).every(
      (passenger) =>
        passenger.category &&
        passenger.title &&
        passenger.firstName &&
        passenger.lastName &&
        passenger.country
    );

    return contactValid && passengersValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fill in all required fields");
      return;
    }

    const formattedPassengers = Object.values(formData.passengers).map(
      (details) => ({
        category: details.category,
        title: details.title,
        fullName: `${details.firstName} ${details.lastName}`,
        firstName: details.firstName,
        lastName: details.lastName,
        country: details.country,
        departureDate: selectedDate,
        arrivalDate: selectedDate,
        city: selectedCity,
        person: Number(person),
      })
    );

    const tourDetails = {
      tourName: name,
      price: Number(totalPrice),
      passengers: formattedPassengers,
      contactDetails: {
        title: formData.contactDetails.title,
        fullName: formData.contactDetails.fullName,
        email: formData.contactDetails.email,
        cnic: formData.contactDetails.cnic,
        contactNumber: formData.contactDetails.contactNumber,
        nickName: formData.contactDetails.nickName || "",
        saveDetails: Boolean(formData.contactDetails.saveDetails),
      },
      departureDate: selectedDate,
      arrivalDate: selectedDate,
      city: selectedCity,
      person: Number(person),
    };

    console.log("Sending tour details:", JSON.stringify(tourDetails, null, 2));

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5001/api/v1/tour", {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tourDetails),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create event");
      }

      localStorage.setItem("TourData", JSON.stringify(tourDetails));

      navigate("/naranReview", {
        state: {
          formData: tourDetails,
          selectedDate,
          selectedCity,
          tickets,
          totalPrice,
          eventId: responseData.tourId,
          name,
        },
      });
    } catch (error) {
      console.error("Error details:", error);
      alert(`Failed to create event: ${error.message}`);
    }
  };

  return (
    <div className="w-full">
      <Navbar />
      <div className="w-full h-[56px] bg-white pl-2 md:pl-[70px] px-2 md:px-10">
        <div className="flex items-center h-[22px] mt-2">
          <LuHome color="#9097A6" size={20} />
          <IoChevronForwardOutline color="#9097A6" className="ml-2" size={16} />
          <h2 className="ml-3 text-sm md:text-[14px] font-medium text-[#9097A6]">
            Tour
          </h2>
          <IoChevronForwardOutline color="#9097A6" className="ml-2" size={16} />
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

          <div className="mt-6 pb-2 px-3 lg:px-3 lg:pl-3 lg:pr-10 pt-2 rounded-[10px] bg-white border-[1px] border-[#D2D2D2]">
            <h2 className="text-[18px] font-semibold mb-3">
              Passenger Details
            </h2>
            {Object.keys(tickets).map((type, index) =>
              Array.from({ length: tickets[type].count }).map((_, i) => {
                const passengerKey = `${type}-${i}`;
                return (
                  <div key={passengerKey}>
                    <h3 className="text-[14px] font-medium text-[#212529] mb-3">
                      {type.charAt(0).toUpperCase() + type.slice(1)} {i + 1}
                    </h3>
                    <div className="flex items-center space-x-4 mb-4">
                      {["Mr", "Mrs", "Miss"].map((title) => (
                        <label key={title} className="flex items-center">
                          <input
                            type="radio"
                            name={`title-${passengerKey}`}
                            value={title}
                            checked={
                              formData.passengers[passengerKey]?.title === title
                            }
                            onChange={(e) =>
                              handlePassengerChange(
                                passengerKey,
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 mb-2">
                      <div className="mb-1">
                        <label className="block font-medium mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                          value={
                            formData.passengers[passengerKey]?.firstName || ""
                          }
                          onChange={(e) =>
                            handlePassengerChange(
                              passengerKey,
                              "firstName",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="mb-1">
                        <label className="block font-medium mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="text"
                          name="text"
                          className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                          value={
                            formData.passengers[passengerKey]?.lastName || ""
                          }
                          onChange={(e) =>
                            handlePassengerChange(
                              passengerKey,
                              "lastName",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="mb-1">
                        <label className="block font-medium mb-2">
                          Country
                        </label>
                        <select
                          name=""
                          id=""
                          className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                          value={
                            formData.passengers[passengerKey]?.country || ""
                          }
                          onChange={(e) =>
                            handlePassengerChange(
                              passengerKey,
                              "country",
                              e.target.value
                            )
                          }
                        >
                          <option value="" disabled selected></option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="w-full bg-white mt-4 pb-10 rounded-[10px] border-2 border-[#D2D2D2] px-4 pt-2">
            <h2 className="text-[19px] font-semibold text-[#101828] cursor-default mb-4">
              Contact Details
            </h2>
            <div className="flex items-center space-x-4 mb-4">
              {["Mr", "Mrs", "Miss"].map((title) => (
                <label key={title} className="flex items-center">
                  <input
                    type="radio"
                    value={title}
                    checked={formData.contactDetails.title === title}
                    onChange={(e) =>
                      handleContactChange("title", e.target.value)
                    }
                    className="mr-2"
                  />
                  {title}.
                </label>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="w-full">
                <label className="block font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                  value={formData.contactDetails.fullName}
                  onChange={(e) =>
                    handleContactChange("fullName", e.target.value)
                  }
                  required
                />
              </div>
              <div className="w-full">
                <label className="block font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                  value={formData.contactDetails.email}
                  onChange={(e) => handleContactChange("email", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="w-full">
                <label className="block font-medium mb-2">CNIC</label>
                <input
                  type="text"
                  className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                  value={formData.contactDetails.cnic}
                  onChange={(e) => handleContactChange("cnic", e.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <label className="block font-medium mb-2">Contact Number</label>
                <input
                  type="tel"
                  className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                  value={formData.contactDetails.contactNumber}
                  onChange={(e) =>
                    handleContactChange("contactNumber", e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div className="mb-2 ml-3 mt-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="saveDetails"
                  className="mr-2"
                  checked={formData.contactDetails.saveDetails}
                  onChange={(e) =>
                    handleContactChange("saveDetails", e.target.checked)
                  }
                />
                Save Details for future use
              </label>
            </div>

            <div className="mb-4 pl-1 w-[98.5%] mt-3">
              <label htmlFor="nickName" className="block font-medium mb-2">
                Nick Name
              </label>
              <input
                type="text"
                id="nickName"
                name="nickName"
                value={formData.contactDetails.nickName}
                onChange={(e) =>
                  handleContactChange("nickName", e.target.value)
                }
                className="w-full border-[1px] border-[#D2D2D2] outline-none rounded-md px-3 py-2"
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-[#FCEB03] hover:bg-[#ece148] text-[#121619] font-semibold py-2 px-4 rounded-md"
            >
              Next
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[31.6%] h-max mt-5 rounded-[10px] bg-white border-[1px] border-[#D2D2D2] lg:ml-[14px] pb-4">
          <h2 className="text-[18px] font-semibold ml-4 mt-2">Tour</h2>
          <p className="text-[14px] font-medium pl-4 text-[#212529] tracking-[0.3px] pt-1">
            By Air 05 Days Hunza Private Tour With Air Tickets
          </p>
          <div className="w-full h-auto pb-[16px] border-t-[1px] border-b-[1px] mt-4 border-[#D0D5DD]">
            <h2 className="text-[18px] font-semibold ml-4 mt-2">Subtotal</h2>

            {tickets?.adult?.count > 0 && (
              <div className="w-full flex justify-between px-4 pt-1">
                <p className="text-[14px] font-medium text-[#212529]">
                  Adult(s)
                </p>
                <p className="text-[#212529] text-[14px] font-medium">
                  {tickets?.adult?.count}x
                </p>
              </div>
            )}
            {tickets?.child?.count > 0 && (
              <div className="w-full flex justify-between px-4 pt-2">
                <p className="text-[14px] font-medium text-[#212529]">
                  Children(s)
                </p>
                <p className="text-[#212529] text-[14px] font-medium">
                  {tickets?.child?.count}x
                </p>
              </div>
            )}
            {tickets?.infant?.count > 0 && (
              <div className="w-full flex justify-between px-4 pt-2">
                <p className="text-[14px] font-medium text-[#212529]">
                  Infant(s)
                </p>
                <p className="text-[#212529] text-[14px] font-medium">
                  {tickets?.infant?.count}x
                </p>
              </div>
            )}
          </div>
          <div className="w-full flex justify-between items-center px-4 pl-1 pt-2">
            <h2 className="text-[18px] font-semibold ml-4">Total</h2>
            <p className="text-[18px] font-semibold text-[#121619]">
              Rs {new Intl.NumberFormat("en-IN").format(totalPrice)}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
