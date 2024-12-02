'use client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo-black.png';



export default function NavbarAfter() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login state
    navigate('/'); // Redirect to the landing page
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 shadow-md"
      style={{
        backgroundColor: '#446c9c',
        color: '#fff',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <nav
        aria-label="Global"
        className="flex items-center justify-between w-full px-6 lg:px-8"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">SmartExpense</span>
            <img alt="Logo" src={logo} className="h-8 w-auto" />
          </a>
        </div>
        {/* Logout Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
          >
            Sign out
          </button>
        </div>
      </nav>
    </header>
  );
}
