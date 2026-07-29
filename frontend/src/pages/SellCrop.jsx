import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TRANSLATIONS from "../i18n/translations";
import { AppContext } from "../context/AppContext";
import SuccessScreen from "../components/SuccessScreen.jsx";
import Navbar from "../components/Navbar";
import axios from "axios";

/* ---------------- PRICE MAP ---------------- */
const cropPrices = {
  Rice: { jd: 2200, mandi: 2000 },
  Wheat: { jd: 2100, mandi: 1980 },
  Soybean: { jd: 4800, mandi: 4550 },
  Sugarcane: { jd: 350, mandi: 300 },
  Cotton: { jd: 6200, mandi: 6000 },
  Maize: { jd: 1900, mandi: 1750 },
  Jowar: { jd: 2300, mandi: 2150 },
  Bajra: { jd: 2100, mandi: 2000 },
  Tur: { jd: 9700, mandi: 9200 },
  Chana: { jd: 5500, mandi: 5200 },
  Onion: { jd: 1600, mandi: 1500 },
  Tomato: { jd: 900, mandi: 820 },
};

const crops = [
  "Rice","Wheat","Soybean","Sugarcane","Cotton","Maize",
  "Jowar","Bajra","Tur","Chana","Onion","Tomato"
];

const trendingCrops = ["Soybean", "Cotton", "Onion"];

export default function SellCrop() {
  const navigate = useNavigate();
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language];

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [crop, setCrop] = useState("Rice");
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState("quintal"); // default unit
  const [photoPreview, setPhotoPreview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [trackingNo, setTrackingNo] = useState("");

  /* RESET WHEN PAGE OPENS AGAIN */
  useEffect(() => {
    setSubmitted(false);
    setQty("");
    setUnit("quintal");
    setPhotoPreview("");
  }, []);

  const selectedPrices = cropPrices[crop];
  const jdPrice = unit === "kg" ? Math.round(selectedPrices.jd / 100) : selectedPrices.jd;
  const mandiPrice = unit === "kg" ? Math.round(selectedPrices.mandi / 100) : selectedPrices.mandi;
  const savings = jdPrice - mandiPrice;

  /* SUCCESS SCREEN */
  if (submitted) {
    return (
      <SuccessScreen
        crop={crop}
        qty={qty}
        unit={unit}
        trackingNo={trackingNo} // ✅ Pass tracking number
        t={t}
      />
    );
  }

  const handleSubmitOrder = async () => {
    try {
      // Generate tracking number
      const newTrackingNo = "JD" + Math.floor(100000 + Math.random() * 900000);
      setTrackingNo(newTrackingNo);

      const orderData = {
        user: user.name || "Farmer",
        phone: user.phone || "",
        location: user.location || "",
        crop,
        qty,
        unit,
        trackingNo: newTrackingNo,
      };

      console.log("SENDING ORDER:", orderData);

      const res = await axios.post("http://localhost:5000/api/orders/create", orderData);

      if (res.data.success) {
        // Save order locally for pickup tracking
        const oldOrders = JSON.parse(localStorage.getItem("orders")) || [];
        localStorage.setItem("orders", JSON.stringify([...oldOrders, res.data.order]));

        setSubmitted(true); // show SuccessScreen
      } else {
        alert("Order failed");
      }
    } catch (err) {
      console.error("ORDER ERROR:", err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-[480px] mx-auto min-h-screen bg-[#fffaf4] px-4 py-6">
        <button onClick={() => navigate("/dashboard")} className="mb-3">
          ← {t.back}
        </button>

        <h2 className="text-2xl font-bold">{t.sellYourCrop}</h2>
        <p className="text-gray-600 mb-4">{t.bestPriceLine}</p>

        {/* TRENDING CROPS */}
        <div className="bg-white rounded-2xl p-4 mb-5 shadow">
          <h4 className="font-semibold mb-3">🔥 {t.trendingCrops}</h4>
          <div className="flex gap-3 overflow-x-auto">
            {trendingCrops.map((c) => (
              <div
                key={c}
                onClick={() => setCrop(c)}
                className={`min-w-[90px] p-3 rounded-xl text-center cursor-pointer border-2 ${
                  crop === c ? "border-green-700 bg-green-50" : "border-transparent bg-[#fff7ec]"
                }`}
              >
                <img src={`/crops/${c.toLowerCase()}.webp`} className="w-full h-16 object-cover rounded-lg" />
                <p className="text-sm font-semibold mt-1">{t[c.toLowerCase()]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SELECT CROP */}
        <div className="bg-white rounded-2xl p-4 mb-5 shadow">
          <h4 className="font-semibold mb-3">{t.selectCrop}</h4>
          <div className="grid grid-cols-4 gap-3">
            {crops.map((c) => (
              <div
                key={c}
                onClick={() => setCrop(c)}
                className={`p-4 rounded-xl text-center cursor-pointer border-2 ${
                  crop === c ? "border-green-700 bg-green-50" : "border-transparent bg-[#fff7ec]"
                }`}
              >
                <img src={`/crops/${c.toLowerCase()}.webp`} className="w-full h-20 object-cover rounded-lg" />
                <p className="text-sm font-semibold mt-2">{t[c.toLowerCase()]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PRICE */}
        <div className="bg-green-50 p-4 rounded-2xl mb-5 shadow flex justify-between">
          <div>
            <p>{t.jdPrice} ({unit})</p>
            <h3 className="font-bold">₹{jdPrice} / {unit}</h3>
            <span className="text-green-700 text-sm">{t.youSave} ₹{savings}</span>
          </div>
          <div className="text-right">
            <p>{t.mandiPrice} ({unit})</p>
            <h4 className="font-semibold">₹{mandiPrice}</h4>
          </div>
        </div>

        {/* QUANTITY */}
        <div className="bg-white p-4 rounded-2xl mb-5 shadow">
          <h4 className="font-semibold">{t.enterQty}</h4>
          <div className="flex gap-3 mt-3">
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder={t.qtyPlaceholder}
              className="w-full p-4 border rounded-xl"
            />
            <div className="flex bg-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setUnit("kg")}
                className={`px-4 ${unit === "kg" ? "bg-green-700 text-white" : ""}`}
              >
                {t.kg || "kg"}
              </button>
              <button
                onClick={() => setUnit("quintal")}
                className={`px-4 ${unit === "quintal" ? "bg-green-700 text-white" : ""}`}
              >
                {t.quintal || "quintal"}
              </button>
            </div>
          </div>
        </div>

        {/* PHOTO */}
        <div className="bg-white p-4 rounded-2xl mb-5 shadow">
          <h4 className="font-semibold mb-3">{t.addPhotos}</h4>
          <label className="flex items-center justify-center border-2 border-dashed h-40 rounded-2xl cursor-pointer">
            {photoPreview ? (
              <img src={photoPreview} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <div className="text-center text-gray-600">
                <div className="text-3xl">📷</div>
                <div>{t.addPhotoTap}</div>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => setPhotoPreview(reader.result);
                reader.readAsDataURL(file);
              }}
            />
          </label>
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmitOrder}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Submit Order
        </button>
      </div>
    </>
  );
}
