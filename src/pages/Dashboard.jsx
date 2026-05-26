import React, { useState } from "react";
import { useOutletContext, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaTv, FaCrown } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    const { currentUser, users, updateProfilePic } = useAuth();
    const { search } = useOutletContext();

    // JIKA YANG MASUK ADALAH PELANGGAN: Langsung pindahkan/redirect ke page Booking PC
    if (currentUser && currentUser.role === 'pelanggan') {
        return <Navigate to="/booking" replace />;
    }

    // State dummy transaksi iCafe
    const [orders, setOrders] = useState([
        { id: 'ORD-001', name: 'Rian Hidayat', pc: 'VIP-01', paket: '3 Jam', status: 'Bermain' },
        { id: 'ORD-002', name: 'Siti Aminah', pc: 'REG-02', paket: '1 Jam', status: 'Selesai' },
    ]);

    const handleUploadPP = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateProfilePic(reader.result); // Update foto profil akun aktif di localstorage
                alert("Foto profil kamu berhasil diperbarui!");
            };
            reader.readAsDataURL(file);
        }
    };

    // Fungsi Hapus Transaksi (Hanya untuk Pemilik)
    const handleDeleteOrder = (id) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data order ini?")) {
            setOrders(orders.filter(order => order.id !== id));
        }
    };

    const filteredOrders = orders.filter((order) =>
        order.name.toLowerCase().includes(search.toLowerCase()) || order.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div id="dashboard-container" className="bg-gray-50 min-h-screen p-8 font-sans text-[#151D48] space-y-6">
            <PageHeader />

            {/* BARIS UTAMA INFO */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                
                {/* 📊 STATS CARD MULTI-COLOR DENGAN IKON */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold">Info ICafe</h2>
                        <p className="text-xs text-gray-400 mt-1">Status dan statistik komputer saat ini</p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {/* Card 1: Total PC */}
                        <div className="bg-[#FFE2E5] rounded-2xl p-5 flex flex-col justify-between min-h-[140px] transition-transform hover:scale-105 duration-300">
                            <div className="w-10 h-10 bg-[#FA5A7D] rounded-full flex items-center justify-center text-white text-lg shadow-sm">
                                <FaTv />
                            </div>
                            <div className="mt-4">
                                <span className="text-2xl font-extrabold block text-[#151D48]">50</span>
                                <span className="text-gray-600 text-xs font-semibold">Total PC</span>
                            </div>
                        </div>

                        {/* Card 2: Total VIP */}
                        <div className="bg-[#FFF4DE] rounded-2xl p-5 flex flex-col justify-between min-h-[140px] transition-transform hover:scale-105 duration-300">
                            <div className="w-10 h-10 bg-[#FF9432] rounded-full flex items-center justify-center text-white text-lg shadow-sm">
                                <FaCrown />
                            </div>
                            <div className="mt-4">
                                <span className="text-2xl font-extrabold block text-[#151D48]">15</span>
                                <span className="text-gray-600 text-xs font-semibold">Total VIP</span>
                            </div>
                        </div>

                        {/* Card 3: Active Orders */}
                        <div className="bg-[#DCFCE7] rounded-2xl p-5 flex flex-col justify-between min-h-[140px] transition-transform hover:scale-105 duration-300">
                            <div className="w-10 h-10 bg-[#3CD856] rounded-full flex items-center justify-center text-white text-lg shadow-sm">
                                <FaShoppingCart />
                            </div>
                            <div className="mt-4">
                                <span className="text-2xl font-extrabold block text-[#151D48]">{orders.length}</span>
                                <span className="text-gray-600 text-xs font-semibold">Order Aktif</span>
                            </div>
                        </div>

                        {/* Card 4: Pendapatan */}
                        <div className="bg-[#F3E8FF] rounded-2xl p-5 flex flex-col justify-between min-h-[140px] transition-transform hover:scale-105 duration-300">
                            <div className="w-10 h-10 bg-[#BF5AF2] rounded-full flex items-center justify-center text-white text-lg shadow-sm">
                                <FaDollarSign />
                            </div>
                            <div className="mt-4">
                                <span className="text-xl font-extrabold block text-[#151D48]">Rp 350k</span>
                                <span className="text-gray-600 text-xs font-semibold">Hari Ini</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profil Upload Box */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-bold">Visitor Insights ({currentUser?.role?.toUpperCase()})</h2>
                        <p className="text-sm text-gray-500 mt-2">Selamat datang di <b>ICafe EDGE</b>.</p>
                    </div>
                    
                    {/* Mengubah PP Akun Sendiri */}
                    <div className="mt-4 p-4 bg-blue-50 rounded-2xl flex items-center gap-4">
                        <img src={currentUser?.pp} alt="PP" className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                        <div>
                            <p className="text-xs font-bold text-gray-700">Ganti Foto Akun</p>
                            <label className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline mt-0.5 block">
                                Upload Baru
                                <input type="file" accept="image/*" onChange={handleUploadPP} className="hidden" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* FITUR KHUSUS PEMILIK: BISA MELIHAT SEMUA AKUN OPERATOR DAN PELANGGAN */}
            {currentUser?.role === 'pemilik' && (
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-lg mb-4">👑 Manajemen Akun Staf & Pelanggan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {users.map((u) => (
                            <div key={u.id} className="p-4 border border-gray-100 rounded-2xl flex items-center gap-3 bg-gray-50/50 hover:shadow-sm transition-all">
                                <img src={u.pp} alt={u.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                <div>
                                    <h4 className="text-sm font-bold">{u.name}</h4>
                                    <p className="text-xs text-gray-400 mb-1">{u.email}</p>
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${u.role === 'pemilik' ? 'bg-red-100 text-red-600' : u.role === 'operator' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {u.role}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TABEL DATA BILLING (Bisa diakses Pemilik & Operator) */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg mb-4">Active Order List</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-gray-50 text-gray-400 text-xs border-b">
                                <th className="p-4">ID Order</th>
                                <th className="p-4">Nama Pelanggan</th>
                                <th className="p-4">No. PC</th>
                                <th className="p-4">Status</th>
                                {currentUser?.role === 'pemilik' && <th className="p-4">Aksi</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="border-b hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 font-medium">{order.id}</td>
                                    <td className="p-4 font-bold text-gray-800">{order.name}</td>
                                    <td className="p-4"><span className="bg-gray-100 px-2 py-1 rounded text-xs font-semibold">{order.pc}</span></td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === 'Bermain' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    {/* Aksi Tombol Delete HANYA BOLEH DILIHAT & DIKLIK OLEH PEMILIK */}
                                    {currentUser?.role === 'pemilik' && (
                                        <td className="p-4">
                                            <button onClick={() => handleDeleteOrder(order.id)} className="text-red-500 hover:text-red-700 text-xs font-bold transition-colors">
                                                Hapus
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}