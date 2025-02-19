import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { hotelData } from "../../Data/Data";
import { Minus, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Home/Footer";
import loader from "../../../images/giff.gif";
import Navbar from "../../Home/Navbar";

export default function HotelSearchData() {
  const [searchData, setSearchData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortedData, setSortedData] = useState(hotelData);
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState("Presidential Suite");
  const [roomCounts, setRoomCounts] = useState({
    "Presidential Suite": 0,
    "Deluxe Room": 0,
    "Executive Room": 0,
  });
  const navigate = useNavigate();
  const totalRooms = Object.values(roomCounts).reduce(
    (sum, count) => sum + count,
    0
  );
  useEffect(() => {
    const loadData = () => {
      const data = localStorage.getItem("hotelSearchData");
      if (data) {
        setSearchData(JSON.parse(data));
      }
      setIsLoading(false);
      console.log(data);
    };

    const loadingTimeout = setTimeout(loadData, 6 * 1000);
    console.log(loadingTimeout);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const parsePrice = (price) => {
    return parseInt(price.replace(/,/g, ""), 10);
  };

  const sortHotels = (order) => {
    const sorted = [...hotelData].sort((a, b) => {
      const priceA = parsePrice(a.price);
      const priceB = parsePrice(b.price);

      if (order === "lowToHigh") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
    setSortedData(sorted);
  };

  const handleStarChange = (star) => {
    setSelectedStars((prevSelectedStars) => {
      if (prevSelectedStars.includes(star)) {
        return prevSelectedStars.filter((s) => s !== star);
      } else {
        return [...prevSelectedStars, star];
      }
    });
  };

  const filterByStars = (hotels) => {
    if (selectedStars.length === 0) return hotels;

    return hotels.filter((hotel) => selectedStars.includes(hotel.count));
  };

  const handleSortChange = (e) => {
    const newOrder = e.target.value;
    setSortOrder(newOrder);
    sortHotels(newOrder);
  };

  const filteredHotels = filterByStars(sortedData);

  const handleBookMeClick = (hotel) => {
    setSelectedHotel(hotel);
  };

  const customScrollbarStyles = `
  .overflow-y-auto::-webkit-scrollbar {
    width: 8px;
  }
  .overflow-y-auto::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }
  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

  const handleClick = (room) => {
    setSelectedRoom(room);
  };

  const incrementCount = (room) => {
    setRoomCounts((prevCounts) => {
      if (prevCounts[room] < 2) {
        return { ...prevCounts, [room]: prevCounts[room] + 1 };
      }
      return prevCounts;
    });
  };

  const decrementCount = (room) => {
    setRoomCounts((prevCounts) => {
      if (prevCounts[room] > 0) {
        return { ...prevCounts, [room]: prevCounts[room] - 1 };
      }
      return prevCounts;
    });
  };

  const rooms = {
    "Presidential Suite": {
      price: "50,000",
      maxGuests: 4,
      img: hotelData[0]?.img1 || "",
      address: ".",
    },
    "Deluxe Room": {
      price: "22,000",
      maxGuests: 2,
      img: hotelData[1]?.img2 || "",
      address: "Ayubia, Abbottabad, Khyber Pakhtunkhwa",
    },
    "Executive Room": {
      price: "27,000",
      maxGuests: 2,
      img: hotelData[2]?.img3 || "",
      name: "GreenPak Hotel Ayubia",
    },
  };
  const calculateTotalPrice = () => {
    let total = 0;
    Object.keys(roomCounts).forEach((room) => {
      const roomPrice = parseInt(rooms[room].price.replace(/,/g, ""), 10);
      total += roomCounts[room] * roomPrice;
    });
    return total.toLocaleString();
  };

  const handleContinue = () => {
    const isAnyRoomSelected = Object.values(roomCounts).some(
      (count) => count > 0
    );

    if (!isAnyRoomSelected) {
      alert("Please add a room count before continuing.");
      return;
    }

    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
      alert("You need to log in to continue.");
      navigate("/login");
      return;
    }

    const safeHotelData = {
      name: hotelData?.name || "",
    };

    const safeSelectedHotel = {
      id: selectedHotel?.id || "",
      name: selectedHotel?.name || "",
      address: selectedHotel?.address || "",
      img: selectedHotel?.img || "",
      count: selectedHotel?.count || "",
    };

    const data = {
      city,
      returnDate,
      departureDate,
      travelers,
      selectedRoom,
      roomCounts,
      totalPrice: calculateTotalPrice(),
      hotelData: safeHotelData,
      selectedHotel: safeSelectedHotel,
    };
    navigate("/HotelCheckout", { state: data });
  };

  if (isLoading) {
    return (
      <div>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src={loader} alt="Loading..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (!searchData) {
    return <div>No search data found</div>;
  }

  const { city, departureDate, returnDate, travelers, room } = searchData;
  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src={loader} alt="Loading..." />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="w-full h-auto bg-[#FCEB03] hp px-4 sm:px-6 md:px-8 lg:px-[90px] py-5">
            <h1 className="text-xl md:text-2xl lg:text-[30px] font-semibold mt-3">
              Search for Hotels
            </h1>

            <p className="text-base md:text-lg lg:text-[18.5px] font-normal mt-2 lg:mt-[8px]">
              Find the best and most affordable hotel rooms across Pakistan
            </p>

            <div className="w-full mt-3 lg:mt-[10px] rounded-lg lg:h-[45px] bg-white">
              <div className="flex flex-col lg:flex-row lg:justify-between">
                <div className="p-3 lg:w-[91%] bg-black text-white rounded flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-[6px]">
                  <h3 className="text-sm lg:text-[15px] font-normal">
                    {searchData?.city}
                  </h3>

                  <div className="lg:border-l lg:border-r border-black lg:px-[6px] text-sm lg:text-[16px] font-normal">
                    {searchData?.departureDate} - {searchData?.returnDate}
                  </div>

                  <div className="flex flex-wrap gap-1 text-sm lg:text-[15px] font-normal">
                    <p>{searchData.room} room(s),</p>
                    {Object.entries(searchData?.travelers).map(
                      ([key, value]) => {
                        if (value > 0) {
                          return (
                            <p key={key}>
                              {value}{" "}
                              {key.charAt(0).toUpperCase() + key.slice(1)}(s)
                            </p>
                          );
                        }
                        return null;
                      }
                    )}
                  </div>
                </div>

                <button className="mt-2 hidden lg:mt-0 p-2 lg:p-0 w-full lg:w-[8.5%] bg-black text-white hidden rounded transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="w-full h-auto pb-6 bg-[#F2F4F7] hp flex flex-col lg:flex-row px-4 sm:px-6 md:px-8 lg:px-[90px]">
            <div className="w-full lg:w-[16.7%] bg-white px-[10px] pt-[11px]">
              <div className="pb-4">
                <h3 className="text-[14px] font-medium text-[#101828]">
                  Rating
                </h3>
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-1 gap-1 lg:gap-0">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center mt-1">
                      <input
                        type="checkbox"
                        id={`star${star}`}
                        className="h-4 w-4 mt-2"
                        onChange={() => handleStarChange(star)}
                      />
                      <div className="ml-1 flex">
                        {[...Array(star)].map((_, i) => (
                          <FaStar
                            key={i}
                            color="#FCEB03"
                            size={20}
                            className="pt-1"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[83.3%] h-full lg:px-5">
              <div className="w-full mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <h3 className="text-[14px] font-semibold text-[#101828]">
                  {filteredHotels.length} Hotels{" "}
                  <span className="font-medium">found</span>
                </h3>
                <select
                  onChange={handleSortChange}
                  value={sortOrder}
                  className="w-full sm:w-[250px] lg:w-[23.5%] h-[42px] outline-none rounded-[5px] border-[2px] border-[#D0D5DD] px-2 text-[15px]"
                >
                  <option value="lowToHigh">
                    Sort by: Price - Low to high
                  </option>
                  <option value="highToLow">
                    Sort by: Price - High to low
                  </option>
                </select>
              </div>

              <div className="w-full h-auto mt-[14px]">
                {filteredHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="w-full h-auto lg:h-[266px] mb-4 bg-white rounded-[10px] border-[2px] border-[#D0D5DD]"
                  >
                    <div className="w-full lg:h-[74%] border-b-[2px] border-[#D0D5DD] flex flex-col lg:flex-row gap-5 px-4 sm:px-5 py-[14px]">
                      <div className="h-[200px] lg:h-[97%] w-full lg:w-[23.3%]">
                        <img
                          src={hotel.img}
                          alt={hotel.name}
                          className="h-full w-full object-cover rounded-[10px]"
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                          {hotel.name}
                        </h2>
                        <h3 className="text-[14px] font-medium text-[#667085] mt-[-2px]">
                          {hotel.address}
                        </h3>
                        <div className="flex mt-3 ml-[2px]">
                          {[...Array(hotel.count)].map((_, i) => (
                            <FaStar
                              key={i}
                              color="#FCEB03"
                              size={20}
                              className="pt-1"
                            />
                          ))}
                          <h3 className="text-[14px] font-medium text-[#667085] ml-[6px]">
                            {hotel.count}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-auto lg:h-[24.5%] flex flex-col sm:flex-row items-center justify-end py-4 lg:py-0 px-4 sm:px-5 gap-4">
                      <h2 className="text-[18px] font-semibold text-[#101828]">
                        Rs {hotel.price} /{" "}
                        <span className="text-[14px] font-medium text-[#667085] mt-[-2px]">
                          Night
                        </span>
                      </h2>
                      <button
                        onClick={() => handleBookMeClick(hotel)}
                        className="h-[42px] lg:h-[65%] w-full sm:w-[120px] lg:w-[9%] bg-[#FCEB03] rounded-[5px] font-medium text-[14px]"
                      >
                        Bookme
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {selectedHotel && (
            <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-50">
              <div className="relative h-full w-full bg-[#F2F4F7] lg:w-[763px] transition-all duration-300">
                <div className="flex h-[68px] w-full items-center justify-between bg-white px-4 lg:px-[22px] lg:pr-3">
                  <h2 className="text-base font-semibold text-[#101828] lg:text-[18px]">
                    Hotel Preview
                  </h2>
                  <X
                    color="#7F7F7F"
                    onClick={() => setSelectedHotel(null)}
                    className="cursor-pointer"
                  />
                </div>

                <div className="h-[calc(100vh-100px)] overflow-y-auto">
                  <style>{customScrollbarStyles}</style>

                  <div className="mx-auto mt-4 w-[94%] rounded-[5px] border border-[#D0D5DD] bg-white lg:h-[207px] p-4">
                    <div className="flex flex-col lg:flex-row lg:h-[76%] gap-4 lg:gap-5 lg:py-[13px] lg:pt-[0px]">
                      <div className="w-full lg:w-[22.5%] h-48 lg:h-full">
                        <img
                          src={selectedHotel.img}
                          alt={selectedHotel.name}
                          className="h-full w-full rounded-[10px] object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-lg lg:text-[18px] font-semibold text-[#101828] mt-2 lg:mt-[6px] tracking-[0.3px]">
                          {selectedHotel.name}
                        </h2>
                        <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] mt-1 lg:mt-[-2px]">
                          {selectedHotel.address}
                        </h3>
                        <div className="flex mt-3 ml-[2px]">
                          {[...Array(selectedHotel.count)].map((_, i) => (
                            <FaStar
                              key={i}
                              color="#FCEB03"
                              size={20}
                              className="pt-1"
                            />
                          ))}
                          <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] ml-[6px]">
                            {selectedHotel.count}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 w-full lg:w-[95%] border-t border-[#D0D5DD] flex flex-wrap lg:flex-nowrap items-center gap-4 px-2 py-3 lg:pl-[6px]">
                      <h3 className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-[0.4px]">
                        Free Breakfast
                      </h3>
                      <h3 className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-[0.4px]">
                        Free Wifi
                      </h3>
                      <h3 className="text-sm lg:text-[14px] font-medium text-[#212529] tracking-[0.4px]">
                        Free Parking
                      </h3>
                    </div>
                  </div>

                  <div className="mx-auto mt-4 w-[94%] rounded-[5px] border border-[#D0D5DD] bg-white p-4 lg:px-5 lg:pt-[10px]">
                    <h2 className="text-lg lg:text-[18px] font-semibold text-[#101828] tracking-[0.4px]">
                      Images
                    </h2>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {[
                        selectedHotel.img,
                        selectedHotel.img1,
                        selectedHotel.img2,
                        selectedHotel.img3,
                        selectedHotel.img4,
                        selectedHotel.img5,
                        selectedHotel.img6,
                        selectedHotel.img7,
                      ].map((img, index) => (
                        <div key={index} className="h-[162px]">
                          <img
                            src={img}
                            alt={`${selectedHotel.name} ${index + 1}`}
                            className="h-full w-full rounded-[15px] object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mx-auto mt-4 w-[94%] rounded-[5px] border border-[#D0D5DD] bg-white p-4 lg:px-5 lg:pt-[10px]">
                    <h2 className="text-lg lg:text-[18px] font-semibold text-[#101828] tracking-[0.4px]">
                      Rooms
                    </h2>
                    <div className="flex w-full overflow-x-auto whitespace-nowrap scrollbar-none border-b border-[#D0D5DD]">
                      <div className="flex min-w-full">
                        {[
                          "Presidential Suite",
                          "Deluxe Room",
                          "Executive Room",
                        ].map((room) => (
                          <div
                            key={room}
                            className={`min-w-[200px] sm:min-w-0 sm:flex-1 cursor-pointer border-b-2 p-4 text-center text-sm lg:text-[14px] font-medium transition-all duration-200 hover:bg-gray-50 ${
                              selectedRoom === room
                                ? "bg-[#F5FAFF] border-[#1476D1] text-[#19548B]"
                                : "border-transparent hover:border-gray-200"
                            }`}
                            onClick={() => handleClick(room)}
                          >
                            {room}
                          </div>
                        ))}
                      </div>
                    </div>

                    {Object.keys(rooms).map((room) =>
                      selectedRoom === room ? (
                        <div key={room} className="w-full pt-6 pb-6">
                          <div className="h-[162px] w-full sm:w-1/2 lg:w-[24.4%]">
                            <img
                              src={rooms[selectedRoom].img}
                              alt={selectedHotel.name}
                              className="h-full w-full rounded-[15px] object-cover"
                            />
                          </div>
                          <div className="mt-4 rounded-[10px] border border-[#D0D5DD]">
                            <div className="border-b border-[#D0D5DD] p-4">
                              <h2 className="text-lg lg:text-[18px] font-semibold text-[#101828]">
                                Package 1
                              </h2>
                            </div>
                            <div className="p-4 flex flex-col lg:flex-row">
                              <div className="lg:w-1/2 space-y-2">
                                <h3 className="text-sm lg:text-[14px] font-medium">
                                  Bed Type:{" "}
                                  <span className="font-bold">{room}</span>
                                </h3>
                                <h3 className="text-sm lg:text-[14px] font-medium">
                                  Max Guest:{" "}
                                  <span className="font-bold">
                                    {rooms[room].maxGuests}
                                  </span>
                                </h3>
                                <h3 className="text-sm lg:text-[14px] font-medium">
                                  Available Rooms:{" "}
                                  <span className="font-bold">1</span>
                                </h3>
                              </div>
                              <div className="mt-4 lg:mt-0 lg:w-1/2 flex flex-col items-end">
                                <h2 className="text-lg lg:text-[18px] font-semibold">
                                  Rs {rooms[room].price}
                                </h2>
                                <p className="text-sm lg:text-[14px] font-medium">
                                  1 Room(s) / 1 Night(s)
                                </p>
                                <div className="mt-3 flex h-[45px] w-full sm:w-[37%] rounded-[10px] border border-[#D2D2D2]">
                                  <button
                                    className="flex-1 border-r border-[#D2D2D2] flex items-center justify-center"
                                    onClick={() => decrementCount(room)}
                                  >
                                    <Minus size={18} />
                                  </button>
                                  <div className="flex-1 flex items-center justify-center border-r border-[#D2D2D2]">
                                    {roomCounts[room]}
                                  </div>
                                  <button
                                    className="flex-1 flex items-center justify-center"
                                    onClick={() => incrementCount(room)}
                                  >
                                    <Plus size={18} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null
                    )}
                  </div>

                  <div className="mx-auto mt-4 w-[94%] rounded-[5px] border border-[#D0D5DD] bg-white p-4 lg:px-5">
                    <h2 className="text-lg lg:text-[18px] font-semibold text-[#101828] tracking-[0.4px]">
                      Amenities
                    </h2>
                    <div className="mt-4">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        <li className="text-sm lg:text-[14px] font-medium">
                          Parking
                        </li>
                        <li className="text-sm lg:text-[14px] font-medium">
                          Outdoor
                        </li>
                        <li className="text-sm lg:text-[14px] font-medium">
                          24 Hours Electricity
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mx-auto mt-4 w-[94%] rounded-[5px] border border-[#D0D5DD] bg-white p-4 lg:px-5">
                    <h2 className="text-lg lg:text-[18px] font-semibold text-[#101828] tracking-[0.4px]">
                      Hotel Detail
                    </h2>
                    <p className="mt-4 text-sm lg:text-[14px] font-medium text-[#212529]">
                      {selectedHotel.name} offers a variety of comfortable and
                      elegantly designed rooms, each thoughtfully equipped to
                      ensure a relaxing stay. The accommodations range from cozy
                      standard rooms to spacious suites, catering to both solo
                      travelers and families. All rooms feature modern
                      amenities, including plush bedding, free Wi-Fi,
                      flat-screen TVs, and en-suite bathrooms with hot water,
                      ensuring guests can unwind after a day of exploration.
                      Many rooms offer breathtaking views of the surrounding
                      mountains or lush gardens, immersing guests in the natural
                      beauty of Skardu right from their windows. With attentive
                      room service and a warm, welcoming atmosphere,{" "}
                      {selectedHotel.name} provides a delightful retreat for
                      travelers seeking comfort and tranquility amidst the
                      stunning landscapes of the region.
                    </p>

                    <h3 className="mt-4 text-sm lg:text-[14px] font-semibold text-[#101828]">
                      Hotel Policy
                    </h3>
                    <p className="mt-2 text-sm lg:text-[14px] font-medium text-[#212529]">
                      Cancellations made 48 hours or more before the booking
                      date: A 25% deduction from the total booking amount will
                      be applied. Cancellations made 24 hours before the booking
                      date: A 50% deduction
                    </p>

                    <h3 className="mt-4 text-sm lg:text-[14px] font-semibold text-[#101828]">
                      Contact Information
                    </h3>
                    <ul className="mt-2 space-y-2">
                      <li className="text-sm lg:text-[14px] font-medium text-[#212529]">
                        Name: {selectedHotel.name}
                      </li>
                      <li className="text-sm lg:text-[14px] font-medium text-[#212529]">
                        Address: {selectedHotel.address || "Hotel"}
                      </li>
                    </ul>
                  </div>

                  <div className="h-20 lg:h-11 w-full lg:mt-4"></div>
                </div>

                <div className="fixed bottom-0 left-0 lg:left-auto right-0 w-full lg:max-w-[763px] border-t bg-white p-3 lg:px-8 flex justify-between items-center">
                  <div>
                    <p className="text-sm lg:text-[15px] text-gray-600 font-medium">
                      1 Room(s) / 1 Night(s)
                    </p>
                    <p className="text-lg lg:text-[20px] font-medium text-[#121619]">
                      Rs {calculateTotalPrice()}
                    </p>
                  </div>
                  <button
                    onClick={handleContinue}
                    className="h-[45px] px-6 bg-[#FCEB03] text-[#121619] rounded-lg font-medium hover:bg-[#e7dc44] transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <Footer />
    </>
  );
}
