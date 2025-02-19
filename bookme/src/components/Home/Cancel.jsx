import React, { useEffect, useState } from "react";
import { XCircle, ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

const CancelSuccess = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#121619] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div
          className={`text-center transition-all duration-1000 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[#f2e645]/20 rounded-full animate-pulse" />
              <XCircle className="h-20 w-20 text-[#f2e645] relative" />
            </div>
          </div>

          <div className="bg-[#f2e645]/10 backdrop-blur-lg rounded-3xl p-8 mb-8">
            <h1 className="text-[#f2e645] text-3xl font-bold mb-3">
              Booking Cancelled
            </h1>

            <p className="text-[#f2e645]/80 text-lg mb-8">
              Your booking has been successfully cancelled
            </p>

            <div className="text-[#f2e645] font-mono text-xl mb-8">
              Refund ID: #REF-2024-8756
            </div>

            <div className="space-y-4">
              <Link to="/seatmap">
                <button className="w-full bg-[#f2e645] text-[#121619] py-4 px-6 rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center group">
                  <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                  Book Again
                </button>
              </Link>
              <Link to="/">
                <button className="w-full bg-transparent mt-4 border border-[#f2e645]/20 text-[#f2e645] py-4 px-6 rounded-xl font-semibold hover:bg-[#f2e645]/10 transition-all flex items-center justify-center group">
                  <Home className="mr-2" />
                  Return Home
                </button>
              </Link>
            </div> 
          </div>

          <div className="text-[#f2e645]/60 text-sm">
            A confirmation email has been sent with your refund details
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelSuccess;
