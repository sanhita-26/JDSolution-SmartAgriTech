import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import TRANSLATIONS from "../../i18n/translations";

export default function CropHealthCard() {
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language];

  const health = 82;

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold text-lg mb-3">{t.cropHealthTitle}</h3>

      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20">
          <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-700 font-bold text-xl">
              {health}%
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600">{t.cropHealthStatus}</p>
          <p className="font-semibold text-green-700">{t.cropHealthHealthy}</p>
          <p className="text-xs text-gray-500 mt-1">{t.cropHealthIssues}</p>
        </div>
      </div>
    </div>
  );
}
