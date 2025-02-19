import { Minus, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../../../images/giff.gif";

export default function ParaDetail({ closeModal, customScrollbarStyles }) {
  const [counter, setcounter] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const basePrice = 16575;
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const name = "Paragliding in Pakistan";
  const handlePlus = () => {
    setcounter(counter + 1);
  };
  const handleMinus = () => {
    if (counter > 0) {
      setcounter(counter - 1);
    }
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setSelectedDate(value);
    console.log("Selected date:", value);
  };

  const totalPrice = counter * basePrice;

  const handleContinue = () => {
    if (!selectedDate) {
      alert("Please select a date before continuing.");
      return;
    }
    setLoading(true);
    const ticketDetails = {
      selectedDate,
      counter,
      totalPrice,
      name,
    };
    console.log("Ticket Details:", ticketDetails);
    localStorage.setItem("totalPrice", ticketDetails);
    setTimeout(() => {
      setLoading(false);
      navigate("/ParaCheckout", {
        state: {
          ticketDetails,
        },
      });
    }, 4000);
  };
  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src={loader} alt="" />
        </div>
      )}
      <div className="h-[66px] flex justify-between items-center bg-white mt-[-14px] p-4 pt-1 border-b">
        <h2 className="text-xl font-semibold">Event Preview</h2>
        <button
          onClick={closeModal}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="w-full m-auto h-[calc(100vh-100px)] overflow-y-auto">
        <style>{customScrollbarStyles}</style>
        <div className="w-[100%] m-auto pt-9 px-[18px] ">
          <div className="w-full h-auto sm:h-[190px] bg-white rounded-[10px] border border-[#D2D2D2] flex flex-col sm:flex-row items-center p-4 sm:pl-[14px] gap-3">
            <div className="h-[200px] sm:h-[85%] w-full sm:w-[25.5%]">
              <img
                src="https://storage.googleapis.com/bookmepk/static/custom/upload/events/bg/paragliding120824.png"
                alt=""
                className="h-full w-full object-cover rounded-[10px]"
              />
            </div>
            <div className="h-full pt-3">
              <h2 className="text-[18px] font-semibold text-[#101828]">
                {name}
              </h2>
              <h3 className="text-[#212529] text-[15px] pt-2 font-semibold">
                Pir Chinasi
              </h3>
              <p className="text-[#212529] text-[15px] pt-1 font-medium">
                Date: Fri, 22 Nov 2024 - Tue, 31 Dec 2024
              </p>
              <p className="text-[#212529] text-[15px] pt-1 font-medium">
                Note: 10 AM to 06 PM
              </p>
            </div>
          </div>
          <div className="w-full h-auto pb-4 mt-[14px] bg-white rounded-[10px] border border-[#D2D2D2] px-4 sm:pl-[21px] sm:pr-7 pt-3">
            <h2 className="text-[18px] font-semibold text-[#101828]">
              Ticket Details
            </h2>
            <h3 className="text-[14px] font-medium text-[#344054] pt-[10px]">
              Date
            </h3>
            <select
              name=""
              id=""
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full border border-[#D2D2D2] outline-none mt-2 h-[43px] rounded-[10px] px-2"
            >
              <option value="24 Nov, 2024">24 Nov, 2024</option>
              <option value="25 Nov, 2024">25 Nov, 2024</option>
              <option value="26 Nov, 2024">26 Nov, 2024</option>
              <option value="27 Nov, 2024">27 Nov, 2024</option>
              <option value="28 Nov, 2024">28 Nov, 2024</option>
              <option value="29 Nov, 2024">29 Nov, 2024</option>
              <option value="30 Nov, 2024">30 Nov, 2024</option>
              <option value="01 Dec, 2024">01 Dec, 2024</option>
              <option value="02 Dec, 2024">02 Dec, 2024</option>
              <option value="03 Dec, 2024">03 Dec, 2024</option>
              <option value="04 Dec, 2024">04 Dec, 2024</option>
              <option value="05 Dec, 2024">05 Dec, 2024</option>
              <option value="06 Dec, 2024">06 Dec, 2024</option>
              <option value="07 Dec, 2024">07 Dec, 2024</option>
              <option value="08 Dec, 2024">08 Dec, 2024</option>
              <option value="09 Dec, 2024">09 Dec, 2024</option>
              <option value="10 Dec, 2024">10 Dec, 2024</option>
            </select>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
              <div>
                <p className="text-[14px] font-bold text-[#212529] pt-7 tracking-[0.3px]">
                  Single (15% Discount Applied)
                </p>
                <h3 className="text-[14px] font-medium text-[#344054] tracking-[0.4px]">
                  <span className="line-through">Rs 19,500</span> Rs{" "}
                  {basePrice.toLocaleString()}
                </h3>
              </div>
              <div className="w-full sm:w-[18.5%] border border-[#D2D2D2] h-[45px] rounded-[10px] mt-2 sm:mt-7 flex">
                <div
                  onClick={handleMinus}
                  className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center font-black text-[#667085] cursor-pointer"
                >
                  <Minus size={18} />
                </div>
                <div className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center text-[14px] text-black">
                  {counter}
                </div>
                <div
                  onClick={handlePlus}
                  className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center font-black text-[#667085] cursor-pointer"
                >
                  <Plus size={18} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-auto pb-12 mt-[14px] bg-white rounded-[10px] border border-[#D2D2D2] px-4 sm:pl-[21px] sm:pr-7 pt-3">
            <h2 className="text-[18px] font-semibold text-[#101828]">
              Event Details
            </h2>
            <h2 className="text-[14px] font-bold text-[#101828] mt-2">
              Flight Details
            </h2>
            <ul className="text-[14px] font-medium pt-5 text-[#212529] tracking-[0.4px] oll pl-2">
              <li>Paragliding Passenger Flight (15 to 20 Min Duration)</li>
              <li>
                Takeoff from Pir Chinasi (9,500ft) and landing on Muzaffarabad
                Airport.
              </li>
              <li>We will provide you safety equipment for flight</li>
              <li>
                HD GoPro video of your complete flight included, you will record
                your complete flight with GoPro adventure camera mounted on
                selfie stick.
              </li>
              <li>
                Once we land at Muzaffarabad Airport we will give you a ride to
                go back up on the takeoff location.
              </li>
              <li>
                You need to reach at takeoff location by yourself (Pir Chinasi,
                Muzaffarabad)
              </li>
              <li>
                No training required for passengers, you will be given 2min
                instructions before the flight.
              </li>
            </ul>
            <h2 className="text-[14px] font-bold text-[#101828] mt-5">
              Company Policies
            </h2>
            <ul className="text-[14px] font-medium pt-5 text-[#212529] tracking-[0.4px] oll pl-2">
              <li>
                {" "}
                Passenger Safety & Comfort is of utmost importance to us. We
                strive to make the flight as pleasant, enjoyable & comfortable
                as possible without any urgency. We use `REVERSE LAUNCH`
                technique for takeoff that requires minimum effort on the
                customer part & makes the takeoff & flight hassle free.
              </li>
              <li>
                We have professional paragliding pilots with more than 12 years
                of flying experience.
              </li>
              <li>
                All equipment is procured from Europe and is certified by
                international paragliding bodies.
              </li>
              <li>Pilot has a reserve parachute in case of an emergency.</li>
              <li>
                {" "}
                We care about your safety, you will not be flying alone, we will
                fly with you, so even if we don`t care about your safety, (which
                we do) we care about ours.
              </li>
            </ul>
            <h2 className="text-[14px] font-bold text-[#101828] mt-5">
              Terms and Conditions
            </h2>
            <ul className="text-[14px] font-medium pt-5 text-[#212529] tracking-[0.4px] oll pl-2">
              <li>
                Book your flight 1 or 2 days prior to the actual day you want to
                fly.
              </li>
              <li>
                Passenger weight should be between 35Kg - 110Kg (No age
                restriction).
              </li>
              <li>
                Booking will be made on a first come first serve basis as per
                availability.
              </li>
              <li>
                Flight duration is 15 to 20 Min, we takeoff from Pir Chinasi
                (9,500ft) and land at Muzaffarabad Airport.
              </li>
              <li>
                Once we take off we can not land back immediately so make sure
                you do not have height phobia.
              </li>
              <li>
                We accept no responsibility for any loss or damage to your
                personal belongings & artifacts.
              </li>
              <li>
                Flights are undertaken under qualified pilots which have more
                than 12 years of flying experience. We use professional grade
                Equipment, which is procured from Europe and is certified by
                international paragliding bodies. In case of emergency the pilot
                has a reserve parachute to deploy. We are not held responsible
                for any mishap, accident or unpleasant event either caused via
                uncertain weather change, act of God and any other reason.
              </li>
              <li>
                {" "}
                Passengers need to sign on disclaimer before takeoff that he/she
                fully understands the risk factor involved in this sport, so
                `Paragliding Tourism Pakistan` is not responsible for any
                accident or unpleasant event either caused via uncertain weather
                change, act of God and any other reason.
              </li>
            </ul>
            <h2 className="text-[14px] font-bold text-[#101828] mt-5">
              Refund Policies
            </h2>
            <ul className="text-[14px] font-medium pt-5 text-[#212529] tracking-[0.4px] oll pl-2">
              <li>
                It`s a highly weather dependent sport, so if the flight is
                postponed due to weather or any other reason, your flight will
                be rescheduled to some other day or the payment will be refunded
                in case of flight cancellation.
              </li>
              <li>
                {" "}
                On your flight day if you did not reach the takeoff location or
                you want to cancel your ride, then no refund will be offered.
              </li>
              <li>
                If you want to cancel your ride 1 day before then we offer you
                reschedule.
              </li>
              <li>
                If you want to cancel your ride 2 day before then we will offer
                a 100% refund.
              </li>
            </ul>
          </div>
          <div className="mt-4 w-full h-11"></div>
          <div className="fixed bottom-0 right-0 w-full lg:max-w-[50%] flex justify-between bg-white border-t p-3 pl-6">
            <div>
              <p className="text-[15px] text-gray-600 font-medium">Total</p>
              <p className="text-[20px] font-medium text-[#121619]">
                Rs {totalPrice ? totalPrice.toLocaleString() : "--"}
              </p>
            </div>
            <button
              onClick={handleContinue}
              className="w-[105px] h-[45px] mt-1 bg-[#121619] text-white rounded-lg font-medium hover:bg-[#121619]"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
