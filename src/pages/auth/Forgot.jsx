import { Link } from "react-router-dom";

export default function Forgot() {
    return (
        <div>
            {/* 🔴 PERBAIKAN WARNA TEKS: Warna putih cerah agar terlihat jelas di background gelap */}
            <h2 className="text-2xl font-semibold text-white mb-2 text-center">
                Forgot Your Password?
            </h2>
            
            <p className="text-sm text-gray-400 mb-6 text-center leading-relaxed">
                Enter your email address and we'll send you a link to reset your
                password.
            </p>

            <form>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300 mb-1"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 text-gray-800 outline-none"
                        placeholder="you@example.com"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md"
                >
                    Send Reset Link
                </button>
            </form>

            {/* 🔗 Tautan Navigasi Kembali ke Halaman Login */}
            <div className="text-center mt-5 text-sm text-gray-400">
                Ingat password Anda?{" "}
                <Link 
                    to="/login" 
                    className="text-green-500 hover:text-green-400 font-semibold transition duration-300 underline"
                >
                    Kembali ke Login
                </Link>
            </div>
        </div>
    )
}