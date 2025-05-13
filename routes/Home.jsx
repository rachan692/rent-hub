import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import RoomCard from '../src/components/RoomCard';

const Home = () => {
  const [buyOrRent, setBuyOrRent] = useState('buy');
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showCities, setShowCities] = useState(false);
  const [showMinPrices, setShowMinPrices] = useState(false);
  const [showMaxPrices, setShowMaxPrices] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const cityRef = useRef(null);
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
  
  // Nepal cities
  const nepalCities = [
    'Kathmandu', 'Pokhara', 'Lalitpur', 'Bhaktapur', 'Biratnagar', 
    'Birgunj', 'Janakpur', 'Dharan', 'Butwal', 'Hetauda',
    'Nepalgunj', 'Dhangadhi', 'Itahari', 'Kirtipur', 'Damak'
  ];
  
  // Price ranges in Nepalese Rupees (NRs) for Buy and Rent options
  const buyPriceRanges = [
    'NRs 1,50,000', 'NRs 5,00,000', 'NRs 10,00,000', 
    'NRs 20,00,000', 'NRs 30,00,000', 'NRs 50,00,000', 
    'NRs 75,00,000', 'NRs 1,00,00,000', 'NRs 1,50,00,000', 
    'NRs 2,00,00,000', 'NRs 3,00,00,000', 'NRs 5,00,00,000+'
  ];
  
  const rentPriceRanges = [
    'NRs 5,000', 'NRs 10,000', 'NRs 15,000', 
    'NRs 20,000', 'NRs 25,000', 'NRs 30,000',
    'NRs 40,000', 'NRs 50,000', 'NRs 75,000',
    'NRs 1,00,000', 'NRs 2,00,000', 'NRs 5,00,000', 'NRs 10,00,000'
  ];

  // Handle scroll and close dropdowns
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    const handleClickOutside = (event) => {
      if (cityRef.current && !cityRef.current.contains(event.target)) {
        setShowCities(false);
      }
      if (minPriceRef.current && !minPriceRef.current.contains(event.target)) {
        setShowMinPrices(false);
      }
      if (maxPriceRef.current && !maxPriceRef.current.contains(event.target)) {
        setShowMaxPrices(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden relative">
      {/* Sticky Header Effect */}
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}
      >
        {/* This div creates a sticky effect without interfering with the Nav component */}
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col lg:flex-row">
          {/* Left Content - Text and Search */}
          <div className="w-full lg:w-1/2 pr-0 lg:pr-8 py-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">Find Real Estate & Get Your Dream Place</h1>
            
            <p className="text-gray-700 mb-12 max-w-lg">
              Welcome to Rent Hub, Nepal's premier real estate platform connecting property owners and seekers. Whether you're looking to buy, sell, or rent properties across Nepal, our platform offers verified listings, transparent pricing, and expert guidance to make your property journey seamless and satisfying.
            </p>

            {/* Search Box */}
            <div className="mb-16">
              {/* Buy/Rent Tabs */}
              <div className="flex mb-4">
                <button 
                  className={`px-12 py-3 ${buyOrRent === 'buy' ? 'bg-black text-white' : 'bg-white text-black border border-gray-200'}`}
                  onClick={() => {
                    setBuyOrRent('buy');
                    setMinPrice('');
                    setMaxPrice('');
                  }}
                >
                  Buy
                </button>
                <button 
                  className={`px-12 py-3 ${buyOrRent === 'rent' ? 'bg-black text-white' : 'bg-white text-black border border-gray-200'}`}
                  onClick={() => {
                    setBuyOrRent('rent');
                    setMinPrice('');
                    setMaxPrice('');
                  }}
                >
                  Rent
                </button>
              </div>

              {/* Search Fields */}
              <div className="flex flex-col md:flex-row items-center">
                {/* City Dropdown */}
                <div className="w-full md:w-1/3 relative mb-2 md:mb-0" ref={cityRef}>
                  <input 
                    type="text" 
                    placeholder="City, Location" 
                    className="w-full p-3 border border-gray-200"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setShowCities(true);
                    }}
                    onFocus={() => setShowCities(true)}
                  />
                  {showCities && (
                    <div className="absolute z-30 bg-white border border-gray-200 w-full mt-1 max-h-64 overflow-y-auto">
                      {nepalCities
                        .filter(city => 
                          city.toLowerCase().includes(location.toLowerCase())
                        )
                        .map((city, index) => (
                          <div 
                            key={index} 
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setLocation(city);
                              setShowCities(false);
                            }}
                          >
                            {city}
                          </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Min Price Dropdown */}
                <div className="w-full md:w-1/4 relative mb-2 md:mb-0 md:mx-1" ref={minPriceRef}>
                  <input 
                    type="text" 
                    placeholder="Min Price" 
                    className="w-full p-3 border border-gray-200"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setShowMinPrices(true);
                    }}
                    onFocus={() => setShowMinPrices(true)}
                  />
                  {showMinPrices && (
                    <div className="absolute z-30 bg-white border border-gray-200 w-full mt-1 max-h-64 overflow-y-auto">
                      {(buyOrRent === 'buy' ? buyPriceRanges : rentPriceRanges)
                        .filter(price => 
                          price.toLowerCase().includes(minPrice.toLowerCase())
                        )
                        .map((price, index) => (
                          <div 
                            key={index} 
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setMinPrice(price);
                              setShowMinPrices(false);
                            }}
                          >
                            {price}
                          </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Max Price Dropdown */}
                <div className="w-full md:w-1/4 relative mb-2 md:mb-0 md:mr-1" ref={maxPriceRef}>
                  <input 
                    type="text" 
                    placeholder="Max Price" 
                    className="w-full p-3 border border-gray-200"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setShowMaxPrices(true);
                    }}
                    onFocus={() => setShowMaxPrices(true)}
                  />
                  {showMaxPrices && (
                    <div className="absolute z-30 bg-white border border-gray-200 w-full mt-1 max-h-64 overflow-y-auto">
                      {(buyOrRent === 'buy' ? buyPriceRanges : rentPriceRanges)
                        .filter(price => 
                          price.toLowerCase().includes(maxPrice.toLowerCase())
                        )
                        .map((price, index) => (
                          <div 
                            key={index} 
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setMaxPrice(price);
                              setShowMaxPrices(false);
                            }}
                          >
                            {price}
                          </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Search button with Link to /list */}
                <Link to="/list" className="w-full md:w-auto">
                  <button className="w-full p-3 bg-yellow-400 text-white flex justify-center">
                    <Search size={24} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex justify-between items-center mt-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold">16+</h2>
                <p className="text-gray-600 text-sm">Years of Experience</p>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold">200</h2>
                <p className="text-gray-600 text-sm">Award Gained</p>
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold">1200+</h2>
                <p className="text-gray-600 text-sm">Property Ready</p>
              </div>
            </div>
          </div>

          {/* Right Content - Images */}
          <div className="w-full lg:w-1/2 relative h-96 lg:h-auto mt-12 lg:mt-0">
            {/* Background Elements */}
            <div className="absolute right-0 top-16 w-64 h-64 bg-blue-100 rounded-full opacity-80 z-0"></div>
            <div className="absolute right-4 top-4">
              <div className="w-8 h-8 bg-black rotate-45"></div>
            </div>
            
            {/* Only Two Building Images as requested */}
            <div className="relative h-full">
              {/* Main Building Image */}
              <div className="absolute right-12 top-24 z-10 w-64 h-80">
                <img 
                  src="/src/assets/images/building1.avif" 
                  alt="Modern glass office building in Kathmandu" 
                  className="rounded-lg shadow-lg object-cover w-full h-full"
                />
              </div>
              
              {/* Secondary Building Image */}
              <div className="absolute right-48 bottom-8 z-20 w-56 h-64">
                <img 
                  src="/src/assets/images/building3.webp" 
                  alt="Luxury apartment building in Nepal" 
                  className="rounded-lg shadow-lg object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RoomCard Component */}
      <div className="mt-12">
        <RoomCard/>
      </div>
    </div>
  );
};

export default Home;