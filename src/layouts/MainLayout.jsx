import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout() {
  const { currentUser, updateProfilePic, updateUserName } = useAuth();
  const [search, setSearch] = useState('');

  // Jika belum login, kembalikan ke halaman Login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar dinamis mengikuti role */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header dengan dukungan manipulasi data profil penuh */}
        <Header 
          search={search} 
          setSearch={setSearch} 
          profilePic={currentUser.pp} 
          userName={currentUser.name} 
          userRole={currentUser.role}
          updateProfilePic={updateProfilePic} 
          updateUserName={updateUserName}
        />

        <main className="flex-1 overflow-y-auto">
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
}