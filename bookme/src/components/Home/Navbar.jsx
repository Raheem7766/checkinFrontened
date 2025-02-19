import React, { useEffect, useRef, useState } from "react";
import logo from "../../images/pk-removebg-preview.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CiSettings, CiWallet } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { FaBars, FaCrown, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/sign-up";

  const toggleOverlay = () => setIsOverlayOpen(!isOverlayOpen);

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setIsUserAuthenticated(true);
      setUserName(storedName || "");
      setUserEmail(storedEmail || "");
    } else {
      setIsUserAuthenticated(false);
      setUserName("");
      setUserEmail("");
    }
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const capitalizeFirstLetter = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5001/api/v1/logout");

      localStorage.removeItem("token");

      setIsUserAuthenticated(false);

      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div>
      <nav className="w-full h-[92px] bg-[#121619] flex items-center justify-center">
        <div className="w-[96%] md:w-[88%] h-[55%] flex justify-between">
          <div className="h-full w-[200px] flex items-center cursor-pointer">
            <img
              src={logo}
              alt="Logo"
              onClick={() => (window.location.href = "/")}
            />
          </div>
          <div className="h-full w-full flex items-center justify-end gap-2">
            <div className="hidden md:block lg:block lg:px-6 md:px-4 py-2 bg-white rounded-[20px] font-semibold border border-white">
              VISA CONSULTATION
            </div>
            {!isAuthPage && !isUserAuthenticated && (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <button className="px-[15px] py-[10px] text-sm text-white font-medium hover:bg-[#FCEB03] border border-[#FCEB03] rounded-[5px]">
                    Login
                  </button>
                </Link>
                <button className="hidden md:block px-[15px] py-[10px] text-sm text-[#121619] bg-[#FCEB03] hover:bg-[#eee242] font-medium rounded-[5px]">
                  Signup
                </button>
              </div>
            )}
            {isUserAuthenticated && (
              <>
                <Link to="/help">
                  <h2 className="hidden md:block text-[14px] font-medium text-[#FCEB03] cursor-pointer hover:text-white">
                    Help
                  </h2>
                </Link>
                <Link to="/Booking">
                  <h2 className="hidden md:block text-[14px] font-medium text-[#FCEB03] cursor-pointer hover:text-white">
                    My Bookings
                  </h2>
                </Link>
                <button
                  onClick={handleProfileClick}
                  className="hidden md:block h-[32px] w-[32px] bg-[#FCEB03] rounded-[50%] text-[#121619] font-medium"
                >
                  {capitalizeFirstLetter(userName || "R")}
                </button>
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-5 top-10 mt-10 pb-4 border-t-2 w-[246px] bg-white rounded-lg shadow-lg pt-2 z-10"
                  >
                    <div className="pl-4">
                      <p className="text-[14px] font-semibold">{userName}</p>
                      <p className="text-[13px] font-normal text-[#667085]">
                        {userEmail}
                      </p>
                    </div>
                    <button className="flex items-center text-[14px] font-normal gap-4 hover:bg-[#F8F9FA] w-full pl-4 py-2 mt-4">
                      <CiWallet size={22} />
                      My Wallet
                    </button>
                    <button className="flex items-center text-[14px] font-normal gap-4 hover:bg-[#F8F9FA] w-full pl-4 py-2">
                      <CiSettings size={22} />
                      Account
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-[14px] font-normal gap-4 hover:bg-[#F8F9FA] w-full pl-4 py-2"
                    >
                      <IoIosLogOut size={22} />
                      Logout
                    </button>
                    <button className="w-[90%] h-[40px] ml-[5%] mt-2 rounded-[10px] border-[1px] border-[#FCEB03] flex items-center pl-2 gap-2 text-[#121619] hover:bg-[#FCEB03] hover:text-[#121619]">
                      <div className="w-[25px] h-[25px] bg-[#FCEB03] rounded-full flex items-center justify-center text-[#121619]">
                        <FaCrown />
                      </div>
                      <p className="text-[14px] font-semibold">
                        Subscribe Checkin
                      </p>
                    </button>
                  </div>
                )}
                {isAuthPage && (
                  <Link to="/sign-up">
                    <button className="h-[42px] w-[75px] bg-[#FCEB03] rounded-[10px] text-white font-medium hidden md:block">
                      Help
                    </button>
                  </Link>
                )}
                {!isAuthPage && !isUserAuthenticated && (
                  <>
                    <Link to="/help">
                      <h2 className="text-[14px] font-medium text-[#667085] cursor-pointer hover:text-[#1476D1] hidden md:block">
                        Help
                      </h2>
                    </Link> 
                    <Link to="/login">
                      <h2 className="text-[14px] font-medium text-[#667085] cursor-pointer hover:text-[#1476D1]">
                        Login
                      </h2>
                    </Link>
                  </>
                )}
              </>
            )}
            <FaBars
              className="text-[26px] block md:hidden cursor-pointer text-white"
              onClick={toggleOverlay}
            />
            {isOverlayOpen && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50 md:hidden">
                <div className="bg-white w-[100%] h-[50%] p-6 pt-14 rounded-lg text-center">
                  <FaTimes
                    className="text-2xl text-gray-600 cursor-pointer absolute top-4 right-4"
                    onClick={toggleOverlay}
                  />
                  {!isUserAuthenticated ? (
                    <>
                      <Link to="/consultation">
                        <button className="w-full px-4 py-2 mb-4 bg-[#FCEB03] text-black font-medium rounded">
                          VISA CONSULTATION
                        </button>
                      </Link>
                      <Link to="/login">
                        <li className="w-full px-2 mb-2 text-black text-start font-medium rounded">
                          Login
                        </li>
                      </Link>
                      <Link to="/signup">
                        <li className="w-full px-2 mb-2 text-black text-start font-medium rounded">
                          Signup
                        </li>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/consultation">
                        <button className="w-full px-4 py-2 mb-4 bg-[#FCEB03] text-black font-medium rounded">
                          VISA CONSULTATION
                        </button>
                      </Link>
                      <Link to="/help">
                        <li className="w-full px-2 mb-2 text-black text-start font-medium rounded">
                          Help
                        </li>
                      </Link>
                      <Link to="/booking">
                        <li className="w-full px-2 mb-2 text-black text-start font-medium rounded">
                          My Bookings
                        </li>
                      </Link>
                      <li className="w-full px-2 mb-2 text-black text-start font-medium rounded">
                        My Wallet
                      </li>
                      <li className="w-full px-2 mb-2 text-black text-start font-medium rounded">
                        Account
                      </li>
                      <li
                        className="w-full px-2 mb-2 text-black text-start font-medium rounded"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
