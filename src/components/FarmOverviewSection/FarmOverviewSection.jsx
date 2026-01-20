import React from "react";
import CropHealthCard from "./CropHealthCard";
import IrrigationInsightsCard from "./IrrigationInsightsCard";
import MarketPricePredictionCard from "./MarketPricePredictionCard";
import ProfitEstimatorCard from "./ProfitEstimatorCard";

export default function FarmOverviewSection({
  user,
  t = {},
  setActiveSection,
}) {
  console.log("t.dashboardOverview =", t?.dashboardOverview);

  return (
    <div className="space-y-4">

      {/* TOP OVERVIEW BOX */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-bold mb-2">
          {t?.dashboardOverview || "Overview"}
        </h2>

        <p className="text-gray-600 mb-4">
          {t?.overviewSubtitle || ""}
        </p>

        <div className="mb-4">
          <p className="font-semibold mb-1">
            {t?.yourCrops || "Your Crops"}
          </p>

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
          <button
            onClick={() => setActiveSection("todayPrice")}
            className="bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            {t?.checkPrices}
          </button>

          <button
            onClick={() => setActiveSection("weather")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {t?.checkWeather}
          </button>
        </div>
      </div>

      {/* INSIGHT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CropHealthCard />
        <IrrigationInsightsCard />
        <MarketPricePredictionCard />
        <ProfitEstimatorCard />
      </div>
    </div>
  );
}
