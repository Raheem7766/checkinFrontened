import { Minus, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const hotelData = [
  {
    id: 1,
    img: 'https://bookme.pk/images/hotels/gallery/173262646278568.jpg',
    name: 'GreenPak Hotel Fort Munro',
    address: '.',
    count: 4,
    price: '16,000',
    img1: 'https://bookme.pk/images/hotels/gallery/171750427049804.jpg',
    img2: 'https://bookme.pk/images/hotels/gallery/171750427051469.jpg',
    img3: 'https://bookme.pk/images/hotels/gallery/171750427094560.jpg',
    img4: 'https://bookme.pk/images/hotels/gallery/171750427024299.jpg',
    img5: 'https://bookme.pk/images/hotels/gallery/171750427085380.jpg',
    img6: 'https://bookme.pk/images/hotels/gallery/171750427153429.jpg',
    img7: 'https://bookme.pk/images/hotels/gallery/171750427143995.jpg',
  },
  // Other hotel data...
];

const rooms = {
  'Presidential Suite': {
    price: 50000,
    maxGuests: 4,
    img: hotelData[0].img1,
  },
  'Deluxe Room': {
    price: 22000,
    maxGuests: 2,
    img: hotelData[0].img2,
  },
  'Executive Room': {
    price: 27000,
    maxGuests: 2,
    img: hotelData[0].img3,
  },
};

export default function HotelPreview() {
  const [selectedRoom, setSelectedRoom] = useState('Presidential Suite');
  const [roomCounts, setRoomCounts] = useState({
    'Presidential Suite': 0,
    'Deluxe Room': 0,
    'Executive Room': 0,
  });

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

  const calculateTotalPrice = () => {
    let total = 0;
    Object.keys(roomCounts).forEach((room) => {
      total += roomCounts[room] * rooms[room].price;
    });
    return total;
  };

  const handleContinue = () => {
    console.log('Selected Room:', selectedRoom);
    console.log('Room Count:', roomCounts);
    console.log('Total Price:', calculateTotalPrice());
  };

  return (
    <div className="fixed top-0 left-0 inset-0 sm:max-w-xxl sm:max-h-none sm:rounded-lg w-full z-50 h-full bg-black bg-opacity-50 flex justify-end items-center">
      <div className="bg-[#F2F4F7] w-[763px] h-full">
        <div className="w-full h-[68px] bg-white flex items-center justify-between px-[22px] pr-3">
          <h2 className="text-[18px] font-semibold text-[#101828]">Hotel Preview</h2>
          {/* <div onClick={() => setSelectedHotel(null)}>
          </div> */}
        </div>
        <div className="h-[calc(100vh-100px)] overflow-y-auto">
          <div className="w-[94%] bg-white m-auto h-auto rounded-[5px] mt-4 px-5 pt-[10px] pb-2 border border-[#D0D5DD]">
            <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.4px]">Rooms</h2>
            <div className="w-full h-[56px] mt-8 border-b border-[#D0D5DD] flex">
              <div
                className={`w-[33.34%] h-full border-b-[2px] text-[14px] font-medium cursor-pointer flex items-center justify-center tracking-[0.3px] ${
                  selectedRoom === 'Presidential Suite'
                    ? 'bg-[#F5FAFF] border-[#1476D1] text-[#19548B]'
                    : ''
                }`} 
                onClick={() => handleClick('Presidential Suite')}
              >
                Presidential Suite
              </div>
              <div
                className={`w-[33.34%] h-full border-b-[2px] text-[14px] font-medium cursor-pointer flex items-center justify-center tracking-[0.3px] ${
                  selectedRoom === 'Deluxe Room'
                    ? 'bg-[#F5FAFF] border-[#1476D1] text-[#19548B]'
                    : ''
                }`}
                onClick={() => handleClick('Deluxe Room')}
              >
                Deluxe Room
              </div>
              <div
                className={`w-[33.34%] h-full border-b-[2px] text-[14px] font-medium cursor-pointer flex items-center justify-center tracking-[0.3px] ${
                  selectedRoom === 'Executive Room'
                    ? 'bg-[#F5FAFF] border-[#1476D1] text-[#19548B]'
                    : ''
                }`}
                onClick={() => handleClick('Executive Room')}
              >
                Executive Room
              </div>
            </div>

            <div className="w-full h-[183px] mt-[18px] rounded-[10px] border border-[#D0D5DD]">
              <div className="w-full bg-blue-600 px-[14px] pt-[14px] flex">
                <div className="w-[50%]">
                  <h3 className="text-[14px] font-medium text-[#212529] tracking-[0.4px]">
                    Bed Type: <span className="font-bold">{selectedRoom}</span>
                  </h3>
                  <h3 className="text-[14px] font-medium text-[#212529] tracking-[0.4px]">
                    Max Guest: <span className="font-bold">{rooms[selectedRoom].maxGuests}</span>
                  </h3>
                  <h3 className="text-[14px] font-medium text-[#212529] tracking-[0.4px]">
                    Available Rooms: <span className="font-bold">1</span>
                  </h3>
                </div>
                <div className="w-[50%] flex justify-start items-end flex-col">
                  <h2 className="text-[18px] font-semibold text-[#101828] tracking-[0.4px] mt-[-3px]">
                    Rs {rooms[selectedRoom].price}
                  </h2>
                  <div className="w-[37%] border border-[#D2D2D2] h-[45px] rounded-[10px] mt-3 flex">
                    <div
                      className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center font-black text-[#667085] cursor-pointer"
                      onClick={() => decrementCount(selectedRoom)}
                    >
                      <Minus size={18} />
                    </div>
                    <div className="h-full w-[33.34%] border-r border-[#D2D2D2] flex items-center justify-center text-[14px] text-black">
                      {roomCounts[selectedRoom]} {/* Show current count */}
                    </div>
                    <div
                      className="h-full w-[33.34%] flex items-center justify-center font-black text-[#667085] cursor-pointer"
                      onClick={() => incrementCount(selectedRoom)}
                    >
                      <Plus size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 w-full h-11">
            <h3 className="text-[16px] font-semibold text-[#101828]">
                Total Price: Rs {calculateTotalPrice()}
              </h3>
            </div>
          </div>
        <div className="w-full mt-4 px-[22px] py-[10px]">
          <button
            className="w-full text-white bg-[#1476D1] text-center py-3 rounded-[8px] text-[14px] font-semibold"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
        </div>

      </div>
    </div>
  );
}
