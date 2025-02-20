import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Home/Navbar";

export default function Login() {
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setForm({ ...form, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://checkin-frontened.vercel.app/api/v1/login", {
        number: form.phone,
        password: form.password,
      });

      if (response.data.success) {  
        const { token, user, role } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", JSON.stringify(user));
        localStorage.setItem("role", role); // Store role separately

        if (role === "Admin") {
          navigate("/admin/dashboard");
          alert("Admin logged in successfully!");
        } else {
          navigate("/");
          alert("User logged in successfully!");
        }

        // window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response) {
        alert(error.response.data.message || "Login failed. Please try again.");
      } else {
        alert("Login failed. Please check your connection and try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full lg:h-screen bg-[#F9FAFB] flex lg:pt-16 flex-col items-center px-4">
        <h2 className="text-[28px] font-semibold text-center tracking-[0.5px] mt-7">
          Sign in
        </h2>
        <div className="w-full max-w-[370px] pb-10 rounded-lg shadow-sm shh bg-white py-5 space-y-6 mt-3">
          <form onSubmit={handleSubmit} className="space-y-4 px-4">
            <div className="space-y-1">
              <label className="block font-medium text-[#344054]">Phone</label>
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
                Password
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
            </div>

            <Link to="/user/forgot-password">
              <div className="flex justify-start mt-3 text-[#121619] text-sm font-medium cursor-pointer">
                <span>Forgot Password?</span>
              </div>
            </Link>

            <button
              type="submit"
              className="w-full bg-[#FCEB03] text-[#121619] py-2 rounded-md font-medium hover:bg-[#ded441] transition-colors"
            >
              Sign in
            </button>

            <div className="flex flex-col space-y-2">
              <button className="flex items-center justify-center bg-white border border-gray-300 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                <img
                  src="https://th.bing.com/th/id/OIP.ipH314wG38IzOCk4i0MmLAHaHa?w=168&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                  alt="Google icon"
                  className="w-6 h-6 mr-2"
                />
                Sign in with Google
              </button>
              <button className="flex items-center justify-center bg-white border border-gray-300 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                  alt="Facebook icon"
                  className="w-6 h-6 mr-2"
                />
                Sign in with Facebook
              </button>
            </div>
          </form>
        </div>
        <p className="text-[#667085] text-[14px] font-medium text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="text-[#121619]">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}
