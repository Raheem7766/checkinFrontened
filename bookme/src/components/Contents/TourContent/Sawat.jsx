import { Minus, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sawat({ closeModal, customScrollbarStyles }) {
  const [tickets, setTickets] = useState({
    adult: { count: 0, price: 19500 },
    child: { count: 0, price: 19500 },
    infant: { count: 0, price: 19500 },
  });

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const name = "3 Days Trip to Swat Kalam";
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
    if (!selectedCity && selectedDate) {
      alert("Please select a city and date.");
      return;
    } else if (!selectedDate && selectedCity) {
      alert("Please select a date and city.");
      return;
    } else if (!selectedCity && !selectedDate) {
      alert("Please select a city and date.");
      return;
    }
    console.log("Selected City:", selectedCity);
    console.log("Selected Date:", selectedDate);
    console.log("Tickets Details:", tickets);
    console.log("Total Price:", calculateTotalPrice());
    navigate("/swat", {
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
    <div className="w-full h-full">
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

      <div className="h-[calc(100vh-64px)] overflow-y-auto">
        <style>{customScrollbarStyles}</style>

        <div className="w-full max-w-7xl mx-auto pt-6 px-4 lg:px-[18px]">
          <div className="w-full bg-white rounded-lg border border-[#D2D2D2] p-4 lg:h-[183px] flex flex-col lg:flex-row lg:items-center lg:pl-[14px] lg:gap-5">
            <div className="w-full lg:w-[22.1%] h-48 lg:h-[86%] mb-4 lg:mb-0">
              <img
                src="https://storage.googleapis.com/bookmepk/static/custom/upload/tours/V5/swatkalam-global_normal220824.png?v1"
                alt=""
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <div className="lg:h-full pt-3">
              <h2 className="text-lg lg:text-[18px] tracking-wide font-semibold text-[#101828]">
                {name}
              </h2>
              <h3 className="text-[#212529] text-sm lg:text-[15px] pt-1 font-semibold">
                3 Days & 2 Nights
              </h3>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 lg:px-[18px]">
          <div className="mt-4 bg-white rounded-lg border border-[#D2D2D2] p-4 lg:p-6">
            <h2 className="text-lg lg:text-[18px] font-semibold text-[#101828]">
              Book Now
            </h2>

            <div className="mt-4">
              <h3 className="text-sm lg:text-[14px] font-medium text-[#344054]">
                Departure City
              </h3>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full border border-[#D2D2D2] outline-none mt-2 h-11 rounded-lg px-3"
              >
                <option value=""></option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
              </select>
            </div>

            <div className="mt-4">
              <h3 className="text-sm lg:text-[14px] font-medium text-[#344054]">
                Date
              </h3>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-[#D2D2D2] outline-none mt-2 h-11 rounded-lg px-3"
              >
                <option value=""></option>
                <option value="28 Nov, 2024 - 1 Dec, 2024">
                  28 Nov, 2024 - 1 Dec, 2024
                </option>
                <option value="5 Nov, 2024 - 8 Dec, 2024">
                  5 Nov, 2024 - 8 Dec, 2024
                </option>
                <option value="12 Nov, 2024 - 15 Dec, 2024">
                  12 Nov, 2024 - 15 Dec, 2024
                </option>
                <option value="19 Nov, 2024 - 22 Dec, 2024">
                  19 Nov, 2024 - 22 Dec, 2024
                </option>
                <option value="26 Nov, 2024 - 29 Dec, 2024">
                  26 Nov, 2024 - 29 Dec, 2024
                </option>
              </select>
            </div>

            {["adult", "child", "infant"].map((type) => (
              <div
                className="flex justify-between items-center mt-6"
                key={type}
              >
                <div>
                  <p className="text-sm lg:text-[14px] font-bold text-[#212529] tracking-wide capitalize">
                    {type}
                  </p>
                  <h3 className="text-sm lg:text-[14px] font-medium text-[#344054] tracking-wide">
                    {type === "adult"
                      ? "7 > years"
                      : type === "child"
                      ? "4 - 7 years"
                      : "< 4 years"}
                  </h3>
                </div>
                <div className="w-32 lg:w-[18.5%] border border-[#D2D2D2] h-11 rounded-lg flex">
                  <button
                    onClick={() => handleDecrement(type)}
                    className="h-full w-1/3 border-r border-[#D2D2D2] flex items-center justify-center text-[#667085]"
                  >
                    <Minus size={18} />
                  </button>
                  <div className="h-full w-1/3 border-r border-[#D2D2D2] flex items-center justify-center text-sm">
                    {tickets[type].count}
                  </div>
                  <button
                    onClick={() => handleIncrement(type)}
                    className="h-full w-1/3 flex items-center justify-center text-[#667085]"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 lg:px-[18px]">
          <div className="mt-4 bg-white rounded-lg border border-[#D2D2D2] p-4 lg:p-6">
            <h2 className="text-lg lg:text-[18px] font-semibold text-[#101828]">
              Detailed Itinerary
            </h2>

            <div className="space-y-4 mt-4">
              <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                03 Days 02 Nights Swat Kalam Tour
              </p>

              <div className="space-y-2">
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  Departure From: Lahore / Islamabad <br />
                  Days for Departure: Every Thursday
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  Summary
                </p>
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  Tour Title 03 Days Tour To Swat Kalam Malam Jabba
                </p>
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  Location(s) Swat – Kalam – Malam Jabba – Bahrin – Usho Forest
                  – Mahodand Lake – Kalam Bazzar
                  <br />
                  Paloga – Many More….
                </p>
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  Activities Sightseeing – Historical Visits – Excursions –
                  Boating
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  MEAL MENU
                </p>
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  Breakfast
                </p>
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  Paratha + Egg + Milk Tea.
                </p>
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  Dinner
                </p>
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  Naan/Roti + Cold Drink + Chicken Karahi / Chicken Qorma /
                  <br />
                  Chicken Palao / Daal / Vegetable (On rotation)
                  <br />
                  Members Per Room / Night: 04 Adult (Bed + Mattresses)
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  VEHICLE:
                </p>
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  -- Travel through a Private Air Conditioned Vehicle.
                  <br />
                  Saloon Coaster:
                  <br />
                  If 18-20 Persons)
                  <br />
                  Grand Cabin:
                  <br />
                  If 11-13 Persons)
                  <br />
                  Jeeps if Required:
                  <br />
                  As per itinerary on 7 Px sharing per jeep basis.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  SERVICES INCLUDES– May vary according to your desires
                </p>
                <ul className="list-disc pl-5 text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide space-y-1">
                  <li>2 night's hotel stays as per plan</li>
                  <li>Quality Meals (Breakfast + Dinner)</li>
                  <li>Bonfire (1 Time)</li>
                  <li>Basic first aid kit.</li>
                  <li>All tolls and taxes</li>
                  <li>
                    Blankets / Comforter / Quilt For Night (in Winter Season)
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  SERVICES NOT INCLUDES – May vary according to your desires
                </p>
                <ul className="list-disc pl-5 text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide space-y-1">
                  <li>Personal Clothing</li>
                  <li>Jeep Charges Any Kind Of</li>
                  <li>Entry Tickets</li>
                  <li>
                    Extras at the hotel like drinks, laundry, phone calls,
                    Heaters, activities
                  </li>
                  <li>
                    Insurance liability medical aid, and helicopter rescue
                    coverage.
                  </li>
                  <li>
                    Anything thing other than mentioned above in the "Services
                    Includes" area is not included in the cost
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  Day Itinerary
                  <br />
                  00 Departure from Lahore at 08:30 Pm
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  01 Pick Up Members From Islamabad
                </p>
                <ul className="list-disc pl-5 text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide space-y-1">
                  <li>Short Break at Behra</li>
                  <li>Pick Participants from Islamabad</li>
                  <li>Drive through Sawat Motorway</li>
                  <li>Breakfast at Fizza-ghat/MalamJabba</li>
                  <li>Explore Malam Jabba Ski Resort</li>
                  <li>Enjoy Chairlift & Zip-line (Self)</li>
                  <li>Starts travel towards Behrain</li>
                  <li>Dinner & Overnight Stay at Behrain/Kalam</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  02 Departure For Ushu Forest
                </p>
                <ul className="list-disc pl-5 text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide space-y-1">
                  <li>Breakfast at Hotel 8:00am</li>
                  <li>Start Travel towards USHU.</li>
                  <li>Explore Forest & Photography</li>
                  <li>Visit Palogha / Mahodand (On self-jeeps)</li>
                  <li>Travel back to hotel</li>
                  <li>Dinner & Overnight stay at Kalam/Behrain.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  03 Departure For Islamabad / Lahore
                </p>
                <ul className="list-disc pl-5 text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide space-y-1">
                  <li>Breakfast at Hotel 08:30Am</li>
                  <li>Start Travel to Lahore</li>
                  <li>Visit any missing point</li>
                  <li>Drop at Islamabad</li>
                  <li>Dinner break (self)</li>
                  <li>Reach Home safely 11:00Pm</li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide">
                  TERMS & CONDITIONS.
                </p>
                <ul className="list-disc pl-5 text-sm lg:text-[14px] font-medium text-[#212529] tracking-wide space-y-1">
                  <li>Every member must keep his/her original CNIC.</li>
                  <li>
                    Member should have to report 30 minutes before departure
                    time.
                  </li>
                  <li>
                    Only 10 Kg Cargo bags are allowed & every member is
                    responsible to carry its own luggage.
                  </li>
                  <li>
                    Member must have to behave ethically with his/her fellow
                    group Members Otherwise company can cancel his/her
                    membership at any time.
                  </li>
                  <li>
                    Company is not responsible for personal injuries and
                    accidents & loss of any kind of valuable item.
                  </li>
                  <li>
                    All payments made are non-refundable. However, if
                    compensation is necessary, you will have the option to use
                    the amount towards a future trip within one year.
                  </li>
                  <li>Company can cancel booking at any time.</li>
                  <li>Personal weapons are strictly not allowed.</li>
                </ul>
                <div className="h-24 lg:h-24 mt-44"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
  );
}
