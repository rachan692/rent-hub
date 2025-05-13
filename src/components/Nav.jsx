import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-lg">
      {/* Desktop Navigation */}
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-20">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-3"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="font-bold text-xl">Rent Hub</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 text-lg">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 text-lg">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-gray-900 text-lg">Contact</Link>
            <Link to="/agents" className="text-gray-700 hover:text-gray-900 text-lg">Agents</Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 rounded-lg hover:bg-gray-100 text-lg">Sign In</button>
            <button className="px-4 py-2 bg-yellow-400 rounded-lg hover:bg-yellow-500 text-lg">Sign Up</button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-3 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg 
                className={`${isMenuOpen ? 'hidden' : 'block'} h-8 w-8`}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg 
                className={`${isMenuOpen ? 'block' : 'hidden'} h-8 w-8`}
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-4 pt-4 pb-4 space-y-2 sm:px-6">
          <Link to="/" className="block px-4 py-3 rounded-lg text-lg font-medium hover:bg-gray-100">Home</Link>
          <Link to="/about" className="block px-4 py-3 rounded-lg text-lg font-medium hover:bg-gray-100">About</Link>
          <Link to="/contact" className="block px-4 py-3 rounded-lg text-lg font-medium hover:bg-gray-100">Contact</Link>
          <Link to="/agents" className="block px-4 py-3 rounded-lg text-lg font-medium hover:bg-gray-100">Agents</Link>
        </div>
        <div className="pt-4 pb-4 border-t border-gray-200">
          <div className="flex items-center px-6">
            <button className="block w-full px-4 py-3 rounded-lg text-lg text-center hover:bg-gray-100">Sign In</button>
          </div>
          <div className="mt-3 px-6">
            <button className="block w-full px-4 py-3 rounded-lg text-lg text-center bg-yellow-400 hover:bg-yellow-500">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav