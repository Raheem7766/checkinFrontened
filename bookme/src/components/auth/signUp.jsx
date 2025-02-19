import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import { useBusSearch } from "../context/context";
import Navbar from "../Home/Navbar";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    captchaVerified: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setForm({ ...form, phone: value });
  };

  const handleCaptchaChange = (value) => {
    setForm({ ...form, captchaVerified: !!value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/register",
        {
          name: form.name,
          email: form.email,
          number: form.phone,
          password: form.password,
        }
      );

      if (response.data.success) {
        alert("User registered successfully!");
        // localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", form.name);
        localStorage.setItem("userEmail", form.email);
        setForm({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          captchaVerified: false,
        });
        navigate("/login");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-full pb-4 bg-[#F9FAFB] flex justify-center items-center">
        <div className="h-full w-full max-w-[370px] lg:max-w-[370px] lg:h-auto">
          <h2 className="text-[28px] font-semibold text-center mt-4 tracking-[0.5px]">
            Create Account
          </h2>
          <div className="m-auto w-full bg-white mt-[10px]">
            <form
              onSubmit={handleSubmit}
              className="max-w-md w-full p-5 border rounded-lg shadow-lg overflow-hidden space-y-4"
            >
              <div className="space-y-1">
                <label className="block font-medium text-[#344054]">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border rounded-md text-black"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block font-medium text-[#344054]">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-md text-black"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block font-medium text-[#344054]">
                  Phone*
                </label>
                <PhoneInput
                  country={"us"}
                  value={form.phone}
                  onChange={handlePhoneChange}
                  inputStyle={{ width: "100%" }}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block font-medium text-[#344054]">
                  Password*
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full px-3 py-2 border rounded-md text-black"
                  required
                />
                <small className="text-gray-500">
                  Must be at least 6 characters.
                </small>
              </div>

              <div className="space-y-1">
                <label className="block font-medium text-[#344054]">
                  Confirm Password*
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full px-3 py-2 border rounded-md text-black"
                  required
                />
              </div>

              <div className="space-y-2">
                <ReCAPTCHA
                  sitekey="6LckNHYqAAAAAL4IPTYdGxaCDl9FCf_1QjgZu9ag"
                  onChange={handleCaptchaChange}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FCEB03] text-[#121619] py-2 rounded-md font-medium hover:bg-[#ebe044] transition-colors"
                disabled={!form.captchaVerified}
              >
                Sign up
              </button>
            </form>
          </div>
          <div className="m-auto">
            <p className="text-[#667085] text-[14px] font-medium text-center mt-3">
              Already have an account?
              <Link to="/login">
                <span className="text-[#FCEB03] cursor-pointer"> Sign in</span>
              </Link>
            </p>
            <p className="text-[#667085] text-[14px] font-medium text-center mt-4">
              By Signing up you agree to our{" "}
              <span className="text-[#FCEB03]">Terms Condition</span> &{" "}
              <span className="text-[#FCEB03]">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
