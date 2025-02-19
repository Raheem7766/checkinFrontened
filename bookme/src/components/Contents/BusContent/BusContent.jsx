import React from "react";
import BusSearchForm from "../../Home/Search";
import BusCenter from "./BusCenter";
import Footer from "../../Home/Footer";

export default function BusContent() {
  return (
    <>
      <div className="w-full h-[100vh]">
        <div className="w-full h-[265px]">
          <BusSearchForm />
        </div>
        <BusCenter />
        <Footer />
      </div>
    </>
  );
}
