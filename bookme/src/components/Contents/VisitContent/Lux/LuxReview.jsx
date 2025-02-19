import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Footer from "../../../Home/Footer";
import Navbar from "../../../Home/Navbar";
import loader from "../../../../images/giff.gif";

export default function LuxReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { details, passengerData, total1 } = location.state;
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  const handleContinue = async () => {
    if (!passengerData || passengerData.length === 0) {
      alert("No passenger data found!");
      return;
    }

    if (!phone || !email) {
      alert("Please provide both phone number and email address!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    if (phone.length < 10 || !/^\d+$/.test(phone)) {
      alert("Please enter a valid phone number!");
      return;
    }

    const isPassengerDataComplete = passengerData.every((passenger) => {
      if (!passenger) return false;

      return (
        passenger.title?.trim() &&
        passenger.fullName?.trim() &&
        passenger.lastName?.trim() &&
        passenger.gender?.trim() &&
        passenger.dob &&
        passenger.nationality?.trim() &&
        passenger.country?.trim() &&
        passenger.passportNumber?.trim() &&
        passenger.passportIssuance &&
        passenger.expiryDate
      );
    });

    const isDetailsComplete =
      details &&
      details.selectedDate &&
      details.selectedOption &&
      details.selectedPassenger;
    console.log(isDetailsComplete);

    if (!isPassengerDataComplete) {
      alert("Please fill in all passenger details!");
      return;
    }

    if (!isDetailsComplete) {
      alert("Please fill in all booking details!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/v1/visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passengerData: passengerData.map((passenger) => ({
            ...passenger,
            visaRequired: passenger.visaRequired || false,
          })),
          contactDetails: {
            phone: phone,
            email: email,
          },
          details,
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/LuxPayment", {
          state: {
            details,
            passengerData,
            contactDetails: { phone, email },
          },
        });
      } else {
        alert(data.error || "Error saving booking details");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving booking details");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src={loader} alt="Loading..." />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="w-full h-[81px] bg-[#F2F4F7] flex items-center pl-11 overflow-x-auto">
            <div className="min-w-[900px] lg:w-full h-full flex items-center">
              <div className="h-[49%] w-[16%]">
                <div className="flex justify-end pt-[10px] gap-[4px]">
                  <div className="h-[10px] w-[10px] bg-[#FCEB03] mt-[-2px] rounded-[50%]"></div>
                  <div className="w-[88px] h-[3px] mt-[2px] bg-[#FCEB03]"></div>
                </div>
                <h3 className="text-[14px] font-medium text-[#121619] text-center mt-[2px]">
                  Basic
                </h3>
              </div>
              <div className="h-[49%] w-[16%]">
                <div className="flex justify-end pt-[10px] gap-[4px]">
                  <div className="w-[90px] h-[3px] mt-[2px] bg-[#FCEB03]"></div>
                  <div className="h-[10px] w-[10px] bg-[#FCEB03] mt-[-2px] rounded-[50%]"></div>
                  <div className="w-[88px] h-[3px] mt-[2px] bg-[#FCEB03]"></div>
                </div>
                <h3 className="text-[14px] font-medium text-[#121619] text-center mt-[2px]">
                  Travel
                </h3>
              </div>
              <div className="h-[49%] w-[16%]">
                <div className="flex justify-end pt-[10px] gap-[4px]">
                  <div className="w-[90px] h-[3px] mt-[2px] bg-[#FCEB03]"></div>
                  <div className="h-[10px] w-[10px] bg-[#FCEB03] mt-[-2px] rounded-[50%]"></div>
                  <div className="w-[88px] h-[3px] mt-[2px] bg-[#FCEB03]"></div>
                </div>
                <h3 className="text-[14px] font-medium text-[#121619] text-center mt-[2px]">
                  Itinerary
                </h3>
              </div>
              <div className="h-[49%] w-[16%]">
                <div className="flex justify-end pt-[10px] gap-[4px]">
                  <div className="w-[90px] h-[3px] mt-[2px] bg-[#FCEB03]"></div>
                  <div className="h-[10px] w-[10px] bg-[#FCEB03] mt-[-2px] rounded-[50%]"></div>
                  <div className="w-[88px] h-[3px] mt-[2px] bg-[#FCEB03]"></div>
                </div>
                <h3 className="text-[14px] font-medium text-[#121619] text-center mt-[2px]">
                  Details
                </h3>
              </div>
              <div className="h-[49%] w-[16%]">
                <div className="flex justify-end pt-[10px] gap-[4px]">
                  <div className="w-[90px] h-[3px] mt-[2px] bg-[#FCEB03]"></div>
                  <div className="h-[10px] w-[10px] bg-[#FCEB03] mt-[-2px] rounded-[50%]"></div>
                  <div className="w-[88px] h-[3px] mt-[2px] bg-[#A1AEBE]"></div>
                </div>
                <h3 className="text-[14px] font-medium text-[#121619] text-center mt-[2px]">
                  Summary
                </h3>
              </div>
              <div className="h-[49%] w-[16%]">
                <div className="flex justify-start pt-[10px] gap-[4px]">
                  <div className="w-[90px] h-[3px] mt-[2px] bg-[#A1AEBE]"></div>
                  <div className="h-[10px] w-[10px] bg-[#A1AEBE] mt-[-2px] rounded-[50%]"></div>
                </div>
                <h3 className="text-[14px] font-medium text-[#A1AEBE] text-center mt-[2px]">
                  Pay
                </h3>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#F2F4F7] h-auto pb-6 px-2 lg:px-12">
            <div className="w-full h-full lg:px-10 lg:pr-9 flex gap-4 flex-col lg:flex-row">
              <div className="h-full w-full lg:w-[66.5%] px-4 pb-8 bg-white border border-[#D2D2D2] rounded-[10px]">
                <h2 className="text-[18px] font-medium text-[#212529] mt-3 tracking-[0.3px]">
                  Booking Review
                </h2>
                <div className="w-full h-auto lg:h-[68px] pb-3 lg:pb-0 flex lg:gap-14 border border-[#D2D2D2] rounded-[10px] mt-3 flex-row">
                  <div className="px-3 pt-3 w-full lg:w-auto">
                    <h3 className="text-[14px] font-semibold text-[#101828] tracking-[0.3px]">
                      Duration of Stay
                    </h3>
                    <h3 className="text-[14px] font-medium text-[#667085] tracking-[0.3px] mt-[-2px]">
                      5 Days
                    </h3>
                  </div>
                  <div className="px-3 pt-3 w-full lg:w-1/2">
                    <h3 className="text-[14px] font-semibold text-[#101828] tracking-[0.3px]">
                      Trip Departure
                    </h3>
                    <h3 className="text-[14px] font-medium text-[#667085] tracking-[0.3px] mt-[-2px]">
                      {details?.selectedOption}
                    </h3>
                  </div>
                </div>
                <div className="w-full h-auto px-2 md:px-4 border border-[#D2D2D2] pb-4 rounded-[10px] mt-5 lg:px-6 lg:mt-10 lg:text-[18px]">
                  <h2 className="text-[16px] font-medium text-[#212529] mt-2 tracking-[0.3px] lg:text-[18px]">
                    5-Day Enchanting AlUla Experience – Experience the Saudi
                    Luxury
                  </h2>
                  <ul className="text-[12px] px-[10px] pt-[6px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[14px]">
                    <ol>1. 4 Nights Stay in a 1-Bedroom Luxury Villa </ol>
                    <ol>2. Airport Pickup & Drop-off</ol>
                    <ol>3. All Transfers Included</ol>
                    <ol>4. Daily Breakfast Included</ol>
                    <ol>
                      5. Roundtrip Flights from Karachi, Lahore, or Islamabad
                    </ol>
                    <ol>6. Saudi Visit Visa</ol>
                  </ul>
                  <h2 className="text-[16px] font-medium text-[#212529] mt-2 tracking-[0.3px] lg:text-[18px]">
                    Package Itinerary
                  </h2>
                  <div>
                    <div className="w-full h-auto lg:h-[125px] flex gap-2 lg:gap-4 mt-4">
                      <div className="h-full w-[30px] pt-0 lg:pt-[18px] relative">
                        <div className="h-[30px] w-[30px] rounded-[50%] bg-[#FCEB03] flex items-center justify-center font-medium">
                          1
                        </div>
                        <div className="w-[2px] h-full lg:h-[105%] bg-[#FCEB03] mx-auto"></div>
                      </div>
                      <div className="w-full lg:w-[96%] h-auto lg:h-[90%] px-3 pt-[10px] border border-[#D2D2D2] rounded-[10px] mb-4 lg:mb-0">
                        <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                          Day 1: Arrival in AlUla
                        </h2>
                        <ul className="text-[14px] ol pl-[30px] tracking-[0.3px] font-medium text-[#667085]">
                          <li>
                            Arrival at AlUla Airport: Warm welcome and private
                            transfer to your luxury villa
                          </li>
                          <li className="pt-1">
                            Check-in & Relax: Settle in and enjoy the evening at
                            leisure
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="w-full h-auto lg:h-[125px] flex gap-2 lg:gap-4">
                      <div className="h-full w-[30px] relative">
                        <div className="w-[2px] h-full lg:h-[35px] bg-[#FCEB03] mx-auto"></div>
                        <div className="h-[30px] w-[30px] rounded-[50%] bg-[#FCEB03] flex items-center justify-center font-medium">
                          2
                        </div>
                        <div className="w-[2px] h-full lg:h-[78%] bg-[#FCEB03] mx-auto"></div>
                      </div>
                      <div className="w-full lg:w-[96%] h-auto lg:h-[90%] px-3 mt-0 lg:mt-[16px] pt-[10px] border border-[#D2D2D2] rounded-[10px] mb-4 lg:mb-0">
                        <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                          Day 2: Explore Hegra and AlUla Old Town
                        </h2>
                        <ul className="text-[14px] ol pl-[30px] tracking-[0.3px] font-medium text-[#667085]">
                          <li>
                            Guided Tour of Hegra: Discover Saudi Arabia's first
                            UNESCO World Heritage site, featuring ancient
                            Nabatean tombs
                          </li>
                          <li className="pt-1">
                            AlUla Old Town: Stroll through the historic
                            mud-brick village and its bustling souks
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="w-full h-auto lg:h-[125px] flex gap-2 lg:gap-4">
                      <div className="h-full w-[30px] relative">
                        <div className="w-[2px] h-full lg:h-[55px] bg-[#FCEB03] mx-auto"></div>
                        <div className="h-[30px] w-[30px] rounded-[50%] bg-[#FCEB03] flex items-center justify-center font-medium">
                          3
                        </div>
                        <div className="w-[2px] h-full lg:h-[78%] bg-[#FCEB03] mx-auto"></div>
                      </div>
                      <div className="w-full lg:w-[96%] h-auto lg:h-[90%] px-3 mt-0 lg:mt-[36px] pt-[10px] border border-[#D2D2D2] rounded-[10px] mb-4 lg:mb-0">
                        <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                          Day 3: Adventure & Iconic Sights
                        </h2>
                        <ul className="text-[14px] ol pl-[30px] tracking-[0.3px] font-medium text-[#667085]">
                          <li>
                            Elephant Rock Visit: Marvel at the iconic natural
                            sandstone formation
                          </li>
                          <li className="pt-1">
                            Dune Bashing & Sandboarding: Thrilling desert
                            activities amidst AlUla's unique landscapes
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="w-full h-auto flex gap-2 lg:gap-4">
                      <div className="h-full w-[30px] relative">
                        <div className="w-[2px] h-full lg:h-[73px] bg-[#FCEB03] mx-auto"></div>
                        <div className="h-[30px] w-[30px] rounded-[50%] bg-[#FCEB03] flex items-center justify-center font-medium">
                          4
                        </div>
                        <div className="w-[2px] h-full lg:h-[117px] bg-[#FCEB03] mx-auto"></div>
                      </div>
                      <div className="w-full lg:w-[96%] h-auto px-3 pb-7 mt-0 lg:mt-[50px] pt-[10px] border border-[#D2D2D2] rounded-[10px] mb-4 lg:mb-0">
                        <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                          Day 4: Cultural and Stargazing Experience
                        </h2>
                        <ul className="text-[14px] ol pl-[30px] tracking-[0.3px] font-medium text-[#667085]">
                          <li>
                            AlUla Heritage Village: Engage with local artisans
                            and learn about traditional crafts
                          </li>
                          <li className="pt-1">
                            Desert Stargazing: Enjoy a guided astronomical tour
                            under AlUla's clear night sky
                          </li>
                          <li className="pt-1">
                            Bedouin-style Dinner: Savor authentic cuisine in a
                            traditional desert camp setting
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="w-full h-auto lg:h-[125px] flex gap-2 lg:gap-4">
                      <div className="h-full w-[30px] relative">
                        <div className="w-[2px] h-full lg:h-[22px] bg-[#FCEB03] mx-auto"></div>
                        <div className="h-[30px] w-[30px] rounded-[50%] bg-[#FCEB03] flex items-center justify-center font-medium">
                          5
                        </div>
                        {/* <div className="w-[2px] h-full lg:h-[78%] bg-[#FCEB03] mx-auto"></div> */}
                      </div>
                      <div className="w-full lg:w-[96%] h-auto lg:h-[70%] mt-4 px-3 pt-[10px] border border-[#D2D2D2] rounded-[10px]">
                        <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                          Day 5: Departure from AlUla
                        </h2>
                        <ul className="text-[14px] ol pl-[30px] tracking-[0.3px] font-medium text-[#667085]">
                          <li>
                            Return Flight: Private transfer to the airport for
                            your return flight
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-auto px-5 border border-[#D2D2D2]  rounded-[10px] mt-3">
                  <h2 className="text-[18px] font-medium text-[#212529] mt-3 tracking-[0.3px]">
                    Traveler Details
                  </h2>
                  {passengerData.map((passenger, index) => (
                    <div key={index} className="mb-7">
                      <h3 className="text-[18px] font-medium text-[#667085] mt-4 tracking-[0.3px]">
                        Traveler {index + 1}
                      </h3>
                      <p className="text-[14px] font-bold text-[#212529] mt-1 tracking-[0.3px]">
                        Basic Information:{" "}
                        <span className="font-semibold">
                          {passenger?.fullName} {passenger?.lastName},{" "}
                          {passenger?.dob
                            ? new Date(passenger.dob).toLocaleDateString(
                                "en-US",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "N/A"}
                          , {passenger?.gender}, {passenger?.country}
                        </span>
                      </p>
                      <p className="text-[14px] font-bold text-[#212529] mt-3 tracking-[0.4px]">
                        Passport:{" "}
                        <span className="font-semibold">
                          {passenger?.country}, {passenger?.passportNumber},
                          Expires on{" "}
                          {passenger?.expiryDate
                            ? new Date(passenger.dob).toLocaleDateString(
                                "en-US",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "N/A"}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
                <div className="w-full h-auto px-4 border border-[#D2D2D2] pb-3 rounded-[10px] mt-6">
                  <h2 className="text-[18px] font-medium text-[#212529] mt-3 tracking-[0.3px]">
                    Contact Details
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-4 w-full mt-[22px]">
                    <div className="w-full sm:w-[49.5%]">
                      <label className="block text-[14px] text-[#212529] font-medium mb-[10px]">
                        Phone Number
                      </label>
                      <PhoneInput
                        country={"pk"}
                        inputStyle={{ width: "100%" }}
                        placeholder="Enter a phone number"
                        value={phone}
                        onChange={(value) => setPhone(value)}
                        required
                      />
                    </div>
                    <div className="w-full sm:w-[49.5%]">
                      <label className="block text-[14px] text-[#212529] font-medium mb-[10px]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full outline-none rounded-md px-3 py-2 border-[1px] border-[#D2D2D2]"
                        required
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleContinue}
                  className="w-full bg-[#FCEB03] mt-6 hover:bg-[#f2e645] text-[#121619] font-semibold py-2 pb-3 px-4 rounded-md"
                >
                  Continue
                </button>
              </div>
              <div className="w-full sm:w-[48%] md:w-[32%] h-max pb-[10px] bg-white px-[10px] pt-3 border border-[#D2D2D2] rounded-[10px]">
                <h2 className="text-[18px] font-medium text-[#101828] tracking-[0.3px]">
                  Price Breakdown
                </h2>
                <div className="w-full mt-[26px] border-t border-b border-[#D2D2D2] pt-3 pb-[14px]">
                  <h3 className="text-[18px] font-medium text-[#101828] tracking-[0.3px]">
                    Subtotal
                  </h3>
                  <div className="flex justify-between pt-1 pr-1">
                    <h3 className="text-[14px] font-medium text-[#667085] tracking-[0.3px] ">
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
                    RS {total1}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
      <Footer />
    </>
  );
}
