import React from "react";
import HotelSearch from "./HotelSearch";
import HotelCenter from "./HotelCenter";
import Footer from "../../Home/Footer";
export default function HotelsContent() {
  return (
    <div className="w-full">
      <HotelSearch />
      <HotelCenter />
      <Footer />
    </div>
  );
}
