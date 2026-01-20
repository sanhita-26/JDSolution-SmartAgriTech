import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import TRANSLATIONS from "../i18n/translations";
import { AppContext } from "../context/AppContext";
import FarmOverviewSection from "../components/FarmOverviewSection/FarmOverviewSection";
import TodayPriceSection from "../components/TodayPriceSection";
import PricePredictionSection from "../components/PricePredictionSection";
import WeatherSection from "../components/WeatherSection";
import SmartInsightsSection from "../components/SmartInsightsSection";

import {
  LayoutDashboard,
  TrendingUp,
  CloudRain,
  Lightbulb,
  Wheat,
} from "lucide-react";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language];

  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <Navbar />

      {/* Greeting Section */}
      <div className="flex items-center gap-3 px-6 mt-4">
        <img
          src={user.avatar || "/avatar1.png"}
          alt="avatar"
          className="w-12 h-12 rounded-full shadow"
        />
        <div>
          <h2 className="text-xl font-bold">
            {t.hi}, {user.name || t.farmer}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {user.location ? `📍 ${user.location}` : ""}
          </p>
        </div>
      </div>

      {/* MAIN BODY */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">

        {/* LEFT SIDEBAR */}
        <aside className="bg-white shadow w-full lg:w-72 p-3 overflow-x-auto">
          <div className="flex lg:flex-col gap-2">
            <SectionItem
              icon={<LayoutDashboard size={18} />}
              title={t.overview}
              active={activeSection === "overview"}
              onClick={() => setActiveSection("overview")}
            />

            <SectionItem
              icon={<Wheat size={18} />}
              title={t.todayPrice}
              active={activeSection === "todayPrice"}
              onClick={() => setActiveSection("todayPrice")}
            />

            <SectionItem
              icon={<TrendingUp size={18} />}
              title={t.prediction}
              active={activeSection === "pricePrediction"}
              onClick={() => setActiveSection("pricePrediction")}
            />

            <SectionItem
              icon={<CloudRain size={18} />}
              title={t.weather}
              active={activeSection === "weather"}
              onClick={() => setActiveSection("weather")}
            />

            <SectionItem
              icon={<Lightbulb size={18} />}
              title={t.insights}
              active={activeSection === "insights"}
              onClick={() => setActiveSection("insights")}
            />
          </div>
        </aside>

        {/* CENTER CONTENT */}
        <main className="flex-1 overflow-y-auto p-4">
{activeSection === "overview" && (
  <FarmOverviewSection
    user={user}
    t={t}
    setActiveSection={setActiveSection}
  />
)}


          {activeSection === "todayPrice" && <TodayPriceSection />}
          {activeSection === "pricePrediction" && <PricePredictionSection />}
          {activeSection === "weather" && <WeatherSection />}
          {activeSection === "insights" && <SmartInsightsSection />}
        </main>
      </div>
    </div>
  );
}

function SectionItem({ icon, title, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${
        active ? "bg-green-200 font-semibold" : "bg-green-50 hover:bg-green-100"
      }`}
    >
      {icon}
      <span>{title}</span>
    </div>
  );
}
