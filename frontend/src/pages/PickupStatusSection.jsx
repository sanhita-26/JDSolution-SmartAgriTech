import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Truck,
  Clock,
  Package,
  CheckCircle,
  Phone,
  Search,
} from "lucide-react";
import { AppContext } from "../context/AppContext";
import TRANSLATIONS from "../i18n/translations";
import axios from "axios";

export default function PickupStatusSection() {
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language];
  const navigate = useNavigate();
  const location = useLocation();

  const [requestNo, setRequestNo] = useState("");
  const [found, setFound] = useState(true);
  const [matchedOrder, setMatchedOrder] = useState(null);

  /* 🔹 AUTO LOAD IF TRACKING NO COMES FROM SUCCESS PAGE */
  useEffect(() => {
    if (location.state?.trackingNo) {
      const tn = location.state.trackingNo;
      setRequestNo(tn);
      fetchOrder(tn);
    }
  }, []);

  /* 🔹 FETCH ORDER FROM BACKEND */
  const fetchOrder = async (trackingNo) => {
    try {
      setFound(true);
      const res = await axios.get(
        `http://localhost:5000/api/orders/track/${trackingNo}`
      );

      if (res.data.success) {
        setMatchedOrder(res.data.order);
        setFound(true);
      }
    } catch (err) {
      setMatchedOrder(null);
      setFound(false);
    }
  };

  /* 🔹 SEARCH HANDLER */
  const handleSearch = () => {
    const searchId = requestNo.trim();
    if (!searchId) {
      setFound(false);
      setMatchedOrder(null);
      return;
    }
    fetchOrder(searchId);
  };

  /* 🔹 FORMAT DATE */
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <div className="p-4 md:p-6">
        <div className="bg-white rounded-xl shadow p-4 md:p-6 max-w-3xl mx-auto">

          <h2 className="text-xl font-bold mb-1">{t.pickupTitle}</h2>
          <p className="text-sm text-gray-500 mb-4">{t.pickupSubtitle}</p>

          {/* SEARCH BOX */}
          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <div className="flex items-center border rounded px-3 py-2 flex-1">
              <Search size={16} className="text-gray-400 mr-2" />
              <input
                value={requestNo}
                onChange={(e) => setRequestNo(e.target.value)}
                placeholder={t.pickupPlaceholder}
                className="outline-none w-full"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {t.pickupTrack}
            </button>
          </div>

          {!found && (
            <p className="text-red-500 text-sm mb-4">
              {t.pickupNotFound}
            </p>
          )}

          {/* STATUS CARD */}
          {found && matchedOrder && (
            <div className="border rounded-xl p-4">

              {/* ORDER INFO */}
              <div className="mb-4">
                <p className="font-semibold">{matchedOrder.crop}</p>
                <p className="text-sm text-gray-500">
                  {matchedOrder.qty} {matchedOrder.unit}
                </p>
                <p className="text-xs text-gray-400">
                  Tracking No: #{matchedOrder.trackingNo}
                </p>
                <p className="text-xs text-gray-400">
                  Order Date: {formatDate(matchedOrder.createdAt)}
                </p>
              </div>

              {/* STATUS */}
              <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">
                {matchedOrder.status}
              </span>

              {/* TIMELINE */}
              <div className="space-y-4 mt-4">
                <TimelineItem icon={<Clock />} text={t.pickupRequestSent} active />
                <TimelineItem icon={<Package />} text={t.pickupAssigned} active />
                <TimelineItem icon={<Truck />} text={t.pickupOutForPickup} />
                <TimelineItem icon={<CheckCircle />} text={t.pickupCompleted} />
              </div>

              {/* SUPPORT */}
              <button
                onClick={() => navigate("/support")}
                className="mt-6 w-full bg-green-700 text-white py-2 rounded flex items-center justify-center gap-2"
              >
                <Phone size={16} />
                {t.pickupCall}
              </button>

              {/* NEW REQUEST */}
              <button
                onClick={() => navigate("/sell-crop")}
                className="mt-3 w-full bg-green-600 text-white py-2 rounded-xl font-semibold"
              >
                {t.submitAnotherRequest || "Submit New Request"}
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* TIMELINE ITEM */
function TimelineItem({ icon, text, active }) {
  return (
    <div className="flex gap-3 items-start">
      <div
        className={`h-9 w-9 rounded-full flex items-center justify-center ${
          active ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
        }`}
      >
        {icon}
      </div>
      <p className="font-medium">{text}</p>
    </div>
  );
}
