import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import busOperators from '../Data/Data';

// Create Context
export const BusSearchContext = createContext();

// Create Context Provider
export const BusSearchProvider = ({ children }) => {
    const [searchData, setSearchData] = useState(() => {
        try {
            const savedSearch = localStorage.getItem('busSearchData');
            return savedSearch ? JSON.parse(savedSearch) : null;
        } catch (error) {
            console.error('Error parsing saved search data:', error);
            return null;
        }
    });

    const [filteredBusData, setFilteredBusData] = useState([]);
    const [tripType, setTripType] = useState(() => {
        return searchData?.returnDate ? 'roundTrip' : 'oneWay';
    });
    const [showFromDropdown, setShowFromDropdown] = useState(false);
    const [showToDropdown, setShowToDropdown] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedFrom, setSelectedFrom] = useState(searchData?.from || '');
    const [selectedTo, setSelectedTo] = useState(searchData?.to || '');
    const [departureDate, setDepartureDate] = useState(searchData?.departureDate || '');
    const [returnDate, setReturnDate] = useState(searchData?.returnDate || '');
    const [isSummaryVisible, setIsSummaryVisible] = useState(!!searchData);
    const [isEditing, setIsEditing] = useState(false);
    const [range, setRange] = useState([1990, 2054]);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedBusTypes, setSelectedBusTypes] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('Sort By: Recommended');
    const [selectedTab, setSelectedTab] = useState('Recommended');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedFromCity, setSelectedFromCity] = useState({
        cityCode: "LHE",
        cityName: "Lahore",
        cityShort: "LHE"
    });
    const [selectedToCity, setSelectedToCity] = useState({
        cityCode: "MUX",
        cityName: "Multan",
        cityShort: "MUX"
    });

    const cityMappings = {
        'LHE': 'Lahore',
        'MUX': 'Multan',
        'ISB': 'Islamabad',
        'KHI': 'Karachi',
        'FSD': 'Faisalabad',
        'RWP': 'Rawalpindi',
    };

    const pakistanCities = [
        'Lahore',
        'Rawalpindi',
        'Islamabad',
        'Karachi',
        'Multan',
        'Faisalabad',
        'Quetta',
        'Peshawar',
        'Gujranwala',
        'Sialkot',
        'Sargodha',
        'Bahawalpur',
        'Dera Ghazi Khan',
        'Muzafargarh',
        'Sadiqabad',
        'Lodhran',
        'Sahiwal',
        'Hyderabad',
        'Sukkur',
        'Abbottabad',
        'Mirpur Khas',
        'Mardan',
        'Sheikhupura',
        'Rahim Yar Khan',
        'Kasur',
        'Jhang',
        'Nawabshah',
        'Khairpur',
        'Attock',
        'Dera Ismail Khan',
        'Mandi Bahauddin',
        'Kohat',
        'Gwadar',
        'Larkana',
        'Chiniot',
        'Okara',
        'Jacobabad',
        'Vehari',
        'Kotli',
        'Nowshera',
        'Chaman',
        'Khuzdar',
        'Hafizabad',
        'Bannu',
        'Mirpur',
        'Muzaffarabad',
        'Gilgit',
        'Skardu',
        'Hunza',
        'Zhob',
        'Turbat'
    ];

    useEffect(() => {
        if (searchData && Object.keys(searchData).length > 0) {
            console.log('Filtering buses with search data:', searchData);

            try {
                const modifiedBusData = busOperators.map(bus => ({
                    ...bus,
                    departure: {
                        ...bus.departure,
                        cityCode: searchData.from.substring(0, 3).toUpperCase(),
                        cityName: searchData.from
                    },
                    destination: {
                        ...bus.destination,
                        cityCode: searchData.to.substring(0, 3).toUpperCase(),
                        cityName: searchData.to
                    }
                }));

                const filtered = modifiedBusData.filter(bus => {
                    return true;
                });

                console.log('Filtered bus data:', filtered);
                setFilteredBusData(filtered);
            } catch (error) {
                console.error('Error filtering bus data:', error);
                setFilteredBusData([]);
            }
        } else {
            setFilteredBusData([]);
        }
    }, [searchData]);

    const handleSearch = (data) => {
        console.log('Handling search with data:', data);

        if (!data || !data.from || !data.to || !data.departureDate) {
            console.error('Invalid search data');
            return;
        }

        try {
            setSearchData(data);
            localStorage.setItem('busSearchData', JSON.stringify(data));
            setIsSummaryVisible(true);
            setIsEditing(false);
        } catch (error) {
            console.error('Error handling search:', error);
        }
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem('busSearchData');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const toggleFromDropdown = (e) => {
        setSelectedFrom(e.target.value);
        setShowFromDropdown((prev) => !prev);
        setShowToDropdown(false);
        setShowCalendar(false);
    };

    const toggleToDropdown = (e) => {
        setSelectedTo(e.target.value);
        setShowToDropdown((prev) => !prev);
        setShowFromDropdown(false);
        setShowCalendar(false);
    };

    const toggleCalendar = (e) => {
        setShowCalendar((prev) => !prev);
        setShowFromDropdown(false);
        setShowToDropdown(false);
    };

    const handleDepartureDateSelect = (formattedDate) => {
        setDepartureDate(formattedDate);
    };

    const handleReturnDateSelect = (formattedDate) => {
        setReturnDate(formattedDate);
    };

    const handleSearchClick = () => {
        if (tripType === 'oneWay') {
            if (selectedFrom.trim() === "" || selectedTo.trim() === "" || !departureDate) {
                alert("Please fill 'From', 'To', and 'Departure Date' to proceed with the search.");
                setIsSummaryVisible(false);
                return;
            }
        } else if (tripType === 'roundTrip') {
            if (selectedFrom.trim() === "" || selectedTo.trim() === "" || !departureDate || !returnDate) {
                alert("Please fill 'From', 'To', 'Departure Date', and 'Return Date' to proceed with the search.");
                setIsSummaryVisible(false);
                return;
            }
        }

        const searchData = {
            from: selectedFrom,
            to: selectedTo,
            departureDate: departureDate,
            returnDate: tripType === 'roundTrip' ? returnDate : null
        };

        // if (tripType === 'roundTrip' && returnDate) {
        //     searchData.returnDate = returnDate;
        // }

        // setIsSummaryVisible(true);
        handleSearch(searchData);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setIsSummaryVisible(false);
    };

    const getFormattedCityName = (cityName, type = 'short') => {
        if (!cityName) return '';
        const words = cityName.split(' ');
        return type === 'short' ? words[0].slice(0, 3).toUpperCase() : cityName;
    };

    const convertTo24Hour = (timeStr) => {
        if (!timeStr) return 0;
        const [time, period] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (period === 'PM' && hours !== 12) hours += 12;
        else if (period === 'AM' && hours === 12) hours = 0;
        return hours * 60 + minutes;
    };

    const isTimeAfterCurrent = (busTime) => {
        if (!busTime) return true;
        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
        const busMinutesSinceMidnight = convertTo24Hour(busTime);
        const currentMinutesSinceMidnight = currentHours * 60 + currentMinutes;
        return busMinutesSinceMidnight > currentMinutesSinceMidnight;
    };

    // Timer effect
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    // Filtered and sorted buses logic
    const filteredAndSortedBuses = useMemo(() => {
        let result = busOperators.filter(bus => {
            const fromMatch = [
                bus.departure?.cityCode,
                bus.from,
                bus.departure?.cityName,
                bus.fromCity,
                cityMappings[selectedFromCity.cityCode],
                selectedFromCity.cityName
            ].some(value =>
                value && (
                    value.toUpperCase() === selectedFromCity.cityCode.toUpperCase() ||
                    value.toUpperCase() === selectedFromCity.cityName.toUpperCase()
                )
            );

            const toMatch = [
                bus.destination?.cityCode,
                bus.to,
                bus.destination?.cityName,
                bus.toCity,
                cityMappings[selectedToCity.cityCode],
                selectedToCity.cityName
            ].some(value =>
                value && (
                    value.toUpperCase() === selectedToCity.cityCode.toUpperCase() ||
                    value.toUpperCase() === selectedToCity.cityName.toUpperCase()
                )
            );

            const timeMatch = isTimeAfterCurrent(bus.time);
            return fromMatch && toMatch && timeMatch;
        });

        // Apply bus type filters
        if (selectedBusTypes.length > 0) {
            result = result.filter(bus => {
                return selectedBusTypes.some(type => {
                    const normalizedType = type.toLowerCase().replace(/-/g, ' ');
                    const normalizedBusName = bus.name.toLowerCase().replace(/-/g, ' ');
                    const normalizedBusType = bus.type.toLowerCase().replace(/-/g, ' ');
                    return normalizedBusName.includes(normalizedType) ||
                        normalizedBusType.includes(normalizedType) ||
                        normalizedType === normalizedBusName ||
                        normalizedType === normalizedBusType;
                });
            });
        }

        // Sorting logic
        const timeSort = (a, b) => {
            const timeA = convertTo24Hour(a.time);
            const timeB = convertTo24Hour(b.time);
            return timeA - timeB;
        };

        switch (selectedTab) {
            case 'Recommended':
                result.sort((a, b) => (b.earn || 0) - (a.earn || 0));
                break;
            case 'Cheapest':
                result.sort((a, b) => (a.price1 || 0) - (b.price1 || 0));
                break;
            case 'Earliest':
                result.sort(timeSort);
                break;
            default:
                break;
        }

        switch (selectedSort) {
            case 'Sort by: Price - Low to High':
                result.sort((a, b) => (a.price1 || 0) - (b.price1 || 0));
                break;
            case 'Sort by: Price - High to Low':
                result.sort((a, b) => (b.price1 || 0) - (a.price1 || 0));
                break;
            case 'Sort by: Departure - Earliest':
                result.sort(timeSort);
                break;
            default:
                break;
        }

        return result;
    }, [selectedBusTypes, selectedTab, selectedSort, currentTime, selectedFromCity, selectedToCity,cityMappings,isTimeAfterCurrent]);

    // Tab summary calculation
    const tabSummary = useMemo(() => {
        if (filteredAndSortedBuses.length === 0) return { price: 0, time: '' };
        const firstBus = filteredAndSortedBuses[0];
        return {
            price: firstBus.price1,
            time: firstBus.time
        };
    }, [filteredAndSortedBuses]);

    const handleCheckboxChange = (type) => {
        setSelectedBusTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const contextValue = {
        searchData,
        setSearchData,
        filteredBusData,
        setFilteredBusData,
        tripType,
        setTripType,
        showFromDropdown,
        setShowFromDropdown,
        showToDropdown,
        setShowToDropdown,
        showCalendar,
        setShowCalendar,
        selectedFrom,
        setSelectedFrom,
        selectedTo,
        setSelectedTo,
        departureDate,
        setDepartureDate,
        returnDate,
        setReturnDate,
        isSummaryVisible,
        setIsSummaryVisible,
        isEditing,
        setIsEditing,
        pakistanCities,
        toggleFromDropdown,
        toggleToDropdown,
        toggleCalendar,
        handleDepartureDateSelect,
        handleReturnDateSelect,
        handleSearchClick,
        handleEditClick,
        handleSearch,
        range,
        setRange,
        isDragging,
        setIsDragging,
        selectedBusTypes,
        setSelectedBusTypes,
        isOpen,
        setIsOpen,
        selectedSort,
        setSelectedSort,
        selectedTab,
        setSelectedTab,
        selectedFromCity,
        setSelectedFromCity,
        selectedToCity,
        setSelectedToCity,
        filteredAndSortedBuses,
        tabSummary,
        handleCheckboxChange,
        cityMappings,
        getFormattedCityName,
        convertTo24Hour,
        isTimeAfterCurrent,
    };

    return (
        <BusSearchContext.Provider value={contextValue}>
            {children}
        </BusSearchContext.Provider>
    );
};

// Custom hook for using bus search context
export const useBusSearch = () => {
    const context = useContext(BusSearchContext);
    if (!context) {
        throw new Error('useBusSearch must be used within a BusSearchProvider');
    }
    return context;
};