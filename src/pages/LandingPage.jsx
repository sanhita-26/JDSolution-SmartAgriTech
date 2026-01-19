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

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center">
        
        {/* LEFT TEXT */}
        <div className="text-white lg:w-1/2">
<h1 className="text-5xl font-extrabold leading-tight drop-shadow-xl mb-4">
  {t.landingTitle.split(",")[0]}, <br />
  {t.landingTitle.split(",")[1]}
</h1>


          <p className="text-xl font-medium mb-6 drop-shadow-lg">
            {t.landingSubtitle}
          </p>

          <button
            onClick={() => navigate("/auth")}
            className="bg-[#d7f24f] text-black font-semibold px-8 py-3 rounded-xl text-lg shadow-xl hover:bg-[#c7e63f] transition"
          >
            {t.getStarted}
          </button>
        </div>

        {/* RIGHT — FARMER IMAGE */}
        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-2xl bg-yellow-300/40 scale-125"></div>

            <img
              src="/farmer.png"
              alt="Farmer"
              className="relative w-72 h-72 object-cover rounded-full shadow-2xl"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
