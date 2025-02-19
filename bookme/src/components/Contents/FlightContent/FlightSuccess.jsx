import React, { useEffect, useState } from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const FlightSuccess = () => {
  const [show, setShow] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    setShow(true);
    
    if (sessionId) {
      fetch(`http://localhost:5001/api/v1/flight-verify-checkout-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setBookingId(data.bookingId);
          } else {
            setError("Payment verification failed.");
          }
          setLoading(false);
        })
        .catch(() => {
          setError("An error occurred while verifying the payment.");
          setLoading(false);
        });
    } else {
      setError("No session ID found.");
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-[#121619] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className={`text-center transition-all duration-1000 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {loading ? (
            <p className="text-[#f2e645] text-xl">Verifying payment...</p>
          ) : error ? (
            <p className="text-red-500 text-xl">{error}</p>
          ) : (
            <>
              <div className="inline-block mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#f2e645]/20 rounded-full animate-ping" />
                  <CheckCircle className="h-20 w-20 text-[#f2e645] relative" />
                </div>
              </div>

              <div className="bg-[#f2e645]/10 backdrop-blur-lg rounded-3xl p-8 mb-8">
                <h1 className="text-[#f2e645] text-3xl font-bold mb-3">Booking Confirmed!</h1>
                <p className="text-[#f2e645]/80 text-lg mb-8">Your reservation has been successfully booked.</p>

                <div className="text-[#f2e645] font-mono text-xl mb-8">{bookingId ? `#${bookingId}` : "Booking ID not available"}</div>

                <Link to="/">
                  <button className="w-full bg-[#f2e645] text-[#121619] py-4 px-6 rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 group">
                    <ArrowLeft className="group-hover:translate-x-1 transition-transform" />
                    Back to Home
                  </button>
                </Link>
              </div>

              <div className="text-[#f2e645]/60 text-sm">
                We've sent a confirmation email to your inbox.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightSuccess;
