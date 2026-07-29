import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import TRANSLATIONS from "../i18n/translations";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const { language, changeLanguage } = useContext(AppContext);
  const t = TRANSLATIONS[language];

  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = Boolean(user);
  const path = location.pathname;

  const isLanding = path === "/";

  const showLocation =
    isLoggedIn &&
    ["/dashboard", "/sell-crop", "/track", "/support"].includes(path);

  const activeClass = (route) =>
    path === route
      ? "text-green-700 font-bold"
      : "text-gray-700 hover:text-green-600";

  const [menuOpen, setMenuOpen] = useState(false);
  const [talukaOpen, setTalukaOpen] = useState(false);

  const city = user?.location;

  const TALUKA_MAP = {
    Pune: [
      "Haveli",
      "Mulshi",
      "Maval",
      "Junnar",
      "Ambegaon",
      "Shirur",
      "Purandar",
      "Bhor",
      "Velhe",
      "Daund",
      "Baramati",
      "Indapur",
    ],
  };

  const talukas = TALUKA_MAP[city] || [];
  const selectedTaluka = localStorage.getItem("taluka") || "Select Taluka";

  const setTaluka = (t) => {
    localStorage.setItem("taluka", t);
    setTalukaOpen(false);
  };

  return (
    <header className="sticky top-0 w-full bg-white shadow-md z-[9999] px-5 py-3 overflow-visible">
      <div className="flex justify-between items-center">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={logo} className="h-9 w-9 rounded-full" />
          <h1 className="font-bold text-green-700 text-lg">{t.title}</h1>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6">

          {isLanding && (
            <>
              <button
                onClick={() =>
                  document.getElementById("weather")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {t.weather}
              </button>

              <button
                onClick={() =>
                  document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {t.navBenefits}
              </button>

              <button
                onClick={() => navigate("/auth")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                {t.login}
              </button>

              <button
                onClick={() => navigate("/auth")}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                {t.signup}
              </button>
            </>
          )}

          {!isLanding && isLoggedIn && (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className={activeClass("/dashboard")}
              >
                Dashboard
              </button>

              {/* LOCATION + TALUKA */}
              {showLocation && city && (
                <div className="relative">
                  <button
                    onClick={() => setTalukaOpen((v) => !v)}
                    className="flex items-center gap-1 text-sm font-medium"
                  >
                    📍 {city} · {selectedTaluka}
                    <span className="text-gray-500">▼</span>
                  </button>

                  {talukaOpen && (
                    <div className="absolute top-10 left-0 bg-white border rounded-xl shadow-lg w-48 z-[99999]">
                      <div className="px-3 py-2 text-xs text-gray-500 border-b">
                        Select Taluka
                      </div>
                      {talukas.map((t) => (
                        <div
                          key={t}
                          onClick={() => setTaluka(t)}
                          className="px-4 py-2 hover:bg-green-100 cursor-pointer text-sm"
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => navigate("/sell-crop")}
                className={activeClass("/sell-crop")}
              >
                {t.sell}
              </button>

              <button
                onClick={() => navigate("/track")}
                className={activeClass("/track")}
              >
                {t.track}
              </button>

              <button
                onClick={() => navigate("/support")}
                className={activeClass("/support")}
              >
                {t.support}
              </button>

              <div
                onClick={() => navigate("/profile")}
                className={`flex items-center gap-2 cursor-pointer ${activeClass("/profile")}`}
              >
                <img src={user.avatar} className="h-8 w-8 rounded-full border" />
                <span className="text-sm">{user.name}</span>
              </div>

              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/");
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                {t.logout}
              </button>
            </>
          )}

          {/* LANGUAGE */}
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="mr">MR</option>
          </select>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 border-t pt-4 text-base">

          {!isLanding && isLoggedIn && (
            <>
              <button onClick={() => navigate("/dashboard")} className="block w-full text-left">
                Dashboard
              </button>

              {showLocation && city && (
                <div className="px-1">
                  <p className="text-sm mb-1">📍 {city}</p>
                  <select
                    value={selectedTaluka}
                    onChange={(e) => setTaluka(e.target.value)}
                    className="w-full border p-2 rounded"
                  >
                    <option>Select Taluka</option>
                    {talukas.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              )}

              <button onClick={() => navigate("/sell-crop")} className="block w-full text-left">
                {t.sell}
              </button>

              <button onClick={() => navigate("/track")} className="block w-full text-left">
                {t.track}
              </button>

              <button onClick={() => navigate("/support")} className="block w-full text-left">
                {t.support}
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/");
                }}
                className="text-red-600 block w-full text-left"
              >
                {t.logout}
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
