import React from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import Footer from "../../Home/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../Home/Navbar";

export default function NaranReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tickets, selectedDate, selectedCity, formData, totalPrice, name } =
    location.state || {};
  const [departureDate, arrivalDate] = selectedDate.split(" - ");

  const handleContinue = () => {
    navigate("/naranPayment", { state: { totalPrice, name } });
  };
  return (
    <div>
      <Navbar />
      <div className="w-[100%] h-[56px] pl-2 md:pl-[70px] px-2 md:px-10 border-b">
        <div className="flex items-center h-[22px] mt-2">
          <LuHome color="#9097A6" size={20} />
          <IoChevronForwardOutline
            color="#9097A6"
            className=" ml-2"
            size={16}
          />
          <h2 className="ml-3 text-[14px] font-medium text-[#9097A6]">Tours</h2>
          <IoChevronForwardOutline
            color="#9097A6"
            className=" ml-2"
            size={16}
          />
          <h2 className="ml-3 text-[14px] font-medium text-[#9097A6]">
            Customer Detail
          </h2>
          <IoChevronForwardOutline
            color="#9097A6"
            className=" ml-2"
            size={16}
          />
          <h2 className="ml-3 text-[14px] font-medium text-[#9097A6]">
            Booking Review
          </h2>
        </div>
        <div
          className={`w-[97.7%] h-[17px] flex items-end justify-between mt-[2px]`}
        >
          <div className="w-[33%] h-[60%] bg-[#FCEB03] rounded-[10px]"></div>
          <div className="w-[33%] h-[60%] bg-[#FCEB03] rounded-[10px]"></div>
          <div className="w-[33%] h-[60%] bg-[#FCEB03] rounded-[10px]"></div>
        </div>
      </div>

      <div className="w-full h-auto bg-[#F2F4F7] flex flex-col lg:flex-row pb-10 px-2 lg:px-12">
        <div className="h-full w-full lg:w-[66%] lg:px-5 pr-0 pt-4">
          <h2 className="text-[18px] font-semibold text-[#101828]">
            Tour Details
          </h2>

          <div className="w-full h-max pb-3 bg-white border border-[#D2D2D2] px-3 mt-3 pt-[14px] rounded-[10px]">
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="w-full lg:w-[23.4%] h-[183px]">
                <img
                  src="https://storage.googleapis.com/bookmepk/static/custom/upload/tours/swatkalam-global_normal220824.png?v1"
                  alt=""
                  className="h-full w-full rounded-[10px]"
                />
              </div>
              <div className="pb-11 pt-[10px] lg:w-[76.6%]">
                <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.4px]">
                  3 Days Trip to Swat Kalam
                </h2>
                <h2 className="text-[14px] font-medium text-[#101828] tracking-[0.4px] pt-1">
                  3 Days & 2 Nights
                </h2>
                <h2 className="text-[14px] font-semibold pt-[14px] text-[#101828] tracking-[0.4px]">
                  Lahore:
                </h2>
              </div>
            </div>
            <div className="w-full border-t-[1px] border-[#D0D5DD] mt-2 flex flex-wrap justify-between">
              <div className="w-max lg:w-[33%] pt-1 pl-1">
                <h3 className="text-[14px] font-medium text-[#667085]">
                  Departure Date
                </h3>
                <h4 className="text-[14px] font-normal text-[#101828]">
                  {departureDate}
                </h4>
                <h3 className="text-[14px] pt-[6px] font-medium text-[#667085]">
                  Adult(s)
                </h3>
                <h4 className="text-[14px] font-normal text-[#101828]">
                  {tickets?.adult?.count}
                </h4>
              </div>
              <div className="w-max lg:w-[33%] pt-1 pl-1">
                <h3 className="text-[14px] font-medium text-[#667085]">
                  Arrival Date
                </h3>
                <h4 className="text-[14px] font-normal text-[#101828]">
                  {arrivalDate}
                </h4>
                <h3 className="text-[14px] pt-[6px] font-medium text-[#667085]">
                  Children(s)
                </h3>
                <h4 className="text-[14px] font-normal text-[#101828]">
                  {tickets?.child?.count || "0"}
                </h4>
              </div>
              <div className="w-max lg:w-[33%] pt-1 pl-1">
                <h3 className="text-[14px] font-medium text-[#667085]">City</h3>
                <h4 className="text-[14px] font-normal text-[#101828]">
                  {selectedCity}
                </h4>
                <h3 className="text-[14px] pt-[6px] font-medium text-[#667085]">
                  Infant(s)
                </h3>
                <h4 className="text-[14px] font-normal text-[#101828]">
                  {tickets?.infant?.count}
                </h4>
              </div>
            </div>
          </div>

          <div className="w-full h-max pb-6 bg-white border border-[#D2D2D2] px-3 lg:px-[18px] mt-3 pt-[12px] rounded-[10px]">
            <h2 className="text-[18px] font-semibold text-[#101828]">
              Passengers Details
            </h2>
            {Object.keys(tickets || {}).map((type) =>
              Array.from({ length: tickets[type]?.count || 0 }).map((_, i) => {
                const passengerKey = `${type}-${i}`;
                return (
                  <div key={passengerKey}>
                    <h3 className="text-[18px] font-medium text-[#667085] mt-3">
                      Passenger # {i + 1} (
                      {type.charAt(0).toUpperCase() + type.slice(1)})
                    </h3>
                    <h4 className="text-[14px] font-normal text-[#101828] mt-1">
                      {formData?.passengers?.title} Mr, me me, PK
                    </h4>
                  </div>
                );
              })
            )}
          </div>

          <div className="w-full h-auto mt-3 pb-4 bg-white border-[1px] pl-3 lg:pl-6 pt-[10px] border-[#D2D2D2] rounded-[10px]">
            <h2 className="text-[#101828] font-semibold text-[18px]">
              Customer Details
            </h2>
            <p className="text-[14px] font-bold pt-4 text-[#212529]">
              Basic Information:{" "}
              <span className="font-medium">
                {formData?.contactDetails?.email},{" "}
                {formData?.contactDetails?.contactNumber || "N/A"},{" "}
                {formData?.contactDetails?.cnic || "N/A"}
              </span>
            </p>
          </div>

          <div className="w-full h-auto lg:h-[160px] pb-4 lg:pb-0 bg-white border-[1px] border-[#D2D2D2] rounded-[10px] mt-4">
            <p className="text-[14px] font-medium text-[#212529] pl-4 pt-4 tracking-[0.5px]">
              By selecting Complete Booking you agree to the{" "}
              <span className="text-[#667085]">Terms and Conditions</span> and{" "}
              <span className="text-[#667085]">Privacy Policy</span>
            </p>
            <div className="w-[96%] m-auto border-t-[1px] flex justify-between mt-[14px] pt-3 border-[#D2D2D2]">
              <p className="text-[18px] font-semibold text-[#101828]">Total</p>
              <p className="text-[18px] font-semibold text-[#101828]">
                Rs {totalPrice}
              </p>
            </div>
            <button
              onClick={handleContinue}
              className="w-[96%] ml-[2%] mt-2 h-[45px] rounded-[10px] text-[#121619] font-medium text-[14px] bg-[#FCEB03]"
            >
              Complete Booking
            </button>
          </div>
        </div>  

        <div className="w-full lg:w-[31.6%] h-max mt-5 rounded-[10px] bg-white border-[1px] border-[#D2D2D2] lg:ml-[14px] pb-4">
          <h2 className="text-[18px] font-semibold ml-4 mt-2">Tour</h2>
          <p className="text-[14px] font-medium pl-4 text-[#212529] tracking-[0.3px] pt-1">
            By Air 05 Days Hunza Private Tour With Air Tickets
          </p>
          <div className="w-full h-auto pb-[16px] border-t-[1px] border-b-[1px] mt-4 border-[#D0D5DD]">
            <h2 className="text-[18px] font-semibold ml-4 mt-2">Subtotal</h2>

            {tickets?.adult?.count > 0 && (
              <div className="w-full flex justify-between px-4 pt-1">
                <p className="text-[14px] font-medium text-[#212529]">
                  Adult(s)
                </p>
                <p className="text-[#212529] text-[14px] font-medium">
                  {tickets?.adult?.count}x
                </p>
              </div>
            )}
            {tickets?.child?.count > 0 && (
              <div className="w-full flex justify-between px-4 pt-2">
                <p className="text-[14px] font-medium text-[#212529]">
                  Children(s)
                </p>
                <p className="text-[#212529] text-[14px] font-medium">
                  {tickets?.child?.count}x
                </p>
              </div>
            )}
            {tickets?.infant?.count > 0 && (
              <div className="w-full flex justify-between px-4 pt-2">
                <p className="text-[14px] font-medium text-[#212529]">
                  Infant(s)
                </p>
                <p className="text-[#212529] text-[14px] font-medium">
                  {tickets?.infant?.count}x
                </p>
              </div>
            )}
          </div>
          <div className="w-full flex justify-between items-center px-4 pl-1 pt-2">
            <h2 className="text-[18px] font-semibold ml-4">Total</h2>
            <p className="text-[18px] font-semibold text-[#121619]">
              Rs {new Intl.NumberFormat("en-IN").format(totalPrice)}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
