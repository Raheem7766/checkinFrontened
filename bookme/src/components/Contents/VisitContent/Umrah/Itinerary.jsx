import React, { useEffect, useState } from "react";
import Footer from "../../../Home/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../Home/Navbar";
import loader from "../../../../images/giff.gif";

export default function Itinerary() {
  const navigate = useNavigate();
  const location = useLocation();
  const { details } = location.state;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    navigate("/Detail", {
      state: { details },
    });
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
          <div className="w-full h-auto pb-9 bg-[#F2F4F7]">
            <div className="w-full h-auto lg:h-[87px] bg-[#FCEB03] flex items-center px-5 lg:px-10 py-2 lg:py-0 justify-start">
              <img
                src="https://storage.googleapis.com/bookmepk/static/custom/contact-form/images/saudi%20(8).png"
                alt=""
                className="w-[80px] lg:w-[100px] filt"
              />
            </div>
            <div className="w-full px-2 lg:px-10 md:px-8 sm:px-4 lg:pr-9">
              <div className="w-full h-auto pt-8">
                <h2 className="text-[21px] font-semibold pl-1 text-[#101828] tracking-[0.3px]">
                  Stay Plan
                </h2>
                <div className="w-full h-full bg-white mt-[10px] px-4 pr-[14px] border border-[#D2D2D2] rounded-[10px]">
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
                  <button
                    onClick={handleContinue}
                    className="w-full bg-[#FCEB03] mt-4 lg:mt-0 hover:bg-[#f2e645] text-[#121619] font-semibold py-2 pb-3 px-4 rounded-md"
                  >
                    Continue
                  </button>
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
