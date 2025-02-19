import React, { useEffect, useState } from "react";
import Footer from "../../../Home/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../Home/Navbar";
import loader from "../../../../images/giff.gif";

export default function ArabItinerary() {
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

    navigate("/ArabDetail", {
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
                <div className="w-full h-full bg-white mt-[10px] px-4 pr-[14px] border border-[#D2D2D2] rounded-[10px] pb-4">
                  <div className="container mx-auto md:px-6 lg:px-0 mt-3">
                    <div>
                      <div className="w-full flex lg:flex-row gap-4 lg:h-[125px]">
                        <div className="flex lg:block h-full w-max lg:pt-[18px]">
                          <div className="h-[30px] w-[30px] rounded-[50%] bg-[#FCEB03] flex items-center justify-center font-medium">
                            1
                          </div>
                          <div className="w-[2px] h-full lg:h-[105%] bg-[#FCEB03] mx-auto lg:m-auto"></div>
                        </div>
                        <div className="w-full lg:w-[96%] h-auto lg:h-[90%] px-3 pt-[10px] border border-[#D2D2D2] rounded-[10px]">
                          <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                            Day 1: Arrival in Jeddah
                          </h2>
                          <ul className="text-[14px] ol pl-[30px] tracking-[0.3px] font-medium text-[#667085]">
                            <li>
                              Arrival at King Abdulaziz International Airport:
                              Warm welcome and private transfer to your seaview
                              suite
                            </li>
                            <li className="pt-1">
                              Check-in & Relax: Settle in and enjoy the evening
                              at leisure
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="w-full flex lg:flex-row gap-4 lg:h-auto mt-4 lg:mt-0">
                        <div className="flex lg:block h-full w-max lg:mt-9">
                          <div className="hidden lg:block w-[2px] h-[22%] bg-[#FCEB03] m-auto"></div>
                          <div className="h-[30px] w-[30px] rounded-[50%] bg-[#FCEB03] flex items-center justify-center font-medium">
                            2
                          </div>
                          <div className="w-[2px] h-full lg:h-[93px] bg-[#FCEB03] mx-auto lg:m-auto"></div>
                        </div>
                        <div className="w-full lg:w-[96%] h-auto lg:h-[76%] lg:mt-[14px] px-3 lg:pb-[34px] pt-[10px] border border-[#D2D2D2] rounded-[10px]">
                          <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                            Day 2: Historic Jeddah Exploration
                          </h2>
                          <ul className="text-[14px] ol pl-[30px] tracking-[0.3px] font-medium text-[#667085]">
                            <li>
                              Al-Balad (Old Town): Tour the UNESCO-listed
                              historic district with its traditional coral
                              architecture
                            </li>
                            <li className="pt-1">
                              Souq Al-Alawi: Shop for spices, textiles, and
                              handicrafts in one of the oldest markets
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="w-full flex lg:flex-row gap-4 lg:h-auto mt-4 lg:mt-0">
                        <div className="flex lg:block h-full w-max">
                          <div className="hidden lg:block w-[2px] h-[20px] bg-[#FCEB03] m-auto"></div>
                          <div className="h-[30px] w-[30px] rounded-[50%] bg-[#FCEB03] flex items-center justify-center font-medium">
                            3
                          </div>
                          <div className="w-[2px] h-full lg:h-[130px] bg-[#FCEB03] mx-auto lg:m-auto"></div>
                        </div>
                        <div className="w-full lg:w-[96%] h-auto lg:h-[76%] px-3 lg:pb-[34px] pt-[10px] border border-[#D2D2D2] rounded-[10px]">
                          <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                            Day 3: Day Trip to Taif
                          </h2>
                          <ul className="text-[14px] ol pl-[30px] tracking-[0.3px] font-medium text-[#667085]">
                            <li>
                              Taif Exploration: Journey to the mountainous city
                              of Taif, known for its scenic views, rose farms,
                              and cooler climate
                            </li>
                            <li className="pt-1">
                              Shubra Palace: Visit this historic palace
                              showcasing traditional Saudi architecture
                            </li>
                            <li className="pt-1">
                              Al Rudaf Park: Relax in this beautiful natural
                              park
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="w-full flex lg:flex-row gap-4 lg:h-[125px] mt-4 lg:mt-0">
                        <div className="flex lg:block h-full w-max">
                          <div className="hidden lg:block w-[2px] h-[35px] bg-[#FCEB03] m-auto"></div>
                          <div className="h-[30px] w-[30px] rounded-[50%] bg-[#FCEB03] flex items-center justify-center font-medium">
                            4
                          </div>
                          <div className="w-[2px] h-full lg:h-[78%] bg-[#FCEB03] mx-auto lg:m-auto"></div>
                        </div>
                        <div className="w-full lg:w-[96%] h-auto lg:h-[90%] px-3 lg:mt-3 pt-[10px] border border-[#D2D2D2] rounded-[10px]">
                          <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                            Day 4: Art, Culture, and Sunset Dinner
                          </h2>
                          <ul className="text-[14px] ol pl-[30px] tracking-[0.3px] font-medium text-[#667085]">
                            <li>
                              Jeddah Sculpture Museum: Visit the open-air museum
                              showcasing contemporary art
                            </li>
                            <li className="pt-1">
                              Mall Shopping Experience: Explore a popular Jeddah
                              mall for shopping and local delights
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="w-full flex lg:flex-row gap-4 lg:h-auto mt-4 lg:mt-0">
                        <div className="flex lg:block h-full w-max">
                          <div className="hidden lg:block w-[2px] h-[45px] bg-[#FCEB03] m-auto"></div>
                          <div className="h-[30px] w-[30px] rounded-[50%] bg-[#FCEB03] flex items-center justify-center font-medium">
                            5
                          </div>
                          <div className="w-[2px] h-full lg:h-[117px] bg-[#FCEB03] mx-auto lg:m-auto"></div>
                        </div>
                        <div className="w-full lg:w-[96%] h-auto lg:h-[90%] px-3 lg:pb-7 lg:mt-7 pt-[10px] border border-[#D2D2D2] rounded-[10px]">
                          <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                            Day 5: Transfer to Makkah & Check-in at Clock Tower
                            Hotel
                          </h2>
                          <ul className="text-[14px] ol pl-[30px] tracking-[0.3px] font-medium text-[#667085]">
                            <li>
                              Private Transfer to Makkah: Comfortable journey to
                              the holy city
                            </li>
                            <li className="pt-1">
                              Check-in at Clock Tower Hotel: Settle into a
                              luxurious room with breathtaking views of the Holy
                              Mosque
                            </li>
                            <li className="pt-1">
                              Umrah Activities: Begin your short Umrah
                              pilgrimage with guidance in Urdu/English
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="w-full flex lg:flex-row gap-4 lg:h-[125px] mt-4 lg:mt-0">
                        <div className="flex lg:block h-full w-max">
                          <div className="hidden lg:block w-[2px] h-[22px] bg-[#FCEB03] m-auto"></div>
                          <div className="h-[30px] w-[30px] rounded-[50%] bg-[#FCEB03] flex items-center justify-center font-medium">
                            6
                          </div>
                          <div className="w-[2px] h-full lg:h-[78%] bg-[#FCEB03] mx-auto lg:m-auto"></div>
                        </div>
                        <div className="w-full lg:w-[96%] h-auto lg:h-[70%] px-3 pt-[10px] border border-[#D2D2D2] rounded-[10px]">
                          <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                            Day 6: Makkah Ziyarat and Worship
                          </h2>
                          <ul className="text-[14px] ol pl-[30px] tracking-[0.3px] font-medium text-[#667085]">
                            <li>
                              Makkah Ziyarat: Visit sacred sites, including
                              Ghar-e-Sorr and Ghar-e-Hira, to connect with
                              historical and spiritual landmarks
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="w-full flex lg:flex-row gap-4 lg:h-[125px] mt-4 lg:mt-0">
                        <div className="flex lg:block h-full w-max">
                          <div className="hidden lg:block w-[2px] h-[22px] bg-[#FCEB03] m-auto"></div>
                          <div className="h-[30px] w-[30px] rounded-[50%] bg-[#FCEB03] flex items-center justify-center font-medium">
                            7
                          </div>
                          <div className="w-[2px] h-full lg:h-[78%] bg-[#FCEB03] mx-auto lg:m-auto"></div>
                        </div>
                        <div className="w-full lg:w-[96%] h-auto lg:h-[70%] px-3 pt-[10px] border border-[#D2D2D2] rounded-[10px]">
                          <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                            Day 7: Return from Makkah to Jeddah & Departure
                          </h2>
                          <ul className="text-[14px] ol pl-[30px] tracking-[0.3px] font-medium text-[#667085]">
                            <li>
                              Return Transfer to Jeddah: Private transfer back
                              to Jeddah for your return flight
                            </li>
                          </ul>
                        </div>
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
