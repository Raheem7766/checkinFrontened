import React, { useState } from "react";
import img from "../../../images/head.svg";
import img1 from "../../../images/down.svg";
import img2 from "../../../images/manag.svg";
import bus1 from "../../../images/bus1.png";
import bus2 from "../../../images/bus2.png";
import bus3 from "../../../images/bus3.png";
import bus4 from "../../../images/bus4.jpg";
import bus5 from "../../../images/bus5.png";
import bus6 from "../../../images/bus6.jpg";
import bus7 from "../../../images/bus7.png";
import bus8 from "../../../images/bus8.png";
import bus9 from "../../../images/bus9.png";
import bus10 from "../../../images/bus10.png";
import bus11 from "../../../images/bus11.png";
import bus12 from "../../../images/bus12.png";
import more from "../../../images/more.svg";
import load from "../../../images/load.svg";
import discov from "../../../images/discov.svg";
import android from "../../../images/android-app.A115Y25Z.svg";
import ios from "../../../images/ios-app.BsEkpCCk.svg";
import app from "../../../images/bookme-app.B0stX0tq.svg";
import coin from "../../../images/coin.svg";
import Accordion from "../../../components/Home/AccordionItem";
import Footer from "../../Home/Footer";

export default function BusCenter() {
  const [openIndex, setOpenIndex] = useState(null);

  const features = [
    {
      icon: "🏨",
      title: "Look for flights and hotels",
      description:
        "Search for exclusive deals on flights and hotels. Find cheap air tickets to any destination you like. Choose from its vast repository of hotels - from budget, mid-range, five-star to niche boutique properties. Widen your choices with options like flexi stay, pay directly at hotel, and guaranteed standard amenities. Extremely efficient and easy.",
    },
    {
      icon: "🎫",
      title: "Get a secure flight booking",
      description:
        "Enjoy cancellation protection on domestic flights. Benefit from fare drop protection, same day cancellation protection, hold now - pay later, on international flight bookings. Great filters, fantastic navigation.",
    },
    {
      icon: "🏖️",
      title: "A holiday to suit every pocket",
      description:
        "Plan a honeymoon, a weekend getaway, or an adventure activity. Select from an array of domestic and international destinations well-suited to every spectrum of traveller. Be it flights, hotels, pre-planned itinerary, transport upon arrival/departure or sightseeing - you are covered. Attractive pricing, well-researched itineraries.",
    },
    {
      icon: "✍️",
      title: "Find the best combination, tailor your trip",
      description:
        "Your one-stop-shop to get the best combination of flights, hotels, activities, package holidays along with train and bus tickets. Checkin's powerful search engine lets you zero in on with precision.",
    },
    {
      icon: "🎟️",
      title: "No need to queue up at the ticketing window",
      description:
        "Buy tickets to all ASI-protected monuments online. Its hassle-free and saves you from waiting in a queue under a scorching sun. Imagine gaining a breezy entry into the Taj Mahal!",
    },
    {
      icon: "🏷️",
      title: "New deal every season",
      description:
        "The onset of the festive season, an upcoming long weekend or a gazetted holiday, expect an attractive deal on flights, hotels and holidays coming your way. From cashback offers to promo code discounts, you are in for a hot deal.",
    },
    {
      icon: "🏷️",
      title: "Checkins burgeoning customer base",
      description:
        "Our expert customer service team supports you before, during and after the booking. The several million customers since 2006 are proof.",
    },
  ];
  return (
    <div>
      <div className="h-full w-full sm:w-[90%] m-auto bg-white rounded-[20px] px-0 sm:px-8 lg:px-[160px] cpx shh mt-4">
        <div className="container mx-auto p-6 pt-8 pb-12 lg:pt-14 lg:pb-20 flex flex-col lg:flex-row lg:flex lg:gap-8 lg:items-start">
          <div className="w-full lg:w-[52%] space-y-4">
            <h1 className="text-2xl lg:text-[32px] font-semibold text-[#1E1E1E] mb-6 lg:mb-[60px]">
              Why Checkin?
            </h1>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="rounded-lg bg-white shh1">
                  <button
                    className="w-full p-4 flex items-start justify-between gap-4"
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  >
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="flex-1 text-left font-semibold">
                      {feature.title}
                    </span>
                    <svg
                      className={`w-6 h-6 transform transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {openIndex === index && (
                    <div className="px-4 pb-4 text-gray-600">
                      <div className="pl-10">{feature.description}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 mt-8 lg:mt-10 sm:px-6 lg:pl-8 relative">
            <div className="relative h-full">
              <img
                src="https://www.yatra.com/react-home/images/whyYatra/whyYatraMobile.webp"
                alt="Travel destination"
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container w-full m-auto sm:px-6 lg:px-[80px] wa py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row justify-between rounded-[20px] pt-4 lg:pt-7 pb-6 lg:pb-0 shh">
          <div className="w-full lg:w-1/2">
            <div className="relative max-w-[280px] sm:max-w-[320px] lg:max-w-[350px] mx-auto">
              <img
                src="https://www.yatra.com/react-home/_next/image?url=%2Freact-home%2Fimages%2FdownloadApp%2FmobileApp.webp&w=1920&q=75"
                alt="App Interface"
                className="shadow-2xl mx-auto lg:ml-2"
              />
            </div>
          </div>

          <div className="lg:w-1/2 text-center lg:text-left pt-8 lg:pt-20">
            <h2 className="text-xl sm:text-2xl lg:text-[24px] font-normal text-[#333333]">
              TRY ON MOBILE
            </h2>
            <h1 className="text-4xl lg:text-[60px] font-normal lg:leading-[60px] our text-[#1E1E1E]">
              Download our app for unbeatable perks!
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-6 lg:pt-9">
              <img
                src="https://www.yatra.com/react-home/_next/image?url=%2Freact-home%2Fimages%2FdownloadApp%2FappQRCode.png&w=256&q=75"
                alt="QR Code"
                className="w-[100px] sm:w-[120px] lg:w-[132px] h-[100px] sm:h-[120px] lg:h-[132px]"
              />

              <div className="space-y-4 mt-4 sm:mt-0 sm:ml-8 lg:ml-11">
                <a href="#" className="block">
                  <img
                    src="https://www.yatra.com/react-home/_next/image?url=%2Freact-home%2Fimages%2FdownloadApp%2FplayStoreButton.png&w=256&q=75"
                    alt="Get it on Google Play"
                    className="h-[45px] sm:h-[50px] lg:h-[60px] w-auto"
                  />
                </a>
                <a href="#" className="block">
                  <img
                    src="https://www.yatra.com/react-home/_next/image?url=%2Freact-home%2Fimages%2FdownloadApp%2FappStoreButton.png&w=256&q=75"
                    alt="Download on App Store"
                    className="h-[45px] sm:h-[50px] lg:h-[60px] w-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
