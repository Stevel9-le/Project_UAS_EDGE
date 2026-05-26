import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { currentUser, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-6">
      <div className="space-y-8">
        <div className="text-xl font-bold text-blue-600 px-4">EDGE .</div>
        
        <nav className="flex flex-col space-y-2">
          {/* Tampilan Kondisional Berdasarkan Role */}
          {currentUser.role !== 'pelanggan' && (
            <Link to="/dashboard" className="p-3 text-gray-600 hover:bg-gray-50 rounded-xl block font-semibold">
              📊 Dashboard
            </Link>
          )}

          {currentUser.role !== 'operator' && (
            <Link to="/booking" className="p-3 text-gray-600 hover:bg-gray-50 rounded-xl block font-semibold">
              🖥️ Booking PC
            </Link>
          )}

          {currentUser.role === 'pemilik' && (
            <Link to="/customers" className="p-3 text-gray-600 hover:bg-gray-50 rounded-xl block font-semibold">
              👥 Customers
            </Link>
          )}
        </nav>
      </div>

      <button onClick={handleLogout} className="p-3 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors w-full">
        🚪 Log Out
      </button>
    </div>
  );
}