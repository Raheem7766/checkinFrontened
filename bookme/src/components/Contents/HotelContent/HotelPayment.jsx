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

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function HotelPayment({ ...props }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [timeLeft, setTimeLeft] = useState(299);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedHotel, dataToSubmit } = location.state || {};
  const totalPrice = location.state?.totalPrice;
  const formData = location.state?.formData;
  const name = selectedHotel?.name
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

  // const handleStripePayment = async () => {
  //   try {
  //     const stripe = await loadStripe(
  //       "pk_test_51Pk5z9Rwi0eCgPobBLLJHwAPK3tHaniaAFpSuY3B2LEFuR1KLL3TBCM7U1GM68Da92Q4NVwxla5cJNbXN3UFTxu800LHhjWOMH"
  //     );

  //     if (!stripe) {
  //       throw new Error("Failed to initialize Stripe");
  //     }

  //     if (!totalPrice || !formData) {
  //       throw new Error("Missing required payment data");
  //     }

  //     const priceInUSD = Math.max(1, Math.floor(totalPrice / 300));

  //     const checkoutData = {
  //       product: [
  //         {
  //           name: "The Safar Tour Concert Ticket",
  //           price: priceInUSD,
  //           quantity: formData.ticketQuantity || 1,
  //         },
  //       ],
  //       eventDetails: {
  //         customerName: formData.fullName,
  //         customerEmail: formData.email,
  //         phoneNumber: formData.phoneNumber,
  //         eventDate: formData.eventDate,
  //         cities: formData.cities,
  //         cnic: formData.cnic,
  //         title: formData.title,
  //       },
  //       currency: "usd",
  //       totalAmount: priceInUSD,
  //     };

  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       throw new Error("Authentication token is missing");
  //     }

  //     const response = await fetch("http://localhost:5001/api/v1/checkout", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: ` ${token}`,
  //       },
  //       credentials: "include",
  //       mode: "cors",
  //       body: JSON.stringify(checkoutData),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json().catch(() => null);
  //       throw new Error(
  //         `Payment failed: ${errorData?.message || response.statusText}`
  //       );
  //     }

  //     const session = await response.json();

  //     if (!session.id) {
  //       throw new Error("Invalid session ID received from server");
  //     }

  //     const { error } = await stripe.redirectToCheckout({
  //       sessionId: session.id,
  //     });

  //     if (error) {
  //       throw error;
  //     }
  //   } catch (error) {
  //     console.error("Payment Error:", error);
  //     alert(`Payment failed: ${error.message}`);
  //   }
  // };

  const price = dataToSubmit?.totalPrice;
    console.log(price)

  const handleCheckout = async () => {
    const price = dataToSubmit?.totalPrice;
    console.log(price)

    if (!price) {
      console.error("Price is undefined or null");
      alert("Price is missing. Please ensure flight is properly selected.");
      return;
    }

    const parsedPrice =
      typeof price === "string"
        ? parseFloat(price.replace(/[^0-9.]/g, ""))
        : parseFloat(price);

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      console.error("Invalid price value:", price, "Parsed as:", parsedPrice);
      alert("Invalid price format. Please contact support.");
      return;
    }

    try {
      console.log(
        "Sending to backend - Price:",
        parsedPrice,
        "Airline:",
       name
      );

      const { data } = await axios.post(
        "http://localhost:5001/api/v1/hotel-create-checkout-session",
        {
          price: parsedPrice,
          name: name || "Unknown Airline",
        }
      );

      if (!data.id) {
        throw new Error("No session ID received from server");
      }

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.error("Checkout error:", error.response?.data || error.message);
      alert("Checkout failed. Please try again or contact support.");
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
          <div className="w-full bg-[#F2F4F7] h-auto pb-11 px-2 sm:px-4 lg:px-16 pr-4 pt-[22px]">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
              <div className="w-full lg:w-[66.4%]">
                <div className="w-full h-auto lg:h-[65px] py-2 lg:py-0 md:py-2 sm:py-2 flex lg:flex-nowrap items-center pl-3 gap-2 mb-[14px] bg-yellow-50 border border-[#121619] rounded-[10px]">
                  <div className="w-max lg:w-[8%] h-[40px] lg:h-[40%] px-2 border-[5px] text-[12px] lg:text-[14px] font-medium text-[#121619] flex items-center justify-center border-[#121619] rounded-full">
                    Note
                  </div>
                  <p className="text-[12px] lg:text-[14px] font-medium text-[#121619] tracking-[0.3px] w-full lg:w-auto">
                    Pay with your selected MCB cards to get a discount of up to
                    40%.
                  </p>
                </div>

                <div className="w-full bg-white p-4 rounded-[10px] border border-[#D2D2D2]">
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
                      className={`w-5 h-5 rounded-[50%] border-2 flex items-center justify-center ${
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
                      selectedPaymentMethod === "easypaisa"
                        ? "bg-yellow-100"
                        : ""
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
                      selectedPaymentMethod === "jazzcash"
                        ? "bg-yellow-100"
                        : ""
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
                      <img
                        src={stripe}
                        alt=""
                        className="w-[40px] sm:w-[68px]"
                      />
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

                  <button onClick={handleCheckout} className="w-full h-[42px] bg-[#FCEB03] mt-5 rounded-[5px] flex items-center justify-center text-[#121619] text-[14px] font-medium hover:bg-[#ede24a]">
                    Pay
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-[32.6%]">
                <div className="w-full h-max rounded-[10px] bg-white border-[1px] border-[#D2D2D2] lg:ml-[14px] lg:pb-4 py-4 lg:p-0">
                  <h2 className="text-[18px] font-semibold lg:ml-4 ml-2 md:ml-4 lg:mt-2">
                    Hotel
                  </h2>
                  <p className="text-[14px] font-medium lg:pl-4 pl-2 md:pl-4 text-[#212529] tracking-[0.3px] lg:pt-1">
                    {selectedHotel?.name}
                  </p>

                  <div className="w-full h-auto lg:pb-[16px] pb-3 border-t-[1px] px-2 md:px-4 border-b-[1px] lg:mt-[14px] mt-4 border-[#D0D5DD]">
                    <h2 className="text-[18px] font-semibold lg:mt-2 mt-4">
                      Subtotal
                    </h2>

                    <div className="">
                      <div className="flex justify-between">
                        <h3 className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                          Check-in
                        </h3>
                        <p className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                          {new Date(
                            dataToSubmit?.departureDate
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      <div className="flex justify-between lg:mt-[2px]">
                        <h3 className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                          Check-out
                        </h3>
                        <p className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                          {new Date(
                            dataToSubmit?.returnDate
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      <div className="flex justify-between lg:mt-[2px]">
                        <h3 className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                          Total Rooms
                        </h3>
                        <p className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                          {dataToSubmit?.totalRooms}
                        </p>
                      </div>

                      <div className="flex justify-between lg:mt-[2px]">
                        <h3 className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                          Night to stay
                        </h3>
                        <p className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                          1
                        </p>
                      </div>

                      <div className="flex justify-between lg:mt-[2px]">
                        <h3 className="text-[14px] font-medium text-[#212529] tracking-[0.3px] lg:pt-1">
                          Room Price
                        </h3>
                        <p className="text-[14px] font-medium lg:pl-4 text-[#212529] tracking-[0.3px] lg:pt-1">
                          Rs {dataToSubmit?.totalPrice}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:px-4 md:px-4 px-2 lg:pl-1 lg:pt-2 mt-4 lg:mt-0">
                    <h2 className="text-[18px] font-semibold lg:ml-3 lg:mt-[2px]">
                      Extras
                    </h2>
                    <div className="flex justify-between lg:mt-[2px]">
                      <h3 className="text-[14px] font-medium lg:pl-3 text-[#212529] tracking-[0.3px] lg:pt-1">
                        G.S.T
                      </h3>
                      <p className="text-[14px] font-medium lg:pl-4 text-[#212529] tracking-[0.3px] lg:pt-1">
                        Rs 2,070
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex justify-between items-center lg:px-4 md:px-4 px-2 lg:pl-1 lg:pt-3 pt-2 border-t-[1px] lg:mt-3 mt-4 border-[#D0D5DD]">
                    <h2 className="text-[18px] font-semibold lg:ml-3">Total</h2>
                    <p className="text-[18px] font-semibold text-[#121619]">
                      RS {dataToSubmit?.totalPrice}
                    </p>
                  </div>
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
