import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TRANSLATIONS from "../i18n/translations";
import { AppContext } from "../context/AppContext";
import SuccessScreen from "../components/SuccessScreen.jsx";
import Navbar from "../components/Navbar";

// PRICE MAP (quintal prices)
const cropPrices = {
  Wheat: { jd: 2100, mandi: 1980 },
  Rice: { jd: 2100, mandi: 1980 },
  Onion: { jd: 1600, mandi: 1500 },
  Tomato: { jd: 900, mandi: 820 },
  Potato: { jd: 1200, mandi: 1100 },
  Soybean: { jd: 4800, mandi: 4550 },
  Cotton: { jd: 6200, mandi: 6000 },
  Sugarcane: { jd: 350, mandi: 300 },
};

const crops = [
  "Wheat",
  "Rice",
  "Onion",
  "Tomato",
  "Potato",
  "Soybean",
  "Cotton",
  "Sugarcane",
];

const SellCrop = () => {
  const navigate = useNavigate();
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language];

  const [crop, setCrop] = useState("Rice");
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState("quintal");
  const [submitted, setSubmitted] = useState(false);

  const selectedPrices = cropPrices[crop];

  const jdPrice =
    unit === "kg" ? Math.round(selectedPrices.jd / 100) : selectedPrices.jd;

  const mandiPrice =
    unit === "kg" ? Math.round(selectedPrices.mandi / 100) : selectedPrices.mandi;

  const savings = jdPrice - mandiPrice;

  // SUCCESS SCREEN
  if (submitted) {
    return <SuccessScreen crop={crop} qty={qty} unit={unit} t={t} />;
  }

  return (
    <>
      <Navbar />

      <div className="max-w-[480px] mx-auto min-h-screen bg-[#fffaf4] px-4 py-6 font-sans">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-transparent text-[16px] mb-3 cursor-pointer"
        >
          ← {t.back}
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-gray-800">{t.sellYourCrop}</h2>
        <p className="text-gray-600 mb-4">{t.bestPriceLine}</p>

        {/* SELECT CROP */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-5">
          <h4 className="font-semibold mb-3">{t.selectCrop}</h4>

          <div className="grid grid-cols-4 gap-3">
            {crops.map((c) => (
              <div
                key={c}
                onClick={() => setCrop(c)}
                className={`rounded-xl p-3 cursor-pointer text-center border-2 transition ${
                  crop === c
                    ? "border-green-700 bg-green-50"
                    : "border-transparent bg-[#fff7ec]"
                }`}
              >
                🌱
                <p className="text-sm mt-1">{t[c.toLowerCase()]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PRICE BOX */}
        <div className="bg-green-50 rounded-2xl p-4 shadow-md mb-5 flex justify-between">
          <div>
            <p className="text-gray-700">{t.jdPrice}</p>
            <h3 className="text-lg font-bold">
              ₹{jdPrice} / {unit}
            </h3>
            <span className="text-green-700 text-sm">
              {t.youSave} ₹{savings} {t.per} {unit}
            </span>
          </div>

          <div className="text-right">
            <p className="text-gray-700">{t.mandiPrice}</p>
            <h4 className="text-lg font-semibold">₹{mandiPrice}</h4>
          </div>
        </div>

        {/* QUANTITY */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-5">
          <h4 className="font-semibold">{t.enterQty}</h4>

          <div className="flex gap-3 mt-3">
            <input
              type="number"
              placeholder={t.qtyPlaceholder}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-full p-3 rounded-xl border border-black bg-white"
            />

            <div className="flex rounded-xl bg-gray-200 overflow-hidden">
              <button
                onClick={() => setUnit("kg")}
                className={`px-4 py-3 text-sm ${
                  unit === "kg" ? "bg-green-700 text-white" : "text-gray-700"
                }`}
              >
                {t.kg}
              </button>

              <button
                onClick={() => setUnit("quintal")}
                className={`px-4 py-3 text-sm ${
                  unit === "quintal" ? "bg-green-700 text-white" : "text-gray-700"
                }`}
              >
                {t.quintal}
              </button>
            </div>
          </div>
        </div>

        {/* PHOTO UPLOAD */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-5">
          <h4 className="font-semibold mb-2">{t.addPhotos}</h4>

          <div className="border-2 border-dashed border-gray-300 p-8 rounded-2xl text-center text-gray-500 bg-white">
            📷 {t.addPhotoTap}
          </div>
        </div>

        {/* NOTES */}
        <textarea
          placeholder={t.notes}
          className="w-full p-4 rounded-xl border border-gray-300 bg-white text-sm mb-5"
        />

        {/* SUBMIT */}
        <button
          onClick={() => setSubmitted(true)}
          className="w-full p-4 bg-green-700 text-white rounded-2xl text-lg shadow-md active:opacity-80"
        >
          {t.submit}
        </button>
      </div>
    </>
  );
};

export default SellCrop;
