import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    {
      title: "Why Bookme?",
      content:
        "We are Pakistan's no.1 E-ticketing platform. We let you pre-book the best deals on your tickets for Movies, Bus Travel, Flights, Train journey and Events. You no longer have to stand in lines and can purchase your tickets from the comfort of your ‘phones’ by using a variety of digital payment methods. Get your ticket confirmations instantly via SMS and Email.",
    },
    {
      title:
        "What information will I be able to see during my ticket purchase?",
      content:
        "The timings and schedules for the occasion or journey you’re trying to book.",
    },
    {
      title: "How do I know if my purchase was successful?",
      content:
        "Upon successful completion of your ticket purchase, you will be directed to an order confirmation page which will contain an order confirmation number. With a few minutes of your purchase you will receive confirmation Email that will contain summary of your order along with E-ticket.",
    },
    {
      title: "Can I choose my own seat?",
      content:
        "Absolutely! The initial step for ticket booking will allow you to view the available seats. You will be able to select from these available options and book your seat immediately.",
    },
    {
      title: "How can I purchase E-Tickets once I have selected my seats?",
      content:
        "You can purchase E-Tickets using a variety of popular online payment methods like Debit/Credit Cards (Local & International), Easypaisa, Jazz Cash, Bank Transfer",
    },
    {
      title:
        "If I have a query regarding my E- Ticket, who can I contact for assistance?",
      content:
        "Our Customer Service support is available 24/7 via phone (042-111-266563) and email support (contact@bookme.pk).",
    },
    {
      title: "What if I do not receive my confirmation email?",
      content:
        "If for some reason you did not receive your confirmation email, please check your “junk” and/or “spam” folder. In case there is another issue, please feel free to contact our 24/7 support (042-111-266563, contact@bookme.pk)",
    },
    {
      title: "What are the requirements for booking a ticket?",
      content:
        "After you have selected your desired seat/booking you may be required to fill in some details for verification and validation such as, Name, Phone number, Email, and CNIC.",
    },
    {
      title: "What are the rewards for using Bookme?",
      content:
        "Apart from being able to easily pre-book your desired seat and ticket within a few clicks sitting at home with our platform, there are a couple of more exciting rewards that come with using the Bookme app",
    },
    {
      title: "What if I have forgotten my password?",
      content:
        "If you forget your password, just click on Forgot Password and provide your registered email address. An Email will be sent to you with an option to reset your password.",
    },
  ];

  return (
    <div className="max-w-[100%] mt-4">
      {accordionData.map((item, index) => (
        <div key={index} className="border-b border-[#E4E7EC] overflow-hidden">
          <div
            className="flex justify-between items-center cursor-pointer p-4 pl-0"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="text-[14px] font-semibold text-black">
              {item.title}
            </h3>
            <span className="text-xl text-white">
              {openIndex === index ? (
                <CiCircleMinus color="black" />
              ) : (
                <CiCirclePlus color="black" />
              )}
            </span>
          </div>
          <div
            className={`transition-max-height duration-500 ease-in-out ${
              openIndex === index ? "max-h-40" : "max-h-0"
            } overflow-hidden`}
          >
            <div className="p-4 pl-0 pt-0 text-[14px] font-medium text-[#667085]">
              <p>{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
