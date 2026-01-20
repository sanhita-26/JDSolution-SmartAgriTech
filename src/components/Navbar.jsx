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

  const isLanding = location.pathname === "/";
  const isAuthPage = location.pathname === "/auth";

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

  const selectedTaluka =
    localStorage.getItem("taluka") || "Select Taluka";

  const setTaluka = (t) => {
    localStorage.setItem("taluka", t);
    setTalukaOpen(false);
  };

  return (
    <header
  className="
    sticky top-0 left-0 w-full
    bg-white shadow-md
    z-[9999]
    px-5 py-3
  "
>

      <div className="flex justify-between items-center">

        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="h-9 w-9 rounded-full" />
          <h1 className="font-bold text-green-700 text-lg">
            {t.title}
          </h1>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-4">

          {isLanding ? (
            <>
              <button onClick={() => navigate("/auth")}>{t.weather}</button>
              <button
  onClick={() => {
    const section = document.getElementById("benefits");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }}
  className="px-4 py-2"
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
          ) : isLoggedIn ? (
            <>
              {/* LOCATION + TALUKA */}
              {city && (
                <div className="relative">
                  <button
                    onClick={() => setTalukaOpen(!talukaOpen)}
                    className="flex items-center gap-1 text-sm font-medium"
                  >
                    📍 {city} · {selectedTaluka}
                  </button>

                  {talukaOpen && (
                    <div className="absolute top-8 bg-white border rounded shadow w-44">
                      {talukas.map((t) => (
                        <div
                          key={t}
                          onClick={() => setTaluka(t)}
                          className="px-3 py-2 hover:bg-green-100 cursor-pointer text-sm"
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <button onClick={() => navigate("/sell-crop")}>{t.sell}</button>
              <button onClick={() => navigate("/track")}>{t.track}</button>
              <button onClick={() => navigate("/profile")}>{t.profile}</button>
              <button onClick={() => navigate("/support")}>{t.support}</button>

              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <img
                  src={user.avatar}
                  className="h-8 w-8 rounded-full border"
                />
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
          ) : (
            !isAuthPage && (
              <button
                onClick={() => navigate("/auth")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                {t.login}
              </button>
            )
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

        {/* MOBILE */}
        <div className="md:hidden flex items-center gap-2">

          {/* LANGUAGE ALWAYS VISIBLE */}
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="mr">MR</option>
          </select>

          {/* HAMBURGER */}
          <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-3">

          {city && (
            <div>
              <p className="text-sm font-semibold">📍 {city}</p>
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

          <button onClick={() => navigate("/sell-crop")}>{t.sell}</button>
          <button onClick={() => navigate("/track")}>{t.track}</button>
          <button onClick={() => navigate("/profile")}>{t.profile}</button>
          <button onClick={() => navigate("/support")}>{t.support}</button>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="text-red-600"
          >
            {t.logout}
          </button>
        </div>
      )}
    </header>
  );
}
