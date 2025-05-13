import React, { useState } from 'react';
import { User } from 'lucide-react';

const Chat = ({ selectedUser, onBack }) => {
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

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center p-4 border-b border-gray-200 bg-white">
        <button onClick={onBack} className="mr-2 md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        {selectedUser ? (
          <>
            <img src={selectedUser.image} alt={selectedUser.name} className="w-10 h-10 rounded-full mr-3" />
            <div>
              <h2 className="font-medium text-gray-800">{selectedUser.name}</h2>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </>
        ) : (
          <div className="flex items-center">
            <User className="w-10 h-10 rounded-full mr-3 bg-gray-200 p-2" />
            <div>
              <h2 className="font-medium text-gray-800">Select a chat</h2>
            </div>
          </div>
        )}
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {selectedUser ? (
          chatHistory.map(msg => (
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
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No chat selected</h2>
              <p className="text-gray-500">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Chat input */}
      {selectedUser && (
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
      )}
    </div>
  );
};

export default Chat;