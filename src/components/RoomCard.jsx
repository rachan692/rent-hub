import React from 'react';
import { useNavigate } from 'react-router-dom';
import { propertyData } from '../lib/dummydata';

const RoomCard = () => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Available Properties</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {propertyData.map((property) => (
          <div 
            key={property.id}
            onClick={() => handleCardClick(property.id)}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleCardClick(property.id)}
            aria-label={`View details for ${property.title}`}
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 truncate">{property.title}</h3>
              <p className="text-gray-600 mb-2 text-sm line-clamp-2">{property.address}</p>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-yellow-500 font-bold">{property.priceLabel}</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {property.bedrooms}
                  </span>
                  <span className="flex items-center text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {property.bathrooms}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-700">
                  {property.priceRange}
                </span>
                <button 
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded text-sm transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(property.id);
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomCard;