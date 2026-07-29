import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessScreen({ crop, qty, unit, t }) {
  const navigate = useNavigate();

  // ✅ get tracking number saved after order creation
  const trackingNo = localStorage.getItem("lastTrackingNo");

  useEffect(() => {
    // redirect only if tracking number exists
    if (!trackingNo) return;

    const timer = setTimeout(() => {
      navigate("/track"); // PickupStatusSection page
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, trackingNo]);

  // ✅ safety fallback (prevents blank screen)
  if (!trackingNo) {
    return (
      <div className="text-center px-5 py-16">
        <h2 className="text-xl font-bold">Order Created</h2>
        <p className="text-gray-600 mt-2">Preparing tracking details...</p>
      </div>
    );
  }

  return (
    <div className="text-center px-5 py-16">
      {/* CHECK ICON */}
      <div className="text-[48px] text-green-700 mb-5">✔</div>

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-3">
        {t?.successTitle || "Order Submitted Successfully"}
      </h2>

      {/* ORDER DETAILS */}
      <p className="text-gray-700 text-lg mb-2">
        {qty} {unit} of <strong>{crop}</strong>
      </p>

      {/* TRACKING NUMBER */}
      <p className="text-lg font-semibold mt-3">
        Tracking No:
        <span className="text-green-700 ml-2">{trackingNo}</span>
      </p>

      {/* REDIRECT MESSAGE */}
      <p className="text-gray-500 mt-4">
        {t?.redirecting || "Redirecting to tracking page..."}
      </p>
    </div>
  );
}
