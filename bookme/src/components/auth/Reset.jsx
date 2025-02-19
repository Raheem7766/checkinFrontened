import React, { useState } from "react";
import img from "../../images/logo.jpg";
import key from "../../images/key.svg";
import { useLocation, useNavigate } from "react-router-dom";

export default function Reset() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const number = location.state?.number; 

  const handleResetPassword = async () => {
    setError("");
    setSuccess("");
    if (!otp || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const resetResponse  = await fetch(
        "http://localhost:5001/api/v1/password/reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ number, otp, newPassword }),
        }
      );

      const resetData = await resetResponse.json();
      if (!resetResponse.ok) {
        setError(resetData.message || "Failed to reset password.");
        return;
      }

      // Step 2: Automatically log the user in
      const loginResponse = await fetch("http://localhost:5001/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number, password: newPassword }),
      });

      const loginData = await loginResponse.json();
      if (loginResponse.ok) {
        localStorage.setItem("authToken", loginData.token);
        setSuccess("Password reset and login successful!");

        navigate("/");
      } else {
        setError("Failed to reset password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full fixed inset-0 z-10 h-full pb-4 bg-white mt-[34px]">
      <div className="w-full bg-white h-[70px] flex justify-between items-center px-5">
        <img
          src={img}
          alt="SVG"
          className="mt-[-3px] img h-[30px] w-[30px]"
          onClick={() => (window.location.href = "/")}
        />
        <button className="h-[42px] w-[75px] bg-[#FCEB03] rounded-[10px] text-white font-medium hidden md:block">
          Help
        </button>
      </div>
      <div className="w-full flex justify-center pt-[72px]">
        <img src={key} alt="" />
      </div>
      <div>
        {/* UI for Reset Password */}
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />     
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleResetPassword} disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </div>
    </div>
  );
}
