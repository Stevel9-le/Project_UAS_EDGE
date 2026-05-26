import { Outlet } from "react-router-dom";
import { FaGamepad, FaWifi, FaHeadset } from "react-icons/fa";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex bg-[#020617]">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden">

                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-900"></div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Glow */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/30 blur-3xl rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/30 blur-3xl rounded-full"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-16 text-white">

                    <h1 className="text-6xl font-extrabold leading-tight">
                        ICafe Edge<span className="text-cyan-400">.</span>
                    </h1>

                    <p className="mt-6 text-lg text-gray-200 leading-relaxed max-w-lg">
                        Warnet modern dengan sistem management real-time,
                        billing otomatis, dan monitoring pelanggan yang cepat.
                    </p>

                    {/* Feature */}
                    <div className="space-y-5 mt-10">

                        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                            <div className="bg-cyan-400 p-4 rounded-xl text-black text-xl">
                                <FaGamepad />
                            </div>

                            <div>
                                <h3 className="font-bold text-lg">
                                    Gaming Experience
                                </h3>

                                <p className="text-sm text-gray-200">
                                    PC Gaming VIP dengan performa maksimal.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                            <div className="bg-blue-400 p-4 rounded-xl text-black text-xl">
                                <FaWifi />
                            </div>

                            <div>
                                <h3 className="font-bold text-lg">
                                    Fast Internet
                                </h3>

                                <p className="text-sm text-gray-200">
                                    Internet stabil dan cepat untuk semua aktivitas.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                            <div className="bg-green-400 p-4 rounded-xl text-black text-xl">
                                <FaHeadset />
                            </div>

                            <div>
                                <h3 className="font-bold text-lg">
                                    24/7 Support
                                </h3>

                                <p className="text-sm text-gray-200">
                                    Support dan pelayanan terbaik setiap hari.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 flex items-center justify-center p-8">

                {/* LOGIN CARD */}
                <div className="w-full max-w-md">

                    <div className="bg-[#0F172A] border border-gray-800 shadow-2xl rounded-3xl p-10">

                        {/* Logo */}
                        <div className="flex flex-col items-center mb-8">

                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg mb-4">
                                <FaGamepad className="text-white text-3xl" />
                            </div>

                            <h1 className="text-4xl font-extrabold text-white">
                                ICafe Edge
                                <span className="text-cyan-400">.</span>
                            </h1>

                            <p className="text-gray-400 mt-2 text-sm">
                                Welcome Back Gamer
                            </p>

                        </div>

                        {/* FORM */}
                        <div className="text-white">
                            <Outlet />
                        </div>

                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        © 2026 ICafe Edge. All rights reserved.
                    </p>

                </div>

            </div>
        </div>
    );
}