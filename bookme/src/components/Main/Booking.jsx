import React, { useEffect, useState } from "react";
import { LuBaggageClaim } from "react-icons/lu";
import Navbar from "../Home/Navbar";

const Booking = () => {
  const [bookingData, setBookingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const [busRes, flightRes, hotelRes, visitRes, eventRes, tourRes] =
          await Promise.all([
            fetch("http://localhost:5001/api/v1/bookings"), 
            fetch("http://localhost:5001/api/v1/flights"), 
            fetch("http://localhost:5001/api/v1/hotels"), 
            fetch("http://localhost:5001/api/v1/visits"), 
            fetch("http://localhost:5001/api/v1/events"), 
            fetch("http://localhost:5001/api/v1/tours"), 
          ]);

        if (
          !busRes.ok ||
          !flightRes.ok ||
          !hotelRes.ok ||
          !visitRes.ok ||
          !eventRes.ok ||
          !tourRes.ok
        ) {
          throw new Error("Failed to fetch bookings");
        }

        const busData = await busRes.json();
        const flightData = await flightRes.json();
        const hotelData = await hotelRes.json();
        const visitData = await visitRes.json();
        const EventData = await eventRes.json();
        const TourData = await tourRes.json();

        const formattedBusData = busData.map((bus) => ({
          ...bus,
          type: "bus",
        }));

        const formattedFlightData = flightData.map((flight) => ({
          ...flight,
          type: "flight",
        }));

        const formattedHotelData = hotelData.map((hotel) => ({
          ...hotel,
          type: "hotel",
        }));

        const formattedVisitData = visitData.map((visit) => ({
          ...visit,
          type: "visit",
        }));

        const formattedEventData = EventData.map((event) => ({
          ...event,
          type: "event",
        }));

        const formattedTourData = TourData.map((tour) => ({
          ...tour,
          type: "tour",
        }));

        console.log(formattedTourData);

        setBookingData([
          ...formattedBusData,
          ...formattedFlightData,
          ...formattedHotelData,
          ...formattedVisitData,
          ...formattedEventData,
          ...formattedTourData,
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId, type) => {
    try {
      let apiUrl = "";

      if (type === "bus") {
        apiUrl = `http://localhost:5001/api/v1/bookings/${bookingId}`;
      } else if (type === "flight") {
        apiUrl = `http://localhost:5001/api/v1/flights/${bookingId}`;
      } else if (type === "hotel") {
        apiUrl = `http://localhost:5001/api/v1/hotels/${bookingId}`;
      } else if (type === "visit") {
        apiUrl = `http://localhost:5001/api/v1/visits/${bookingId}`;
      } else if (type === "event") {
        apiUrl = `http://localhost:5001/api/v1/events/${bookingId}`;
      } else if (type === "tour") {
        apiUrl = `http://localhost:5001/api/v1/tours/${bookingId}`;
      }

      console.log("Making DELETE request to:", apiUrl);
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }

      setBookingData((prevData) =>
        prevData.filter((booking) => booking._id !== bookingId)
      );
    } catch (err) {
      console.error("Error cancelling booking:", err.message);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="w-full min-h-screen flex items-center justify-center">
          <p className="text-xl font-semibold text-gray-600">Loading...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="w-full min-h-screen flex items-center justify-center">
          <p className="text-xl font-semibold text-red-600">{error}</p>
        </div>
      </>
    );
  }

  if (!bookingData || bookingData.length === 0) {
    return (
      <>
        <Navbar />
        <div className="w-full min-h-screen flex items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-600">
            No bookings found.
          </h2>
        </div>
      </>
    );
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (err) {
      return dateString;
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen pb-4 px-3 pt-6 lg:pb-10 lg:px-5 lg:pt-[36px]">
        <h2 className="text-xl px-2 font-semibold text-[#101828] tracking-[0.3px] lg:text-[28px] lg:px-3">
          My Bookings
        </h2>

        <div className="space-y-4 mt-4">
          {bookingData.map((booking, index) => (
            <div
              key={`booking-${index}-${booking._id}`}
              className="w-full h-auto"
            >
              <div className="w-full border border-[#D2D2D2] rounded-[10px] p-4 lg:p-6">
                <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center">
                  <div className="flex items-center">
                    <div className="w-[40px] h-[40px] rounded-[50px] bg-[#FCEB03] flex items-center justify-center">
                      <LuBaggageClaim size={18} color="#121619" />
                    </div>
                    <div className="ml-3">
                      <h2 className="text-base lg:text-[18px] font-semibold text-[#101828] tracking-[0.3px]">
                        {booking.type === "bus"
                          ? `${booking.busName} - ${booking.busType}`
                          : booking.type === "flight"
                          ? `${booking.airline}`
                          : booking.type === "tour"
                          ? `${booking.tourName}`
                          : `${booking.name}`}
                      </h2>
                      <p className="text-sm lg:text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                        Created on{" "}
                        {formatDate(
                          booking.type === "visit" ||
                            booking.type === "event" ||
                            booking.type === "tour"
                            ? booking.createdAt
                            : booking.departureDate
                        )}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        handleCancelBooking(booking._id, booking.type)
                      }
                      className="w-full bg-[#FFAFAF] text-[#DA3C3C] text-center rounded-[5px] lg:w-[86px] lg:h-[35px] font-medium"
                    >
                      Cancelled
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <div>
                      <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                        Booking ID
                      </h3>
                      <h4 className="text-sm lg:text-[14px] font-normal text-[#101828] tracking-[0.3px] mt-1">
                        {booking._id === "bus"
                          ? `${booking._id}`
                          : `${booking._id}`}
                      </h4>
                    </div>
                    {booking.type === "flight" && (
                      <div className="mt-2">
                        <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                          Class
                        </h3>
                        <h4 className="text-sm lg:text-[14px] font-normal text-[#101828] tracking-[0.3px] mt-1">
                          {booking.travelClass}
                        </h4>
                      </div>
                    )}
                  </div>
                  {booking.type === "flight" && (
                    <div>
                      <div>
                        <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                          PNR
                        </h3>
                        <h4 className="text-sm lg:text-[14px] font-normal text-[#101828] tracking-[0.3px] mt-1">
                          {booking.pnr || "ESJWYC"}
                        </h4>
                      </div>

                      <div className="mt-2">
                        <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                          Trip
                        </h3>
                        <h4 className="text-sm lg:text-[14px] font-normal text-[#101828] tracking-[0.3px] mt-1">
                          {booking.tripType || "None"}
                        </h4>
                      </div>
                    </div>
                  )}

                  <div>
                    <div>
                      <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                        Date
                      </h3>
                      <h4 className="text-sm lg:text-[14px] font-normal text-[#101828] tracking-[0.3px] mt-1">
                        {formatDate(
                          booking.type === "visit"
                            ? booking.createdAt
                            : booking.type === "event"
                            ? booking.eventDate
                            : booking.type === "tour"
                            ? booking.createdAt
                            : booking.createdAt
                        )} 
                      </h4>
                    </div>
                    {booking.type === "flight" && booking.travelers && (
                      <div className="mt-2">
                        <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                          Passenger
                        </h3>
                        <h4 className="text-sm lg:text-[14px] font-normal text-[#101828] tracking-[0.3px] mt-1">
                          {booking.travelers.adult +
                            booking.travelers.children +
                            booking.travelers.infant}
                        </h4>
                      </div>
                    )}
                  </div>

                  {(booking.type === "bus" || booking.type === "flight") && (
                    <div>
                      <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                        Route
                      </h3>
                      <h4 className="text-sm lg:text-[14px] font-normal text-[#101828] tracking-[0.3px] mt-1">
                        {booking.type === "bus"
                          ? `${booking.pick}`
                          : `${booking.citynameFrom} - ${booking.citynameTo}`}
                      </h4>
                    </div>
                  )}

                  {booking.type === "bus" && (
                    <div>
                      <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                        Selected Seats
                      </h3>
                      {booking.selectedSeats &&
                      booking.selectedSeats.length > 0 ? (
                        <h4 className="text-sm lg:text-[14px] font-normal text-[#101828] tracking-[0.3px] mt-1">
                          {booking.selectedSeats.length}
                        </h4>
                      ) : (
                        <h4 className="text-sm lg:text-[14px] font-normal text-gray-500 tracking-[0.3px] mt-1">
                          No seats selected
                        </h4>
                      )}
                    </div>
                  )}
                  {booking.type === "hotel" && (
                    <div className="mt-2">
                      <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                        Room (s)
                      </h3>
                      <h4 className="text-sm lg:text-[14px] font-normal text-[#101828] tracking-[0.3px] mt-1">
                        {booking.totalRooms}
                      </h4>
                    </div>
                  )}
                  {booking.type === "hotel" && (
                    <div className="mt-2">
                      <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                        Night (s)
                      </h3>
                      <h4 className="text-sm lg:text-[14px] font-normal text-[#101828] tracking-[0.3px] mt-1">
                        {booking.night}
                      </h4>
                    </div>
                  )}
                  {booking.type === "visit" && (
                    <div className="mt-2">
                      <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                        Passenger (s)
                      </h3>
                      <h4 className="text-sm lg:text-[14px] font-normal text-[#101828] tracking-[0.3px] mt-1">
                        {booking.passengers.length}
                      </h4>
                    </div>
                  )}
                  {booking.type === "visit" && (
                    <div className="mt-2">
                      <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                        Day (s)
                      </h3>
                      <h4 className="text-sm lg:text-[14px] font-normal text-[#101828] tracking-[0.3px] mt-1">
                        {booking.days}
                      </h4>
                    </div>
                  )}
                  {booking.type === "event" && (
                    <div className="mt-2">
                      <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                        Ticket (s)
                      </h3>
                      <h4 className="text-sm lg:text-[14px] font-normal text-[#101828] tracking-[0.3px] mt-1">
                        {booking.totalCount}
                      </h4>
                    </div>
                  )}
                  {booking.type === "event" && (
                    <div className="mt-2">
                      <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                        Venue
                      </h3>
                      <h4 className="text-sm lg:text-[14px] font-normal text-[#101828] tracking-[0.3px] mt-1">
                        {booking.city}
                      </h4>
                    </div>
                  )}
                  {booking.type === "tour" && (
                    <div className="mt-2">
                      <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                        Person (s)
                      </h3>
                      <h4 className="text-sm lg:text-[14px] font-normal text-[#101828] tracking-[0.3px] mt-1">
                        {booking.person}
                      </h4> 
                    </div>
                  )}
                  {booking.type === "tour" && (
                    <div className="mt-2">
                      <h3 className="text-sm lg:text-[14px] font-medium text-[#667085] tracking-[0.3px]">
                        City 
                      </h3>
                      <h4 className="text-sm lg:text-[14px] font-normal text-[#101828] tracking-[0.3px] mt-1">
                        {booking.city}
                      </h4> 
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Booking;
