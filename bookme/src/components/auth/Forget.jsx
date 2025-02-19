import React, { useState } from "react";
import img from "../../images/pk-removebg-preview.png";
import key from "../../images/key.svg";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Forget() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleGetCode = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5001/api/v1/password/forgot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        const token = data.token;
        console.log(token);
        // setTimeout(() => {
        //   navigate("/user/reset-password", { state: { token } });
        // }, 2000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full fixed inset-0 z-10 h-full pb-4 bg-white">
      <div className="w-full bg-[#121619] h-[70px] flex justify-between items-center px-12">
        <img
          src={img}
          alt="SVG"
          className="mt-[-3px] h-full w-[200px] object-cover"
          onClick={() => (window.location.href = "/")}
        />
        <button className="h-[42px] w-[75px] bg-[#FCEB03] rounded-[10px] text-[#121619] font-medium hidden md:block">
          Help
        </button>
      </div>
      <div className="w-full flex justify-center pt-[72px]">
        <img src={key} alt="" />
      </div>
      <h2 className="text-[30px] font-semibold text-center text-[#101828] mt-4">
        Forgot password?
      </h2>
      <p className="text-[15px] font-medium text-[#667085] text-center">
        Enter your email address and we will send you a reset <br /> code.
      </p>
      <div className="w-max m-auto mt-[6px] flex flex-col">
        <label
          htmlFor="email"
          className="text-[14px] font-medium text-[#344054]"
        >
          Email*
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "354px", height: "44px" }}
          className="mt-2 border-2 border-[#ccc] rounded-md p-2"
          required
        />
        {error && <p className="text-red-500 mt-2 w-[50%]">{error}</p>}
        {success && <p className="text-green-500 mt-2 w-[50%]">{success}</p>}
        <button
          onClick={handleGetCode}
          disabled={loading}
          style={{ width: "354px", height: "44px" }}
          className={`w-full mt-4 py-2 rounded-md font-medium transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#FCEB03] text-[#121619] hover:bg-[#ded441]"
          }`}
        >
          {loading ? "Sending..." : "Get Code"}
        </button>
        <div
          className="flex text-[14px] font-medium text-[#121619] justify-center mt-5"
          onClick={() => navigate("/login")}
        >
          <ArrowLeft />
          Back to log in
        </div>
      </div>
      <p className="text-[15px] font-medium text-[#667085] text-center mt-[10px]">
        By signing up you agree to our{" "}
        <span className="text-[#121619]">Terms & Conditions</span> and{" "}
        <span className="text-[#121619]">Privacy Policy</span>
      </p>
    </div>
  );
}
