import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaSearch, FaCamera, FaUserEdit, FaCheck } from "react-icons/fa";

export default function Header({ search, setSearch, profilePic, userName, userRole, updateProfilePic, updateUserName }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [newName, setNewName] = useState(userName || "");
    const [isEditingName, setIsEditingName] = useState(false);

    const fileInputRef = useRef(null);
    const dropdownRef = useRef(null);

    // Menjaga agar input nama lokal sinkron saat data user diubah
    useEffect(() => {
        setNewName(userName || "");
    }, [userName]);

    // Fungsi otomatis menutup dropdown saat klik di luar menu
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMenuOpen(false);
                setIsEditingName(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Mengatur warna tema dinamis badge berdasarkan tingkatan hak akses
    const getRoleBadgeClass = (role) => {
        switch (role?.toLowerCase()) {
            case 'pemilik': return 'bg-rose-100 text-rose-700 border-rose-200';
            case 'operator': return 'bg-amber-100 text-amber-700 border-amber-200';
            default: return 'bg-blue-100 text-blue-700 border-blue-200';
        }
    };

    // Handler mengolah konversi gambar dari perangkat lokal
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) return alert("File harus berupa gambar!");
            const reader = new FileReader();
            reader.onloadend = () => {
                if (updateProfilePic) {
                    updateProfilePic(reader.result);
                    alert("Foto profil berhasil diperbarui!");
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Handler menyimpan perubahan nama baru
    const handleSaveName = (e) => {
        e.preventDefault();
        if (!newName.trim()) return alert("Nama tidak boleh kosong!");
        if (updateUserName) {
            updateUserName(newName.trim());
            setIsEditingName(false);
            alert("Nama berhasil diubah!");
        }
    };

    return (
        <div id="header-container" className="flex justify-between items-center p-6 bg-white border-b border-gray-100 relative z-50">
            {/* Search Bar */}
            <div id="search-bar" className="relative w-full max-w-lg" >
                <input
                    id="search-input" 
                    className="border border-gray-100 p-4 pr-10 bg-white w-full max-w-lg rounded-md outline-none text-sm focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Search Here..."
                    value={search || ""}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <FaSearch id="search-icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
            </div>

            {/* Icon & Profile Section */}
            <div id="icons-container" className="flex items-center space-x-8">
                {/* Notifikasi Lonceng */}
                <div id="notification-icon" className="relative p-4 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer">
                    <FaBell />
                    <span id="notification-badge" className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full px-2 py-0.5 text-[10px] font-bold">50</span>
                </div>

                {/* Profil Pembungkus Utama */}
                <div id="profile-wrapper" className="relative" ref={dropdownRef}>
                    <div 
                        id="profile-container" 
                        className="flex items-center space-x-4 border-l pl-6 border-gray-300 cursor-pointer select-none group"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <div id="profile-text" className="text-right flex flex-col justify-center">
                            <span className="text-xs text-gray-400">Hello,</span>
                            <span className="text-sm font-bold text-[#151D48] leading-tight group-hover:text-blue-600 transition-colors">
                                {userName || "User"}
                            </span>
                            <span className={`inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 mt-0.5 rounded-full border ${getRoleBadgeClass(userRole)}`}>
                                {userRole || "Pelanggan"}
                            </span>
                        </div>

                        {/* Lingkaran Avatar Atas */}
                        <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center transition group-hover:scale-105 shadow-sm">
                            {profilePic ? (
                                <img id="profile-avatar" src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-blue-600 font-bold text-sm">
                                    {userName?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* INTERACTIVE DROPDOWN POPOVER MENU */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 space-y-4">
                            <div className="text-center border-b border-gray-50 pb-3">
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pengaturan Akun</p>
                            </div>

                            {/* Menu Ganti Foto Profil */}
                            <div className="flex flex-col items-center space-y-2">
                                <div className="relative w-16 h-16 rounded-full bg-blue-50 border overflow-hidden flex items-center justify-center group/avatar">
                                    {profilePic ? (
                                        <img src={profilePic} alt="Dropdown Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-blue-600 font-bold text-xl">{userName?.charAt(0).toUpperCase()}</span>
                                    )}
                                    <div 
                                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 cursor-pointer transition-opacity"
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        <FaCamera className="text-white text-xs" />
                                    </div>
                                </div>
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                                <button 
                                    type="button" 
                                    onClick={() => fileInputRef.current.click()}
                                    className="text-xs text-blue-600 font-semibold hover:underline"
                                >
                                    Ubah Foto Profil
                                </button>
                            </div>

                            {/* Menu Ubah Nama Akun */}
                            <div className="space-y-1">
                                <label className="text-[11px] font-bold text-gray-400 uppercase">Nama Akun</label>
                                {isEditingName ? (
                                    <form onSubmit={handleSaveName} className="flex gap-2">
                                        <input 
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="w-full border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                                            autoFocus
                                        />
                                        <button type="submit" className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 transition shadow-sm flex items-center justify-center">
                                            <FaCheck className="text-xs" />
                                        </button>
                                    </form>
                                ) : (
                                    <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2 border border-gray-100">
                                        <span className="text-sm font-semibold text-gray-700">{userName}</span>
                                        <button 
                                            type="button"
                                            onClick={() => setIsEditingName(true)}
                                            className="text-gray-400 hover:text-blue-600 transition"
                                        >
                                            <FaUserEdit className="text-sm" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Keterangan Hak Akses */}
                            <div className="bg-blue-50/50 rounded-xl p-2.5 text-center border border-blue-100 text-[11px] text-gray-500">
                                Terdaftar sebagai hak akses: <span className="font-bold text-blue-600 uppercase">{userRole}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}