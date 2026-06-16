import React, { useState } from 'react';
// 1. Import hook useAuth untuk mendeteksi siapa yang sedang membuka halaman
import { useAuth } from '../context/AuthContext';

export default function Booking() {
  const { currentUser } = useAuth(); // Ambil data user aktif (id, name, role)

  // Data State PC Warnet (Sudah ditambahkan unit baru sesuai kebutuhan Anda)
  const [pcs, setPcs] = useState([
    { id: 'REG-01', type: 'Regular', status: 'available' },
    { id: 'REG-02', type: 'Regular', status: 'occupied' },
    { id: 'REG-03', type: 'Regular', status: 'available' },
    { id: 'REG-04', type: 'Regular', status: 'available' },
    { id: 'VIP-01', type: 'VIP', status: 'available' },
    { id: 'VIP-02', type: 'VIP', status: 'occupied' },
    { id: 'VIP-03', type: 'VIP', status: 'available' },
    { id: 'VIP-04', type: 'VIP', status: 'occupied' },
  ]); // <-- Kurung kurawal salah yang memutus fungsi komponen tadi sudah dihapus di sini

  // Data State Log Hasil Booking (Ditambahkan properti userId & userName untuk rekaman data)
  const [bookings, setBookings] = useState([
    { id: 'BKG-001', pcId: 'REG-02', userId: 'USR-003', userName: 'Rian Pelanggan', duration: 3, total: 15000, time: '14:30 WIB' },
    { id: 'BKG-002', pcId: 'VIP-02', userId: 'USR-999', userName: 'Budi (Offline)', duration: 2, total: 20000, time: '15:10 WIB' },
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

  // HANDLER: Create Booking Baru
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedPc) return alert("Silakan pilih PC pada denah dahulu!");

    const newBooking = {
      id: `BKG-00${bookings.length + 1}`,
      pcId: selectedPc,
      userId: currentUser?.id || 'GUEST', // Ditambahkan optional chaining agar aman jika data telat dimuat
      userName: currentUser?.name || 'Anonim', 
      duration: duration,
      total: totalPrice,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB'
    };

    // Tambah ke history tabel
    setBookings([newBooking, ...bookings]);
    
    // Ubah status PC di denah jadi occupied
    setPcs(pcs.map(pc => pc.id === selectedPc ? { ...pc, status: 'occupied' } : pc));
    
    // Reset form pemilihan
    setSelectedPc(null);
    setDuration(1);
    alert(`PC Berhasil di-Booking atas nama ${currentUser?.name || 'Pelanggan'}!`);
  };

  // HANDLER: Batalkan / Hapus Order (Delete Booking)
  const handleCancelBooking = (id, pcId) => {
    if (window.confirm("Batalkan booking untuk order ini?")) {
      setBookings(bookings.filter(b => b.id !== id));
      // Kembalikan status PC jadi kosong/available lagi
      setPcs(pcs.map(pc => pc.id === pcId ? { ...pc, status: 'available' } : pc));
    }
  };

  // 2. FILTER TRANSAKSI: Jika dia pelanggan, hanya tampilkan booking milik dirinya sendiri
  const visibleBookings = currentUser?.role === 'pelanggan' 
    ? bookings.filter(b => b.userId === currentUser.id)
    : bookings;

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

      {/* TABEL DAFTAR BILLING AKTIF (READ & DELETE LOG) */}
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
                <th className="p-3">Waktu Masuk</th>
                <th className="p-3">Total Bayar</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {visibleBookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/50">
                  <td className="p-3 text-gray-400">{b.id}</td>
                  <td className="p-3 font-bold text-gray-800">{b.userName}</td>
                  <td className="p-3 font-semibold">{b.pcId}</td>
                  <td className="p-3">{b.duration} Jam</td>
                  <td className="p-3 font-mono">{b.time}</td>
                  <td className="p-3 font-semibold text-emerald-600">Rp {b.total.toLocaleString()}</td>
                  <td className="p-3 text-center">
                    {/* 3. PROTEKSI AKSI: Pelanggan tidak boleh sembarangan klik 'Stop' kecuali itu miliknya sendiri */}
                    { (currentUser?.role === 'pemilik' || currentUser?.role === 'operator' || b.userId === currentUser?.id) ? (
                      <button 
                        onClick={() => handleCancelBooking(b.id, b.pcId)} 
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