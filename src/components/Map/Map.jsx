import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix the default icon issue in React-Leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

// Geocoding coordinates for Nepalese cities (approximations)
const cityCoordinates = {
  "Kathmandu": [27.7172, 85.3240],
  "Pokhara": [28.2096, 83.9856],
  "Lalitpur": [27.6588, 85.3247],
  "Bhaktapur": [27.6710, 85.4298],
  "Nagarkot": [27.7111, 85.5211],
  "Chitwan": [27.5291, 84.3542],
  "Lumbini": [27.4833, 83.2767],
  "Manang": [28.6667, 84.0167],
  "Lukla": [27.6866, 86.7322],
  "Jomsom": [28.7806, 83.7167]
};

// Function to extract city from address string
const extractCity = (address) => {
  const parts = address.split(", ");
  return parts[parts.length - 1];
};

// Function to get coordinates based on city
const getCoordinates = (address) => {
  const city = extractCity(address);
  return cityCoordinates[city] || cityCoordinates["Kathmandu"];
};

const NepalPropertyMap = ({ propertyData }) => {
  // Center map on Nepal
  const centerPosition = [28.3949, 84.1240];
  const [priceFilter, setPriceFilter] = React.useState("all");
  
  // Filter properties based on selected price range
  const filteredProperties = priceFilter === "all" 
    ? propertyData 
    : propertyData.filter(property => property.priceRange === priceFilter);
  
  return (
    <div className="w-full h-96 md:h-screen relative">
      <div className="absolute top-4 right-4 z-10 bg-white p-2 rounded shadow-md">
        <select 
          className="text-sm p-1 border rounded"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="10-20k">Rs. 10,000 - 20,000</option>
          <option value="20-30k">Rs. 20,000 - 30,000</option>
          <option value="30-40k">Rs. 30,000 - 40,000</option>
          <option value="40-50k">Rs. 40,000 - 50,000</option>
          <option value="50-60k">Rs. 50,000 - 60,000</option>
        </select>
      </div>
      <MapContainer
        center={centerPosition}
        zoom={7}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <ZoomControl position="bottomright" />
        
        {/* Display property markers */}
        {filteredProperties.map((property) => (
          <Marker 
            key={property.id} 
            position={getCoordinates(property.address)}
          >
            <Popup className="property-popup">
              <div className="text-center">
                {/* Added image display */}
                <div className="mb-2">
                  <img 
                    src={property.image || "/api/placeholder/300/200"} 
                    alt={property.title}
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
                
                <h3 className="font-bold">{property.title}</h3>
                <p className="text-sm">{property.address}</p>
                <p className="text-sm mt-1">
                  {property.priceLabel} · {property.bedrooms} bd · {property.bathrooms} ba
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// Example usage with the property data
const NepalPropertyMapWithData = () => {
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

  return <NepalPropertyMap propertyData={propertyData} />;
};

// Add some custom styles to make the popup look better with images
// This would typically go in a CSS file, but is included here for completeness
const addCustomPopupStyles = () => {
  // Create style element if it doesn't exist
  if (!document.getElementById('leaflet-popup-styles')) {
    const style = document.createElement('style');
    style.id = 'leaflet-popup-styles';
    style.innerHTML = `
      .leaflet-popup-content {
        width: 220px !important;
        margin: 8px;
      }
      .leaflet-popup-content-wrapper {
        padding: 0;
        overflow: hidden;
      }
      .property-popup .leaflet-popup-content {
        margin: 0;
      }
      .property-popup .leaflet-popup-content-wrapper {
        border-radius: 8px;
      }
    `;
    document.head.appendChild(style);
  }
};

// Component wrapper that ensures styles are added when component mounts
const NepalPropertyMapWrapper = () => {
  React.useEffect(() => {
    addCustomPopupStyles();
  }, []);

  return <NepalPropertyMapWithData />;
};

export default NepalPropertyMapWrapper;