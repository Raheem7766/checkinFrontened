import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaHeadphonesSimple,
} from "react-icons/fa6";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { PiFediverseLogoDuotone } from "react-icons/pi";
import Footer from "../Home/Footer";
import Navbar from "../Home/Navbar";

export default function Care() {
  const [toggleStates, setToggleStates] = useState({
    feature: false,
    complaint: false,
    issues: false,
  });

  const toggle = (key) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-auto pb-8">
        <div>
          <h2 className="text-[36px] font-semibold text-[#101828] tracking-[0.5px] text-center mt-9">
            We care about you
          </h2>
          <p className="text-[14px] font-medium text-[#667085] tracking-[0.3px] text-center mt-1">
            Let us know what you have to say
          </p>
          <img
            src="https://storage.googleapis.com/bookmepk/static/custom/V5/uat/wecare.3VtRluzm.png"
            alt=""
            className="m-auto mt-7"
          />
          <div className="w-full px-20 h-auto pt-[34px] transition-all duration-300">
            <div
              onClick={() => toggle("feature")}
              className={`w-full  ${
                toggleStates.feature ? "h-max pb-2" : "h-[70px]"
              } border border-[#D2D2D2] rounded-[10px] transition-all duration-300 overflow-hidden`}
            >
              <div className="flex items-center justify-between pr-4 pt-5 cursor-pointer">
                <div className="h-full flex items-center px-6 gap-3">
                  <PiFediverseLogoDuotone color="#FCEB03" size={28} />
                  <h2 className="text-[18px] font-medium text-[#101828] tracking-[0.3px]">
                    I want to suggest a feature
                  </h2>
                </div>
                {toggleStates ? (
                  <FaChevronUp color="#909294" size={16} />
                ) : (
                  <FaChevronDown color="#909294" size={16} />
                )}
              </div>
              {toggleStates && (
                <div className="w-full px-6 py-2 text-[16px] text-[#101828]">
                  <div className="mt-7">
                    <label
                      htmlFor="Subject"
                      className="text-[14px] font-medium text-[#212529] tracking-[0.3px]"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Subject"
                      className="w-full h-[43px] mt-2 border border-[#D2D2D2] rounded-[8px] outline-none placeholder:text-black pl-4 tracking-[0.3px] text-sm"
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="Subject"
                      className="text-[14px] font-medium text-[#212529] tracking-[0.3px]"
                    >
                      Message
                    </label>
                    <textarea
                      type="text"
                      name=""
                      id=""
                      placeholder="Please explain your incident in detail"
                      className="w-full h-[65px] mt-2 border border-[#D2D2D2] rounded-[8px] outline-none placeholder:text-black pl-4 pt-[10px] tracking-[0.3px] text-sm"
                    />
                  </div>
                  <button className="w-full bg-[#FCEB03] mt-2 hover:bg-[#f2e645] text-[#121619] font-semibold py-2 pb-3 px-4 rounded-md">
                    Continue
                  </button>
                </div>
              )}
            </div>
            <div
              onClick={() => toggle("complaint")}
              className={`w-full  ${
                toggleStates.complaint ? "h-max pb-2" : "h-[70px]"
              } border border-[#D2D2D2] rounded-[10px] mt-4 transition-all duration-300 overflow-hidden`}
            >
              <div className="flex items-center justify-between pr-4 pt-5 cursor-pointer">
                <div className="h-full flex items-center px-6 gap-3">
                  <FaHeadphonesSimple color="#FCEB03" size={28} />
                  <h2 className="text-[18px] font-medium text-[#101828] tracking-[0.3px]">
                    I want to make a complaint
                  </h2>
                </div>
                {toggleStates ? (
                  <FaChevronUp color="#909294" size={16} />
                ) : (
                  <FaChevronDown color="#909294" size={16} />
                )}
              </div>
              {toggleStates && (
                <div className="w-full px-6 py-2 text-[16px] text-[#101828]">
                  <div className="mt-7">
                    <label
                      htmlFor="Subject"
                      className="text-[14px] font-medium text-[#212529] tracking-[0.3px]"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Subject"
                      className="w-full h-[43px] mt-2 border border-[#D2D2D2] rounded-[8px] outline-none placeholder:text-black pl-4 tracking-[0.3px] text-sm"
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="Subject"
                      className="text-[14px] font-medium text-[#212529] tracking-[0.3px]"
                    >
                      Message
                    </label>
                    <textarea
                      type="text"
                      name=""
                      id=""
                      placeholder="Please explain your incident in detail"
                      className="w-full h-[65px] mt-2 border border-[#D2D2D2] rounded-[8px] outline-none placeholder:text-black pl-4 pt-[10px] tracking-[0.3px] text-sm"
                    />
                  </div>
                  <button className="w-full bg-[#FCEB03] mt-2 hover:bg-[#f2e645] text-[#121619] font-semibold py-2 pb-3 px-4 rounded-md">
                    Continue
                  </button>
                </div>
              )}
            </div>
            <div
              onClick={() => toggle("issues")}
              className={`w-full  ${
                toggleStates.issues ? "h-max pb-2" : "h-[70px]"
              } border border-[#D2D2D2] rounded-[10px] mt-4 transition-all duration-300 overflow-hidden`}
            >
              <div className="flex items-center justify-between pr-4 pt-5 cursor-pointer">
                <div className="h-full flex items-center px-6 gap-3">
                  <MdOutlineSettingsSuggest color="#FCEB03" size={28} />
                  <h2 className="text-[18px] font-medium text-[#101828] tracking-[0.3px]">
                    I am facing some issues.
                  </h2>
                </div>
                {toggleStates ? (
                  <FaChevronUp color="#909294" size={16} />
                ) : (
                  <FaChevronDown color="#909294" size={16} />
                )}
              </div>
              {toggleStates && (
                <div className="w-full px-6 py-2 text-[16px] text-[#101828]">
                  <div className="mt-7">
                    <label
                      htmlFor="Subject"
                      className="text-[14px] font-medium text-[#212529] tracking-[0.3px]"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Subject"
                      className="w-full h-[43px] mt-2 border border-[#D2D2D2] rounded-[8px] outline-none placeholder:text-black pl-4 tracking-[0.3px] text-sm"
                    />
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="Subject"
                      className="text-[14px] font-medium text-[#212529] tracking-[0.3px]"
                    >
                      Message
                    </label>
                    <textarea
                      type="text"
                      name=""
                      id=""
                      placeholder="Please explain your incident in detail"
                      className="w-full h-[65px] mt-2 border border-[#D2D2D2] rounded-[8px] outline-none placeholder:text-black pl-4 pt-[10px] tracking-[0.3px] text-sm"
                    />
                  </div>
                  <button className="w-full bg-[#FCEB03] mt-2 hover:bg-[#f2e645] text-[#121619] font-semibold py-2 pb-3 px-4 rounded-md">
                    Continue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
