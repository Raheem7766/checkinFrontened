import { Minus, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Desert({ closeModal, customScrollbarStyles }) {
  const [tickets, setTickets] = useState({
    adult: { count: 0, price: 197000 },
    children: { count: 0, price: 197000 },
    infant: { count: 0, price: 197000 },
  });

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const name = "Evening Desert Safari Dubai";
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
    navigate("/DesertCheckout", {
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
                src="https://storage.googleapis.com/bookmepk/static/custom/upload/tours/V5/staycationdesrt220824.jpg?v1"
                alt=""
                className="h-full w-full rounded-[10px] object-cover"
              />
            </div>
            <div className="lg:h-full pt-3">
              <h2 className="text-lg lg:text-[18px] tracking-wide font-semibold text-[#101828]">
                {name}
              </h2>
              <h3 className="text-[#212529] text-sm lg:text-[15px] pt-1 font-semibold">
                1 Days & 0 Nights
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
            name=""
            id=""
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full border border-[#D2D2D2] outline-none mt-2 h-[43px] rounded-[10px] px-2"
          >
            <option value=""></option>
            <option value="Dubai">Dubai</option>
          </select>
          <h3 className="text-[14px] font-medium text-[#344054] pt-[15px]">
            Date
          </h3>
          <select
            name=""
            id=""
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border border-[#D2D2D2] outline-none mt-2 h-[43px] rounded-[10px] px-2"
          >
            <option value=""></option>
            <option value="27 Nov, 2024 - 27 Nov, 2024">
              27 Nov, 2024 - 27 Nov, 2024
            </option>
            <option value="28 Nov, 2024 - 28 Nov, 2024">
              28 Nov, 2024 - 28 Nov, 2024
            </option>
            <option value="29 Nov, 2024 - 29 Nov, 2024">
              29 Nov, 2024 - 29 Nov, 2024
            </option>
            <option value="30 Nov, 2024 - 30 Nov, 2024">
              30 Nov, 2024 - 30 Nov, 2024
            </option>
            <option value="1 Dec, 2024 - 1 Dec, 2024">
              1 Dec, 2024 - 1 Dec, 2024
            </option>
            <option value="2 Dec, 2024 - 2 Dec, 2024">
              2 Dec, 2024 - 2 Dec, 2024
            </option>
            <option value="3 Dec, 2024 - 3 Dec, 2024">
              3 Dec, 2024 - 3 Dec, 2024
            </option>
            <option value="4 Dec, 2024 - 4 Dec, 2024">
              4 Dec, 2024 - 4 Dec, 2024
            </option>
            <option value="5 Dec, 2024 - 5 Dec, 2024">
              5 Dec, 2024 - 5 Dec, 2024
            </option>
            <option value="6 Dec, 2024 - 6 Dec, 2024">
              6 Dec, 2024 - 6 Dec, 2024
            </option>
            <option value="7 Dec, 2024 - 7 Dec, 2024">
              7 Dec, 2024 - 7 Dec, 2024
            </option>
            <option value="8 Dec, 2024 - 8 Dec, 2024">
              8 Dec, 2024 - 8 Dec, 2024
            </option>
            <option value="9 Dec, 2024 - 9 Dec, 2024">
              9 Dec, 2024 - 9 Dec, 2024
            </option>
            <option value="10 Dec, 2024 - 10 Dec, 2024">
              10 Dec, 2024 - 10 Dec, 2024
            </option>
            <option value="11 Dec, 2024 - 11 Dec, 2024">
              11 Dec, 2024 - 11 Dec, 2024
            </option>
            <option value="12 Dec, 2024 - 12 Dec, 2024">
              12 Dec, 2024 - 12 Dec, 2024
            </option>
            <option value="13 Dec, 2024 - 13 Dec, 2024">
              13 Dec, 2024 - 13 Dec, 2024
            </option>
            <option value="14 Dec, 2024 - 14 Dec, 2024">
              14 Dec, 2024 - 14 Dec, 2024
            </option>
            <option value="15 Dec, 2024 - 15 Dec, 2024">
              15 Dec, 2024 - 15 Dec, 2024
            </option>
            <option value="16 Dec, 2024 - 16 Dec, 2024">
              16 Dec, 2024 - 16 Dec, 2024
            </option>
            <option value="17 Dec, 2024 - 17 Dec, 2024">
              17 Dec, 2024 - 17 Dec, 2024
            </option>
            <option value="18 Dec, 2024 - 18 Dec, 2024">
              18 Dec, 2024 - 18 Dec, 2024
            </option>
            <option value="19 Dec, 2024 - 19 Dec, 2024">
              19 Dec, 2024 - 19 Dec, 2024
            </option>
            <option value="20 Dec, 2024 - 20 Dec, 2024">
              20 Dec, 2024 - 20 Dec, 2024
            </option>
            <option value="21 Dec, 2024 - 21 Dec, 2024">
              21 Dec, 2024 - 21 Dec, 2024
            </option>
            <option value="22 Dec, 2024 - 22 Dec, 2024">
              22 Dec, 2024 - 22 Dec, 2024
            </option>
            <option value="23 Dec, 2024 - 23 Dec, 2024">
              23 Dec, 2024 - 23 Dec, 2024
            </option>
            <option value="24 Dec, 2024 - 24 Dec, 2024">
              24 Dec, 2024 - 24 Dec, 2024
            </option>
            <option value="25 Dec, 2024 - 25 Dec, 2024">
              25 Dec, 2024 - 25 Dec, 2024
            </option>
            <option value="26 Dec, 2024 - 26 Dec, 2024">
              26 Dec, 2024 - 26 Dec, 2024
            </option>
            <option value="27 Dec, 2024 - 27 Dec, 2024">
              27 Dec, 2024 - 27 Dec, 2024
            </option>
            <option value="28 Dec, 2024 - 28 Dec, 2024">
              28 Dec, 2024 - 28 Dec, 2024
            </option>
            <option value="29 Dec, 2024 - 29 Dec, 2024">
              29 Dec, 2024 - 29 Dec, 2024
            </option>
            <option value="30 Dec, 2024 - 30 Dec, 2024">
              30 Dec, 2024 - 30 Dec, 2024
            </option>
            <option value="31 Dec, 2024 - 31 Dec, 2024">
              31 Dec, 2024 - 31 Dec, 2024
            </option>
          </select>
          {["adult", "children", "infant"].map((type) => (
            <div
              className="flex flex-col lg:flex-row justify-between"
              key={type}
            >
              <div>
                <p className="text-[14px] font-bold text-[#212529] pt-7 tracking-[0.3px] capitalize">
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

          {/* Total Price */}
          {/* <div className="pt-7">
          <h3 className="text-[16px] font-bold text-[#101828]">
            Total Price: Rs {totalPrice}
          </h3>
        </div> */}
        </div>

        <div className="w-full lg:w-[95.5%] m-auto mt-[14px] h-auto pb-10 bg-white rounded-[10px] border border-[#D2D2D2] pl-[21px] pr-7 pt-3">
          <h2 className="text-[18px] font-semibold text-[#101828] ">
            Detailed Itinerary
          </h2>
          <p className="text-[14px] font-medium text-[#212529] pt-[10px] tracking-[0.5px]">
            Embark on a thrilling adventure in the heart the desert with Dubai
            Desert Safari! Brace yourself
            <br /> for an adrenaline-pumping ride over the sand dunes in a 4x4
            vehicle, as you feel the rush of
            <br />
            excitement with every bump and dip.
          </p>
          <p className="text-[14px] font-medium text-[#212529] pt-[20px] tracking-[0.5px]">
            Once you've had your fill of adventure, you can indulge some
            traditional Arabic hospitality with
            <br /> sumptuous dinner under stars, complete with entertainment
            like a camel ride, belly dancing and
            <br /> a mesmerizing fire show. Get lost in the beauty of the desert
            as you watch the sun set over the
            <br /> dunes, and marvel at the stunning display of colors in the
            sky.
          </p>
          <p className="text-[14px] font-medium text-[#212529] pt-[20px] tracking-[0.5px]">
            With Dubai Desert Safari, you'll create unforgettable memories and
            experience the magic of the
            <br /> desert like never before.
          </p>
          <p className="text-[14px] font-medium text-[#212529] pt-[20px] tracking-[0.5px]">
            The Desert Safari buffet is one of the highlights of the trip.
            Choose from veg or non veg with light music. In the end, enjoy the
            main attractions of the trip: the Belly Dance and the Fire show with
            Tanura Dance.
          </p>
          <p className="text-[14px] font-medium text-[#212529] tracking-[0.5px]">
            Desert Safari is one experience you do not want to miss when you are
            in Dubai. It connects you with the roots of Dubai and its culture.
            Book your trip now.
          </p>
          <p className="text-[14px] font-medium pt-[24px] text-[#212529] tracking-[0.5px]">
            Inclusion:
          </p>
          <ul className="ol text-[14px] font-medium text-[#212529] pt-[20px] tracking-[0.5px] pl-4">
            <li>Dubai Evening Desert Safari Included:</li>
            <li>Pick up from your Hotel,</li>
            <li>House or Apartment in Dubai,</li>
            <li>Sharjah and Ajman</li>
            <li>
              Dune Bashing by a professional licensed Desert Safari driver
            </li>
            <li>
              Traditional welcome at camp with Arabic Tea, Coffee and Sunset
              photography
            </li>
            <li>
              Arabic Sweets and Fresh Fruits, Free Sheesha Photography in Arabic
              Dress
            </li>
            <li>Camel Ride (Short Drive Included) Sand Boarding</li>
            <li>Henna painting</li>
            <li>
              Refreshment with unlimited water, tea, coffee and soft drinks
            </li>
            <li>
              International buffet dinner with barbecue (vegetarian and
              non-vegetarian dishes)
            </li>
            <li>
              Full light and sound performance on and around the stage Camp
            </li>
            <li>Belly dance show</li>
            <li>Fire show Captivating Tanura dance entertainment</li>
            <li>Alcohol available at camp (additional charge)</li>
            <li>Return to your hotel, home or apartment.</li>
            <li>Additional Information:</li>
            <li>
              All our drivers have a License from the UAE Government for Safari
            </li>
            <li>
              All our vehicles are absolutely insured and consistent with the
              protection necessities of UAE laws.
            </li>
            <li>
              Dinner (Veg & non Veg) / BBQ / Cold & Soft Drinks covered in
              Evening Package
            </li>
            <li>We do Pick & Drop from Cruise Terminal Port Rashid Dubai</li>
            <li>
              All our vehicles are SUV 4x4 with Clean Seats & Air Conditioner.
            </li>
            <li>
              We receive Cash at Pick Time in Australian Dollars / British
              Pounds / Euro / Saudi Riyal / Omani Riyal / US Dollars
            </li>
          </ul>
          <p className="text-[14px] font-medium pt-5 text-[#212529] tracking-[0.5px]">
            Additional information:
          </p>
          <ul className="ol text-[14px] font-medium text-[#212529] tracking-[0.5px] pl-4">
            <li>
              Photography, casual photography is permitted, but it is strongly
              advised to obtain permission
              <br /> before taking photographs (especially of strangers
            </li>
            <li>
              However, photographing Arab women permitted. Furthermore,
              photographing government
              <br /> buildings or military installations is strictly forbidden.
            </li>
          </ul>
          <p className="text-[14px] font-medium text-[#212529] pt-5 tracking-[0.5px]">
            Important information:
          </p>
          <ul className="ol text-[14px] font-medium text-[#212529] tracking-[0.5px] pl-4">
            <li>
              Cancellation of tour reservation prior to 24 hours will be fully
              refunded.
            </li>
            <li>
              Cancellation within 24 hours is not acceptable and full amount
              will be charged.
            </li>
            <li>Refund mode of payment would be the same as received.</li>
            <li>
              Online payment refund takes 14 working days to reflect amount into
              your account after processing.
            </li>
          </ul>
          <p className="text-[14px] font-medium text-[#212529] pt-5 tracking-[0.5px]">
            Note*: The price does not include visa or ticket cost.
          </p>
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
