import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import TRANSLATIONS from "../i18n/translations";

export default function FarmOverviewSection({ user }) {
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language];

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-xl font-bold mb-2">
        {t.dashboardOverview}
      </h2>

      <p className="text-gray-600 mb-4">
        {t.overviewSubtitle}
      </p>

      <div className="mb-4">
        <p className="font-semibold mb-1">{t.yourCrops}</p>
        <div className="flex flex-wrap gap-2">
          {(user.preferredCrops || []).map((crop) => (
            <span
              key={crop}
              className="bg-green-100 text-sm px-3 py-1 rounded-full"
            >
              {crop}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <button className="bg-green-700 text-white px-4 py-2 rounded-lg">
          {t.checkPrices}
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          {t.checkWeather}
        </button>
      </div>
    </div>
  );
}
