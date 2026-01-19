import React, { useContext } from "react";
import { Sun, CloudRain, Cloud, CloudSnow } from "lucide-react";
import { AppContext } from "../context/AppContext";
import TRANSLATIONS from "../i18n/translations";

export default function WeatherSection() {
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language] || {};

  const weatherData = [
    {
      location: t.field1 || "Farm Field 1",
      temperature: "32°C",
      rainfall: t.lightRain || "Light Rain",
      icon: <CloudRain size={28} className="text-blue-600" />,
      advice: t.irrigationAdvice || "Carry irrigation if needed",
    },
    {
      location: t.field2 || "Farm Field 2",
      temperature: "28°C",
      rainfall: t.sunny || "Sunny",
      icon: <Sun size={28} className="text-yellow-500" />,
      advice: t.harvestAdvice || "Perfect weather for harvesting",
    },
    {
      location: t.field3 || "Farm Field 3",
      temperature: "25°C",
      rainfall: t.cloudy || "Cloudy",
      icon: <Cloud size={28} className="text-gray-500" />,
      advice: t.moistureAdvice || "Monitor soil moisture",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold mb-2">
        {t.weatherForecast || "Weather & Forecast"}
      </h2>

      {weatherData.map((w, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg bg-green-50 flex justify-between items-center
                     transition hover:scale-[1.03] hover:shadow-lg"
        >
          <div className="flex items-center gap-4">
            {w.icon}
            <div>
              <p className="font-semibold">{w.location}</p>
              <p className="text-sm text-gray-600">{w.advice}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="font-bold">{w.temperature}</p>
            <p className="text-sm text-blue-700">{w.rainfall}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
