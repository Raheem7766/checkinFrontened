import React, { useState, useRef, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const ReturnDate = ({ widthClass, onDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const getPreviousMonthDays = (year, month) => {
        const daysInPrevMonth = getDaysInMonth(year, month - 1);
        const firstDay = getFirstDayOfMonth(year, month);
        const days = [];
        const startDay = firstDay === 0 ? 6 : firstDay - 1;
        for (let i = startDay - 1; i >= 0; i--) {
            days.push(daysInPrevMonth - i);
        }
        return days;
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentMonth = selectedDate ? selectedDate.getMonth() : today.getMonth();
    const currentYear = selectedDate ? selectedDate.getFullYear() : today.getFullYear();
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const prevMonthDays = getPreviousMonthDays(currentYear, currentMonth);

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    const formatDate = (date) => {
        const day = date.getDate();
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const handleDateClick = (day) => {
        const selected = new Date(currentYear, currentMonth, day);
        if (selected > today) {
            setSelectedDate(selected);
            setIsOpen(false);
            onDateSelect(selected);
        }
    };

    const handleMonthChange = (increment) => {
        const newDate = selectedDate || today;
        const newMonth = new Date(newDate.getFullYear(), newDate.getMonth() + increment, 1);
        setSelectedDate(newMonth);
    };

    const renderCalendarDays = () => {
        const allDays = [];

        prevMonthDays.forEach(day => {
            allDays.push({
                day,
                isCurrentMonth: false,
                isSelected: false,
                isDisabled: true,
            });
        });


        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            allDays.push({
                day,
                isCurrentMonth: true,
                isSelected: selectedDate &&
                    day === selectedDate.getDate() &&
                    currentMonth === selectedDate.getMonth() &&
                    currentYear === selectedDate.getFullYear(),
                isDisabled: date <= today,
            });
        }


        const remainingDays = 42 - allDays.length;
        let nextMonthDay = 1;
        for (let i = 0; i < remainingDays; i++) {
            allDays.push({
                day: nextMonthDay++,
                isCurrentMonth: false,
                isSelected: false,
                isDisabled: false,
            });
        }

        return allDays.map((dayObj, index) => (
            <button
                key={index}
                onClick={() => !dayObj.isDisabled && dayObj.isCurrentMonth && handleDateClick(dayObj.day)}
                className={`w-8 h-8 text-sm flex items-center justify-center
          ${dayObj.isSelected ? 'rounded-full bg-blue-500 text-white' : ''} 
          ${dayObj.isCurrentMonth ? 'text-gray-700' : 'text-gray-300'} 
          ${dayObj.isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
          transition-colors`}
                disabled={dayObj.isDisabled}
            >
                {dayObj.day}
            </button>
        ));
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className={`relative ${widthClass}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-[44px] flex items-center gap-2 px-4 mt-2 bg-white border border-gray-200 rounded-lg"
            >
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className={`text-${selectedDate ? 'gray-900' : 'gray-600'}`} style={{ fontSize: '16px' }}>
                    {selectedDate ? formatDate(selectedDate) : 'Return Date'}
                </span>
            </button>

            {isOpen && (
                <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden w-full z-10">
                    {/* Blue header */}
                    <div className="bg-[#FCEB03] text-[#121619] p-4">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => handleMonthChange(-1)}
                                className="text-[#121619] hover:bg-[#121619] hover:text-[#FCEB03] rounded p-1"
                            >
                                ←
                            </button>
                            <div className="text-lg font-medium flex gap-4">
                                <span>{monthNames[currentMonth]}</span>
                                <span>{currentYear}</span>
                            </div>
                            <button
                                onClick={() => handleMonthChange(1)}
                                className="text-[#121619] hover:bg-[#121619] hover:text-[#FCEB03] rounded p-1"
                            >
                                →
                            </button>
                        </div>

                        {/* Weekday headers */}
                        <div className="grid grid-cols-7 gap-1 mt-4">
                            {weekDays.map(day => (
                                <div key={day} className="text-xs text-center font-medium">
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Calendar grid */}
                    <div className="p-4">
                        <div className="grid grid-cols-7 gap-1">
                            {renderCalendarDays()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReturnDate;
