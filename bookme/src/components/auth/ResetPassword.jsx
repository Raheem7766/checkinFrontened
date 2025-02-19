import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import img from "../../images/pk-removebg-preview.png";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { token } = useParams(); 

  const handleResetPassword = async () => {
    setError("");
    setSuccess("");
    if (!newPassword) {
      setError("Please provide a new password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5001/api/v1/password/reset/${token}`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSuccess("Password reset successfully.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white">
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
      <h2 className="text-[30px] font-semibold text-center text-[#101828]">
        Reset Password
      </h2>
      <p className="text-[15px] font-medium text-[#667085] text-center">
        Set a new password for your account.
      </p>
      <div className="w-max m-auto mt-6 flex flex-col">
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border-2 border-[#ccc] rounded-md p-2 mt-2 w-[354px]"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
        <button
          onClick={handleResetPassword}
          disabled={loading}
          className={`w-[354px] mt-4 py-2 rounded-md font-medium ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#FCEB03]"
          }`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
