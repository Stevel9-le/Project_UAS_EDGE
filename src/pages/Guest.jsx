import React, { useState } from "react";
import reviews from "../data/reviews.json";
import productsData from "../data/products.json"; // 👈 Tambahan: Import data produk JSON ke sini

const Guest = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeRoom, setActiveRoom] = useState("all");
  const [selectedCard, setSelectedCard] = useState(null);

  // --- FUNGSI SCROLL OTOMATIS: REPRODUKSI REAKSI "EXPLORE ARENA" ---
  const handleNavigation = (sectionId) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const navbarOffset = 85; // Menjaga batas atas agar tidak menabrak bar navigasi
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth" // Menggulung dengan ritme konstan yang stabil
      });
    }
  };

  const filteredProducts = productsData.filter((item) => {
    let matchCategory = true;
    if (activeCategory !== "all") matchCategory = item.category === activeCategory;

    let matchRoom = true;
    if (activeRoom !== "all") matchRoom = item.room === activeRoom || item.room === "both";

    return matchCategory && matchRoom;
  });

  return (
    <div className="bg-[#0a0b10] text-slate-100 min-h-screen selection:bg-cyan-500 selection:text-black">
      
      {/* FIXED NAVBAR (DIINTEGRASIKAN KE INDUK SUPAYA TOMBOL BERFUNGSI) */}
      <nav className="fixed top-0 left-0 w-full bg-[#0a0b10]/95 backdrop-blur-md border-b border-slate-900 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            onClick={() => handleNavigation("home-section")} 
            className="text-xl font-black text-white tracking-wider cursor-pointer select-none"
          >
            ED<span className="text-rose-500">GE.</span>
          </div>
          
          <div className="flex gap-8 items-center">
            <button 
              onClick={() => handleNavigation("home-section")} 
              className="text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors duration-300 uppercase tracking-widest font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation("about-section")} 
              className="text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors duration-300 uppercase tracking-widest font-medium"
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation("menu-section")} 
              className="text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors duration-300 uppercase tracking-widest font-medium"
            >
              Menu
            </button>
            <button className="text-xs font-bold text-slate-300 uppercase tracking-wider hover:text-white transition-colors ml-4">
              Login
            </button>
            <button className="bg-rose-500 text-white text-xs font-bold uppercase px-4 py-2 rounded shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:scale-105 transition-transform">
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header id="home-section" className="pt-32 pb-24 px-6 md:flex items-center max-w-7xl mx-auto gap-12 min-h-[85vh] relative">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] -z-10"></div>

        <div className="md:w-1/2 space-y-8 z-10">
          <span className="text-cyan-400 font-mono font-bold uppercase tracking-[0.4em] text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            System Portal: PC-18 [GUEST]
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tight uppercase">
            READY TO <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-500 drop-shadow-[0_0_30px_rgba(0,240,255,0.3)]">LEVEL UP?</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed">
            Selamat datang di arena. Silahkan masuk menggunakan akun member Anda atau mulai sesi instan untuk langsung bermain.
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <button className="bg-cyan-400 text-black px-10 py-4 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-transparent hover:text-cyan-400 border-2 border-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
              Member Login
            </button>
            <button 
              onClick={() => handleNavigation("menu-section")}
              className="bg-transparent text-white border-2 border-slate-700 px-10 py-4 rounded-md font-bold uppercase tracking-widest text-xs hover:border-rose-500 hover:text-rose-500 transition-all duration-300"
            >
              Explore Arena
            </button>
          </div>
        </div>

        {/* MAPS SECTION */}
        <div className="md:w-1/2 mt-12 md:mt-0 relative flex justify-center w-full">
          <div className="w-full relative group p-1 bg-gradient-to-tr from-cyan-500 to-rose-500 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden">
            <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-mono text-cyan-400 uppercase tracking-widest border border-cyan-500/20 shadow-lg pointer-events-none">
              EDGE HQ Location Matrix // Online
            </div>

            <iframe
              title="Edge Internet Cafe Location"
              src="https://maps.google.com/maps?q=Jakarta%20Cyber%20Cafe&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[400px] rounded-xl border-0 grayscale invert opacity-75 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </header>

      {/* ABOUT SECTION */}
      <section id="about-section" className="py-24 bg-[#0d0e15] border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <img
                src="https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=400&q=80"
                className="rounded-xl border border-slate-800 shadow-xl w-full h-[340px] object-cover"
                alt="Specs Monitor"
              />
            </div>
            <div className="col-span-6 flex flex-col gap-4">
              <img
                src="https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&w=400&q=80"
                className="rounded-xl border border-slate-800 shadow-xl h-[162px] object-cover"
                alt="Peripherals Keyboard"
              />
              <img
                src="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80"
                className="rounded-xl border border-slate-800 shadow-xl h-[162px] object-cover"
                alt="Gaming Mouse"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-rose-500 font-mono font-bold uppercase tracking-widest text-xs">
              Hardware & Specs
            </span>
            <h2 className="text-4xl font-black text-white uppercase tracking-tight">
              Spesifikasi Monster <br /> Tanpa Kompromi
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Kami menyediakan rig gaming terbaik kelas turnamen untuk memastikan kompetisimu berjalan lancar tanpa frame drop.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-800">
              <div className="bg-[#12141c] p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">GRAPHICS CARD</span>
                <h4 className="font-bold text-xl text-white">NVIDIA RTX 4070 Ti</h4>
                <p className="text-xs text-slate-500 mt-1">12GB GDDR6X - Ray Tracing Enabled</p>
              </div>
              <div className="bg-[#12141c] p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-mono text-rose-500 font-bold block mb-1">PROCESSOR</span>
                <h4 className="font-bold text-xl text-white">Intel Core i7-14700K</h4>
                <p className="text-xs text-slate-500 mt-1">Up to 5.6 GHz Max Turbo</p>
              </div>
              <div className="bg-[#12141c] p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">MEMORY & STORAGE</span>
                <h4 className="font-bold text-xl text-white">32GB DDR5 + NVMe SSD</h4>
                <p className="text-xs text-slate-500 mt-1">Ultra-fast loading times</p>
              </div>
              <div className="bg-[#12141c] p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-mono text-rose-500 font-bold block mb-1">DISPLAY MONITOR</span>
                <h4 className="font-bold text-xl text-white">ASUS ROG 240Hz G-Sync</h4>
                <p className="text-xs text-slate-500 mt-1">1ms Response Time - IPS Panel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu-section" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
          <div>
            <span className="text-cyan-400 font-mono font-bold uppercase tracking-widest text-xs">
              Cafe & Services
            </span>
            <h2 className="text-4xl font-black text-white uppercase tracking-tight">
              Gamer Fuel & Billing
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-rose-500 mt-3"></div>
          </div>
          
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <div className="flex gap-1 bg-[#0d0e15] p-1 rounded-lg border border-slate-800">
              <button 
                onClick={() => { setActiveRoom("all"); setSelectedCard(null); }}
                className={`text-xs font-bold uppercase px-3 py-1.5 rounded-md transition-all ${
                  activeRoom === "all" ? "bg-gradient-to-r from-cyan-500 to-rose-500 text-black" : "text-slate-400 hover:text-white"
                }`}
              >
                All Rooms
              </button>
              <button 
                onClick={() => { setActiveRoom("reguler"); setSelectedCard(null); }}
                className={`text-xs font-bold uppercase px-3 py-1.5 rounded-md transition-all ${
                  activeRoom === "reguler" ? "bg-cyan-500 text-black" : "text-slate-400 hover:text-cyan-400"
                }`}
              >
                Reguler
              </button>
              <button 
                onClick={() => { setActiveRoom("vip"); setSelectedCard(null); }}
                className={`text-xs font-bold uppercase px-3 py-1.5 rounded-md transition-all ${
                  activeRoom === "vip" ? "bg-rose-500 text-white" : "text-slate-400 hover:text-rose-400"
                }`}
              >
                VIP Arena
              </button>
            </div>

            <div className="flex gap-1 bg-[#12141c] p-1 rounded-lg border border-slate-800">
              <button 
                onClick={() => { setActiveCategory("all"); setSelectedCard(null); }}
                className={`text-xs font-bold uppercase px-4 py-1.5 rounded-md transition-all ${
                  activeCategory === "all" ? "bg-slate-800 text-cyan-400" : "text-slate-400 hover:text-white"
                }`}
              >
                All Items
              </button>
              <button 
                onClick={() => { setActiveCategory("package"); setSelectedCard(null); }}
                className={`text-xs font-bold uppercase px-4 py-1.5 rounded-md transition-all ${
                  activeCategory === "package" ? "bg-slate-800 text-cyan-400" : "text-slate-400 hover:text-white"
                }`}
              >
                PC Packages
              </button>
              <button 
                onClick={() => { setActiveCategory("food"); setSelectedCard(null); }}
                className={`text-xs font-bold uppercase px-4 py-1.5 rounded-md transition-all ${
                  activeCategory === "food" ? "bg-slate-800 text-cyan-400" : "text-slate-400 hover:text-white"
                }`}
              >
                Food Only
              </button>
              <button 
                onClick={() => { setActiveCategory("drink"); setSelectedCard(null); }}
                className={`text-xs font-bold uppercase px-4 py-1.5 rounded-md transition-all ${
                  activeCategory === "drink" ? "bg-slate-800 text-cyan-400" : "text-slate-400 hover:text-white"
                }`}
              >
                Drinks Only
              </button>
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start transition-all duration-500">
            {filteredProducts.map((item) => {
              const isExpanded = selectedCard === item.id;

              return (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedCard(isExpanded ? null : item.id)}
                  className={`group relative bg-[#12141c] border transition-all duration-500 ease-in-out p-4 rounded-2xl cursor-pointer ${
                    isExpanded 
                      ? "lg:col-span-2 border-cyan-400 bg-[#161924] shadow-[0_0_30px_rgba(0,240,255,0.15)]" 
                      : "border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <span className={`absolute top-6 right-6 z-20 text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${
                    item.room === "vip" ? "bg-rose-500/20 text-rose-400 border border-rose-500/40" : 
                    item.room === "reguler" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40" : 
                    "bg-slate-800 text-slate-400"
                  }`}>
                    {item.room === "both" ? "All Area" : item.room}
                  </span>

                  <div className={`flex flex-col ${isExpanded ? "sm:flex-row gap-6" : "gap-0"}`}>
                    <div className={`relative overflow-hidden rounded-xl bg-slate-900 transition-all duration-500 ${
                      isExpanded ? "w-full sm:w-1/2 aspect-[4/3]" : "w-full aspect-[4/3] mb-5"
                    }`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className={`flex-1 flex flex-col justify-between pt-2 ${isExpanded ? "pb-14" : "pb-0"}`}>
                      <div>
                        <h3 className={`font-bold text-white transition-colors group-hover:text-cyan-400 ${
                          isExpanded ? "text-xl" : "text-lg line-clamp-1"
                        }`}>
                          {item.name}
                        </h3>
                        <p className="text-rose-500 font-mono font-bold mt-1 tracking-wide">
                          {item.price}
                        </p>
                        <p className={`text-slate-400 text-sm mt-3 leading-relaxed transition-all duration-500 ${
                          isExpanded ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"
                        }`}>
                          {item.description}
                        </p>
                      </div>

                      <div className={`transition-all duration-300 ${
                        isExpanded 
                          ? "absolute bottom-4 right-4 opacity-100" 
                          : "absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 sm:bottom-auto sm:right-auto sm:inset-0 sm:bg-black/60 sm:group-hover:opacity-100 sm:flex sm:items-center sm:justify-center rounded-xl overflow-hidden"
                      }`}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Ordering: ${item.name}`);
                          }}
                          className={`bg-cyan-400 text-black px-6 py-2.5 rounded-md font-bold text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-transform duration-300 ${
                            isExpanded ? "hover:scale-105" : "transform translate-y-3 group-hover:translate-y-0"
                          }`}
                        >
                          {item.category === "package" ? "Buy Package" : "Order Now"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-slate-500 font-mono">No items found matching the selected filters.</p>
          </div>
        )}
      </section>

      {/* SQUAD REVIEWS */}
      <section className="py-24 bg-[#0d0e15] border-t border-slate-900 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-rose-500 font-mono font-bold uppercase tracking-widest text-xs">
              Squad Feedback
            </span>
            <h2 className="text-3xl font-black mt-2 text-white uppercase tracking-tight">
              Review Para Pro-Gamer
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-[#12141c] p-8 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 overflow-hidden rounded-full border-2 border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                    <img
                      src={rev.image}
                      alt={rev.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://ui-avatars.com/api/?background=0d0e15&color=00f0ff&name=" + rev.name;
                      }}
                    />
                  </div>
                  <h4 className="font-bold text-white">{rev.name}</h4>
                  <div className="flex text-cyan-400 text-xs my-2 tracking-widest">
                    {"★".repeat(rev.rating)}
                    {"☆".repeat(5 - rev.rating)}
                  </div>
                  <p className="text-slate-400 italic text-sm mt-2 leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Guest;