import React, { useEffect, useState } from "react";
import Footer from "../../../Home/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../Home/Navbar";
import loader from "../../../../images/giff.gif";

export default function SaudiaItinerary() {
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

    navigate("/SaudiaDetail", {
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
                <div className="w-full h-full bg-white mt-[10px] pb-4 px-4 pr-[14px] border border-[#D2D2D2] rounded-[10px]">
                  <div className="w-full flex gap-4 mt-4 lg:h-[125px] lg:gap-4">
                    <div className="h-full w-[30px] pt-[18px] flex-shrink-0">
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        1
                      </div>
                      <div className="w-[2px] h-[78%] bg-[#FCEB03] m-auto "></div>
                    </div>
                    <div className="flex-1 px-3 pt-2 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 1: Arrival in Riyadh{" "}
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Arrival at Riyadh Airport: Warm welcome and transfer
                          to your 1-bedroom apartment
                        </li>
                        <li className="pt-1">
                          Check-in & Relax: Enjoy your evening at leisure
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-full flex gap-4 lg:h-[143px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        2
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 pt-2 mt-4 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 2: Riyadh City Exploration
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          City Tour: Discover Riyadh’s historic sites, including
                          the National Museum and Masmak Fortress
                        </li>
                        <li className="pt-1">
                          Boulevard City Visit: Explore this vibrant hub with
                          dining, shopping, and entertainment
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-full flex gap-4 lg:h-[143px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        3
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 pt-2 mt-4 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 3: Diriyah & Cultural Heritage
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Diriyah Tour: Visit the UNESCO-listed historical area,
                          including At-Turaif and Bujairi Terrace, experiencing
                          the heritage of Saudi Arabia’s first capital
                        </li>
                        <li className="pt-1">
                          Free Time for Worship: Time at the Holy Mosque for
                          prayers
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="w-full flex gap-4 lg:h-[143px] lg:gap-4">
                    <div className="h-full w-[30px] flex-shrink-0">
                      <div className="w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                      <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                        4
                      </div>
                      <div className="w-[2px] h-[59%] bg-[#FCEB03] m-auto"></div>
                    </div>
                    <div className="flex-1 px-3 pt-2 mt-4 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 4: Edge of the World Adventure
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Edge of the World Tour: Embark on a 4x4 adventure to
                          the stunning desert cliffs
                        </li>
                        <li className="pt-1">
                          Desert Safari & Camel Ride: Add excitement with a
                          camel ride and desert activities
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
                    <div className="flex-1 px-3 pt-2 mt-4 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 5: Fly to AlUla
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>Travel Mode: Flight from Riyadh to AlUla</li>
                        <li className="pt-1">Check-in at Hotel in AlUla</li>
                        <li className="pt-1">
                          Evening at Leisure: Relax and enjoy the serene
                          surroundings of AlUla
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
                    <div className="flex-1 px-3 pt-2 mt-4 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 6: Discover AlUla
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Guided Tour of Hegra: Explore Saudi’s first UNESCO
                          World Heritage site with ancient Nabatean tombs
                        </li>
                        <li className="pt-1">
                          AlUla Old Town Visit: Stroll through the historic
                          mud-brick village and its vibrant souks
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
                    <div className="flex-1 px-3 pt-2 mt-4 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 7: Nature & Adventure in AlUla
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Elephant Rock Visit: Marvel at this iconic natural
                          formation
                        </li>
                        <li className="pt-1">
                          Dune Bashing & Sandboarding: Thrill-seeking activities
                          amidst AlUla’s stunning landscapes
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
                    <div className="flex-1 px-3 pt-2 mt-4 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 8: Drive to Medina
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Travel Mode: Private Car Transfer from AlUla to Medina
                          (Approx. 3.5-4 hours drive)
                        </li>
                        <li className="pt-1">Check-in at Hotel in Medina</li>
                        <li>
                          Medina Tour: Visit the Prophet's Mosque and explore
                          key religious sites in the holy city
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
                    <div className="flex-1 px-3 pt-2 mt-4 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 9: High-Speed Train to Makkah
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Travel Mode: Haramain High-Speed Railway from Medina
                          to Makkah
                        </li>
                        <li className="pt-1">
                          Check-in at Clock Tower Hotel: Settle into your luxury
                          room overlooking the Holy Mosque
                        </li>
                        <li className="pt-1">
                          Umrah Activities: Begin your Umrah pilgrimage with
                          guidance and support
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
                    <div className="flex-1 px-3 pt-2 mt-4 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 10: Makkah Ziyarat & Optional Activities
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Makkah Ziyarat: Visit significant religious sites,
                          including Ghar-e-Hira and Ghar-e-Sorr (optional)
                        </li>
                        <li className="pt-1">
                          Free Time for Worship: Spend time in prayer and
                          reflection at the Holy Mosque
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
                    <div className="flex-1 px-3 pt-2 mt-4 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 11: Private Transfer to Taif
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Travel Mode: Private Car Transfer from Makkah to Taif
                        </li>
                        <li className="pt-1">
                          Taif Exploration: Visit Shubra Palace and Al Rudaf
                          Park in the mountainous city
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
                    <div className="flex-1 px-3 pt-2 mt-4 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 12: Private Transfer to Jeddah
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Travel Mode: Private Car Transfer from Taif to Jeddah
                          (Approx. 1.5-hour drive)
                        </li>
                        <li className="pt-1">
                          Check-in at Apartment in Jeddah
                        </li>
                        <li>Evening at Leisure</li>
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
                    <div className="flex-1 px-3 pt-2 mt-4 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 13: Jeddah City Exploration
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Al-Balad (Old Town): Tour the UNESCO-listed district
                          with traditional coral architecture
                        </li>
                        <li className="pt-1">
                          King Fahd’s Fountain: Witness the world’s tallest
                          fountain
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
                    <div className="flex-1 px-3 pt-2 mt-4 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 14: Sunset Dinner Cruise
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Sunset & Dinner Cruise: Enjoy a scenic cruise with
                          dinner along the Jeddah coast
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
                    <div className="flex-1 px-3 pt-2 mt-4 pb-3 lg:pb-0 border border-[#D2D2D2] rounded-[10px]">
                      <h2 className="text-[16px] font-semibold text-[#101828] tracking-[0.3px] lg:text-[18px]">
                        Day 15: Snorkeling and Diving Adventure
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Red Sea Snorkeling: Dive into Jeddah’s vibrant marine
                          life with a guided snorkeling experience
                        </li>
                        <li className="pt-1">
                          Desert Sea Divers Experience: Join the renowned Desert
                          Sea Divers for an exhilarating diving session to
                          explore the Red Sea’s underwater beauty
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
                        Day 16: Departure from Jeddah
                      </h2>
                      <ul className="text-[13px] pl-5 tracking-[0.3px] font-medium text-[#667085] list-disc lg:text-[14px]">
                        <li>
                          Transfer to Airport: Private transfer to the airport
                          for your return flight, concluding this unforgettable
                          journey
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={handleContinue}
                    className="w-full bg-[#FCEB03] hover:bg-[#f2e645] mt-4 text-[#121619] font-semibold py-2 pb-3 px-4 rounded-md"
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
