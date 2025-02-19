import React, { useEffect, useState } from "react";
import Footer from "../../../Home/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../Home/Navbar";
import loader from "../../../../images/giff.gif";

export default function MajItinerary() {
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

    navigate("/MajDetail", {
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
                  <div>
                    <div className="w-full flex gap-4 mt-4 lg:h-[125px]">
                      <div className="h-full w-[30px] flex-shrink-0 pt-[18px] lg:pt-[18px]">
                        <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                          1
                        </div>
                      </div>
                      <div className="flex-1 px-3 py-3 lg:h-[90%] border border-[#D2D2D2] rounded-[10px]">
                        <h2 className="text-[16px] lg:text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                          Day 1: Arrival in Riyadh{" "}
                        </h2>
                        <ul className="text-[13px] lg:text-[14px] pl-5 lg:pl-[30px] tracking-[0.3px] font-medium text-[#667085] list-disc">
                          <li>
                            Arrival at Riyadh Airport: Begin your journey with a
                            warm welcome and private transfer to your 1-bedroom
                            apartment
                          </li>
                          <li className="pt-1">
                            Check-in & Relax: Settle in and enjoy the evening at
                            leisure
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full flex gap-4 mt-4">
                      <div className="h-full w-[30px] flex-shrink-0">
                        <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                          2
                        </div>
                      </div>
                      <div className="flex-1 px-3 py-3 border border-[#D2D2D2] rounded-[10px]">
                        <h2 className="text-[16px] lg:text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                          Day 2: Discover Diriyah & Desert Adventure
                        </h2>
                        <ul className="text-[13px] lg:text-[14px] pl-5 lg:pl-[30px] tracking-[0.3px] font-medium text-[#667085] list-disc">
                          <li>
                            Visit to At-Turaif District: Step into the
                            historical heart of Saudi Arabia at this UNESCO
                            World Heritage site
                          </li>
                          <li className="pt-1">
                            Bujairi Terrace: Savor traditional Saudi cuisine
                            with scenic views
                          </li>
                          <li className="pt-1">
                            Historical Landmarks: Explore Diriyah's rich
                            cultural sites and marketplaces
                          </li>
                          <li className="pt-1">
                            Desert Safari: Experience the thrill of a desert
                            safari amidst Diriyah's scenic landscapes
                          </li>
                          <li className="pt-1">
                            Desert Quad Bike Adventure: Enjoy a 30-minute quad
                            biking experience for each guest in the desert
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full flex gap-4 mt-4">
                      <div className="h-full w-[30px] flex-shrink-0">
                        <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                          3
                        </div>
                      </div>
                      <div className="flex-1 px-3 py-3 border border-[#D2D2D2] rounded-[10px]">
                        <h2 className="text-[16px] lg:text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                          Day 3: Edge of the World Adventure
                        </h2>
                        <ul className="text-[13px] lg:text-[14px] pl-5 lg:pl-[30px] tracking-[0.3px] font-medium text-[#667085] list-disc">
                          <li>
                            Edge of the World Tour: Embark on a 4x4 journey to
                            the iconic desert cliffs
                          </li>
                          <li className="pt-1">
                            Camel Ride Experience: Enhance the day with a
                            traditional camel ride
                          </li>
                          <li className="pt-1">
                            Visit to Bats' Cave: Explore unique natural
                            formations
                          </li>
                          <li className="pt-1">
                            Scenic Desert Dinner: Cap off the day with a dinner
                            under the stars
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full flex gap-4 mt-4 lg:h-[125px]">
                      <div className="h-full w-[30px] flex-shrink-0">
                        <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                          4
                        </div>
                      </div>
                      <div className="flex-1 px-3 py-3 lg:h-[90%] border border-[#D2D2D2] rounded-[10px]">
                        <h2 className="text-[16px] lg:text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                          Day 4: Boulevard World & Boulevard City
                        </h2>
                        <ul className="text-[13px] lg:text-[14px] pl-5 lg:pl-[30px] tracking-[0.3px] font-medium text-[#667085] list-disc">
                          <li>
                            Boulevard City: Discover Riyadh's vibrant hub of
                            entertainment, global cuisine, and culture
                          </li>
                          <li className="pt-1">
                            Boulevard World: Tour themed areas showcasing
                            different cultures from around the world
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full flex gap-4 mt-4">
                      <div className="h-full w-[30px] flex-shrink-0">
                        <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                          5
                        </div>
                      </div>
                      <div className="flex-1 px-3 py-3 border border-[#D2D2D2] rounded-[10px]">
                        <h2 className="text-[16px] lg:text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                          Day 5: Shopping Escapade
                        </h2>
                        <ul className="text-[13px] lg:text-[14px] pl-5 lg:pl-[30px] tracking-[0.3px] font-medium text-[#667085] list-disc">
                          <li>
                            Riyadh Park Mall: Discover exclusive brands and
                            unique finds
                          </li>
                          <li className="pt-1">
                            Al Nakheel Mall: Enjoy luxury shopping with local
                            and international brands
                          </li>
                          <li className="pt-1">
                            Cenomi Mall: Explore high-end boutiques and curated
                            stores
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full flex gap-4 mt-4 lg:h-[125px]">
                      <div className="h-full w-[30px] flex-shrink-0">
                        <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                          6
                        </div>
                      </div>
                      <div className="flex-1 px-3 py-3 lg:h-[70%] border border-[#D2D2D2] rounded-[10px]">
                        <h2 className="text-[16px] lg:text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                          Day 6: Farewell Dinner in VIA Riyadh
                        </h2>
                        <ul className="text-[13px] lg:text-[14px] pl-5 lg:pl-[30px] tracking-[0.3px] font-medium text-[#667085] list-disc">
                          <li>
                            Elegant Farewell Dinner: Conclude your Riyadh
                            journey with a luxurious dining experience at VIA
                            Riyadh
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="w-full flex gap-4 mt-4 lg:h-[125px]">
                      <div className="h-full w-[30px] flex-shrink-0">
                        <div className="h-[30px] w-[30px] rounded-full bg-[#FCEB03] flex items-center justify-center font-medium">
                          7
                        </div>
                      </div>
                      <div className="flex-1 px-3 py-3 lg:h-[70%] border border-[#D2D2D2] rounded-[10px]">
                        <h2 className="text-[16px] lg:text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                          Day 7: Departure from Riyadh
                        </h2>
                        <ul className="text-[13px] lg:text-[14px] pl-5 lg:pl-[30px] tracking-[0.3px] font-medium text-[#667085] list-disc">
                          <li>
                            Return Flight: Enjoy a private transfer to the
                            airport for your return flight, ending your
                            memorable 7-day adventure
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
