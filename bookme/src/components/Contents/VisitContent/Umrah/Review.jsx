import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Footer from "../../../Home/Footer";
import Navbar from "../../../Home/Navbar";
import loader from "../../../../images/giff.gif";

export default function Review() {
  const location = useLocation();
  const navigate = useNavigate();
  const { details, passengerData } = location.state;
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
      details.price &&
      details.selectedDate &&
      details.selectedOption &&
      details.selectedPassenger;

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
        navigate("/UmrahPayment", {
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
                      20 Days
                    </h3>
                  </div>
                  <div className="px-3 pt-3 w-full lg:w-1/2">
                    <h3 className="text-[14px] font-semibold text-[#101828] tracking-[0.3px]">
                      Trip Departure
                    </h3>
                    <h3 className="text-[14px] font-medium text-[#667085] tracking-[0.3px] mt-[-2px]">
                      Lahore
                    </h3>
                  </div>
                </div>

                <div className="w-full h-auto px-2 md:px-4 border border-[#D2D2D2] pb-4 rounded-[10px] mt-5 lg:px-6 lg:mt-10 lg:text-[18px]">
                  <h2 className="text-[16px] font-medium text-[#212529] mt-2 tracking-[0.3px] lg:text-[18px]">
                    20 Days Umrah Package (22 Dec to 11 Jan)
                  </h2>
                  <ul className="text-[12px] px-[10px] pt-[6px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[14px]">
                    <ol>1. Stay in Makkah Al Juhani Hotel (400-500M)</ol>
                    <ol>2. Stay in Madinah Najoom Al Khair Hotel (450-550)</ol>
                    <ol>3. Visa Included</ol>
                    <ol>4. Transfers Included</ol>
                    <ol>5. Makkah Ziyarat Included</ol>
                    <ol>6. Madinah Ziyarat Included</ol>
                  </ul>
                  <h2 className="text-[16px] font-medium text-[#212529] mt-2 tracking-[0.3px] lg:text-[18px]">
                    Package Itinerary
                  </h2>
                  <div className="w-full flex gap-4 mt-4 lg:h-[138px] lg:gap-4">
                    <div className="h-full w-[30px] pt-[18px] flex-shrink-0">
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        1
                      </div>
                      <div className="w-[2px] h-[78%] bg-[#FCEB03] m-auto "></div>
                    </div>
                    <div className="flex-1 px-3 pt-2 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 1: Arrival in Jeddah and Transfer to Makkah
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li className="">
                          Arrival at Jeddah Airport: Warm welcome and assistance
                          with formalities
                        </li>
                        <li className="pt-1">
                          Private Transfer to Makkah: Comfortable journey to
                          your hotel in Makkah
                        </li>
                        <li className="pt-1">
                          Check-in & Rest: Relax and prepare for your Umrah
                          pilgrimage
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        2
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 pt-2 mt-4 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 2: Umrah Performance
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Guided Umrah: Perform your Umrah rituals with
                          assistance from the guide
                        </li>
                        <li className="pt-1">
                          Prayers at Masjid Al-Haram: Spend time in worship and
                          reflection
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        3
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 mt-4 pt-2 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 3: Makkah Ziyarat
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Visit Significant Sites: Includes Jabal Al-Nour
                          (Ghar-e-Hira), Jabal Al-Thawr, and Masjid Aisha
                        </li>
                        <li className="pt-1">
                          Free Time for Worship: Time at the Holy Mosque for
                          prayers
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        4
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 mt-4 pt-2 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 4: Rest and Personal Activities
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Free Day: Relax at the hotel or engage in personal
                          prayers and reflections
                        </li>
                        <li className="pt-1">
                          Shopping Opportunities: Explore nearby markets for
                          souvenirs and essentials
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        5
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 mt-4 pt-2 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 5: Transfer to Medina
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Haramain High-Speed Train: Comfortable train journey
                          to Medina
                        </li>
                        <li className="pt-1">
                          Check-in at Hotel in Medina: Settle into your
                          accommodations
                        </li>
                        <li className="pt-1">
                          Evening Prayers: Time for prayers at Masjid Al-Nabawi
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        6
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 mt-4 pt-2 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 6: Visit Masjid Al-Nabawi
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Tour of Masjid Al-Nabawi: Spend time at the Prophet's
                          Mosque
                        </li>
                        <li className="pt-1">
                          Prayers & Reflections: Engage in worship and explore
                          the holy sites within the mosque
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        7
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 mt-4 pt-2 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 7: Medina Ziyarat
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Visit Key Religious Sites: Includes Quba Mosque,
                          Qiblatain Mosque, and the Uhud Battlefield
                        </li>
                        <li className="pt-1">
                          Shopping in Medina: Explore markets near the mosque
                          for souvenirs
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        8
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 mt-4 pt-2 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 8: Rest and Leisure in Medina
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Relax at Hotel: A day for personal rest and worship
                        </li>
                        <li className="pt-1">
                          Optional Local Activities: Visit local souks or enjoy
                          leisure time at the mosque
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        9
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 mt-4 pt-2 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 9: Transfer to Jeddah
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Private Transfer: Comfortable journey from Medina to
                          Jeddah
                        </li>
                        <li className="pt-1">
                          Check-in at Hotel in Jeddah: Relax after your journey
                        </li>
                        <li className="pt-1">
                          Evening at Leisure: Enjoy the hotel facilities or
                          explore the local area
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        10
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 mt-4 pt-2 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 10: Jeddah City Tour
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Tour Al-Balad (Old Town): Visit the historic
                          coral-stone buildings and vibrant souks
                        </li>
                        <li className="pt-1">
                          King Fahd Fountain: View the world’s tallest fountain
                          by the Red Sea
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        11
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 mt-4 pt-2 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 11: Shopping and Leisure in Jeddah
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Visit Mall of Arabia: Explore the large shopping mall
                          for local and international brands
                        </li>
                        <li className="pt-1">
                          Relax by the Corniche: Enjoy scenic views along
                          Jeddah’s waterfront
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        12
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 mt-4 pt-2 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 12: Return to Makkah
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Private Transfer to Makkah: Comfortable journey back
                          to your hotel
                        </li>
                        <li className="pt-1">
                          Free Time for Worship: Spend time in prayers at Masjid
                          Al-Haram
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        13
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 mt-4 pt-2 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 13: Makkah Ziyarat
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Visit More Religious Sites: Includes Mina, Muzdalifah,
                          and Arafat
                        </li>
                        <li className="pt-1">
                          Worship & Relaxation: Spend time in reflection at
                          Masjid Al-Haram
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        14
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 mt-4 pt-2 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 14: Rest Day in Makkah
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Leisure at Hotel: Relax and enjoy hotel amenities
                        </li>
                        <li className="pt-1">
                          Personal Worship: Focus on prayers and reflections at
                          the mosque
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        15
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 mt-4 pt-2 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 15: Optional Activities in Makkah
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Shopping in Makkah: Explore local souks and shopping
                          centers
                        </li>
                        <li className="pt-1">
                          Prepare for Departure: Start packing and final prayers
                          at Masjid Al-Haram
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        16
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 mt-4 pt-2 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 16: Final Umrah and Farewell Prayers
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Perform a Final Umrah: Conclude your spiritual journey
                          with another Umrah
                        </li>
                        <li className="pt-1">
                          Farewell Prayers: Spend your last moments in the holy
                          city in worship
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px]">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-[50%] bg-[#FCEB03] flex items-center justify-center font-medium">
                        17
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="w-[96%] h-[76%] mt-4 px-3 pb-3 lg:pb-0 pt-[10px] border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                        Day 17: Rest and Prepare for Departure
                      </h2>
                      <ul className="text-[14px] ol pl-[30px] tracking-[0.3px] font-medium text-[#667085]">
                        <li>
                          Relax at Hotel: Final day to rest and organize your
                          belongings
                        </li>
                        <li className="pt-1">
                          Shopping for Souvenirs: Last-minute shopping
                          opportunities
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px]">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-[50%] bg-[#FCEB03] flex items-center justify-center font-medium">
                        18
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="w-[96%] h-[90%] px-3 mt-4 pt-[10px] pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                        Day 18: Departure from Makkah
                      </h2>
                      <ul className="text-[14px] ol pl-[30px] tracking-[0.3px] font-medium text-[#667085]">
                        <li>
                          Private Transfer to Jeddah: Travel to Jeddah for your
                          flight
                        </li>
                        <li className="pt-1">
                          Check-in at Airport: Assistance with departure
                          formalities
                        </li>
                        <li className="pt-1">
                          Return Flight: Board your flight back home
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px]">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-[50%] bg-[#FCEB03] flex items-center justify-center font-medium">
                        19
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="w-[96%] h-[76%] mt-4 pb-3 lg:pb-0 px-3 pt-[10px] border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                        Day 19: Arrival at Home
                      </h2>
                      <ul className="text-[14px] ol pl-[30px] tracking-[0.3px] font-medium text-[#667085]">
                        <li>
                          Rest Day: Recuperate after your spiritual journey
                        </li>
                        <li className="pt-1">
                          Share Experiences: Reflect on and share your
                          unforgettable memories
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-full flex gap-4 lg:h-[153px] lg:gap-4">
                    <div className="h-full w-[30px]">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-[50%] bg-[#FCEB03] flex items-center justify-center font-medium">
                        20
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="w-[96%] h-[76%] mt-4 pb-3 lg:pb-0 px-3 pt-[10px] border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                        Day 20: Resume Daily Routine
                      </h2>
                      <ul className="text-[14px] ol pl-[30px] tracking-[0.3px] font-medium text-[#667085]">
                        <li>
                          Return to Normal Life: Carry the blessings of Umrah
                          into your daily routine
                        </li>
                        <li className="pt-1">
                          Stay Spiritually Connected: Maintain prayers and
                          reflections
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="w-full h-auto px-5 border border-[#D2D2D2] rounded-[10px] mt-3">
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
                            ? new Date(passenger.expiryDate).toLocaleDateString(
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
                  <p className="text-[18px] font-semibold text-[#101828] tracking-[0.10px]">
                    RS {details?.price.toLocaleString()}
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
}
