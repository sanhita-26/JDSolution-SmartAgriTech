import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import TRANSLATIONS from "../../i18n/translations";

export default function IrrigationInsightsCard() {
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language];

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold text-lg mb-3">{t.irrigationTitle}</h3>

      <p className="text-sm text-gray-600 mb-2">{t.irrigationRecommended}</p>

      <div className="flex items-end gap-3">
        <p className="text-3xl font-bold text-blue-600">12 L</p>
        <p className="text-sm text-gray-500 mb-1">{t.irrigationPerPlant}</p>
      </div>

      <div className="mt-3">
        <div className="h-2 bg-blue-100 rounded-full">
          <div className="h-2 w-[48%] bg-blue-600 rounded-full"></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {t.soilMoisture}: 48% ({t.soilMoistureLevel})
        </p>
      </div>

      <p className="text-xs text-green-600 mt-2">{t.waterSavingTip}</p>
    </div>
  );
}
