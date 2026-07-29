import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import TRANSLATIONS from "../../i18n/translations";

export default function ProfitEstimatorCard() {
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language];

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold text-lg mb-3">{t.profitEstimatorTitle}</h3>

      <div className="mb-3">
        <p className="text-xs text-gray-500 mb-1">{t.expensesLabel}</p>
        <div className="h-2 bg-red-100 rounded-full">
          <div className="h-2 w-[65%] bg-red-500 rounded-full"></div>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-xs text-gray-500 mb-1">{t.expectedProfitLabel}</p>
        <div className="h-2 bg-green-100 rounded-full">
          <div className="h-2 w-[78%] bg-green-600 rounded-full"></div>
        </div>
      </div>

      <p className="font-semibold text-green-700">+ ₹5,300</p>
      <p className="text-xs text-gray-500 mt-1">{t.regionalComparison}</p>
    </div>
  );
}
