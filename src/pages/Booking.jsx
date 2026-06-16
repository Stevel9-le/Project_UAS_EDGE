import React, { useState } from 'react';
// 1. Ambil state global dari AuthContext agar tersinkronisasi otomatis
import { useAuth } from '../context/AuthContext';

export default function Booking() {
  // Ambil data orders global beserta aksi tambah dan hapusnya
  const { currentUser, orders, addOrder, deleteOrder } = useAuth();

  // Data State PC Warnet untuk denah lokal di halaman ini
  const [pcs, setPcs] = useState([
    { id: 'REG-01', type: 'Regular', status: 'available' },
    { id: 'REG-02', type: 'Regular', status: 'occupied' },
    { id: 'REG-03', type: 'Regular', status: 'available' },
    { id: 'REG-04', type: 'Regular', status: 'available' },
    { id: 'VIP-01', type: 'VIP', status: 'available' },
    { id: 'VIP-02', type: 'VIP', status: 'occupied' },
    { id: 'VIP-03', type: 'VIP', status: 'available' },
    { id: 'VIP-04', type: 'VIP', status: 'occupied' },
  ]);

  const [selectedPc, setSelectedPc] = useState(null);
  const [duration, setDuration] = useState(1);
  const [billingType, setBillingType] = useState('Regular');

  const pricePerHour = billingType === 'VIP' ? 10000 : 5000;
  const totalPrice = pricePerHour * duration;

  const handleSelectPc = (pc) => {
    if (pc.status === 'occupied') return;
    setSelectedPc(pc.id);
    setBillingType(pc.type);
  };

  // HANDLER: Create Booking Baru ke Server/Context Global
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedPc) return alert("Silakan pilih PC pada denah dahulu!");

    // Sesuaikan key-nya agar serasi dengan object orders milik Dashboard: (id, name, pc, paket, status)
    const newOrder = {
      id: `ORD-00${orders.length + 1}`,
      name: currentUser?.name || 'Pelanggan Baru',
      pc: selectedPc,
      paket: `${duration} Jam`,
      status: 'Bermain',
      // Properti tambahan internal untuk filter keamanan akun pelanggan
      userId: currentUser?.id || 'GUEST',
      total: totalPrice,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
    };

    // 🚀 Kirim pesanan otomatis ke state global & localStorage
    addOrder(newOrder); 
    
    // Ubah status monitor denah lokal jadi terisi
    setPcs(pcs.map(pc => pc.id === selectedPc ? { ...pc, status: 'occupied' } : pc));
    
    // Reset form pemilihan
    setSelectedPc(null);
    setDuration(1);
    alert(`PC Berhasil di-Booking atas nama ${currentUser?.name || 'Pelanggan'}!`);
  };

  // HANDLER: Batalkan / Hapus Order melalui Global Context Action
  const handleCancelBooking = (id, pcId) => {
    if (window.confirm("Batalkan booking untuk order ini?")) {
      deleteOrder(id); // <-- Menghapus dari global context & dashboard
      // Kembalikan status PC di denah jadi kosong lagi
      setPcs(pcs.map(pc => pc.id === pcId ? { ...pc, status: 'available' } : pc));
    }
  };

  // 2. FILTER AKSES: Jika dia pelanggan biasa, hanya tampilkan pesanan atas nama dirinya sendiri
  const visibleBookings = currentUser?.role === 'pelanggan' 
    ? orders.filter(b => b.userId === currentUser.id || b.name === currentUser.name)
    : orders;

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Booking Kamar PC</h1>
        <p className="text-gray-500 text-sm">Akses Akun: <span className="font-bold text-blue-600 uppercase">{currentUser?.role || 'Guest'}</span></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* DENAH PC MAP (KIRI) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Denah Monitor iCafe</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {pcs.map((pc) => {
              let bgClass = "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100";
              if (pc.status === 'occupied') bgClass = "bg-rose-50 border-rose-200 text-rose-400 cursor-not-allowed";
              if (selectedPc === pc.id) bgClass = "bg-blue-600 border-blue-600 text-white shadow-md";

              return (
                <button
                  key={pc.id}
                  type="button"
                  disabled={pc.status === 'occupied'}
                  onClick={() => handleSelectPc(pc)}
                  className={`p-4 border rounded-xl flex flex-col items-center justify-center transition-all ${bgClass}`}
                >
                  <span className="font-bold">{pc.id}</span>
                  <span className="text-xs opacity-70">{pc.type}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* INPUT ORDER FORM (KANAN) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Billing Pemesanan</h2>
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Nama Pemesan</label>
              <input type="text" readOnly value={currentUser?.name || ''} className="w-full bg-gray-100 border rounded-xl px-3 py-2 text-sm text-gray-500 font-semibold outline-none" />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">PC Target</label>
              <input type="text" readOnly value={selectedPc ? `${selectedPc} (${billingType})` : "Pilih PC di Kiri"} className="w-full bg-gray-50 border rounded-xl px-3 py-2 text-sm text-gray-700 font-bold" />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Durasi Kerja (Jam)</label>
              <input type="number" min="1" value={duration} onChange={(e) => setDuration(parseInt(e.target.value) || 1)} className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl text-sm">
              <span className="text-gray-500">Total Harga:</span>
              <span className="font-bold text-blue-600">Rp {totalPrice.toLocaleString()}</span>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl text-sm shadow-md hover:bg-blue-700 transition-colors">Submit Booking</button>
          </form>
        </div>
      </div>

      {/* TABEL DAFTAR BILLING AKTIF (SINKRON DENGAN DASHBOARD PEMILIK) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          {currentUser?.role === 'pelanggan' ? 'Riwayat Booking Saya' : 'Daftar Transaksi Booking Aktif Global'}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 font-medium text-xs uppercase">
                <th className="p-3">ID Booking</th>
                <th className="p-3">Nama Pelanggan</th>
                <th className="p-3">No PC</th>
                <th className="p-3">Durasi</th>
                <th className="p-3">Waktu/Status</th>
                <th className="p-3">Total Bayar</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {visibleBookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/50">
                  <td className="p-3 text-gray-400">{b.id}</td>
                  <td className="p-3 font-bold text-gray-800">{b.name}</td>
                  <td className="p-3 font-semibold">{b.pc}</td>
                  <td className="p-3">{b.paket}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${b.status === 'Bermain' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {b.status} {b.time ? `(${b.time})` : ''}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-emerald-600">Rp {(b.total || 0).toLocaleString()}</td>
                  <td className="p-3 text-center">
                    {/* 3. PROTEKSI AKSI: Hanya pemilik, operator, atau pemilik order itu sendiri yang bisa membatalkan */}
                    { (currentUser?.role === 'pemilik' || currentUser?.role === 'operator' || b.userId === currentUser?.id) ? (
                      <button 
                        onClick={() => handleCancelBooking(b.id, b.pc)} 
                        className="text-rose-500 hover:text-rose-700 font-medium text-xs bg-rose-50 px-2 py-1 rounded transition-colors"
                      >
                        Stop / Hapus
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 italic">No Access</span>
                    )}
                  </td>
                </tr>
              ))}
              {visibleBookings.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-4 text-center text-gray-400 text-xs italic">
                    Belum ada riwayat transaksi booking aktif.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}