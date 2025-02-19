import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
import PhoneInput from "react-phone-input-2";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    try {
      const userInfoString = localStorage.getItem("userInfo");
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        setFormData({
          name: userInfo.name || "",
          email: userInfo.email || "",
          phone: userInfo.number || "",
          dateOfBirth: userInfo.dateOfBirth || "",
        });
      }
    } catch (error) {
      console.error("Error loading user info:", error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUserInfo = {
        ...JSON.parse(localStorage.getItem("userInfo") || "{}"),
        ...formData,
      };
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleCancel = () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        setFormData({
          name: userInfo.name || "",
          email: userInfo.email || "",
          phone: userInfo.phone || "",
          dateOfBirth: userInfo.dateOfBirth || "",
        });
      }
    } catch (error) {
      console.error("Error resetting form:", error);
    }
  };
  return (
    <div>
      <Navbar />

      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Personal info
        </h2>
        <p className="text-gray-600 mb-6">Your personal details here.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone number
              </label>
              <div className="flex">
                <PhoneInput
                  country={"pk"}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="flex-1 w-full border border-gray-300 "
                  containerClass="w-full"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Date of birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-[#FCEB03] text-[#121619]"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
