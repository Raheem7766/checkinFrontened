import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { IoMoonOutline } from "react-icons/io5";
import Footer from "../../Home/Footer";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Home/Navbar";
import loader from "../../../images/giff.gif";

export default function VisitContent() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const price = 252999;
  const price1 = 1608000;
  const price2 = 948500;
  const price3 = 800000;
  const price4 = 800000;
  const name = "20 Days Umrah Package (22 Dec to 11 Jan)";
  const name1 =
    "15 Day - The Ultimate Saudi Arabian Discovery: The Winter Place to Be!";
  const name2 = "7-Day Majestic Riyadh Winter Experience";
  const name3 =
    "5-Day Enchanting AlUla Experience – Experience the Saudi Luxury";
  const name4 =
    "7-Day Arabian Odyssey: Divine Cultural Escape featuring Jeddah, Makkah, and the Heights of Taif";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const handle1 = () => {
    navigate("/select-variant", {
      state: {
        price,
        name,
      },
    });
  }; 
  const handle2 = () => {
    navigate("/SaudiaVariant", {
      state: {
        price1,
        name1,
      },
    });
  };
  const handle3 = () => {
    navigate("/MajVariant", {
      state: {
        price2,
        name2,
      },
    });
  };
  const handle4 = () => {
    navigate("/LuxVariant", {
      state: {
        price3,
        name3,
      },
    });
  };
  const handle5 = () => {
    navigate("/ArabVariant", {
      state: {
        price4,
        name4,
      },
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
          <div className="w-full h-auto pb-6 bg-[#F2F4F7]">
            <div className="w-full h-auto lg:h-[87px] bg-[#FCEB03] flex items-center px-5 lg:px-10 py-2 lg:py-0 justify-start">
              <img
                src="https://storage.googleapis.com/bookmepk/static/custom/contact-form/images/saudi%20(8).png"
                alt=""
                className="w-[80px] lg:w-[100px] filt"
              />
            </div>

            <div className="w-full h-auto px-2 lg:px-11 md:px-6 pt-4">
              <div className="w-full h-auto lg:h-[155px] bg-white border border-[#D2D2D2] rounded-[10px] px-3 pb-2 lg:pb-0 lg:px-[11px] pt-2">
                <h2 className="text-[20px] lg:text-[25px] font-semibold text-[#101828] tracking-[0.4px]">
                  Build your own Package
                </h2>
                <p className="text-[16px] lg:text-[18px] font-normal text-[#101828] tracking-[0.4px] mt-[8px] lg:mt-[10px]">
                  Choose your preferred dates, flights, hotels and transport!
                </p>
                <button className="w-full h-[45px] lg:h-[50px] bg-[#FCEB03] mt-2 rounded-[10px] text-[16px] lg:text-[18px] font-normal tracking-[0.3px]">
                  Build Now
                </button>
              </div>

              <div className="mt-[23px]">
                <h2 className="text-[25px] font-semibold text-[#101828] tracking-[0.5px]">
                  Choose your Package
                </h2>
                <div className="w-full h-auto mt-3 flex gap-[18px] gp flex-wrap justify-center lg:justify-start">
                  {[...Array(5)].map((_, index) => {
                    const packages = [
                      {
                        handle: handle1,
                        price: price,
                        imgSrc:
                          "https://storage.googleapis.com/bookmepk/static/custom/upload/pnb/umrah-1.jpg?",
                        title: name,
                        days: "20 Days",
                        passengers: "Min. 1 Passengers",
                      },
                      {
                        handle: handle2,
                        price: price1,
                        imgSrc:
                          "https://storage.googleapis.com/bookmepk/static/custom/upload/pnb/scLZ28EM028u6ZsAdsrm0xifEeeRx0mYzQxwMMgP.png",
                        title: name1,
                        days: "15 Days",
                        passengers: "Min. 1 Passengers",
                      },
                      {
                        handle: handle3,
                        price: price2,
                        imgSrc:
                          "https://storage.googleapis.com/bookmepk/static/custom/upload/pnb/MzC0dWmTO2a6825dzxXdHxc2jY5LwExZs2awvgbn.png",
                        title: name2,
                        days: "7 Days",
                        passengers: "Min. 2 Passengers",
                      },
                      {
                        handle: handle4,
                        price: price3,
                        imgSrc:
                          "https://storage.googleapis.com/bookmepk/static/custom/upload/pnb/Sa3VarnQC9VXL3J2lQ5ybAUcycYFkS0FIswlCtV1.png",
                        title: name3,
                        days: "5 Days",
                        passengers: "Min. 2 Passengers",
                      },
                      {
                        handle: handle5,
                        price: price3,
                        imgSrc:
                          "https://storage.googleapis.com/bookmepk/static/custom/upload/umrah/nov081124-1.jpg",
                        title: name4,
                        days: "7 Days",
                        passengers: "Min. 2 Passengers",
                      },
                    ];

                    const pack = packages[index];

                    return (
                      <div
                        key={index}
                        onClick={pack.handle}
                        className="w-[100%] sm:w-[48%] lg:w-[32.3%] h-auto bg-white px-3 pt-3 cursor-pointer rounded-[5px] shadow-md"
                      >
                        <div className="w-full h-[202px]">
                          <img
                            src={pack.imgSrc}
                            alt=""
                            className="w-full h-full object-cover rounded-[10px]"
                          />
                        </div>
                        <h3 className="text-[16px] ti sm:text-[18px] lg:text-[20px] font-medium text-[#101828] tracking-[0.3px] mt-[10px]">
                          {pack.title}
                        </h3>
                        <div className="mt-1 flex justify-between">
                          <h3 className="text-[12px] sm:text-[14px] lg:text-[16px] font-medium text-[#101828] tracking-[0.3px]">
                            Economy
                          </h3>
                          <p className="text-[10px] sm:text-[12px] lg:text-[14px] font-medium text-[#667085] tracking-[0.3px] pt-[2px]">
                            Starting from
                          </p>
                        </div>
                        <div className="flex justify-between mt-[-2px]">
                          <div className="flex">
                            <div className="flex items-center">
                              <IoMoonOutline color="#667085" className="mt-1" />
                              <h3 className="text-[12px] da sm:text-[14px] lg:text-[16px] font-medium text-[#667085] tracking-[0.3px] ml-1">
                                {pack.days}
                              </h3>
                            </div>
                            <div className="flex items-center ml-3">
                              <FaRegUser
                                size={12}
                                color="#667085"
                                className="mt-1"
                              />
                              <h3 className="text-[12px] da sm:text-[14px] lg:text-[16px] font-medium text-[#667085] tracking-[0.3px] ml-1">
                                {pack.passengers}
                              </h3>
                            </div>
                          </div>
                          <div className="text-[17px] pr sm:text-[19px] lg:text-[21px] font-medium text-[#101828] tracking-[0.3px]">
                            <span className="text-[12px] sm:text-[14px] lg:text-[16px]">
                              RS
                            </span>{" "}
                            {pack.price}
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
