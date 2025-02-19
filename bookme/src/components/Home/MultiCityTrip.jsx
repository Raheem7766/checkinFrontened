import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import React, { useState, useEffect, useRef } from "react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MultiCityTrip = ({
  tripType,
  toCity,
  renderSelectedCity,
  airports,
  isCityDisabled,
  handleSearch,
}) => {
  const [formSections, setFormSections] = useState([
    { fromCity: "", toCity: "", selectedDate: null },
  ]);
  const [dropdownStates, setDropdownStates] = useState(
    formSections.map(() => ({ from: false, to: false }))
  );
  const [calendarStates, setCalendarStates] = useState(
    formSections.map(() => ({ show: false, currentMonth: new Date() }))
  );
  const calendarRefs = useRef([]);

  useEffect(() => {
    if (toCity) {
      const updatedSections = [...formSections];
      updatedSections[0].fromCity = toCity;
      setFormSections(updatedSections);
    }
  }, [toCity]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRefs.current) {
        calendarRefs.current.forEach((ref, index) => {
          if (ref && !ref.contains(event.target)) {
            const newCalendarStates = [...calendarStates];
            newCalendarStates[index].show = false;
            setCalendarStates(newCalendarStates);
          }
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [calendarStates]);

  const formatDate = (date) => {
    if (!date) return "Select Date";
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getDayName = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const generateDates = (currentMonth) => {
    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );

    const startingDay = firstDay.getDay() || 7;
    const dates = Array(startingDay - 1).fill(null);

    for (let i = 1; i <= lastDay.getDate(); i++) {
      dates.push(i);
    }

    return dates;
  };

  const isDateDisabled = (day, currentMonth) => {
    if (!day) return true;
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    return date < new Date(new Date().setHours(0, 0, 0, 0));
  };

  const handleDateClick = (index, day) => {
    if (!day) return;

    const updatedSections = [...formSections];
    const date = new Date(
      calendarStates[index].currentMonth.getFullYear(),
      calendarStates[index].currentMonth.getMonth(),
      day
    );
    updatedSections[index].selectedDate = date;
    setFormSections(updatedSections);

    const newCalendarStates = [...calendarStates];
    newCalendarStates[index].show = false;
    setCalendarStates(newCalendarStates);
  };

  const changeMonth = (index, delta) => {
    const newCalendarStates = [...calendarStates];
    const newDate = new Date(calendarStates[index].currentMonth);
    newDate.setMonth(newDate.getMonth() + delta);
    newCalendarStates[index].currentMonth = newDate;
    setCalendarStates(newCalendarStates);
  };

  const handleAddSection = () => {
    const lastSection = formSections[formSections.length - 1];
    setFormSections([
      ...formSections,
      { fromCity: lastSection.toCity || "", toCity: "", selectedDate: null },
    ]);
    setDropdownStates([...dropdownStates, { from: false, to: false }]);
    setCalendarStates([
      ...calendarStates,
      { show: false, currentMonth: new Date() },
    ]);
  };

  const toggleCalendar = (index) => {
    const newCalendarStates = calendarStates.map((state, idx) => ({
      ...state,
      show: idx === index ? !state.show : false,
    }));
    setCalendarStates(newCalendarStates);
  };

  const handleDropdownToggle = (index, type) => {
    const newDropdownStates = dropdownStates.map((state, idx) => ({
      from: idx === index && type === "from" ? !state.from : false,
      to: idx === index && type === "to" ? !state.to : false,
    }));
    setDropdownStates(newDropdownStates);
  };

  const handleCitySelect = (index, type, city) => {
    const updatedSections = [...formSections];

    if (type === "from") {
      updatedSections[index].fromCity = city;
    } else {
      updatedSections[index].toCity = city;
      if (index < updatedSections.length - 1) {
        updatedSections[index + 1].fromCity = city;
      }
    }
    setFormSections(updatedSections);

    const newDropdownStates = [...dropdownStates];
    newDropdownStates[index] = {
      ...newDropdownStates[index],
      [type]: false,
    };
    setDropdownStates(newDropdownStates);
  };

  const handleDeleteSection = (index) => {
    setFormSections(formSections.filter((_, idx) => idx !== index));
    setDropdownStates(dropdownStates.filter((_, idx) => idx !== index));
    setCalendarStates(calendarStates.filter((_, idx) => idx !== index));
  };

  return (
    <>
      {tripType === "Multi City" && (
        <div className="px-2 lg:px-2 md:pt-6">
          {formSections.map((section, index) => (
            <div
              key={index}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-4 md:mb-10"
            >
              <div className="relative ">
                <label className="block text-[15px] font-medium text-[#666666]">
                  From
                </label>
                <div
                  className="w-full h-[75px] pb-0 md:pb-[5px] overflow-hidden border-b border-[#9D9595] flex items-center cursor-pointer"
                  onClick={() => handleDropdownToggle(index, "from")}
                >
                  <div>
                    {section.fromCity ? (
                      renderSelectedCity(section.fromCity)
                    ) : (
                      <div className="flex items-center gap-1 max-w-[200px]">
                        <span className="text-[#333333] text-[16px] md:text-[30px] truncate overflow-hidden whitespace-nowrap font-medium">
                          Select From City
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {dropdownStates[index].from && (
                  <div className="absolute max-h-[300px] w-[305px] md:w-[380px] ml-0 lg:ml-[-160px] md:ml-0 mt-1 overflow-y-auto bg-white border rounded-lg shadow-lg z-10">
                    {airports.map((city) => (
                      <div
                        key={city.code}
                        className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 
                          ${
                            isCityDisabled(city, "from")
                              ? "opacity-50 cursor-not-allowed hover:bg-white"
                              : ""
                          }`}
                        onClick={() =>
                          !isCityDisabled(city, "from") &&
                          handleCitySelect(index, "from", city)
                        }
                      >
                        <MdFlightTakeoff size={16} className="text-gray-400" />
                        <div>
                          <div className="font-medium">{city.name}</div>
                          <div className="text-sm text-gray-500">
                            {city.city}
                          </div>
                        </div>
                        <div className="ml-auto text-gray-400">{city.code}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative ">
                <label className="block text-[15px] font-medium text-[#666666]">
                  To
                </label>
                <div
                  className="w-full h-[75px] pb-0 md:pb-[5px] overflow-hidden border-b border-[#9D9595] flex items-center cursor-pointer"
                  onClick={() => handleDropdownToggle(index, "to")}
                >
                  <div>
                    {section.toCity ? (
                      renderSelectedCity(section.toCity)
                    ) : (
                      <div className="flex items-center gap-1 max-w-[200px]">
                        <span className="text-[#333333] text-[20px] md:text-[30px] truncate overflow-hidden whitespace-nowrap font-medium">
                          Select To City
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {dropdownStates[index].to && (
                  <div className="absolute max-h-[300px] w-[305px] md:w-[380px] ml-[-160px] md:ml-0 mt-1 overflow-y-auto bg-white border rounded-lg shadow-lg z-10">
                    {airports.map((city) => (
                      <div
                        key={city.code}
                        className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 
                          ${
                            isCityDisabled(city, "to")
                              ? "opacity-50 cursor-not-allowed hover:bg-white"
                              : ""
                          }`}
                        onClick={() =>
                          !isCityDisabled(city, "to") &&
                          handleCitySelect(index, "to", city)
                        }
                      >
                        <MdFlightLand size={16} className="text-gray-400" />
                        <div>
                          <div className="font-medium">{city.name}</div>
                          <div className="text-sm text-gray-500">
                            {city.city}
                          </div>
                        </div>
                        <div className="ml-auto text-gray-400">{city.code}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div
                ref={(el) => (calendarRefs.current[index] = el)}
                className="relative "
              >
                <div onClick={() => toggleCalendar(index)}>
                  <label className="flex gap-[6px] text-[15px] font-medium text-[#666666]">
                    Departure Date <ChevronDown />
                  </label>
                  <div className="w-full h-[75px] border-b border-[#9D9595] flex items-center justify-between cursor-default">
                    <div>
                      <div className="flex items-center gap-1 max-w-[200px]">
                        <span className="text-[#333333] text-[20px] md:text-[26px] truncate overflow-hidden whitespace-nowrap font-medium">
                          {formatDate(section.selectedDate)}
                        </span>
                      </div>
                      <span className="text-[#333333] max-w-[200px] text-[15px] font-normal truncate overflow-hidden whitespace-nowrap">
                        {getDayName(section.selectedDate)}
                      </span>
                    </div>
                  </div>
                </div>

                {calendarStates[index].show && (
                  <div className="absolute top-20 left-2 md:left-0 w-72 z-10 bg-white border rounded-lg shadow-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-semibold">
                        {months[calendarStates[index].currentMonth.getMonth()]}{" "}
                        {calendarStates[index].currentMonth.getFullYear()}
                      </div>
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => changeMonth(index, -1)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <ChevronLeft className="h-5 w-5 text-gray-500" />
                        </button>
                        <button
                          onClick={() => changeMonth(index, 1)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day) => (
                          <div key={day} className="text-xs text-gray-500">
                            {day}
                          </div>
                        )
                      )}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {generateDates(calendarStates[index].currentMonth).map(
                        (day, dayIndex) => (
                          <button
                            key={dayIndex}
                            onClick={() => handleDateClick(index, day)}
                            disabled={isDateDisabled(
                              day,
                              calendarStates[index].currentMonth
                            )}
                            className={`
                            p-2 text-sm rounded-md
                            ${!day ? "invisible" : ""}
                            ${
                              isDateDisabled(
                                day,
                                calendarStates[index].currentMonth
                              )
                                ? "text-gray-300 cursor-not-allowed"
                                : "hover:bg-gray-100"
                            }
                            ${
                              section.selectedDate &&
                              day === section.selectedDate.getDate() &&
                              calendarStates[index].currentMonth.getMonth() ===
                                section.selectedDate.getMonth()
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : ""
                            }
                          `}
                          >
                            {day}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>

              {index === formSections.length - 1 && (
                <button
                  onClick={() => handleDeleteSection(index)}
                  className="h-[58px] w-[233px] hidden md:block px-4 bg-red-500 text-white font-semibold rounded-[5px] shadow hover:bg-red-600 transition duration-200"
                >
                  Remove
                </button>
              )}

              {index === formSections.length - 1 && (
                <button
                  onClick={handleAddSection}
                  className=" h-[58px] w-[233px] hidden md:block rounded-[5px] text-[18px] font-semibold text-[#2563EB] border border-blue-600"
                >
                  + Add Another City
                </button>
              )}
              {index === formSections.length - 1 && (
                <button
                  onClick={handleAddSection}
                  className="ml-10 md:ml-[36px] mt-8 md:mt-0 h-max w-max block px-2 py-2 md:hidden rounded-[20px] text-[12px] font-semibold text-[#121619] border border-[#121619]"
                >
                  Add City
                </button>
              )}
            </div>
          ))}
          <div className="flex justify-start md:justify-end items-end">
            <button
              onClick={handleSearch}
              className="bg-[#121619] md:hidden block w-full text-white px-5 py-4 rounded-md font-medium hover:text-[#FCEB03]"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MultiCityTrip;
