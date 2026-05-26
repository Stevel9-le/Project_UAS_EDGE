import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

// 1. Tambahkan destructuring props di sini agar Header bisa menerima data dari MainLayout
export default function Header({ search, setSearch, profilePic }) {
    return (
        <div id="header-container" className="flex justify-between items-center p-6 bg-white border-b border-gray-100">
            {/* Search Bar */}
            <div id="search-bar" className="relative w-full max-w-lg" >
                {/* 2. Hubungkan value dan onChange ke state search */}
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
            <div id="icons-container" className="flex items-center space-x-8 ">
                {/* Icons */}
                <div id="notification-icon" className="relative p-4 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer">
                    <FaBell />
                    <span id="notification-badge" className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full px-2 py-0.5 text-[10px] font-bold">50</span>
                </div>
                {/* <div id="chart-icon" className="p-6 bg-blue-100 rounded-2xl cursor-pointer">
                    <FcAreaChart />
                </div>
                <div id="settings-icon" className="p-6 bg-red-100 rounded-2xl text-red-500 cursor-pointer">
                    <SlSettings />
                </div> */}

                {/* Profile Section */}
                <div id="profile-container" className="flex items-center space-x-4 border-l pl-6 border-gray-300">
                    <span id="profile-text">
                        Hello, <b>User</b>
                    </span>
                    {/* 3. Ganti src agar membaca variabel profilePic secara dinamis */}
                    <img
                        id="profile-avatar"
                        src={profilePic || "https://avatar.iran.liara.run/public/28"}
                        alt="User Profile"
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        onError={(e) => {
                            e.target.src = "https://avatar.iran.liara.run/public/28";
                        }}
                    />
                </div>
            </div>
        </div>
    );
}