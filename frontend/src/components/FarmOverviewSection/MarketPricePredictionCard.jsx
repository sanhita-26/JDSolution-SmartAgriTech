import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import TRANSLATIONS from "../../i18n/translations";

export default function MarketPricePredictionCard() {
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language];

  const crops = [
    { name: "Wheat", trend: "up", value: "+₹35" },
    { name: "Rice", trend: "up", value: "+₹18" },
    { name: "Tomato", trend: "down", value: "-₹4" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold text-lg mb-3">{t.marketPredictionTitle}</h3>

      <div className="space-y-3">
        {crops.map((crop) => (
          <div key={crop.name} className="flex justify-between items-center">
            <span className="text-sm font-medium">{crop.name}</span>
            <span
              className={`text-sm font-semibold ${
                crop.trend === "up" ? "text-green-600" : "text-red-500"
              }`}
            >
              {crop.value} {crop.trend === "up" ? "↑" : "↓"}
            </span>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-3">{t.marketTrendNote}</p>
    </div>
  );
}
