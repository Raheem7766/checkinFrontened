import React, { useEffect, useState } from "react";
import Footer from "../../../Home/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../Home/Navbar";
import loader from "../../../../images/giff.gif";

export default function LuxItinerary() {
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

    navigate("/LuxDetail", {
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
                  <div className="container mx-auto px-2 md:px-0">
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
                        <div className="w-[2px] h-full lg:h-[78%] bg-[#FCEB03] mx-auto"></div>
                      </div>
                      <div className="w-full lg:w-[96%] h-auto lg:h-[70%] px-3 pt-[10px] border border-[#D2D2D2] rounded-[10px]">
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

                  <button
                    onClick={handleContinue}
                    className="w-full bg-[#FCEB03] hover:bg-[#f2e645] mt-4 lg:mt-0 text-[#121619] font-semibold py-2 pb-3 px-4 rounded-md"
                  >
                    Continue
                  </button>
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
