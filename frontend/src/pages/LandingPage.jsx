import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import TRANSLATIONS from "../i18n/translations";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language];
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover brightness-75"
        style={{ backgroundImage: "url('/bg-farm.jpg')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>

      {/* Navbar */}
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center">
        
        {/* LEFT TEXT */}
        <div className="text-white lg:w-1/2">
          <h1 className="text-6xl font-extrabold leading-tight drop-shadow-xl mb-6 tracking-tight">
            {t.landingTitle.split(",")[0]}, <br />
            {t.landingTitle.split(",")[1]}
          </h1>

          <p className="text-2xl font-medium mb-10 drop-shadow-xl leading-relaxed opacity-95">
            {t.landingSubtitle}
          </p>

          <button
            onClick={() => navigate("/auth")}
            className="bg-[#d7f24f] text-black font-semibold px-10 py-4 rounded-2xl text-xl shadow-2xl hover:bg-[#c7e63f] transition-all"
          >
            {t.getStarted}
          </button>
        </div>

        {/* RIGHT — FARMER IMAGE */}
        <div className="lg:w-1/2 mt-14 lg:mt-0 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-3xl bg-yellow-300/50 scale-[1.45] opacity-90"></div>

            <img
              src="/farmer.png"
              alt="Farmer"
              className="relative w-[28rem] h-[28rem] object-cover rounded-full shadow-2xl"
            />
          </div>
        </div>

      </div>

    {/* FARMER BENEFITS SECTION */}
<div
  id="benefits"
  className="relative w-full py-28 mt-16 overflow-hidden"
>
  {/* BG IMAGE WITH SAME EFFECT */}
  <div
    className="absolute inset-0 bg-center bg-cover brightness-75"
    style={{ backgroundImage: "url('/bg-farm.jpg')" }}
  ></div>

  {/* OVERLAY */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* CONTENT */}
  <div className="relative z-20 max-w-6xl mx-auto px-6 text-center text-white">

    <h2 className="text-6xl font-extrabold drop-shadow-xl mb-8">
      {t.farmerBenefitsTitle}
    </h2>

    <p className="text-2xl opacity-90 mb-20">
      {t.farmerBenefitsSubtitle}
    </p>

    {/* BENEFIT CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
      {t.farmerBenefits.map((b, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 
                     hover:scale-[1.05] transition-all max-w-[380px] mx-auto"
        >
          {/* Larger circular image */}
          <img
            src={b.img}
            alt={b.title}
            className="w-32 h-32 mx-auto mb-8 object-cover rounded-full border-8 border-[#d7f24f] shadow-xl"
          />

          <h3 className="text-3xl font-semibold mb-4 drop-shadow-lg">
            {b.title}
          </h3>

          <p className="text-base opacity-90 leading-relaxed">
            {b.desc}
          </p>
        </div>
      ))}
    </div>

  </div>
</div>


    </div>
  );
}
