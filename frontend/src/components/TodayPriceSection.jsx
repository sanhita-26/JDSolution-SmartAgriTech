import React, { useContext } from "react";
import {
  Wheat, Leaf, Carrot, Apple, Sprout, Store,
  IndianRupee, Banana, Grape, Citrus,
} from "lucide-react";
import { AppContext } from "../context/AppContext";
import TRANSLATIONS from "../i18n/translations";

export default function TodayPriceSection() {
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language] || {};

  const crops = [
    { name: t.wheat || "Wheat", icon: Wheat, mandi: 2280, jd: 2350, bg: "bg-green-50" },
    { name: t.rice || "Rice", icon: Sprout, mandi: 2100, jd: 2180, bg: "bg-blue-50" },
    { name: t.maize || "Maize", icon: Leaf, mandi: 1850, jd: 1920, bg: "bg-lime-50" },
    { name: t.soybean || "Soybean", icon: Sprout, mandi: 4200, jd: 4350, bg: "bg-emerald-50" },

    { name: t.onion || "Onion", icon: Leaf, mandi: 1800, jd: 1900, bg: "bg-purple-50" },
    { name: t.potato || "Potato", icon: Carrot, mandi: 1600, jd: 1680, bg: "bg-yellow-50" },
    { name: t.tomato || "Tomato", icon: Apple, mandi: 1400, jd: 1500, bg: "bg-red-50" },
    { name: t.greenPeas || "Green Peas", icon: Leaf, mandi: 3200, jd: 3350, bg: "bg-teal-50" },

    { name: t.apple || "Apple", icon: Apple, mandi: 8500, jd: 8800, bg: "bg-pink-50" },
    { name: t.banana || "Banana", icon: Banana, mandi: 1200, jd: 1300, bg: "bg-amber-50" },
    { name: t.grapes || "Grapes", icon: Grape, mandi: 5200, jd: 5450, bg: "bg-violet-50" },
    { name: t.orange || "Orange", icon: Citrus, mandi: 3800, jd: 4000, bg: "bg-orange-50" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4 w-full">
      <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2">
        <Store /> {t.todayPrice || "Today’s Crop Price"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {crops.map((crop, i) => {
          const Icon = crop.icon;
          return (
            <div
              key={i}
              className={`${crop.bg} rounded-xl p-4 shadow-sm flex flex-col gap-3
                transition hover:scale-[1.03] hover:shadow-lg`}
            >
              <div className="flex items-center gap-2">
                <Icon className="text-green-700" size={24} />
                <h3 className="font-semibold">{crop.name}</h3>
              </div>

              <div className="flex gap-3">
                <div className="bg-white rounded-lg p-2 flex-1">
                  <p className="text-xs text-gray-500">{t.mandiPriceLabel || "Mandi Price"}</p>
                  <p className="font-bold flex items-center gap-1">
                    <IndianRupee size={14} /> {crop.mandi}
                  </p>
                </div>

                <div className="bg-white rounded-lg p-2 flex-1">
                  <p className="text-xs text-gray-500">{t.jdPriceLabel || "JD Solution"}</p>
                  <p className="font-bold flex items-center gap-1">
                    <IndianRupee size={14} /> {crop.jd}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
