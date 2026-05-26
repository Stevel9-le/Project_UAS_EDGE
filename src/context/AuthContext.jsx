import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Data Akun Dummy Bawaan untuk Testing Login
const initialUsers = [
    { id: "USR-001", name: "Bos Edge", email: "pemilik@edge.com", password: "123", role: "pemilik", pp: "https://avatar.iran.liara.run/public/30" },
    { id: "USR-002", name: "Siti Operator", email: "operator@edge.com", password: "123", role: "operator", pp: "https://avatar.iran.liara.run/public/64" },
    { id: "USR-003", name: "Rian Pelanggan", email: "pelanggan@edge.com", password: "123", role: "pelanggan", pp: "https://avatar.iran.liara.run/public/28" }
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

    useEffect(() => {
        localStorage.setItem("edge_users", JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem("edge_current_user", JSON.stringify(currentUser));
    }, [currentUser]);

    // Fungsi Registrasi Akun Baru (Default jadi Pelanggan)
    const registerUser = (name, email, password) => {
        const newUser = {
            id: `USR-${Date.now()}`,
            name,
            email,
            password,
            role: "pelanggan", // Akun baru otomatis jadi pelanggan
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
        
        // Update di list users global
        const updatedUsers = users.map((u) => 
            u.id === currentUser.id ? { ...u, pp: newPicBase64 } : u
        );
        setUsers(updatedUsers);

        // Update di user yang sedang login
        setCurrentUser({ ...currentUser, pp: newPicBase64 });
    };

    return (
        <AuthContext.Provider value={{ currentUser, users, loginUser, registerUser, logoutUser, updateProfilePic }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);