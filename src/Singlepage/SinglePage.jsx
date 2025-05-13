import React, { useState, useEffect } from 'react';
import { MapPin, Heart,MessageCircle, Share2, ArrowLeft, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
// import { Heart, Share2, MessageCircle } from "lucide-react";
const properties = [
  {
    id: 1,
    title: "Luxury Suite Near Durbar Marg",
    address: "123 Durbar Marg, Kathmandu",
    price: 32000,
    priceLabel: "Rs. 32,000/month",
    description: "Premium suite in Kathmandu's most prestigious area. Features modern furnishings, high-speed internet, and 24/7 security. Walking distance to major attractions.",
    images: [
      "/images/room1.jpg",
      "/images/1a.jpg",
      "/images/1b.jpg",
    
    ],
    details: {
      bedrooms: 2,
      bathrooms: 1,
      size: "75sq.m (807sqft)",
      builtYear: 2018,
      floor: "3rd floor"
    },
    amenities: {
      utilities: "Water included",
      petPolicy: "Small pets allowed",
      propertyFees: "1 month deposit required",
      features: ["Air conditioning", "Balcony", "Fully furnished"]
    },
    nearbyPlaces: [
      { type: "Restaurant", name: "Roadhouse Cafe", distance: "150m away" },
      { type: "Shopping", name: "Durbar Marg Mall", distance: "200m away" },
      { type: "Park", name: "Garden of Dreams", distance: "300m away" }
    ],
    owner: {
      name: "Ram Kumar Thapa",
      profileImage: "/src/assets/images/owner1.jpg",
      rating: 4.9,
      responseRate: "98%",
      responseTime: "within 30 minutes",
      verified: true,
      phonenumber:9800987854,
    },
    location: {
      lat: 27.7172,
      lng: 85.3240,
    },
    priceRange: "30-40k"
  },
  {
    id: 2,
    title: "Spacious Thamel Apartment - Prime Location",
    address: "456 Thamel Street, Kathmandu",
    price: 45000,
    priceLabel: "Rs. 45,000/month",
    description: "Large apartment in vibrant Thamel area. Perfect for those who want to be in the center of Kathmandu's nightlife and cultural scene.",
    images: [
     "/images/room2.jpg",
     "/images/2a.jpg",
     "/images/2b.jpg",
      
    ],
    details: {
      bedrooms: 3,
      bathrooms: 2,
      size: "110sq.m (1184sqft)",
      builtYear: 2015,
      floor: "2nd floor"
    },
    amenities: {
      utilities: "All utilities included",
      petPolicy: "No pets allowed",
      propertyFees: "2 months deposit required",
      features: ["WiFi", "Kitchen", "Laundry"]
    },
    nearbyPlaces: [
      { type: "Restaurant", name: "OR2K", distance: "50m away" },
      { type: "Shopping", name: "Thamel Market", distance: "100m away" },
      { type: "Tourist", name: "Kathmandu Guest House", distance: "150m away" }
    ],
    owner: {
      name: "Binita Kumari",
      profileImage: "/src/assets/images/owner2.jpg",
      rating: 4.7,
      responseRate: "92%",
      responseTime: "within 2 hours",
      verified: true,
      phonenumber:982986908,

    },
    location: {
      lat: 27.7162,
      lng: 85.3120,
    },
    priceRange: "40-50k"
  },
  {
    id: 3,
    title: "Affordable Studio with Lakeside Views",
    address: "78 Lakeside Road, Pokhara",
    price: 18000,
    priceLabel: "Rs. 18,000/month",
    description: "Cozy studio apartment with breathtaking views of Phewa Lake. Ideal for solo travelers or couples. Includes basic kitchenette.",
    images: [
     "/images/room3.jpg",
     "/images/3a.jpg",
     "/images/3b.jpg",
     
    ],
    details: {
      bedrooms: 1,
      bathrooms: 1,
      size: "40sq.m (430sqft)",
      builtYear: 2020,
      floor: "Ground floor"
    },
    amenities: {
      utilities: "Electricity extra",
      petPolicy: "Cats allowed",
      propertyFees: "1 month deposit",
      features: ["Lake view", "Balcony", "Basic kitchen"]
    },
    nearbyPlaces: [
      { type: "Lake", name: "Phewa Lake", distance: "50m away" },
      { type: "Restaurant", name: "Moondance Restaurant", distance: "100m away" },
      { type: "BusStop", name: "Lakeside Bus Park", distance: "200m away" }
    ],
    owner: {
      name: "Rajesh Gurung",
      profileImage: "/src/assets/images/owner3.jpg",
      rating: 4.5,
      responseRate: "90%",
      responseTime: "within 3 hours",
      verified: false,
      phonenumber:9867587854,

    },
    location: {
      lat: 28.2096,
      lng: 83.9856,
    },
    priceRange: "10-20k"
  },
  {
    id: 4,
    title: "Modern Flat with Phewa Lake Panorama",
    address: "234 Phewa Lake View, Pokhara",
    price: 25000,
    priceLabel: "Rs. 25,000/month",
    description: "Contemporary flat offering stunning panoramic views of Phewa Lake and the Annapurna range. Recently renovated with modern amenities.",
    images: [
      "/images/room4.jpg",
      "/images/4a.jpg",
      "/images/4b.jpg",
   
    ],
    details: {
      bedrooms: 2,
      bathrooms: 1,
      size: "65sq.m (700sqft)",
      builtYear: 2019,
      floor: "5th floor"
    },
    amenities: {
      utilities: "Water and electricity included",
      petPolicy: "Small dogs allowed",
      propertyFees: "1.5 months deposit",
      features: ["Lake view", "Elevator", "Modern bathroom"]
    },
    nearbyPlaces: [
      { type: "Lake", name: "Phewa Lake", distance: "100m away" },
      { type: "Restaurant", name: "Busy Bee Cafe", distance: "150m away" },
      { type: "Hospital", name: "Manipal Hospital", distance: "1km away" }
    ],
    owner: {
      name: "Anita Shrestha",
      profileImage: "/src/assets/images/owner4.jpg",
      rating: 4.8,
      responseRate: "95%",
      responseTime: "within 1 hour",
      verified: true,
      phonenumber:9869870965,

    },
    location: {
      lat: 28.2100,
      lng: 83.9800,
    },
    priceRange: "20-30k"
  },
  {
    id: 5,
    title: "Heritage Home Near Patan Durbar",
    address: "567 Patan Durbar Square, Lalitpur",
    price: 55000,
    priceLabel: "Rs. 55,000/month",
    description: "Beautifully restored Newari heritage home just steps from Patan Durbar Square. Combines traditional architecture with modern comforts.",
    images: [
     "/images/room5.jpg",
     "/images/5a.jpg",
     "/images/5b.jpg",
      
    ],
    details: {
      bedrooms: 3,
      bathrooms: 2,
      size: "150sq.m (1615sqft)",
      builtYear: 1930,
      floor: "1st floor"
    },
    amenities: {
      utilities: "All utilities included",
      petPolicy: "No pets allowed",
      propertyFees: "2 months deposit",
      features: ["Courtyard", "Wood carvings", "Traditional architecture"]
    },
    nearbyPlaces: [
      { type: "Heritage", name: "Patan Durbar Square", distance: "50m away" },
      { type: "Museum", name: "Patan Museum", distance: "100m away" },
      { type: "Temple", name: "Krishna Mandir", distance: "150m away" }
    ],
    owner: {
      name: "Prakash Maharjan",
      profileImage: "/src/assets/images/owner5.jpg",
      rating: 4.9,
      responseRate: "97%",
      responseTime: "within 30 minutes",
      verified: true,
      phonenumber:9889987854,

    },
    location: {
      lat: 27.6765,
      lng: 85.3250,
    },
    priceRange: "50-60k"
  },
  {
    id: 6,
    title: "Charming Newari-Style Apartment",
    address: "890 Bhaktapur Road, Bhaktapur",
    price: 22000,
    priceLabel: "Rs. 22,000/month",
    description: "Authentic Newari-style apartment in the heart of Bhaktapur. Features traditional woodwork and a peaceful courtyard.",
    images: [
      "/images/room6.jpg",
      "/images/6a.jpg",
      "/images/6b.jpg",
    
    ],
    details: {
      bedrooms: 1,
      bathrooms: 1,
      size: "55sq.m (592sqft)",
      builtYear: 1995,
      floor: "Ground floor"
    },
    amenities: {
      utilities: "Water included",
      petPolicy: "Birds allowed",
      propertyFees: "1 month deposit",
      features: ["Courtyard", "Traditional decor", "Quiet location"]
    },
    nearbyPlaces: [
      { type: "Heritage", name: "Bhaktapur Durbar Square", distance: "200m away" },
      { type: "Pottery", name: "Pottery Square", distance: "300m away" },
      { type: "Restaurant", name: "Nyatapola Cafe", distance: "150m away" }
    ],
    owner: {
      name: "Sunita Bajracharya",
      profileImage: "/src/assets/images/owner6.jpg",
      rating: 4.6,
      responseRate: "91%",
      responseTime: "within 2 hours",
      verified: false,
      phonenumber:9800966854,

    },
    location: {
      lat: 27.6720,
      lng: 85.4280,
    },
    priceRange: "20-30k"
  },
  {
    id: 7,
    title: "Cozy Hillside Retreat with Sunrise Views",
    address: "123 Nagarkot Hill, Nagarkot",
    price: 28000,
    priceLabel: "Rs. 28,000/month",
    description: "Peaceful hillside retreat offering spectacular sunrise views over the Himalayas. Perfect for nature lovers and writers.",
    images: [
     "/images/room7.jpg",
     "/images/7a.jpg",
     "/images/7b.jpg",

     
    ],
    details: {
      bedrooms: 2,
      bathrooms: 1,
      size: "70sq.m (753sqft)",
      builtYear: 2010,
      floor: "1st floor"
    },
    amenities: {
      utilities: "All utilities included",
      petPolicy: "Pets considered",
      propertyFees: "1 month deposit",
      features: ["Mountain view", "Fireplace", "Garden"]
    },
    nearbyPlaces: [
      { type: "Viewpoint", name: "Nagarkot Tower", distance: "500m away" },
      { type: "Hiking", name: "Nagarkot Hiking Trail", distance: "200m away" },
      { type: "Restaurant", name: "Club Himalaya", distance: "1km away" }
    ],
    owner: {
      name: "Hari Prasad",
      profileImage: "/src/assets/images/owner7.jpg",
      rating: 4.7,
      responseRate: "93%",
      responseTime: "within 1 hour",
      verified: true,
      phonenumber:98412987854,

    },
    location: {
      lat: 27.7151,
      lng: 85.5200,
    },
    priceRange: "20-30k"
  },
  {
    id: 8,
    title: "Jungle-Side Getaway - Perfect for Nature Lovers",
    address: "345 Chitwan Jungle Road, Chitwan",
    price: 20000,
    priceLabel: "Rs. 20,000/month",
    description: "Unique jungle-side cottage just minutes from Chitwan National Park. Wake up to sounds of birds and wildlife.",
    images: [
      "/src/assets/images/room7.jpg",
      "/src/assets/images/7a.jpg",
      "/src/assets/images/7b.jpg",
    ],
    details: {
      bedrooms: 2,
      bathrooms: 1,
      size: "60sq.m (646sqft)",
      builtYear: 2015,
      floor: "Ground floor"
    },
    amenities: {
      utilities: "Electricity included",
      petPolicy: "No pets (wildlife nearby)",
      propertyFees: "1 month deposit",
      features: ["Jungle view", "Veranda", "Ceiling fans"]
    },
    nearbyPlaces: [
      { type: "Park", name: "Chitwan National Park", distance: "1km away" },
      { type: "River", name: "Rapti River", distance: "500m away" },
      { type: "Safari", name: "Elephant Safari Point", distance: "1.5km away" }
    ],
    owner: {
      name: "Ramesh Chaudhary",
      profileImage: "/src/assets/images/owner8.jpg",
      rating: 4.4,
      responseRate: "88%",
      responseTime: "within 4 hours",
      verified: false,
      phonenumber:9816987854,

    },
    location: {
      lat: 27.5800,
      lng: 84.5075,
    },
    priceRange: "20-30k"
  },
  {
    id: 9,
    title: "Peaceful Sanctuary Near Buddha's Birthplace",
    address: "678 Lumbini Peace Park, Lumbini",
    price: 15000,
    priceLabel: "Rs. 15,000/month",
    description: "Serene accommodation near the sacred Maya Devi Temple. Ideal for pilgrims and those seeking spiritual retreat.",
    images: [
      "/src/assets/images/room8.jpg",
      "/src/assets/images/8a.jpg",
      "/src/assets/images/8b.jpg",
    ],
    details: {
      bedrooms: 1,
      bathrooms: 1,
      size: "45sq.m (484sqft)",
      builtYear: 2018,
      floor: "Ground floor"
    },
    amenities: {
      utilities: "Water included",
      petPolicy: "No pets",
      propertyFees: "1 month deposit",
      features: ["Peaceful atmosphere", "Garden", "Simple furnishings"]
    },
    nearbyPlaces: [
      { type: "Temple", name: "Maya Devi Temple", distance: "500m away" },
      { type: "Monastery", name: "World Peace Pagoda", distance: "1km away" },
      { type: "Museum", name: "Lumbini Museum", distance: "800m away" }
    ],
    owner: {
      name: "Lama Tenzin",
      profileImage: "/src/assets/images/owner9.jpg",
      rating: 4.8,
      responseRate: "96%",
      responseTime: "within 2 hours",
      verified: true,
      phonenumber:9842987854,

    },
    location: {
      lat: 27.4698,
      lng: 83.2757,
    },
    priceRange: "10-20k"
  },
  {
    id: 10,
    title: "Mountain Adventure Base Camp Living",
    address: "901 Annapurna Base, Manang",
    price: 24000,
    priceLabel: "Rs. 24,000/month",
    description: "Rustic yet comfortable accommodation in the heart of the Himalayas. Perfect base for trekkers and adventure seekers.",
    images: [
      "/src/assets/images/room9.jpg",
      "/src/assets/images/9a.jpg",
      "/src/assets/images/9b.jpg",
    ],
    details: {
      bedrooms: 2,
      bathrooms: 1,
      size: "50sq.m (538sqft)",
      builtYear: 2012,
      floor: "1st floor"
    },
    amenities: {
      utilities: "Electricity limited",
      petPolicy: "No pets",
      propertyFees: "1 month deposit",
      features: ["Mountain view", "Heating", "Basic kitchen"]
    },
    nearbyPlaces: [
      { type: "Trail", name: "Annapurna Circuit", distance: "100m away" },
      { type: "Mountain", name: "Gangapurna View", distance: "500m away" },
      { type: "Cafe", name: "Himalayan Java", distance: "200m away" }
    ],
    owner: {
      name: "Sherpa Dorje",
      profileImage: "/src/assets/images/owner10.jpg",
      rating: 4.3,
      responseRate: "85%",
      responseTime: "within 6 hours",
      verified: false,
    phoneno:9826846154,
    },
    location: {
      lat: 28.6667,
      lng: 84.0167,
    },
    priceRange: "20-30k"
  },
  {
    id: 11,
    title: "Everest Trekker's Dream Apartment",
    address: "234 Everest View Street, Lukla",
    price: 35000,
    priceLabel: "Rs. 35,000/month",
    description: "Comfortable apartment with stunning Everest views. Ideal for trekkers preparing for or recovering from their journey.",
    images: [
    '/src/assets/images/room10.jpg',
    '/src/assets/images/10a.jpg',
    '/src/assets/images/10b.jpg'
    ],
    details: {
      bedrooms: 2,
      bathrooms: 2,
      size: "80sq.m (861sqft)",
      builtYear: 2016,
      floor: "2nd floor"
    },
    amenities: {
      utilities: "All utilities included",
      petPolicy: "No pets",
      propertyFees: "1.5 months deposit",
      features: ["Everest view", "Hot shower", "Common lounge"]
    },
    nearbyPlaces: [
      { type: "Airport", name: "Tenzing-Hillary Airport", distance: "1km away" },
      { type: "Trail", name: "Everest Base Camp Trail", distance: "500m away" },
      { type: "Cafe", name: "Starbucks Highest Outlet", distance: "200m away" }
    ],
    owner: {
      name: "Ang Rita Sherpa",
      profileImage: "/src/assets/images/owner11.jpg",
      rating: 4.9,
      responseRate: "99%",
      responseTime: "within 30 minutes",
      verified: true,
      phonenumber:9800987984,

    },
    location: {
      lat: 27.6879,
      lng: 86.7314,
    },
    priceRange: "30-40k"
  },
  {
    id: 12,
    title: "Authentic Mustang Valley Home - Scenic Views",
    address: "567 Mustang Valley, Jomsom",
    price: 19000,
    priceLabel: "Rs. 19,000/month",
    description: "Traditional Mustangi home with breathtaking valley views. Experience authentic Himalayan culture in comfort.",
    images: [
      "/src/assets/images/room12.jpg",
      "/src/assets/images/12a.jpg",
      "/src/assets/images/12b.jpg",
    ],
    details: {
      bedrooms: 2,
      bathrooms: 1,
      size: "65sq.m (700sqft)",
      builtYear: 2008,
      floor: "Ground floor"
    },
    amenities: {
      utilities: "Electricity included",
      petPolicy: "No pets",
      propertyFees: "1 month deposit",
      features: ["Valley view", "Traditional decor", "Sun terrace"]
    },
    nearbyPlaces: [
      { type: "Valley", name: "Kali Gandaki Valley", distance: "500m away" },
      { type: "Temple", name: "Jomsom Monastery", distance: "1km away" },
      { type: "Airport", name: "Jomsom Airport", distance: "2km away" }
    ],
    owner: {
      name: "Dolma Gurung",
      profileImage: "/src/assets/images/owner12.jpg",
      rating: 4.5,
      responseRate: "89%",
      responseTime: "within 3 hours",
      verified: false,
      phonenumber:9813987854,

    },
    location: {
      lat: 28.7833,
      lng: 83.7333,
    },
    priceRange: "10-20k"
  }
];

const SinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mapZoom, setMapZoom] = useState(13);
  const [property, setProperty] = useState(properties[0]);
  
  useEffect(() => {
    const foundProperty = properties.find(p => p.id === parseInt(id));
    if (foundProperty) {
      setProperty(foundProperty);
      setCurrentImageIndex(0);
    }
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };
  
  const zoomIn = () => {
    setMapZoom(prev => Math.min(prev + 1, 18));
  };
  
  const zoomOut = () => {
    setMapZoom(prev => Math.max(prev - 1, 8));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Back button */}
      <div className="container mx-auto px-4 py-4">
        <button 
          className="flex items-center text-gray-600 hover:text-gray-900"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Back to listings</span>
        </button>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Images and details */}
          <div className="w-full lg:w-8/12">
            {/* Image gallery */}
            <div className="relative rounded-lg overflow-hidden bg-gray-200 h-80 md:h-96">
              <img 
                src={property.images[currentImageIndex]} 
                alt={`Property view ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x600?text=Property+Image";
                }}
              />
              
              {/* Image navigation buttons */}
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <button 
                  className="bg-white/70 hover:bg-white/90 rounded-full p-2"
                  onClick={prevImage}
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  className="bg-white/70 hover:bg-white/90 rounded-full p-2"
                  onClick={nextImage}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              
              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {property.images.length}
              </div>
            </div>
            
            {/* Thumbnail strip */}
            <div className="hidden md:flex gap-2 mt-4">
              {property.images.map((img, index) => (
                <div 
                  key={index} 
                  className={`w-24 h-20 rounded-lg overflow-hidden cursor-pointer ${
                    index === currentImageIndex ? 'ring-2 ring-yellow-400' : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/100?text=Thumbnail";
                    }}
                  />
                </div>
              ))}
            </div>
            
            {/* Property details */}
            <div className="mt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
                <div className="text-xl font-semibold text-yellow-600">
                  {property.priceLabel}
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin size={18} className="mr-1" />
                <span>{property.address}</span>
              </div>
              
              <p className="text-gray-700 mt-4">
                {property.description}
              </p>
              
              <div className="border-t border-gray-200 mt-6 pt-6">
                <h2 className="text-lg font-semibold mb-4">Property Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Size</div>
                      <div className="font-medium">{property.details.size}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                        <path d="M2 4v16" />
                        <path d="M22 4v16" />
                        <path d="M4 8h8" />
                        <path d="M12 8h8" />
                        <path d="M4 12h6" />
                        <path d="M14 12h6" />
                        <path d="M4 16h10" />
                        <path d="M18 16h2" />
                        <path d="M18 4v16" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Bedrooms</div>
                      <div className="font-medium">{property.details.bedrooms} {property.details.bedrooms > 1 ? 'beds' : 'bed'}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                        <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                        <line x1="10" y1="4" x2="16" y2="4" />
                        <path d="M15 4v4" />
                        <path d="M22 6c-2 2-4 2-6 0" />
                        <path d="M17 14v.01" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Bathrooms</div>
                      <div className="font-medium">{property.details.bathrooms} {property.details.bathrooms > 1 ? 'bathrooms' : 'bathroom'}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Built Year</div>
                      <div className="font-medium">{property.details.builtYear}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Floor</div>
                      <div className="font-medium">{property.details.floor}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-lg mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                        <path d="M12 2v4" />
                        <path d="M5 10v4a7 7 0 0 0 14 0v-4" />
                        <path d="M5 10a7 7 0 0 1 14 0" />
                        <path d="M19 10v4a7 7 0 0 1-14 0v-4" />
                        <path d="M12 18a4 4 0 0 1-4-4v-4a4 4 0 0 1 8 0v4a4 4 0 0 1-4 4z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Price Range</div>
                      <div className="font-medium">Rs. {property.priceRange}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities Features */}
              {property.amenities.features && (
                <div className="border-t border-gray-200 mt-6 pt-6">
                  <h2 className="text-lg font-semibold mb-4">Features</h2>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.features.map((feature, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right column - Owner info, amenities, location */}
          <div className="w-full lg:w-4/12">
            {/* Owner card */}
            <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-100">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Link to='/detail' >
                  <img 
                    src={property.owner.profileImage} 
                    alt={property.owner.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/100?text=Owner";
                    }}
                  />
                  </Link>
                </div>
                
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{property.owner.name}</h3>
                    {property.owner.verified && (
                      <svg className="w-4 h-4 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">Property Owner</p>
                  <div className="flex items-center mt-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-gray-600 ml-1">
                      {property.owner.rating} ({property.owner.responseRate} response rate)
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Typically responds {property.owner.responseTime}</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded transition-colors">
{property.owner.phonenumber}
  </button>

  {/* Chat Icon */}
  <div className="flex justify-center mt-4">
    <button className="flex items-center text-gray-600 hover:text-yellow-600">
      <MessageCircle size={20} className="mr-1" />
      <span>Chat with Owner</span>
    </button>
  </div>

  <div className="flex justify-center gap-4 mt-4">
    <button className="flex items-center text-gray-600 hover:text-yellow-600">
      <Heart size={18} className="mr-1" />
      <span>Save</span>
    </button>
    <button className="flex items-center text-gray-600 hover:text-yellow-600">
      <Share2 size={18} className="mr-1" />
      <span>Share</span>
    </button>
  </div>
</div>
            </div>
            
            {/* General info */}
            <div className="mt-6 bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Policies</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                      <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                      <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Utilities</div>
                    <div className="text-sm text-gray-500">{property.amenities.utilities}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M10 10C10 9.44772 10.4477 9 11 9H12C12.5523 9 13 9.44772 13 10V15.5C13 15.7761 13.2239 16 13.5 16H14.5C14.7761 16 15 15.7761 15 15.5V10C15 8.34315 13.6569 7 12 7H11C9.34315 7 8 8.34315 8 10V15.5C8 15.7761 8.22386 16 8.5 16H9.5C9.77614 16 10 15.7761 10 15.5V10Z" />
                      <path d="M16 10.5C16 11.3284 15.3284 12 14.5 12H9C8.44772 12 8 11.5523 8 11V10" />
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Pet Policy</div>
                    <div className="text-sm text-gray-500">{property.amenities.petPolicy}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M2 20h.01" />
                      <path d="M7 20v-4" />
                      <path d="M12 20v-8" />
                      <path d="M17 20V8" />
                      <path d="M22 4v16" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Property Fees</div>
                    <div className="text-sm text-gray-500">{property.amenities.propertyFees}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Nearby places */}
            <div className="mt-6 bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Nearby Places</h3>
              
              <div className="space-y-4">
                {property.nearbyPlaces.map((place, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                      {place.type === "School" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M2 6h20" />
                          <path d="M18 6v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6" />
                          <path d="M10 16h4" />
                        </svg>
                      )}
                      {place.type === "BusStop" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M8 6v6" />
                          <path d="M15 6v6" />
                          <path d="M9 12h6" />
                          <path d="M12 12v3" />
                          <path d="M6 19v2" />
                          <path d="M18 21V19" />
                          <rect x="4" y="3" width="16" height="16" rx="2" />
                        </svg>
                      )}
                      {place.type === "Restaurant" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M7 10h10" />
                          <path d="M7 14h10" />
                          <circle cx="12" cy="12" r="9" />
                        </svg>
                      )}
                      {place.type === "Shopping" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                          <path d="M3 6h18" />
                          <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                      )}
                      {place.type === "Tourist" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      )}
                      {place.type === "Park" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M12 2v4" />
                          <path d="M5 10v4a7 7 0 0 0 14 0v-4" />
                          <path d="M5 10a7 7 0 0 1 14 0" />
                          <path d="M19 10v4a7 7 0 0 1-14 0v-4" />
                          <path d="M12 18a4 4 0 0 1-4-4v-4a4 4 0 0 1 8 0v4a4 4 0 0 1-4 4z" />
                        </svg>
                      )}
                      {place.type === "Lake" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M12 2v4" />
                          <path d="M5 10v4a7 7 0 0 0 14 0v-4" />
                          <path d="M5 10a7 7 0 0 1 14 0" />
                          <path d="M19 10v4a7 7 0 0 1-14 0v-4" />
                          <path d="M12 18a4 4 0 0 1-4-4v-4a4 4 0 0 1 8 0v4a4 4 0 0 1-4 4z" />
                        </svg>
                      )}
                      {place.type === "Hospital" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                          <line x1="6" y1="1" x2="6" y2="4" />
                          <line x1="10" y1="1" x2="10" y2="4" />
                          <line x1="14" y1="1" x2="14" y2="4" />
                        </svg>
                      )}
                      {place.type === "Heritage" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M12 2v4" />
                          <path d="M5 10v4a7 7 0 0 0 14 0v-4" />
                          <path d="M5 10a7 7 0 0 1 14 0" />
                          <path d="M19 10v4a7 7 0 0 1-14 0v-4" />
                          <path d="M12 18a4 4 0 0 1-4-4v-4a4 4 0 0 1 8 0v4a4 4 0 0 1-4 4z" />
                        </svg>
                      )}
                      {place.type === "Museum" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M3 11l19-9-9 19-2-8-8-2z" />
                        </svg>
                      )}
                      {place.type === "Temple" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M12 2v4" />
                          <path d="M5 10v4a7 7 0 0 0 14 0v-4" />
                          <path d="M5 10a7 7 0 0 1 14 0" />
                          <path d="M19 10v4a7 7 0 0 1-14 0v-4" />
                          <path d="M12 18a4 4 0 0 1-4-4v-4a4 4 0 0 1 8 0v4a4 4 0 0 1-4 4z" />
                        </svg>
                      )}
                      {place.type === "Viewpoint" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                      {place.type === "Hiking" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M12 2v4" />
                          <path d="M5 10v4a7 7 0 0 0 14 0v-4" />
                          <path d="M5 10a7 7 0 0 1 14 0" />
                          <path d="M19 10v4a7 7 0 0 1-14 0v-4" />
                          <path d="M12 18a4 4 0 0 1-4-4v-4a4 4 0 0 1 8 0v4a4 4 0 0 1-4 4z" />
                        </svg>
                      )}
                      {place.type === "Airport" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      )}
                      {place.type === "Trail" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M12 2v4" />
                          <path d="M5 10v4a7 7 0 0 0 14 0v-4" />
                          <path d="M5 10a7 7 0 0 1 14 0" />
                          <path d="M19 10v4a7 7 0 0 1-14 0v-4" />
                          <path d="M12 18a4 4 0 0 1-4-4v-4a4 4 0 0 1 8 0v4a4 4 0 0 1-4 4z" />
                        </svg>
                      )}
                      {place.type === "Monastery" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M12 2v4" />
                          <path d="M5 10v4a7 7 0 0 0 14 0v-4" />
                          <path d="M5 10a7 7 0 0 1 14 0" />
                          <path d="M19 10v4a7 7 0 0 1-14 0v-4" />
                          <path d="M12 18a4 4 0 0 1-4-4v-4a4 4 0 0 1 8 0v4a4 4 0 0 1-4 4z" />
                        </svg>
                      )}
                      {place.type === "Cafe" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                          <line x1="6" y1="1" x2="6" y2="4" />
                          <line x1="10" y1="1" x2="10" y2="4" />
                          <line x1="14" y1="1" x2="14" y2="4" />
                        </svg>
                      )}
                      {place.type === "River" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M12 2v4" />
                          <path d="M5 10v4a7 7 0 0 0 14 0v-4" />
                          <path d="M5 10a7 7 0 0 1 14 0" />
                          <path d="M19 10v4a7 7 0 0 1-14 0v-4" />
                          <path d="M12 18a4 4 0 0 1-4-4v-4a4 4 0 0 1 8 0v4a4 4 0 0 1-4 4z" />
                        </svg>
                      )}
                      {place.type === "Safari" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M12 2v4" />
                          <path d="M5 10v4a7 7 0 0 0 14 0v-4" />
                          <path d="M5 10a7 7 0 0 1 14 0" />
                          <path d="M19 10v4a7 7 0 0 1-14 0v-4" />
                          <path d="M12 18a4 4 0 0 1-4-4v-4a4 4 0 0 1 8 0v4a4 4 0 0 1-4 4z" />
                        </svg>
                      )}
                      {place.type === "Mountain" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M12 2v4" />
                          <path d="M5 10v4a7 7 0 0 0 14 0v-4" />
                          <path d="M5 10a7 7 0 0 1 14 0" />
                          <path d="M19 10v4a7 7 0 0 1-14 0v-4" />
                          <path d="M12 18a4 4 0 0 1-4-4v-4a4 4 0 0 1 8 0v4a4 4 0 0 1-4 4z" />
                        </svg>
                      )}
                      {place.type === "Valley" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M12 2v4" />
                          <path d="M5 10v4a7 7 0 0 0 14 0v-4" />
                          <path d="M5 10a7 7 0 0 1 14 0" />
                          <path d="M19 10v4a7 7 0 0 1-14 0v-4" />
                          <path d="M12 18a4 4 0 0 1-4-4v-4a4 4 0 0 1 8 0v4a4 4 0 0 1-4 4z" />
                        </svg>
                      )}
                      {place.type === "Pottery" && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                          <path d="M12 2v4" />
                          <path d="M5 10v4a7 7 0 0 0 14 0v-4" />
                          <path d="M5 10a7 7 0 0 1 14 0" />
                          <path d="M19 10v4a7 7 0 0 1-14 0v-4" />
                          <path d="M12 18a4 4 0 0 1-4-4v-4a4 4 0 0 1 8 0v4a4 4 0 0 1-4 4z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{place.name}</div>
                      <div className="text-sm text-gray-500">{place.distance}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Location */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Location</h3>
              <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  title="Property Location"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.location.lng - 0.01}%2C${property.location.lat - 0.01}%2C${property.location.lng + 0.01}%2C${property.location.lat + 0.01}&amp;layer=mapnik&amp;marker=${property.location.lat}%2C${property.location.lng}`}
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
                
                {/* Map zoom controls */}
                <div className="absolute top-2 right-2 flex flex-col">
                  <button 
                    className="bg-white p-1 rounded-t border border-gray-300 hover:bg-gray-100"
                    onClick={zoomIn}
                  >
                    <Plus size={16} />
                  </button>
                  <button 
                    className="bg-white p-1 rounded-b border-t-0 border border-gray-300 hover:bg-gray-100"
                    onClick={zoomOut}
                  >
                    <Minus size={16} />
                  </button>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                © OpenStreetMap contributors
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact fixed bar - Mobile only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-600">Price</div>
          <div className="font-bold text-lg">{property.priceLabel}</div>
        </div>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 px-6 rounded transition-colors">
          Contact Owner
        </button>
      </div>
    </div>
  );
};

export default SinglePage;