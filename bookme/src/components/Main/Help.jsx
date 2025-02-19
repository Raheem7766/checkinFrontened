import { MapPin } from "lucide-react";
import React, { useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { TiHeartOutline } from "react-icons/ti";
import Footer from "../Home/Footer";
import Navbar from "../Home/Navbar";

export default function Help() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    formData.append("access_key", "5cf50458-f6a3-4dd0-abf1-4a909babe6b4");
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (data.success) {
      setFormData("Form Submitted Successfully");
      e.target.reset();
    } else {
      console.log("Error", data);
      setFormData(data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-full px-2 md:px-8 lg:px-0 mx-auto">
        <div className="text-center mt-8 lg:mt-16">
          <h2 className="text-sm font-semibold text-gray-800">Contact Us</h2>
          <p className="text-2xl md:text-4xl font-semibold text-gray-900 mt-[12px]">
            We’d love to hear from you
          </p>
          <p className="text-sm font-medium text-gray-500 mt-[16px] tracking-[0.3px]">
            Our team is always here to answer your queries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 lg:px-9 gap-4 mt-[62px]">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="bg-yellow-50 rounded-lg p-5 flex flex-col justify-start pb-[18px] shh"
            >
              <div className="w-12 h-12 bg-yellow-300 flex items-center justify-center rounded-lg">
                {idx === 0 && <MdOutlineEmail size={25} color="#121619" />}
                {idx === 1 && <TiHeartOutline size={25} color="#121619" />}
                {idx === 2 && <MapPin size={25} color="#121619" />}
                {idx === 3 && <IoCallOutline size={25} color="#121619" />}
              </div>
              <h3 className="text-[13px] font-medium text-gray-800 mt-10">
                {idx === 0 && "Email Us"}
                {idx === 1 && "We Care"}
                {idx === 2 && "Visit Us"}
                {idx === 3 && "Call Us"}
              </h3>
              <p className="text-[13px] font-medium text-gray-800 mt-2">
                {idx === 0 && "We're here to help"}
                {idx === 1 && "We truly care about your experience."}
                {idx === 2 && " Our team is here to serve you"}
                {idx === 3 && "We're here for you 24/7"}
              </p>
              <p className="text-[13px] font-medium text-gray-800 mt-4">
                {idx === 0 && "contact@bookme.pk"}
                {idx === 1 && "Let us know what you have to say"}
                {idx === 2 &&
                  "NASTP, 69 Abid Majeed Road, Cantt, Lahore, Punjab 54660."}
                {idx === 3 && "National Customers; 042 111 266563 (BOOKME)"}
              </p>
              <p className="text-[13px] font-medium text-gray-800 mt-1">
                {idx === 3 && "National Customers; +92 42 111 266563 (BOOKME)"}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-gray-50 p-6 lg:px-6 px-0 rounded-lg ">
          <h2 className="text-[14px] font-semibold text-gray-800 pl-[18px] pt-[40px]">
            Our Location
          </h2>
          <h1 className="text-[35px] font-bold text-[#101828] pl-[18px] pt-2 tracking-[0.4px]">
            Find Us on the Map
          </h1>
          <p className="text-[14px] tracking-[0.3px] font-medium text-gray-500 mt-2 pl-[18px]">
            Locate our office effortlessly on Google Maps.
          </p>
          <div className="px-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18..."
              className="w-full h-[492px] mt-4"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="mt-12 bg-white shh w-full lg:w-[593px] md:w-[100%] sm:w-[100%] get mx-auto py-6 pb-11 px-2">
          <h2 className="text-[35px] tracking-[0.7px] cursor-default mt-1 font-semibold text-[#101828] text-center">
            Get in touch
          </h2>
          <p className="text-[14px] font-medium text-[#667085] text-center cursor-default tracking-[0.4px] mt-[8px]">
            Drop us a message and our team will be happy to assist you.
          </p>
          <form onSubmit={handleSubmit} className="mt-9 space-y-[11px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-800"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="w-full border rounded-lg p-2 mt-2"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full border rounded-lg p-2 mt-2"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="text-sm font-medium text-gray-800"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="2"
                className="w-full border rounded-lg p-2 mt-2"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              Send Message
            </button>
          </form>
        </div> 

        <Footer />
      </div>
    </>
  );
}
