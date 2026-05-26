import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
// 1. Ambil hook useAuth untuk mendeteksi identitas akun yang masuk
import { useAuth } from '../context/AuthContext';

export default function Customers() {
  const { currentUser: loggedInUser } = useAuth();

  // PROTEKSI KEAURATAN AKSES: Jika pelanggan melompat ke URL ini, tendang ke halaman booking
  if (loggedInUser?.role === 'pelanggan') {
    return <Navigate to="/booking" replace />;
  }

  // Data State Awal Pelanggan
  const [customers, setCustomers] = useState([
    { id: 'CUST-001', name: 'Rian Hidayat', type: 'VIP', status: 'Online', pc: 'VIP-01', billingLeft: '02:15:00' },
    { id: 'CUST-002', name: 'Siti Aminah', type: 'Regular', status: 'Online', pc: 'REG-02', billingLeft: '00:45:00' },
    { id: 'CUST-003', name: 'Budi Santoso', type: 'VIP', status: 'Offline', pc: '-', billingLeft: '00:00:00' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  
  // State untuk Kontrol Modal Form (Tambah / Edit)
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [customerForm, setCustomerForm] = useState({ id: '', name: '', type: 'Regular', status: 'Offline', pc: '-', billingLeft: '00:00:00' });

  // HANDLER: Hapus Data (Hanya Pemilik)
  const handleDelete = (id) => {
    if (loggedInUser.role !== 'pemilik') {
      return alert("Akses ditolak! Hanya Pemilik yang dapat menghapus data pelanggan.");
    }
    if (window.confirm("Apakah Anda yakin ingin menghapus pelanggan ini?")) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  // HANDLER: Buka Modal Tambah Baru (Hanya Pemilik)
  const openCreateModal = () => {
    if (loggedInUser.role !== 'pemilik') {
      return alert("Akses ditolak! Hanya Pemilik yang dapat mendaftarkan pelanggan baru.");
    }
    setCustomerForm({ id: `CUST-00${customers.length + 1}`, name: '', type: 'Regular', status: 'Offline', pc: '-', billingLeft: '01:00:00' });
    setIsEditMode(false);
    setIsOpenModal(true);
  };

  // HANDLER: Buka Modal Edit (Bisa Pemilik & Operator)
  const openEditModal = (customer) => {
    setCustomerForm(customer);
    setIsEditMode(true);
    setIsOpenModal(true);
  };

  // HANDLER: Simpan Form (Create & Update)
  const handleSave = (e) => {
    e.preventDefault();
    if (!customerForm.name.trim()) return alert("Nama tidak boleh kosong!");

    if (isEditMode) {
      // Jalankan logika Update (Pemilik & Operator bisa melakukan ini)
      setCustomers(customers.map(c => c.id === customerForm.id ? customerForm : c));
    } else {
      // Jalankan logika Create (Proteksi ganda)
      if (loggedInUser.role !== 'pemilik') return alert("Akses ditolak!");
      setCustomers([...customers, customerForm]);
    }
    setIsOpenModal(false);
  };

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header & Aksi Utama */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Pelanggan</h1>
          <p className="text-gray-500 text-sm">Hak Akses: <span className="font-bold text-blue-600 uppercase">{loggedInUser.role}</span></p>
        </div>
        
        {/* 2. Sembunyikan tombol "+ Tambah" jika yang masuk adalah Operator */}
        {loggedInUser.role === 'pemilik' && (
          <button 
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl transition-all shadow-sm text-sm"
          >
            + Tambah Pelanggan
          </button>
        )}
      </div>

      {/* Filter Cari */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari nama pelanggan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm bg-white"
        />
      </div>

      {/* Tabel Data (Read) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Nama</th>
              <th className="px-6 py-4">Tipe</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">PC</th>
              <th className="px-6 py-4">Sisa Billing</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
            {filteredCustomers.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 text-gray-400 font-medium">{c.id}</td>
                <td className="px-6 py-4 font-semibold text-gray-800">{c.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-xs ${c.type === 'VIP' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>{c.type}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`w-2 h-2 inline-block rounded-full mr-2 ${c.status === 'Online' ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
                  {c.status}
                </td>
                <td className="px-6 py-4 font-mono">{c.pc}</td>
                <td className="px-6 py-4 font-mono">{c.billingLeft}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button onClick={() => openEditModal(c)} className="text-blue-600 hover:text-blue-800 font-medium text-xs">Edit</button>
                  
                  {/* 3. Tombol Hapus hanya dirender jika login sebagai Pemilik */}
                  {loggedInUser.role === 'pemilik' ? (
                    <button onClick={() => handleDelete(c.id)} className="text-rose-600 hover:text-rose-800 font-medium text-xs">Hapus</button>
                  ) : (
                    <span className="text-xs text-gray-300 italic">Terproteksi</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL POPUP FORM (CREATE / UPDATE) */}
      {isOpenModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{isEditMode ? 'Edit Data Pelanggan' : 'Tambah Pelanggan Baru'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  disabled={!isEditMode && loggedInUser.role !== 'pemilik'} 
                  value={customerForm.name} 
                  onChange={(e) => setCustomerForm({...customerForm, name: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white disabled:bg-gray-50 disabled:text-gray-400"
                  placeholder="Masukkan nama"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Tipe Member</label>
                  <select 
                    disabled={loggedInUser.role !== 'pemilik'} 
                    value={customerForm.type} 
                    onChange={(e) => setCustomerForm({...customerForm, type: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white disabled:bg-gray-50"
                  >
                    <option value="Regular">Regular</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Status</label>
                  <select 
                    value={customerForm.status} 
                    onChange={(e) => setCustomerForm({...customerForm, status: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  >
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">No. PC</label>
                  <input 
                    type="text" 
                    value={customerForm.pc} 
                    onChange={(e) => setCustomerForm({...customerForm, pc: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Sisa Billing</label>
                  <input 
                    type="text" 
                    value={customerForm.billingLeft} 
                    onChange={(e) => setCustomerForm({...customerForm, billingLeft: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="00:00:00"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsOpenModal(false)} className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-xl">Batal</button>
                <button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-xl shadow-sm">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}