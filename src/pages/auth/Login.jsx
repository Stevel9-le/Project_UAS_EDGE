import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import { useAuth } from "../../context/AuthContext"; // Sesuaikan folder jika berbeda
import { BsFillExclamationDiamondFill } from "react-icons/bs";

export default function Login() {
    const navigate = useNavigate();
    const { loginUser } = useAuth(); // Ambil fungsi login bawaan AuthContext kamu

    const [error, setError] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({ ...dataForm, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        
        const inputEmail = dataForm.email.trim();
        const inputPass = dataForm.password;

        // Panggil fungsi login bawaan dari AuthContext kamu
        const result = loginUser(inputEmail, inputPass);

        if (result.success) {
            // Berhasil login! Akun otomatis terekam di Context & LocalStorage oleh AuthContext kamu.
            // Sekarang kita arahkan langsung ke /dashboard sesuai rute App.jsx
            navigate("/dashboard");
        } else {
            // Jika salah, tampilkan pesan error bawaan dari AuthContext ("Email atau Password salah!")
            setError(result.message);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                Welcome Back 👋
            </h2>

            {error && (
                <div className="bg-red-200 mb-5 p-4 text-sm font-semibold text-red-700 rounded-lg flex items-center justify-center">
                    <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={dataForm.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="you@example.com"
                        required
                    />
                </div>
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-1">
                        <label className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <Link to="/forgot" className="text-xs text-green-400 hover:text-green-300 hover:underline font-medium">
                            Forgot Password?
                        </Link>
                    </div>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={dataForm.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="********"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-4 rounded-lg transition duration-300 shadow-md"
                >
                    Login
                </button>
            </form>

            <div className="text-center mt-5 text-sm text-gray-400">
                Belum punya akun?{" "}
                <Link to="/register" className="text-green-400 hover:text-green-300 font-semibold transition duration-300 underline">
                    Sign Up di sini
                </Link>
            </div>
            
            {/* 💡 TIPS INFO AKUN TESTING */}
            <div className="mt-6 p-3 bg-gray-800 rounded-lg border border-gray-700 text-xs text-gray-400">
                <span className="font-semibold text-gray-300 block mb-1">Akun Testing Bawaan:</span>
                • Pelanggan: <code className="text-green-400">pelanggan@edge.com</code> (pass: 123)<br/>
                • Pemilik: <code className="text-green-400">pemilik@edge.com</code> (pass: 123)
            </div>
        </div>
    );
}