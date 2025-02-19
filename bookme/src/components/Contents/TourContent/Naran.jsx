import { Minus, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Naran({ closeModal, customScrollbarStyles }) {
  const [tickets, setTickets] = useState({
    adult: { count: 0, price: 197000 },
    children: { count: 0, price: 197000 },
    infant: { count: 0, price: 197000 },
  });

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const name = "By Air 05 Days Hunza Private Tour With Air Tickets";
  const handleIncrement = (type) => {
    setTickets((prev) => ({
      ...prev,
      [type]: { ...prev[type], count: prev[type].count + 1 },
    }));
  };

  const handleDecrement = (type) => {
    setTickets((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        count: prev[type].count > 0 ? prev[type].count - 1 : 0,
      },
    }));
  };

  const calculateTotalPrice = () => {
    return Object.values(tickets).reduce(
      (total, ticket) => total + ticket.count * ticket.price,
      0
    );
  };

  const handleContinue = () => {
    console.log("Selected City:", selectedCity);
    console.log("Selected Date:", selectedDate);
    console.log("Tickets Details:", tickets);
    console.log("Total Price:", calculateTotalPrice());
    navigate("/naranCheckout", {
      state: {
        selectedCity,
        selectedDate,
        tickets,
        totalPrice: calculateTotalPrice(),
        name,
      },
    });
  };

  return (
    <div>
      <div className="h-16 flex justify-between items-center bg-white p-4 border-b">
        <h2 className="text-lg md:text-xl font-semibold tracking-wide">
          Tour Preview
        </h2>
        <button
          onClick={closeModal}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="h-[calc(100vh-100px)] overflow-y-auto px-2">
        <style>{customScrollbarStyles}</style>

        <div className="w-full max-w-7xl mx-auto pt-6 lg:px-[18px]">
          <div className="w-full bg-white rounded-lg border border-[#D2D2D2] p-4 lg:h-[183px] flex flex-col lg:flex-row lg:items-center lg:pl-[14px] lg:gap-5">
            <div className="w-full lg:w-[22.1%] h-48 lg:h-[86%] mb-4 lg:mb-0">
              <img
                src="https://storage.googleapis.com/bookmepk/static/custom/upload/tours/V5/5daysskardutournew_cus260824.png?v1"
                alt=""
                className="h-full w-full rounded-[10px] object-cover"
              />
            </div>
            <div className="lg:h-full pt-3">
              <h2 className="text-lg lg:text-[18px] tracking-wide font-semibold text-[#101828]">
                {name}
              </h2>
              <h3 className="text-[#212529] text-sm lg:text-[15px] pt-1 font-semibold">
                5 Days & 4 Nights
              </h3>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[95.5%] mx-auto mt-4 lg:mt-[14px] pb-7 bg-white rounded-[10px] border border-[#D2D2D2] px-4 lg:px-7 pt-3">
          <h2 className="text-[18px] font-semibold text-[#101828]">Book Now</h2>
          <h3 className="text-[14px] font-medium text-[#344054] pt-[10px]">
            Departure City
          </h3>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full border border-[#D2D2D2] outline-none mt-2 h-[43px] rounded-[10px] px-2"
          >
            <option value=""></option>
            <option value="Islamabad">Islamabad</option>
          </select>

          <h3 className="text-[14px] font-medium text-[#344054] pt-[15px]">
            Date
          </h3>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border border-[#D2D2D2] outline-none mt-2 h-[43px] rounded-[10px] px-2"
          >
            <option value=""></option>
            <option value="29 Nov, 2024 - 3 Dec, 2024">
              29 Nov, 2024 - 3 Dec, 2024
            </option>
            <option value="6 Nov, 2024 - 10 Dec, 2024">
              6 Nov, 2024 - 10 Dec, 2024
            </option>
            <option value="13 Nov, 2024 - 17 Dec, 2024">
              13 Nov, 2024 - 17 Dec, 2024
            </option>
            <option value="20 Nov, 2024 - 24 Dec, 2024">
              20 Nov, 2024 - 24 Dec, 2024
            </option>
            <option value="27 Nov, 2024 - 31 Dec, 2024">
              27 Nov, 2024 - 31 Dec, 2024
            </option>
          </select>

          {["adult", "children", "infant"].map((type) => (
            <div className="flex flex-col lg:flex-row justify-between" key={type}>
              <div>
                <p className="text-[14px] font-bold text-[#212529] tracking-[0.3px] capitalize mt-2">
                  {type}
                </p>
                <h3 className="text-[14px] font-medium text-[#344054] tracking-[0.4px]">
                  {type === "adult"
                    ? "7 > years"
                    : type === "children"
                    ? "4 - 7 years"
                    : "< 4 years"}
                </h3>
              </div>
              <div className="w-full lg:w-[18.5%] border border-[#D2D2D2] h-[45px] rounded-[10px] mt-2 lg:mt-7 flex">
                <div
                  onClick={() => handleDecrement(type)}
                  className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center font-black text-[#667085] cursor-pointer"
                >
                  <Minus size={18} />
                </div>
                <div className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center text-[14px] text-black">
                  {tickets[type].count}
                </div>
                <div
                  onClick={() => handleIncrement(type)}
                  className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center font-black text-[#667085] cursor-pointer"
                >
                  <Plus size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full lg:w-[95.5%] m-auto mt-[14px] h-auto pb-10 bg-white rounded-[10px] border border-[#D2D2D2] pl-[21px] pr-7 pt-3">
          <h2 className="text-[18px] font-semibold text-[#101828]">
            Detailed Itinerary
          </h2>

          <p className="text-[14px] font-medium text-[#212529] pt-[10px] tracking-[0.5px]">
            By Air 05 Days Hunza Private Tour With Air Tickets
          </p>

          <p className="text-[14px] font-medium text-[#212529] pt-[20px] tracking-[0.5px]">
            Departure From: Islamabad Airport
          </p>

          <p className="text-[14px] font-medium text-[#212529] pt-[20px] tracking-[0.5px]">
            Summary
          </p>

          <p className="text-[14px] font-medium text-[#212529] tracking-[0.5px]">
            Location
          </p>

          <p className="text-[14px] font-medium text-[#212529] tracking-[0.5px]">
            Gilgit City Hunza Nagar Valley Sost Khunjarab Pass Karimabad Altit
            Village Eagles Nest Attabad <br />
            Lake Rakaposhi Mountain 3 Mountain Excursion Royal Gardens Eagles
            Nest Nagar Valley Hoper <br />
            Glacier Hussaini Bridge Passu Cones Cafe De Hunza Aliabad Gilgit
          </p>

          <p className="text-[14px] font-medium text-[#212529] tracking-[0.5px]">
            Activities
          </p>

          <p className="text-[14px] font-medium text-[#212529] tracking-[0.5px]">
            Sightseeing Historical Visits Excursions Boating
          </p>

          <p className="text-[14px] font-medium text-[#212529] pt-5 tracking-[0.5px]">
            01 Room Per Night
          </p>

          <p className="text-[14px] font-medium text-[#212529] tracking-[0.5px]">
            Vehicle: (With TZ Parado)
          </p>

          <p className="text-[14px] font-medium text-[#212529] pt-[42px] tracking-[0.5px]">
            Note: Hotel availability varies depending on the circumstances.
          </p>

          <p className="text-[14px] font-medium text-[#212529] pt-5 tracking-[0.5px]">
            Hotel Names On Availability:
          </p>

          <ul className="pl-4 ol text-[14px] font-medium text-[#212529] tracking-[0.5px]">
            <li>
              Mulberry Hotel Hunza / Hunza Elites (Equivalent): 03 Night Stay
            </li>
            <li>Mandrine Hotel In Gilgit (Equivalent): 01 Night Stay</li>
          </ul>

          <p className="text-[14px] font-medium text-[#212529] pt-5 tracking-[0.5px]">
            Services Includes:
          </p>

          <ul className="pl-4 ol text-[14px] font-medium text-[#212529] tracking-[0.5px]">
            <li>
              The Package Includes Transportation For The Duration Of The Trip.
            </li>
            <li>
              All Tolls, Taxes, And Fuel Expenses Related To Transportation Are
              Included In The Package Cost.
            </li>
            <li>Luxury Accommodations Are Provided Throughout The Trip.</li>
            <li>
              Professional Driver And A Professional Tour Guide Will Be
              Available To Accompany You During The Trip.
            </li>
            <li>Breakfast At The Hotel Is Included In The Package.</li>
            <li>
              24/7 Assistance Will Be Provided To Ensure A Smooth And
              Hassle-Free Experience.
            </li>
            <li>
              Jeep Charges For Transportation In Off-Road Areas (Only For
              Naltar)
            </li>
          </ul>

          <p className="text-[14px] font-medium text-[#212529] pt-6 tracking-[0.5px]">
            These Services Are Included In The Package Cost To Provide You With
            A Comfortable And Convenient Journey.
          </p>

          <p className="text-[14px] font-medium text-[#212529] pt-5 tracking-[0.5px]">
            Services Not Included
          </p>

          <ul className="pl-4 ol text-[14px] font-medium mt-5 text-[#212529] tracking-[0.5px]">
            <li>
              Entry Tickets For Attractions, Boating, Rafting, Forts, Or Any
              Other Activities Specifically Mentioned, Or Not Mentioned In The
              Itinerary Are Not Included In The Package And Will Be The
              Responsibility Of The Participants.
            </li>
            <li>
              Any Additional Expenses Or Items Not Mentioned Above, Such As
              Personal Purchases Or Extra Services, Are Not Covered By The
              Package And Will Be The Responsibility Of The Participants.
            </li>
            <li>
              The Package Does Not Include Lunch And Dinner, Which Participants
              Will Need To Arrange For Themselves.
            </li>
          </ul>

          <p className="text-[14px] font-medium text-[#212529] tracking-[0.5px]">
            Please Note That It's Important To Consider These Additional
            Expenses And Make Necessary Arrangements To Ensure A Smooth And
            Enjoyable Trip.
          </p>

          <p className="text-[14px] font-medium text-[#212529] pt-[130px] tracking-[0.5px]">
            Terms & Conditions
          </p>

          <ul className="pl-4 ol pt-[18px] text-[14px] font-medium text-[#212529] tracking-[0.5px]">
            <li>
              The Use Of Drugs Or Any Form Of Intoxication Is Strictly
              Prohibited During The Trip. Anyone Found Using Substances On Buses
              Or During The Trip Will Be Immediately Expelled From The Trip With
              No Eligibility For A Refund.
            </li>
            <li>
              All Payments Made Are Non-Refundable. However, If Compensation Is
              Necessary, You Have The Option To Use The Amount Towards A Future
              Trip Within One Year.
            </li>
            <li>
              The Company Reserves The Right To Cancel The Trip Without Prior
              Notice For Reasons Deemed Appropriate By Them. In Such Cases,
              Registered Participants Will Receive A Full Refund.
            </li>
            <li>
              On Adventure Trips Like This, Factors Such As Weather, Local
              Politics, Transportation, Or Other Unforeseen Circumstances Beyond
              The Control Of The Organizers May Result In Changes To The
              Itinerary. While Substantial Alterations Are Unlikely, The Group
              Leader And Guide Will Decide The Best Alternative In The Interests
              Of The Whole Group.
            </li>
            <p>A. Smoking Is Strictly Prohibited In Transport.</p>
            <p>
              B. Participants Must Carry A Valid Computerized Cnic/Passport
              Card.
            </p>
            <p>C. Time Management And Punctuality Are Strongly Recommended.</p>
            <li>
              Participants Are Advised To Wear Non-Slippery
              Shoes/Boots/Joggers/Dms And Avoid Wearing Heels Or Dress Shoes.
            </li>
            <li>
              Air Conditioning In Buses Will Be Operated On An On-Off Basis
              During Steep Ascents In Mountainous Areas To Prevent Overheating.
            </li>
            <li>
              The Company Will Not Be Held Responsible For Any Injury, Damage,
              Or Loss Incurred During The Trip.
            </li>
            <li>
              Please Note That These Terms And Conditions Are In Place To Ensure
              A Safe And Enjoyable Experience For All Participants.
            </li>
          </ul>
        </div>

        <div className="mt-4 w-full h-11"></div>
        <div className="fixed bottom-0 right-0 w-full lg:max-w-[50%] flex justify-between bg-white border-t p-4">
          <div>
            <p className="text-sm lg:text-[15px] text-gray-600 font-medium">
              Total
            </p>
            <p className="text-lg lg:text-[20px] font-medium text-[#121619]">
              Rs {calculateTotalPrice()}
            </p>
          </div>
          <button
            onClick={handleContinue}
            className="w-28 h-11 bg-[#121619] text-white rounded-lg font-medium hover:bg-opacity-90"
          >
            Continue
          </button>
        </div>
      </div> 
    </div>
  );
}
