import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { countries } from "../../Data/Data";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function FlightForm({ fromCity, toCity,airlineName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { flightDetails } = location.state || {};
  const travelers = flightDetails?.travelers;
  const [searchData, setSearchData] = useState(null);
  console.log(flightDetails)
  const [formData, setFormData] = useState({
    passengers: [],
    contactDetails: {
      phoneNumber: "",
      email: "",
    },
    flightDetails: {
      flightName: flightDetails?.airline || "",
      flightNumber: flightDetails?.flightNumber || "ABC",
      price: flightDetails?.price || "",
      from: flightDetails?.citynameFrom || "",
      to: flightDetails?.citynameTo || "",
      arrivalDate: flightDetails?.departureDate || "",
    },
  });

  const REQUIRED_FIELDS = [
    "title",
    "fullName",
    "lastName",
    "nationality",
    "dob",
    "gender",
    "passport",
    "passportCountry",
    "issuanceDate",
    "expiryDate",
  ];

  useEffect(() => {
    if (travelers) {
      const initialPassengers = [];
      Object.entries(travelers).forEach(([category, count]) => {
        for (let i = 0; i < count; i++) {
          initialPassengers.push({
            category,
            title: "",
            fullName: "",
            lastName: "",
            nationality: "",
            dob: "",
            gender: "",
            passport: "",
            passportCountry: "",
            issuanceDate: "",
            expiryDate: "",
          });
        }
      });

      setFormData((prev) => ({
        ...prev,
        passengers: initialPassengers,
      }));
    }
  }, [travelers]);

  const handleInputChange = (category, index, field, value) => {
    setFormData((prev) => {
      const newPassengers = [...prev.passengers];
      newPassengers[index] = {
        ...newPassengers[index],
        [field]: value.trim(),
      };
      return {
        ...prev,
        passengers: newPassengers,
      };
    });
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
    if (!formData.passengers.length) {
      alert("No passenger data found");
      return false;
    }

    for (let i = 0; i < formData.passengers.length; i++) {
      const passenger = formData.passengers[i];
      const missingFields = [];

      for (const field of REQUIRED_FIELDS) {
        if (!passenger[field] || passenger[field].trim() === "") {
          missingFields.push(field);
        }
      }

      if (missingFields.length > 0) {
        alert(
          `Passenger ${i + 1} (${
            passenger.category
          }): Missing ${missingFields.join(", ")}`
        );
        return false;
      }
    }

    if (
      !formData.contactDetails.phoneNumber ||
      !formData.contactDetails.email
    ) {
      alert("Please provide complete contact details");
      return false;
    }

    return true;
  };

   useEffect(() => {
      const data = localStorage.getItem("flightSearchData");
      if (data) {
        setSearchData(JSON.parse(data));
      }
      console.log(data);
    }, []);
    

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        const completeData = {
          ...flightDetails,
          ...formData,
        };
  
        const response = await fetch("http://localhost:5001/api/v1/flight", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(completeData),
        });
  
        if (!response.ok) {
          throw new Error("Failed to submit form data");
        }
  
        const result = await response.json();
  
        localStorage.setItem("flightFormData", JSON.stringify(completeData));
  
        navigate("/flightsreview", {
          state: {
            flight: completeData,
            flightDetails,
            fromCity: flightDetails?.citynameFrom,
            toCity: flightDetails?.citynameTo,
            airlineName: flightDetails?.airline,
          },
        });
      } catch (error) {
        console.error("Error submitting form data:", error);
        alert("There was an issue submitting the form. Please try again.");
      }
    }
  };
  

  if (!travelers) {
    return <div>No traveler details found</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-7xl mx-auto lg:pb-6 lg:px-0"
    >
      {formData.passengers.map((passenger, index) => (
        <div
          key={`${passenger.category}-${index}`}
          className="rounded-[10px] border-2 border-[#D2D2D2] bg-white pb-[10px] px-2 sm:px-4 pr-3 pt-2 mb-4"
        >
          <p className="text-base sm:text-[19px] font-semibold text-[#101828] cursor-default">
            Passenger {index + 1}
            <span className="text-sm sm:text-[16px] font-semibold text-[#667085] lowercase ml-1">
              (
              {passenger.category.charAt(0).toUpperCase() +
                passenger.category.slice(1)}
              )
            </span>
          </p>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 mb-4 mt-1">
            {["Mr", "Mrs", "Miss"].map((title) => (
              <label key={title} className="flex items-center">
                <input
                  type="radio"
                  name={`${passenger.category}-${index}-title`}
                  value={title}
                  checked={passenger.title === title}
                  className="mr-2 h-[15px] w-[15px]"
                  onChange={() =>
                    handleInputChange(passenger.category, index, "title", title)
                  }
                  required
                />
                {title}.
              </label>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full mb-4">
            <div className="w-full sm:w-[49%]">
              <label className="block font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={passenger.fullName}
                className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                onChange={(e) =>
                  handleInputChange(
                    passenger.category,
                    index,
                    "fullName",
                    e.target.value
                  )
                }
                required
              />
            </div>
            <div className="w-full sm:w-[49%]">
              <label className="block font-medium mb-2">Last Name</label>
              <input
                type="text"
                value={passenger.lastName}
                className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                onChange={(e) =>
                  handleInputChange(
                    passenger.category,
                    index,
                    "lastName",
                    e.target.value
                  )
                }
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full mb-4">
            <div className="w-full sm:w-[49%]">
              <label className="block font-medium mb-2">Nationality</label>
              <select
                value={passenger.nationality}
                className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                onChange={(e) =>
                  handleInputChange(
                    passenger.category,
                    index,
                    "nationality",
                    e.target.value
                  )
                }
                required
              >
                <option value="" disabled>
                  Select Nationality
                </option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-[49%]">
              <label className="block font-medium mb-2">Date of Birth</label>
              <input
                type="date"
                value={passenger.dob}
                className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                onChange={(e) =>
                  handleInputChange(
                    passenger.category,
                    index,
                    "dob",
                    e.target.value
                  )
                }
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 mb-4">
            {["Male", "Female"].map((gender) => (
              <label key={gender} className="flex items-center">
                <input
                  type="radio"
                  name={`${passenger.category}-${index}-gender`}
                  value={gender}
                  checked={passenger.gender === gender}
                  className="mr-2 h-[15px] w-[15px]"
                  onChange={() =>
                    handleInputChange(
                      passenger.category,
                      index,
                      "gender",
                      gender
                    )
                  }
                  required
                />
                {gender}
              </label>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full mb-4">
            <div className="w-full sm:w-[49%]">
              <label className="block font-medium mb-2">Passport Number</label>
              <input
                type="text"
                value={passenger.passport}
                className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                onChange={(e) =>
                  handleInputChange(
                    passenger.category,
                    index,
                    "passport",
                    e.target.value
                  )
                }
                required
              />
            </div>
            <div className="w-full sm:w-[49%]">
              <label className="block font-medium mb-2">
                Passport Issuing Country
              </label>
              <select
                value={passenger.passportCountry}
                className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                onChange={(e) =>
                  handleInputChange(
                    passenger.category,
                    index,
                    "passportCountry",
                    e.target.value
                  )
                }
                required
              >
                <option value="" disabled>
                  Select Country
                </option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full mb-4">
            <div className="w-full sm:w-[49%]">
              <label className="block font-medium mb-2">Issuance Date</label>
              <input
                type="date"
                value={passenger.issuanceDate}
                className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                onChange={(e) =>
                  handleInputChange(
                    passenger.category,
                    index,
                    "issuanceDate",
                    e.target.value
                  )
                }
                max={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div className="w-full sm:w-[49%]">
              <label className="block font-medium mb-2">Expiry Date</label>
              <input
                type="date"
                value={passenger.expiryDate}
                className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                onChange={(e) =>
                  handleInputChange(
                    passenger.category,
                    index,
                    "expiryDate",
                    e.target.value
                  )
                }
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </div>
        </div>
      ))}

      <div className="w-full bg-white pb-4 lg:pb-10 rounded-[10px] border-2 border-[#D2D2D2] px-2 sm:px-4 pt-2">
        <h2 className="text-base sm:text-[19px] font-semibold text-[#101828] cursor-default mb-4">
          Contact Details
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="w-full sm:w-[49%]">
            <label className="block font-medium mb-2">Phone Number</label>
            <PhoneInput
              country={"us"}
              value={formData.contactDetails.phoneNumber}
              inputStyle={{ width: "100%" }}
              containerStyle={{ width: "100%" }}
              onChange={(phone) => handleContactChange("phoneNumber", phone)}
              required
            />
          </div>
          <div className="w-full sm:w-[49%]">
            <label className="block font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={formData.contactDetails.email}
              className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
              onChange={(e) => handleContactChange("email", e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-[#FCEB03] hover:bg-yellow-600 text-[#121619] font-semibold py-2 px-4 rounded-md"
        >
          Next
        </button>
      </div>
    </form> 
  );
}
 