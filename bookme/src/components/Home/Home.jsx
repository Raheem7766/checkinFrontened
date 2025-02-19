import React, { useEffect, useRef, useState } from "react";
import { IoAirplaneSharp } from "react-icons/io5";
import { MdLocalHotel } from "react-icons/md";
import { FaCrown, FaTimes, FaUmbrellaBeach } from "react-icons/fa";
import { BiBus } from "react-icons/bi";
import { SiSaudia } from "react-icons/si";
import FlightSearch from "./FlightSearchs";
import { FaFlag } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../images/Checkin Logo-02.svg";
import logo from "../../images/Checkin Logo-02.svg";
import HotelSearchs from "./HotelSearchs";
import BusSearchs from "./BusSearchs";
import FlightCenter from "../Contents/FlightContent/FlightCenter";
import HotelCenter from "../Contents/HotelContent/HotelCenter";
import BusCenter from "../Contents/BusContent/BusCenter";
import fly from "../../images/fly5.jpg";
import { CiSettings, CiWallet } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";
import { FaBars } from "react-icons/fa6";

const LandingPage = () => {
  const [activeOption, setActiveOption] = useState("Flights");
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
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

  const handleTabClick = (option) => {
    if (option.route) {
      navigate(option.route);
    } else {
      setActiveOption(option.label);
    }
  };

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

  const options = [
    {
      label: "Flights",
      icon: <IoAirplaneSharp className="-rotate-45 text-[21px]" />,
      content: <FlightSearch />,
      content1: <FlightCenter />,
    },
    {
      label: "Hotels",
      icon: <MdLocalHotel className="text-[26px] w-[30px]" />,
      content: <HotelSearchs />,
      content1: <HotelCenter />,
    },
    {
      label: "Bus",
      icon: <BiBus className="text-[20px]" />,
      content: <BusSearchs />,
      content1: <BusCenter />,
    },
    {
      label: "Visit-Saudia",
      icon: <SiSaudia className="text-[20px]" />,
      route: "/visit-saudi",
    },
    {
      label: "Events",
      icon: <FaUmbrellaBeach className="text-[20px]" />,

      route: "/events",
    },
    {
      label: "Visit-Pakistan",
      icon: <FaFlag className="text-[20px]" />,
      route: "/tours",
    },
  ];
  return (
    <div className="bg-gray-100 w-full h-[100vh] relative">
      <div className="w-full h-[820px] md:h-[720px] lg:h-[620px] xl:h-[600px]">
        <img src={fly} alt="" className="h-full w-full object-cover" />
      </div>
      <nav className="w-full h-[92px] absolute top-0 left-0 flex items-center justify-center">
        <div className="w-[96%] md:w-[88%] h-[55%] flex justify-between pr-4">
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
                  <button className="px-[15px] py-[10px] hidden lg:block text-sm text-[#121619] font-medium hover:bg-[#FCEB03] border border-[#121619] rounded-[5px]">
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
                  <h2 className="hidden md:block text-[14px] font-medium text-[#121619] cursor-pointer hover:text-[#FCEB03]">
                    Help
                  </h2>
                </Link>
                <Link to="/Booking">
                  <h2 className="hidden md:block text-[14px] font-medium text-[#121619] cursor-pointer hover:text-[#FCEB03]">
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
                    <Link to="user/profile">
                      <button className="flex items-center text-[14px] font-normal gap-4 hover:bg-[#F8F9FA] w-full pl-4 py-2">
                        <CiSettings size={22} />
                        Account
                      </button>
                    </Link>
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
              </>
            )}
            <FaBars
              className="text-[26px] block md:hidden cursor-pointer"
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

      <section className="absolute top-[98px] w-full h-auto">
        <div className="w-full md:w-[88%] h-auto bg-white rounded-[20px] m-auto mt-10">
          <div className="w-full h-auto px-4 md:px-8 py-4">
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {options.map((option) => (
                <div
                  key={option.label}
                  className={`h-[43px] w-auto px-2 border-[2px] flex items-center justify-center gap-2 text-[14px] md:text-[16px] lg:text-[18px] font-medium rounded-[40px] cursor-pointer ${
                    activeOption === option.label
                      ? "border-[#FCEB03] bg-[#F9F4AC] text-[#121619]"
                      : "border-[#CCCCCC] text-[#666666]"
                  }`}
                  onClick={() => handleTabClick(option)}
                >
                  {option.icon}
                  {option.label}
                </div>
              ))}
            </div>
            <div className="w-full flex md:hidden justify-start gap-8 overflow-x-auto">
              {options.map((option) => (
                <div key={option.label}>
                  <div
                    className={`h-8 w-8 border border-[#CCCCCC] rounded-[50%] flex items-center justify-center cursor-pointer
                    ${
                      activeOption === option.label
                        ? "border-[#FCEB03] bg-[#FCEB03] text-[#121619]"
                        : "border-[#CCCCCC] text-[#666666]"
                    }
                    `}
                    onClick={() => handleTabClick(option)}
                  >
                    {option.icon}
                  </div>
                  <h2
                    className={`text-[12px] text-center mt-1 ${
                      activeOption === option.label
                        ? " text-[#121619] font-medium"
                        : " text-[#666666]"
                    }`}
                  >
                    {window.innerWidth < 768
                      ? option.label.includes("Visit-Saudia")
                        ? "Saudia"
                        : option.label.includes("Visit-Pakistan")
                        ? "Pakistan"
                        : option.label
                      : option.label}
                  </h2>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-[78%]">
            {options.map((option) => (
              <div
                key={option.label}
                className={`${
                  activeOption === option.label ? "block" : "hidden"
                } w-full h-full `}
              >
                {option.content}
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="w-full">
        {options.map((option) => (
          <div
            key={option.label}
            className={`${activeOption === option.label ? "block" : "hidden"}`}
          >
            {option.content1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
