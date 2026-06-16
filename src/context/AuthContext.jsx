import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Data Akun Dummy Bawaan untuk Testing Login
const initialUsers = [
    { id: "USR-001", name: "Bos Edge", email: "pemilik@edge.com", password: "123", role: "pemilik", pp: "https://avatar.iran.liara.run/public/30" },
    { id: "USR-002", name: "Siti Operator", email: "operator@edge.com", password: "123", role: "operator", pp: "https://avatar.iran.liara.run/public/64" },
    { id: "USR-003", name: "Rian Pelanggan", email: "pelanggan@edge.com", password: "123", role: "pelanggan", pp: "https://avatar.iran.liara.run/public/28" }
];

// Data Dummy Awal untuk Transaksi/Order
const initialOrders = [
    { id: 'ORD-001', name: 'Rian Hidayat', pc: 'VIP-01', paket: '3 Jam', status: 'Bermain' },
    { id: 'ORD-002', name: 'Siti Aminah', pc: 'REG-02', paket: '1 Jam', status: 'Selesai' },
];

export function AuthProvider({ children }) {
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem("edge_users");
        return savedUsers ? JSON.parse(savedUsers) : initialUsers;
    });

    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem("edge_current_user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // 🌟 STATE GLOBAL UNTUK PESANAN PC (ORDERS)
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem("edge_orders");
        return savedOrders ? JSON.parse(savedOrders) : initialOrders;
    });

    useEffect(() => {
        localStorage.setItem("edge_users", JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem("edge_current_user", JSON.stringify(currentUser));
    }, [currentUser]);

    // 🌟 EFFECT UNTUK MENYIMPAN TRANSAKSI SECARA OTOMATIS
    useEffect(() => {
        localStorage.setItem("edge_orders", JSON.stringify(orders));
    }, [orders]);

    // Fungsi Registrasi Akun Baru (Default jadi Pelanggan)
    const registerUser = (name, email, password) => {
        const newUser = {
            id: `USR-${Date.now()}`,
            name,
            email,
            password,
            role: "pelanggan",
            pp: "https://avatar.iran.liara.run/public/28"
        };
        setUsers([...users, newUser]);
        return true;
    };

    // Fungsi Login
    const loginUser = (email, password) => {
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            return { success: true, role: user.role };
        }
        return { success: false, message: "Email atau Password salah!" };
    };

    // Fungsi Logout
    const logoutUser = () => {
        setCurrentUser(null);
    };

    // Fungsi Update Foto Profil User yang sedang aktif
    const updateProfilePic = (newPicBase64) => {
        if (!currentUser) return;
        
        const updatedUsers = users.map((u) => 
            u.id === currentUser.id ? { ...u, pp: newPicBase64 } : u
        );
        setUsers(updatedUsers);
        setCurrentUser({ ...currentUser, pp: newPicBase64 });
    };

    // 🌟 FUNGSI BARU: Tambah Order Otomatis dari Halaman Booking
    const addOrder = (newOrder) => {
        setOrders((prevOrders) => [newOrder, ...prevOrders]);
    };

    // 🌟 FUNGSI BARU: Hapus Order dari Halaman Dashboard Pemilik
    const deleteOrder = (id) => {
        setOrders((prevOrders) => prevOrders.filter(order => order.id !== id));
    };

    return (
        <AuthContext.Provider value={{ 
            currentUser, 
            users, 
            orders,       // <-- Di-share ke dashboard & booking
            addOrder,     // <-- Dipanggil saat pelanggan klik order
            deleteOrder,  // <-- Dipanggil saat pemilik klik hapus
            loginUser, 
            registerUser, 
            logoutUser, 
            updateProfilePic 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);