import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import TRANSLATIONS from "../i18n/translations";

export default function SmartInsightsSection() {
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language];

  const insights = [
    {
      icon: "🌧️",
      title: t.insight_rain || "Rain Alert",
      tag: t.insight_important || "Important",
      description:
        t.insight_rain_desc ||
        "Heavy rain expected in 2 days. Consider selling perishables early.",
      type: "warning",
    },
    {
      icon: "📈",
      title: t.insight_wheat || "Wheat Prices Rising",
      tag: t.insight_important || "Important",
      description:
        t.insight_wheat_desc ||
        "Wheat prices up 3.2% this week. Good time to sell.",
      type: "warning",
    },
    {
      icon: "🍅",
      title: t.insight_tomato || "High Tomato Demand",
      tag: null,
      description:
        t.insight_tomato_desc ||
        "Festival season ahead. Tomato demand expected to increase.",
      type: "info",
    },
    {
      icon: "💡",
      title: t.insight_tip || "Storage Tip",
      tag: null,
      description:
        t.insight_tip_desc ||
        "Reduce moisture in wheat before storing to prevent spoilage.",
      type: "tip",
    },
  ];

  const colorMap = {
    warning: "border-red-400 bg-red-50",
    info: "border-blue-400 bg-blue-50",
    tip: "border-green-400 bg-green-50",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold mb-2">{t.smartInsights || "Smart Insights"}</h2>

      {insights.map((item, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border-l-4 ${colorMap[item.type]}
           transition transform hover:scale-[1.02] hover:shadow-md`}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">{item.icon}</span>

            <div className="w-full">
              <h4 className="font-semibold flex items-center gap-2">
                {item.title}
                {item.tag && (
                  <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">
                    {item.tag}
                  </span>
                )}
              </h4>

              <p className="text-sm text-gray-700 mt-1">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
