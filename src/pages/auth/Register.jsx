import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Sesuaikan folder jika berbeda

export default function Register() {
    const navigate = useNavigate();
    const { registerUser } = useAuth(); // Ambil fungsi register dari context

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Password dan Confirm Password tidak cocok!");
            return;
        }

        // Panggil fungsi register bawaan AuthContext kamu (otomatis membuang spasi dengan .trim())
        const success = registerUser(name.trim(), email.trim(), password);

        if (success) {
            alert("Akun Pelanggan berhasil dibuat! Silakan login.");
            navigate("/login");
        } else {
            setError("Gagal membuat akun. Silakan coba lagi.");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                Create Your Account ✨
            </h2>

            {error && (
                <div className="bg-red-200 mb-5 p-3 text-sm text-red-700 rounded-lg text-center font-medium">
                    {error}
                </div>
            )}

            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 outline-none"
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 outline-none"
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 outline-none"
                        placeholder="********"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 outline-none"
                        placeholder="********"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md"
                >
                    Register
                </button>
            </form>

            <div className="text-center mt-5 text-sm text-gray-400">
                Sudah punya akun?{" "}
                <Link to="/login" className="text-green-500 hover:text-green-400 font-semibold transition duration-300 underline">
                    Login di sini
                </Link>
            </div>
        </div>
    );
}