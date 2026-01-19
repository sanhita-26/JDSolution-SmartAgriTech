import React, { useContext } from "react";
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

  return (
    <header className="bg-white shadow-md px-5 py-3 flex justify-between items-center sticky top-0 z-20">

      {/* LEFT: LOGO + TITLE */}
      <div
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" className="h-9 w-9 rounded-full" />
        <h1 className="font-bold text-green-700 text-lg">{t.title}</h1>
      </div>

      {/* RIGHT MENU */}
      <div className="flex items-center gap-4">

        {/* 🌐 LANDING PAGE NAVIGATION */}
        {isLanding ? (
          <>
            <button
              onClick={() => navigate("/auth")}
              className="text-sm font-medium hover:text-green-600"
            >
              {t.weather}
            </button>

            <button
              onClick={() => navigate("/auth")}
              className="text-sm font-medium hover:text-green-600"
            >
              {t.benefits}
            </button>

            <button
              onClick={() => navigate("/auth")}
              className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm font-semibold"
            >
              {t.login}
            </button>

            <button
              onClick={() => navigate("/auth")}
              className="px-3 py-1 bg-yellow-400 text-black rounded-lg text-sm font-semibold"
            >
              {t.signup}
            </button>
          </>
        ) : !isLoggedIn ? (
          /* ❗ NOT LOGGED IN (auth page or restricted area) */
          <>
            {!isAuthPage && (
              <button
                onClick={() => navigate("/auth")}
                className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm"
              >
                {t.login}
              </button>
            )}
          </>
        ) : (
          /* 🌾 FULL APP NAVBAR (LOGGED IN) */
          <>
            <button
              onClick={() => navigate("/sell-crop")}
              className="text-sm hover:text-green-600"
            >
              {t.sell}
            </button>

            <button
              onClick={() => navigate("/track")}
              className="text-sm hover:text-green-600"
            >
              {t.track}
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="text-sm hover:text-green-600"
            >
              {t.profile}
            </button>

            <button
              onClick={() => navigate("/support")}
              className="text-sm hover:text-green-600"
            >
              {t.support}
            </button>

            {/* USER AVATAR */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              {user?.avatar && (
                <img
                  src={user.avatar}
                  className="h-9 w-9 rounded-full border shadow"
                />
              )}
              <span className="text-sm font-medium">
                {user?.name || "Farmer"}
              </span>
            </div>

            {/* LOGOUT */}
            <button
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/");
              }}
              className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
            >
              {t.logout}
            </button>
          </>
        )}

        {/* 🌍 LANGUAGE SWITCH */}
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="border rounded px-2 py-1 text-sm bg-white"
        >
          <option value="en">EN</option>
          <option value="hi">HI</option>
          <option value="mr">MR</option>
        </select>
      </div>
    </header>
  );
}
