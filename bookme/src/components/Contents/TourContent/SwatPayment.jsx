import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import loader from "../../../images/giff.gif";

import card from "../../../images/creditcard.png";
import pay from "../../../images/payfast.png";
import easy from "../../../images/easypaisa-icon.png";
import jazz from "../../../images/jazzcash-icon.png";
import stripe from "../../../images/stripe.png";
import Footer from "../../Home/Footer";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "../../Home/Navbar";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51Pk5z9Rwi0eCgPobBLLJHwAPK3tHaniaAFpSuY3B2LEFuR1KLL3TBCM7U1GM68Da92Q4NVwxla5cJNbXN3UFTxu800LHhjWOMH"
);
export default function SwatPayment({ ...props }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [timeLeft, setTimeLeft] = useState(299);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingDetails, ticketDetails } = location.state || {};
  const price = location.state?.price;
  const totalPrice = location.state?.totalPrice;
  const formData = location.state?.formData;
  const name = location.state?.name;

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      navigate("/");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    if (timeLeft <= 0) {
      navigate("/");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m${minutes !== 1 ? "" : ""} ${remainingSeconds}s${
      remainingSeconds !== 1 ? "" : ""
    }`;
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
    if (props.onChange) {
      props.onChange(method);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const handleStripePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51Pk5z9Rwi0eCgPobBLLJHwAPK3tHaniaAFpSuY3B2LEFuR1KLL3TBCM7U1GM68Da92Q4NVwxla5cJNbXN3UFTxu800LHhjWOMH"
      );

      if (!stripe) {
        throw new Error("Failed to initialize Stripe");
      }

      if (!totalPrice || !formData) {
        throw new Error("Missing required payment data");
      }

      const priceInUSD = Math.max(1, Math.floor(totalPrice / 300));

      const checkoutData = {
        product: [
          {
            name: "The Safar Tour Concert Ticket",
            price: priceInUSD,
            quantity: formData.ticketQuantity || 1,
          },
        ],
        eventDetails: {
          customerName: formData.fullName,
          customerEmail: formData.email,
          phoneNumber: formData.phoneNumber,
          eventDate: formData.eventDate,
          cities: formData.cities,
          cnic: formData.cnic,
          title: formData.title,
        },
        currency: "usd",
        totalAmount: priceInUSD,
      };

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const response = await fetch("http://localhost:5001/api/v1/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${token}`,
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify(checkoutData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Payment failed: ${errorData?.message || response.statusText}`
        );
      }

      const session = await response.json();

      if (!session.id) {
        throw new Error("Invalid session ID received from server");
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert(`Payment failed: ${error.message}`);
    }
  };

  const handleCheckout = async () => {
    const name = location.state?.name;
    const price = totalPrice + 14;

    if (!price || isNaN(price)) {
      alert("Invalid price. Please check your selection.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/v1/tour-create-checkout-session",
        {
          price: parseFloat(price),
          name: name || "Unknown Tour",
        }
      );

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error("Checkout error:", error.response?.data || error.message);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src={loader} alt="" />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="w-full bg-[#F2F4F7] min-h-[78vh] px-2 sm:px-4 lg:px-[88px] lg:pr-8 pt-6 pb-8">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
              <div className="w-full lg:w-[66.4%] bg-white p-4 rounded-[10px] border border-[#D2D2D2]">
                <div className="flex flex-col sm:flex-row sm:justify-between mb-[22px] border-b border-[#D2D2D2] pb-[12px]">
                  <h2 className="text-[12px] sm:text-[18px] font-semibold tracking-[0.4px] text-[#101828] mb-2 sm:mb-0">
                    Secure Checkout: Complete your Purchase.
                  </h2>
                  <p className="text-[16px] sm:text-[18px] font-semibold text-[#121619]">
                    Pay in: {formatTime(timeLeft)}
                  </p>
                </div>

                <div
                  className={`w-full h-[60px] sm:h-[70px] border border-[#D2D2D2] mb-[14px] flex justify-between items-center px-2 sm:px-4 rounded-[5px] ${
                    selectedPaymentMethod === "credit-debit"
                      ? "bg-yellow-100"
                      : ""
                  }`}
                  onClick={() => handlePaymentMethodChange("credit-debit")}
                >
                  <div className="flex items-center h-full gap-2 sm:gap-4">
                    <img src={card} alt="" className="w-[40px] sm:w-[68px]" />
                    <p className="text-[12px] sm:text-[14px] font-medium text-[#212529]">
                      Debit/Credit Card (Master and VISA Cards)
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPaymentMethod === "credit-debit"
                        ? "bg-[#FCEB03] border-transparent"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedPaymentMethod === "credit-debit" && (
                      <Check
                        className="text-[#121619]"
                        size={16}
                        strokeWidth={3}
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`w-full h-[60px] sm:h-[70px] border border-[#D2D2D2] mb-[14px] flex justify-between items-center px-2 sm:px-4 rounded-[5px] ${
                    selectedPaymentMethod === "bank-accounts"
                      ? "bg-yellow-100"
                      : ""
                  }`}
                  onClick={() => handlePaymentMethodChange("bank-accounts")}
                >
                  <div className="flex items-center h-full gap-2 sm:gap-4">
                    <img src={pay} alt="" className="w-[40px] sm:w-[68px]" />
                    <p className="text-[12px] sm:text-[14px] font-medium text-[#212529]">
                      Bank Accounts
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPaymentMethod === "bank-accounts"
                        ? "bg-[#FCEB03] border-transparent"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedPaymentMethod === "bank-accounts" && (
                      <Check
                        className="text-[#121619]"
                        size={16}
                        strokeWidth={3}
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`w-full h-[60px] sm:h-[70px] border border-[#D2D2D2] mb-[14px] flex justify-between items-center px-2 sm:px-4 rounded-[5px] ${
                    selectedPaymentMethod === "easypaisa" ? "bg-yellow-100" : ""
                  }`}
                  onClick={() => handlePaymentMethodChange("easypaisa")}
                >
                  <div className="flex items-center h-full gap-2 sm:gap-4">
                    <img src={easy} alt="" className="w-[40px] sm:w-[68px]" />
                    <p className="text-[12px] sm:text-[14px] font-medium text-[#212529]">
                      Easypaisa Mobile Account
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPaymentMethod === "easypaisa"
                        ? "bg-[#FCEB03] border-transparent"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedPaymentMethod === "easypaisa" && (
                      <Check
                        className="text-[#121619]"
                        size={16}
                        strokeWidth={3}
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`w-full h-[60px] sm:h-[70px] border border-[#D2D2D2] mb-[14px] flex justify-between items-center px-2 sm:px-4 rounded-[5px] ${
                    selectedPaymentMethod === "jazzcash" ? "bg-yellow-100" : ""
                  }`}
                  onClick={() => handlePaymentMethodChange("jazzcash")}
                >
                  <div className="flex items-center h-full gap-2 sm:gap-4">
                    <img src={jazz} alt="" className="w-[40px] sm:w-[68px]" />
                    <p className="text-[12px] sm:text-[14px] font-medium text-[#212529]">
                      Jazzcash Mobile Account
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPaymentMethod === "jazzcash"
                        ? "bg-[#FCEB03] border-transparent"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedPaymentMethod === "jazzcash" && (
                      <Check
                        className="text-[#121619]"
                        size={16}
                        strokeWidth={3}
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`w-full h-[60px] sm:h-[70px] border border-[#D2D2D2] mb-[14px] flex justify-between items-center px-2 sm:px-4 rounded-[5px] ${
                    selectedPaymentMethod === "stripe" ? "bg-yellow-100" : ""
                  }`}
                  onClick={() => handlePaymentMethodChange("stripe")}
                >
                  <div className="flex items-center h-full gap-2 sm:gap-4">
                    <img src={stripe} alt="" className="w-[40px] sm:w-[68px]" />
                    <p className="text-[12px] sm:text-[14px] font-medium text-[#212529]">
                      International (USD) Debit/Credit Cards (8% Aprx.free)
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPaymentMethod === "stripe"
                        ? "bg-[#FCEB03] border-transparent"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedPaymentMethod === "stripe" && (
                      <Check
                        className="text-[#121619]"
                        size={16}
                        strokeWidth={3}
                      />
                    )}
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full h-[42px] bg-[#FCEB03] mt-5 rounded-[5px] flex items-center justify-center text-[#121619] text-[14px] font-medium hover:bg-[#ede24a]"
                >
                  Pay
                </button>
              </div>

              <div className="w-full lg:w-[31.6%] h-max mt-5 rounded-[10px] bg-white border-[1px] border-[#D2D2D2] lg:ml-[14px] pb-4">
                <h2 className="text-[18px] font-semibold ml-4 mt-2">Tour</h2>
                <p className="text-[14px] font-medium pl-4 text-[#212529] tracking-[0.3px] pt-1">
                  3 Days Trip to Swat Kalam
                </p>
                <div className="w-full h-auto pb-[16px] border-t-[1px] border-b-[1px] mt-4 border-[#D0D5DD]">
                  <div className="flex justify-between">
                    <h2 className="text-[18px] font-semibold tracking-[0.4px] text-[#101828] pl-4 pt-2">
                      Actual Total
                    </h2>
                    <p className="text-[18px] font-semibold tracking-[0.4px] text-[#101828] pr-4 pt-2">
                      Rs {new Intl.NumberFormat("en-IN").format(totalPrice)}
                    </p>
                  </div>
                  <div className="w-full flex justify-between px-4 pt-[10px]">
                    <p className="text-[14px] font-medium text-[#212529]">
                      Service Fee
                    </p>
                    <p className="text-[#212529] text-[14px] font-medium">
                      Rs 14
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center px-4 pl-1 pt-2">
                  <h2 className="text-[18px] font-semibold ml-4">Total</h2>
                  <p className="text-[18px] font-semibold text-[#121619]">
                    Rs {new Intl.NumberFormat("en-IN").format(totalPrice + 14)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
