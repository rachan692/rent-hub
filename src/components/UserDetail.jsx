import React, { useState, useEffect } from 'react';
import { User, MessageCircle, Home, List, PlusCircle } from 'lucide-react';

// Main component that handles the app's layout and state
const UserDetail = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [selectedChat, setSelectedChat] = useState(null);
  const [users, setUsers] = useState([]);
  
  // Mock data for chats
  const mockChats = [
    {
      id: 1,
      name: "Ram Kumar Thapa",
      image: "/api/placeholder/50/50",
      lastMessage: "Lorem ipsum dolor sit amet...",
      time: "12:30 PM",
      unread: true
    },
    {
      id: 2,
      name: "Binita Kumari",
      image: "/api/placeholder/50/50",
      lastMessage: "Lorem ipsum dolor sit amet...",
      time: "11:45 AM",
      unread: false
    },
    {
      id: 3,
      name: "Rajesh Gurung",
      image: "/api/placeholder/50/50",
      lastMessage: "Lorem ipsum dolor sit amet...",
      time: "Yesterday",
      unread: true
    },
    {
      id: 4,
      name: "Anita Shrestha",
      image: "/api/placeholder/50/50",
      lastMessage: "Lorem ipsum dolor sit amet...",
      time: "Yesterday",
      unread: false
    }
  ];

  // Mock data for property listings
  const listings = [
    {
      id: 1,
      title: "A Great Apartment Next to the Beach!",
      location: "456 Park Avenue, London",
      price: "$ 1000",
      bedrooms: 2,
      bathrooms: 1,
      image: "/api/placeholder/300/150"
    },
    {
      id: 2,
      title: "An Awesome Apartment Near the Park! Almost too good to be true!",
      location: "789 Oxford Street, London",
      price: "$ 1500",
      bedrooms: 3,
      bathrooms: 2,
      image: "/api/placeholder/300/150"
    }
  ];

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@email.com",
    avatar: "/api/placeholder/50/50"
  };

  // Set up initial chat data
  useEffect(() => {
    setUsers(mockChats);
  }, []);

  // Handle chat selection
  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    // In a real app, you would navigate to Chat.jsx
    // For demo purposes, we'll just switch to the chat view
    setActiveTab('chat');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Section - Profile or Listings */}
        <div className="w-full md:w-2/3 p-6 overflow-y-auto">
          {activeTab === 'profile' && (
            <ProfileView user={user} listings={listings} />
          )}
          {activeTab === 'messages' && (
            <MessagesView users={users} onChatSelect={handleChatSelect} />
          )}
          {activeTab === 'chat' && (
            <ChatView selectedUser={users.find(u => u.id === selectedChat)} />
          )}
        </div>
        
        {/* Right Section - Messages Preview (only on medium screens and larger) */}
        <div className="hidden md:block md:w-1/3 border-l border-gray-200 p-6 overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
          </div>
          <div className="space-y-4">
            {users.slice(0, 4).map(user => (
              <div key={user.id} className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer" onClick={() => handleChatSelect(user.id)}>
                <div className="relative">
                  <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                  {user.unread && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full"></span>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="font-medium text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
                </div>
                <span className="text-xs text-gray-500">{user.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation Bar */}
      <div className="bg-white shadow-md">
        <div className="flex justify-around p-3">
          <button
            className={`flex flex-col items-center px-4 py-2 rounded-md ${activeTab === 'profile' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={20} />
            <span className="text-xs mt-1">Profile</span>
          </button>
          <button
            className={`flex flex-col items-center px-4 py-2 rounded-md ${activeTab === 'messages' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}`}
            onClick={() => setActiveTab('messages')}
          >
            <MessageCircle size={20} />
            <span className="text-xs mt-1">Messages</span>
          </button>
          <button
            className={`flex flex-col items-center px-4 py-2 rounded-md ${activeTab === 'properties' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}`}
            onClick={() => setActiveTab('properties')}
          >
            <Home size={20} />
            <span className="text-xs mt-1">Properties</span>
          </button>
          <button
            className={`flex flex-col items-center px-4 py-2 rounded-md ${activeTab === 'lists' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}`}
            onClick={() => setActiveTab('lists')}
          >
            <List size={20} />
            <span className="text-xs mt-1">My Lists</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Profile view component
const ProfileView = ({ user, listings }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">User Information</h1>
        <button className="px-4 py-2 bg-yellow-400 text-gray-800 rounded-md hover:bg-yellow-500 transition">
          Update Profile
        </button>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <h2 className="text-gray-500">Avatar:</h2>
          </div>
          <div>
            <img src={user.avatar} alt="Profile" className="w-16 h-16 rounded-full" />
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <h2 className="text-gray-500">Username:</h2>
          </div>
          <div>
            <h2 className="text-gray-800">{user.name}</h2>
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <h2 className="text-gray-500">E-mail:</h2>
          </div>
          <div>
            <h2 className="text-gray-800">{user.email}</h2>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">My List</h2>
          <button className="flex items-center px-4 py-2 bg-yellow-400 text-gray-800 rounded-md hover:bg-yellow-500 transition">
            <PlusCircle size={16} className="mr-1" />
            Create New Post
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        {listings.map(listing => (
          <div key={listing.id} className="flex border border-gray-200 rounded-lg overflow-hidden bg-white">
            <div className="w-1/3">
              <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
            </div>
            <div className="w-2/3 p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-1">{listing.title}</h3>
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {listing.location}
              </div>
              <div className="text-yellow-500 font-semibold mb-3">{listing.price}</div>
              <div className="flex">
                <div className="flex items-center mr-4 text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                  </svg>
                  {listing.bedrooms} bedroom
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {listing.bathrooms} bathroom
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Messages view component
const MessagesView = ({ users, onChatSelect }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Messages</h1>
      <div className="space-y-2">
        {users.map(user => (
          <div 
            key={user.id} 
            className="flex items-center p-4 hover:bg-gray-100 rounded-lg cursor-pointer border border-gray-200 bg-white"
            onClick={() => onChatSelect(user.id)}
          >
            <div className="relative">
              <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              {user.unread && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full"></span>
              )}
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between">
                <h3 className="font-medium text-gray-800">{user.name}</h3>
                <span className="text-xs text-gray-500">{user.time}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Chat view component
const ChatView = ({ selectedUser }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: 'them',
      content: 'Hello! I am interested in your property listing.',
      time: '11:30 AM'
    },
    {
      id: 2,
      sender: 'me',
      content: 'Hi there! Which property are you interested in?',
      time: '11:32 AM'
    },
    {
      id: 3,
      sender: 'them',
      content: 'The luxury suite near Durbar Marg. Is it still available?',
      time: '11:33 AM'
    },
    {
      id: 4,
      sender: 'me',
      content: 'Yes, it is! Would you like to schedule a viewing?',
      time: '11:35 AM'
    }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      setChatHistory([
        ...chatHistory,
        {
          id: chatHistory.length + 1,
          sender: 'me',
          content: message,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setMessage('');
      
      // Simulate a reply
      setTimeout(() => {
        setChatHistory(prev => [
          ...prev,
          {
            id: prev.length + 1,
            sender: 'them',
            content: 'Thanks for your response',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 1000);
    }
  };

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No chat selected</h2>
          <p className="text-gray-500">Select a conversation to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center p-4 border-b border-gray-200 bg-white">
        <img src={selectedUser.image} alt={selectedUser.name} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <h2 className="font-medium text-gray-800">{selectedUser.name}</h2>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {chatHistory.map(msg => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-3/4 rounded-lg px-4 py-2 ${
                msg.sender === 'me' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              <p>{msg.content}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Chat input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;