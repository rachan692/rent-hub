import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Heart, MessageSquare, Bed, Bath, Search, GripVertical, X, Map as MapIcon } from 'lucide-react';
import "../components/Map/Map";
import Map from '../components/Map/Map';

// Sample property data for Nepal
const propertyData = [
  {
    id: 1,
    title: "Luxury Suite Near Durbar Marg",
    address: "123 Durbar Marg, Kathmandu",
    price: 32000,
    priceLabel: "Rs. 32,000/month",
    bedrooms: 2,
    bathrooms: 1,
    image: "/src/assets/images/room1.jpg",
    priceRange: "30-40k"
  },
  {
    id: 2,
    title: "Spacious Thamel Apartment - Prime Location",
    address: "456 Thamel Street, Kathmandu",
    price: 45000,
    priceLabel: "Rs. 45,000/month",
    bedrooms: 3,
    bathrooms: 2,
    image: "/src/assets/images/room2.jpg",
    priceRange: "40-50k"
  },
  {
    id: 3,
    title: "Affordable Studio with Lakeside Views",
    address: "78 Lakeside Road, Pokhara",
    price: 18000,
    priceLabel: "Rs. 18,000/month",
    bedrooms: 1,
    bathrooms: 1,
    image: "/src/assets/images/room3.jpg",
    priceRange: "10-20k"
  },
  {
    id: 4,
    title: "Modern Flat with Phewa Lake Panorama",
    address: "234 Phewa Lake View, Pokhara",
    price: 25000,
    priceLabel: "Rs. 25,000/month",
    bedrooms: 2,
    bathrooms: 1,
    image: "/src/assets/images/room4.jpg",
    priceRange: "20-30k"
  },
  {
    id: 5,
    title: "Heritage Home Near Patan Durbar",
    address: "567 Patan Durbar Square, Lalitpur",
    price: 55000,
    priceLabel: "Rs. 55,000/month",
    bedrooms: 3,
    bathrooms: 2,
    image: "/src/assets/images/room5.jpg",
    priceRange: "50-60k"
  },
  {
    id: 6,
    title: "Charming Newari-Style Apartment",
    address: "890 Bhaktapur Road, Bhaktapur",
    price: 22000,
    priceLabel: "Rs. 22,000/month",
    bedrooms: 1,
    bathrooms: 1,
    image: "/src/assets/images/room6.jpg",
    priceRange: "20-30k"
  },
  {
    id: 7,
    title: "Cozy Hillside Retreat with Sunrise Views",
    address: "123 Nagarkot Hill, Nagarkot",
    price: 28000,
    priceLabel: "Rs. 28,000/month",
    bedrooms: 2,
    bathrooms: 1,
    image: "/src/assets/images/room7.jpg",
    priceRange: "20-30k"
  },
  {
    id: 8,
    title: "Jungle-Side Getaway - Perfect for Nature Lovers",
    address: "345 Chitwan Jungle Road, Chitwan",
    price: 20000,
    priceLabel: "Rs. 20,000/month",
    bedrooms: 2,
    bathrooms: 1,
    image: "/src/assets/images/room8.jpg",
    priceRange: "20-30k"
  },
  {
    id: 9,
    title: "Peaceful Sanctuary Near Buddha's Birthplace",
    address: "678 Lumbini Peace Park, Lumbini",
    price: 15000,
    priceLabel: "Rs. 15,000/month",
    bedrooms: 1,
    bathrooms: 1,
    image: "/src/assets/images/room9.jpg",
    priceRange: "10-20k"
  },
  {
    id: 10,
    title: "Mountain Adventure Base Camp Living",
    address: "901 Annapurna Base, Manang",
    price: 24000,
    priceLabel: "Rs. 24,000/month",
    bedrooms: 2,
    bathrooms: 1,
    image: "/src/assets/images/room10.jpg",
    priceRange: "20-30k"
  },
  {
    id: 11,
    title: "Everest Trekker's Dream Apartment",
    address: "234 Everest View Street, Lukla",
    price: 35000,
    priceLabel: "Rs. 35,000/month",
    bedrooms: 2,
    bathrooms: 2,
    image: "/src/assets/images/room11.jpg",
    priceRange: "30-40k"
  },
  {
    id: 12,
    title: "Authentic Mustang Valley Home - Scenic Views",
    address: "567 Mustang Valley, Jomsom",
    price: 19000,
    priceLabel: "Rs. 19,000/month",
    bedrooms: 2,
    bathrooms: 1,
    image: "/src/assets/images/room12.jpg",
    priceRange: "10-20k"
  },
];

const Listing = () => {
  const [searchTerm, setSearchTerm] = useState("Nepal");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [listingsWidth, setListingsWidth] = useState('50%');
  const [isMobile, setIsMobile] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const dividerRef = useRef(null);
  
  // Function to handle card click - navigates to single property page
  const handleCardClick = (property) => {
    console.log("Property clicked:", property);
    // Navigate to the single property page with the property ID
    window.location.href = `/${property.id}`;
    // If you're using React Router, you would use:
    // navigate(`/${property.id}`);
  };
  
  // Handle mouse down on the divider
  const handleMouseDown = (e) => {
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  // Handle mouse movement during drag
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const container = dividerRef.current.parentElement;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = e.clientX - containerRect.left;
    
    // Calculate new widths (minimum 20% and maximum 80% for each panel)
    const newListingsWidth = Math.min(
      Math.max(mouseX / containerWidth * 100, 20),
      80
    );
    
    setListingsWidth(`${newListingsWidth}%`);
  };
  
  // Clean up event listeners
  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = '';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  
  // Set initial width based on screen size and handle resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setListingsWidth('100%');
      } else {
        setListingsWidth('50%');
        setShowMap(false); // Reset map visibility when switching to desktop
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white p-4 shadow-md">
        <div className="container mx-auto">
          <div className="mb-2">
            <label className="text-sm text-gray-600 block mb-1">Location</label>
            <input 
              type="text" 
              className="border p-2 rounded w-full"
              placeholder="City Location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filter Section - Scrollable on mobile */}
          <div className="flex overflow-x-auto pb-2 gap-3 mb-2">
            <div className="flex-shrink-0 w-24">
              <label className="text-sm text-gray-600">Type</label>
              <select 
                className="border p-2 rounded w-full"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">any</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
              </select>
            </div>
            
            <div className="flex-shrink-0 w-24">
              <label className="text-sm text-gray-600">Min Price</label>
              <select 
                className="border p-2 rounded w-full"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              >
                <option value="">any</option>
                <option value="500">$500</option>
                <option value="750">$750</option>
                <option value="1000">$1000</option>
              </select>
            </div>
            
            <div className="flex-shrink-0 w-24">
              <label className="text-sm text-gray-600">Max Price</label>
              <select 
                className="border p-2 rounded w-full"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              >
                <option value="">any</option>
                <option value="1000">$1000</option>
                <option value="1500">$1500</option>
                <option value="2000">$2000</option>
              </select>
            </div>
            
            <div className="flex-shrink-0 w-24">
              <label className="text-sm text-gray-600">Bedroom</label>
              <select 
                className="border p-2 rounded w-full"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              >
                <option value="">any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3+</option>
              </select>
            </div>
            
            <div className="flex-shrink-0 flex items-end">
              <button className="bg-yellow-400 text-white p-2 rounded flex items-center justify-center gap-1 hover:bg-yellow-500 transition-colors">
                <Search size={16} />
                <span className="font-bold">Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-1 relative" ref={dividerRef}>
        {/* Property Listings */}
        <div 
          className={`${isMobile ? 'w-full' : ''} overflow-y-auto h-screen pb-20 transition-all duration-300`}
          style={{ width: isMobile ? '100%' : listingsWidth }}
        >
          <div className="p-4 space-y-4">
            {propertyData.map((property) => (
              <div 
                key={property.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer" 
                onClick={() => handleCardClick(property)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3">
                    <div className="relative overflow-hidden h-48 md:h-full">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded text-sm font-bold">
                        {property.priceLabel}
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-2/3 p-4">
                    <h3 className="text-lg font-medium">{property.title}</h3>
                    <div className="flex items-center gap-1 mt-2 text-gray-600">
                      <MapPin size={16} />
                      <p className="text-sm">{property.address}</p>
                    </div>
                    <div className="flex gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <Bed size={16} />
                        <span className="text-sm">{property.bedrooms} bedroom</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath size={16} />
                        <span className="text-sm">{property.bathrooms} bathroom</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                      <button className="bg-gray-100 p-2 rounded hover:bg-gray-200 transition-colors">
                        <Heart size={16} className="text-gray-600" />
                      </button>
                      <button className="bg-gray-100 p-2 rounded hover:bg-gray-200 transition-colors">
                        <MessageSquare size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Draggable Divider - only show on larger screens */}
        {!isMobile && (
          <div 
            className={`w-2 bg-gray-200 hover:bg-yellow-400 cursor-col-resize flex items-center justify-center transition-colors ${isDragging ? 'bg-yellow-400' : ''}`}
            onMouseDown={handleMouseDown}
          >
            <GripVertical size={16} className="text-gray-500" />
          </div>
        )}
        
        {/* Map Container for Desktop */}
        {!isMobile && (
          <div 
            className="bg-gray-200 relative"
            style={{ width: `calc(100% - ${listingsWidth} - 8px)` }}
          >
            <div className="h-full w-full">
              <Map />
            </div>
          </div>
        )}
        
        {/* Full-screen Map for Mobile */}
        {isMobile && showMap && (
          <div className="fixed inset-0 z-50 bg-white">
            <div className="absolute top-0 left-0 right-0 bg-white p-4 flex justify-between items-center shadow-md z-10">
              <h2 className="font-bold">Map View</h2>
              <button 
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => setShowMap(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="h-full w-full pt-16">
              <Map />
            </div>
          </div>
        )}
        
        {/* Mobile Map Toggle Button */}
        {isMobile && !showMap && (
          <button 
            className="fixed bottom-4 right-4 bg-yellow-400 p-3 rounded-full shadow-lg z-10 flex items-center justify-center"
            onClick={() => setShowMap(true)}
            aria-label="Show Map"
          >
            <MapIcon size={24} className="text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Listing;