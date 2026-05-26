import { Link } from "react-router-dom";

export default function NotFound({ code = "404", description = "Halaman tidak ditemukan", imageUrl = "/vite.svg" }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-10 text-center">
      <img src={imageUrl} alt={`Error ${code}`} className="w-80 mb-8" />
      <h1 className="text-6xl font-black text-gray-800">{code}</h1>
      <p className="text-xl text-gray-600 mt-4 max-w-md">{description}</p>
      <Link to="/" className="mt-8 bg-hijau text-white px-8 py-3 rounded-xl font-bold shadow-
      lg hover:scale-105 transition-transform">
        Back to Dashboard
      </Link>
    </div>
  );
}