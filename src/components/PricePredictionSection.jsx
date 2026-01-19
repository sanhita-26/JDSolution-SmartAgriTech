import React, { useContext } from "react";
import { Wheat, Leaf, Zap } from "lucide-react";
import { AppContext } from "../context/AppContext";
import TRANSLATIONS from "../i18n/translations";

export default function PricePredictionSection() {
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language];

  const predictions = [
    {
      crop: t.wheat,
      icon: <Wheat size={24} className="text-yellow-600" />,
      direction: t.rising,
      advice: t.advice_good_sell,
    },
    {
      crop: t.rice,
      icon: <Leaf size={24} className="text-green-600" />,
      direction: t.falling,
      advice: t.advice_hold,
    },
    {
      crop: t.onion,
      icon: <Zap size={24} className="text-red-600" />,
      direction: t.rising,
      advice: t.advice_tmr_high,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold mb-2">{t.pricePredictionTitle}</h2>

      {predictions.map((p, index) => (
        <div
          key={index}
          className="
            p-3 border rounded-lg bg-green-50 flex justify-between items-center
            transition transform hover:scale-[1.02] hover:shadow-lg hover:border-green-400
          "
        >
          <div className="flex items-center gap-3">
            {p.icon}
            <div>
              <p className="font-semibold">{p.crop}</p>
              <p className="text-sm text-gray-600">{p.advice}</p>
            </div>
          </div>

          <p
            className={`font-bold ${
              p.direction === t.rising ? "text-green-600" : "text-red-600"
            }`}
          >
            {p.direction}
          </p>
        </div>
      ))}
    </div>
  );
}
