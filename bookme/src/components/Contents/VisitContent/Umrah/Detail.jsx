import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { countries } from "../../../Data/Data";
import { FaEdit } from "react-icons/fa";
import Footer from "../../../Home/Footer";
import Navbar from "../../../Home/Navbar";
import loader from "../../../../images/giff.gif";

const PassengerForm = ({ passengerNumber, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === `title-${passengerNumber}`) {
      onChange(passengerNumber - 1, "title", value);
      return;
    }

    onChange(passengerNumber - 1, name, value);
  };
  return (
    <div className="passenger-form">
      <div className="w-full sm:px-4 lg:px-0">
        <div className="w-full h-auto lg:h-[74px] flex flex-col lg:flex-row items-start lg:items-center justify-between px-1">
          <p className="text-[18px] font-semibold text-[#101828] tracking-[0.4px] mb-4 lg:mb-0">
            Passenger {passengerNumber}
            <span className="text-[16px] font-semibold text-[#667085]">
              ( adult )
            </span>
          </p>
          <div className="w-full lg:h-[56%] lg:w-[32.5%] border border-[#121619] text-[14px] font-normal text-[#121619] tracking-[0.4px] flex items-center justify-center gap-2 rounded-[10px] hover:bg-[#FCEB03] hover:text-white cursor-pointer py-3 lg:py-0">
            <MdOutlineDocumentScanner size={17} />
            <p>Scan first page of passport</p>
          </div>
        </div>
        <div className="w-full h-full px-1">
          <div className="flex items-center space-x-4 mb-2">
            {["Mr", "Mrs", "Miss"].map((title) => (
              <label key={title} className="flex items-center">
                <input
                  type="radio"
                  name={`title-${passengerNumber}`}
                  value={title}
                  className="mr-2 h-[15px] w-[15px]"
                  onChange={handleInputChange}
                  required
                />
                {title}.
              </label>
            ))}
          </div>
          <div className="flex flex-col lg:flex-row gap-4 w-full mb-3">
            <div className="w-full lg:w-[49.5%]">
              <label className="block font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-full lg:w-[49.5%]">
              <label className="block font-medium mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 w-full mb-3">
            <div className="w-full lg:w-[49.5%]">
              <label className="block font-medium mb-2">Gender</label>
              <select
                name="gender"
                className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                onChange={handleInputChange}
                required
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="w-full lg:w-[49.5%]">
              <label className="block font-medium mb-2">Date of Birth</label>
              <input
                type="date"
                name="dob"
                className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 w-full mb-4">
            <div className="w-full lg:w-[49.5%]">
              <label className="block font-medium mb-2">Nationality</label>
              <select
                name="nationality"
                className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                onChange={handleInputChange}
                required
              >
                <option value=""></option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full lg:w-[49.5%]">
              <label className="block font-medium mb-2">Country</label>
              <select
                name="country"
                className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                onChange={handleInputChange}
                required
              >
                <option value=""></option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 w-full mb-2">
            <div className="w-full lg:w-[49.5%]">
              <label className="block font-medium mb-2">Passport Number</label>
              <input
                type="text"
                name="passportNumber"
                className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-full lg:w-[49.5%]">
              <label className="block font-medium mb-2">
                Passport Issuance
              </label>
              <input
                type="date"
                name="passportIssuance"
                className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                onChange={handleInputChange}
                max={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 w-full mb-3">
            <div className="w-full lg:w-[49.5%]">
              <label className="block font-medium mb-2">Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </div>
          <p className="text-[14px] flex items-center font-medium text-[#212529] tracking-[0.3px]">
            Require a visa?
            <span className="flex items-center text-[#121619] tracking-[0.5px]">
              <FaEdit className="ml-1" />
              <span className="ml-1">Apply now</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const details = location.state?.details || {};
  const total = location.state?.details?.price || {};
  const selectedPassenger = parseInt(details?.selectedPassenger, 10) || 0;

  const [passengerData, setPassengerData] = useState(
    Array(selectedPassenger)
      .fill({})
      .map(() => ({
        title: "",
        fullName: "",
        lastName: "",
        gender: "",
        dob: "",
        nationality: "",
        country: "",
        passportNumber: "",
        passportIssuance: "",
        expiryDate: "",
        visaRequired: false,
      }))
  );

  const handleInputChange = (index, name, value) => {
    const updatedData = [...passengerData];
    updatedData[index] = {
      ...updatedData[index],
      [name]: value,
    };
    setPassengerData(updatedData);
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      navigate("/");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = () => {
    console.log("Passenger Data:", passengerData);
    if (!passengerData) {
      alert("all field required!");
      return;
    }
    navigate("/Review", {
      state: {
        details,
        passengerData,
      },
    });
  };

  if (!Number.isInteger(selectedPassenger) || selectedPassenger <= 0) {
    console.error("Invalid selectedPassenger value:", selectedPassenger);
    return <p>No passengers to render</p>;
  }

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src={loader} alt="Loading..." />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="w-full h-[81px] bg-[#F2F4F7] overflow-x-auto">
            <div className="min-w-[900px] lg:w-full h-full flex items-center pl-11">
              <div className="h-[49%] w-[16%]">
                <div className="flex justify-end pt-[10px] gap-[4px]">
                  <div className="h-[10px] w-[10px] bg-[#FCEB03] mt-[-2px] rounded-[50%]"></div>
                  <div className="w-[88px] h-[3px] mt-[2px] bg-[#FCEB03]"></div>{" "}
                </div>
                <h3 className="text-[14px] font-medium text-[#121619] text-center mt-[2px]">
                  {" "}
                  Basic{" "}
                </h3>{" "}
              </div>{" "}
              <div className="h-[49%] w-[16%]">
                {" "}
                <div className="flex justify-end pt-[10px] gap-[4px]">
                  {" "}
                  <div className="w-[90px] h-[3px] mt-[2px] bg-[#FCEB03]"></div>{" "}
                  <div className="h-[10px] w-[10px] bg-[#FCEB03] mt-[-2px] rounded-[50%]"></div>{" "}
                  <div className="w-[88px] h-[3px] mt-[2px] bg-[#FCEB03]"></div>{" "}
                </div>{" "}
                <h3 className="text-[14px] font-medium text-[#121619] text-center mt-[2px]">
                  {" "}
                  Travel{" "}
                </h3>{" "}
              </div>{" "}
              <div className="h-[49%] w-[16%]">
                {" "}
                <div className="flex justify-end pt-[10px] gap-[4px]">
                  {" "}
                  <div className="w-[90px] h-[3px] mt-[2px] bg-[#FCEB03]"></div>{" "}
                  <div className="h-[10px] w-[10px] bg-[#FCEB03] mt-[-2px] rounded-[50%]"></div>{" "}
                  <div className="w-[88px] h-[3px] mt-[2px] bg-[#FCEB03]"></div>{" "}
                </div>{" "}
                <h3 className="text-[14px] font-medium text-[#121619] text-center mt-[2px]">
                  {" "}
                  Itinerary{" "}
                </h3>{" "}
              </div>{" "}
              <div className="h-[49%] w-[16%]">
                {" "}
                <div className="flex justify-end pt-[10px] gap-[4px]">
                  {" "}
                  <div className="w-[90px] h-[3px] mt-[2px] bg-[#FCEB03]"></div>{" "}
                  <div className="h-[10px] w-[10px] bg-[#FCEB03] mt-[-2px] rounded-[50%]"></div>{" "}
                  <div className="w-[88px] h-[3px] mt-[2px] bg-[#A1AEBE]"></div>{" "}
                </div>{" "}
                <h3 className="text-[14px] font-medium text-[#121619] text-center mt-[2px]">
                  {" "}
                  Details{" "}
                </h3>{" "}
              </div>{" "}
              <div className="h-[49%] w-[16%]">
                {" "}
                <div className="flex justify-end pt-[10px] gap-[4px]">
                  {" "}
                  <div className="w-[90px] h-[3px] mt-[2px] bg-[#A1AEBE]"></div>{" "}
                  <div className="h-[10px] w-[10px] bg-[#A1AEBE] mt-[-2px] rounded-[50%]"></div>{" "}
                  <div className="w-[88px] h-[3px] mt-[2px] bg-[#A1AEBE]"></div>{" "}
                </div>{" "}
                <h3 className="text-[14px] font-medium text-[#A1AEBE] text-center mt-[2px]">
                  {" "}
                  Summary{" "}
                </h3>{" "}
              </div>{" "}
              <div className="h-[49%] w-[16%]">
                {" "}
                <div className="flex justify-start pt-[10px] gap-[4px]">
                  {" "}
                  <div className="w-[90px] h-[3px] mt-[2px] bg-[#A1AEBE]"></div>{" "}
                  <div className="h-[10px] w-[10px] bg-[#A1AEBE] mt-[-2px] rounded-[50%]"></div>{" "}
                </div>{" "}
                <h3 className="text-[14px] font-medium text-[#A1AEBE] text-center mt-[2px]">
                  {" "}
                  Pay{" "}
                </h3>{" "}
              </div>{" "}
            </div>
          </div>
          <div className="w-full bg-[#F2F4F7] h-auto pb-6 px-4 md:px-12">
            <div className="w-full h-full md:px-10 md:pr-9 flex flex-col lg:flex-row gap-4">
              <div className="h-full w-full lg:w-[66.5%] px-3 pb-8 bg-white border border-[#D2D2D2] rounded-[10px]">
                {Array.from({ length: selectedPassenger }, (_, index) => (
                  <PassengerForm
                    key={index + 1}
                    passengerNumber={index + 1}
                    onChange={handleInputChange}
                  />
                ))}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#FCEB03] mt-6 hover:bg-[#f2e645] text-[#121619] font-semibold py-2 pb-3 px-4 rounded-md"
                >
                  Continue
                </button>
              </div>

              <div className="w-full lg:w-[32%] h-max pb-[10px] bg-white px-[10px] pt-3 border border-[#D2D2D2] rounded-[10px]">
                <h2 className="text-[18px] font-medium text-[#101828] tracking-[0.3px]">
                  Price Breakdown
                </h2>
                <div className="w-full mt-[26px] border-t border-b border-[#D2D2D2] pt-3 pb-[14px]">
                  <h3 className="text-[18px] font-medium text-[#101828] tracking-[0.3px]">
                    Subtotal
                  </h3>
                  <div className="flex justify-between pt-1 pr-1">
                    <h3 className="text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                      Discount
                    </h3>
                    <h4 className="text-[14px] font-medium text-[#212529] tracking-[0.3px]">
                      -Rs 0
                    </h4>
                  </div>
                </div>
                <div className="flex justify-between pt-[10px]">
                  <h3 className="text-[18px] font-medium text-[#101828] tracking-[0.3px]">
                    Total
                  </h3>
                  <p className="text-[18px] font-semibold text-[#121619] tracking-[0.10px]">
                    RS {total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default Details;
