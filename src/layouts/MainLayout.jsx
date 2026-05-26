import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout() {
  const { currentUser } = useAuth();
  const [search, setSearch] = useState('');

  // Jika belum login, tendang balik ke halaman Login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar otomatis menyesuaikan hak akses di dalamnya */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header sekarang mengambil nama dan PP milik akun yang login */}
        <Header search={search} setSearch={setSearch} profilePic={currentUser.pp} userName={currentUser.name} />

        <main className="flex-1 overflow-y-auto">
          {/* Oper context search ke halaman anak */}
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
}