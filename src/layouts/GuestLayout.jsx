import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const GuestLayout = () => {

  // 🛠️ Fungsi Scroll Otomatis ditambahkan di sini agar menu bisa berpindah halaman dengan lancar
  const handleNavigation = (e, sectionId) => {
    e.preventDefault(); // Mencegah reload / perubahan URL mentah oleh tag <a>
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const navbarOffset = 85; // Menjaga jarak agar judul section tidak tertutup navbar fixed
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth" // Efek bergeser halus
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      {/* 1. NAVBAR / HEADER — EREN DARK STYLE (20 poin) */}
      <header className="sticky top-0 z-[100] bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800 py-5 px-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo Sedap dengan gaya Eren */}
          <Link to="/" className="text-3xl font-black tracking-tighter text-white">
            ED<span className="text-orange-500">GE.</span>
          </Link>

          {/* Navigasi Tengah — Diperbaiki menggunakan handleNavigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-12 text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <li>
                <a 
                  href="#home-section" 
                  onClick={(e) => handleNavigation(e, "home-section")} 
                  className="hover:text-orange-500 transition-colors duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about-section" 
                  onClick={(e) => handleNavigation(e, "about-section")} 
                  className="hover:text-orange-500 transition-colors duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#menu-section" 
                  onClick={(e) => handleNavigation(e, "menu-section")} 
                  className="hover:text-orange-500 transition-colors duration-300"
                >
                  Menu
                </a>
              </li>
            </ul>
          </nav>

          {/* Tombol Aksi di Kanan */}
          <div className="flex items-center space-x-8">
            <Link to="/login" className="text-[12px] font-bold hover:text-orange-500 transition uppercase tracking-widest text-slate-300">
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-orange-600 text-white px-8 py-3 rounded-full text-[11px] font-black tracking-[0.15em] hover:bg-white hover:text-[#0f172a] transition-all duration-300 uppercase shadow-lg shadow-orange-900/20"
            >
              Register
            </Link>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      {/* 6. FOOTER - 10 poin */}
      <footer className="bg-slate-50 py-16 border-t border-gray-100 text-slate-900">
        <div className="max-w-7xl mx-auto px-10 grid md:grid-cols-3 gap-12">
          
          {/* Informasi Kontak & Logo Partner */}
          <div className="space-y-6">
            <div className="text-2xl font-black italic">EDGE.</div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Internet cafe in Pekanbaru, Riau.
            </p>
            {/* Tampilan Logo Partner */}
            <div className="flex gap-4 opacity-40 grayscale hover:grayscale-0 transition-all">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Partner" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Partner" className="h-4" />
            </div>
          </div>

          {/* Detail Kontak */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Contact</h4>
            <ul className="text-slate-600 text-sm space-y-3 font-medium">
              <li className="flex items-center gap-2">📍 Jl. Kayangan No.59c, Limbungan Baru, Kec. Rumbai Pesisir, Kota Pekanbaru, Riau 28261</li>
              <li className="flex items-center gap-2">📧 support@EDGE.app</li>
              <li className="flex items-center gap-2">📞 (0761) 556309</li>
            </ul>
          </div>

          {/* Tautan Sosial Media dengan Ikon Asli */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Follow Us</h4>
            <div className="flex space-x-4">
              {/* Facebook Icon */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300 group"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" 
                  alt="Facebook" 
                  className="w-5 h-5 group-hover:brightness-0 group-hover:invert" 
                />
              </a>

              {/* Instagram Icon */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:border-transparent transition-all duration-300 group"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" 
                  alt="Instagram" 
                  className="w-5 h-5 group-hover:brightness-200" 
                />
              </a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default GuestLayout;