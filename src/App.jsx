import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import AuthProvider
import { AuthProvider } from "./context/AuthContext";

// Import Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout"; // 👈 Pastikan Layout Guest di-import

// Menggunakan Lazy Loading
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Booking = React.lazy(() => import("./pages/Booking"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Guest = React.lazy(() => import("./pages/Guest")); // 👈 1. Pastikan Halaman Guest di-lazy load

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div style={{ padding: "20px", textAlign: "center" }}>Loading Halaman...</div>}>
        
        <Routes>
          {/* 🌟 2. RUTE GUEST (Halaman Utama pas pertama dibuka) */}
          <Route element={<GuestLayout />}>
            <Route path="/guest" element={<Guest />} />
          </Route>

          {/* 🚪 RUTE AUTENTIKASI */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>

          {/* 📊 RUTE UTAMA DASHBOARD */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/customers" element={<Customers />} />
          </Route>

          {/* 🔄 3. REDIRECT OTOMATIS KE GUEST */}
          {/* Jalur "/" sekarang otomatis melempar user ke "/guest", bukan "/login" lagi */}
          <Route path="/" element={<Navigate to="/guest" replace />} />
          <Route path="*" element={<Navigate to="/guest" replace />} />
        </Routes>

      </Suspense>
    </AuthProvider>
  );
}