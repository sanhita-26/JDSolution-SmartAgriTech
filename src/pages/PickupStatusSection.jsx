import React, { useState, useContext } from "react";
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

export default function PickupStatusSection() {
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language];

  const [requestNo, setRequestNo] = useState("");
  const [found, setFound] = useState(true);

  const data = {
    crop: t.wheat,
    quantity: `50 ${t.quintal}`,
    status: t.pickupInProgress,
    team: "Pickup Team A",
    expected: "17 Jan, 07:30 PM",
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <div className="p-4 md:p-6">
        <div className="bg-white rounded-xl shadow p-4 md:p-6 max-w-3xl mx-auto">
          {/* HEADER */}
          <h2 className="text-xl font-bold mb-1">{t.pickupTitle}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {t.pickupSubtitle}
          </p>

          {/* SEARCH */}
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
              onClick={() => setFound(true)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {t.pickupTrack}
            </button>
          </div>

          {!found && (
            <p className="text-red-500 text-sm">
              {t.pickupNotFound}
            </p>
          )}

          {/* STATUS CARD */}
          {found && (
            <div className="border rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold">{data.crop}</p>
                  <p className="text-sm text-gray-500">
                    {data.quantity}
                  </p>
                </div>
                <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">
                  {data.status}
                </span>
              </div>

              {/* TIMELINE */}
              <div className="space-y-4">
                <TimelineItem
                  icon={<Clock />}
                  text={t.pickupRequestSent}
                  active
                />
                <TimelineItem
                  icon={<Package />}
                  text={`${t.pickupAssigned} • ${t.pickupAssignedTo}: ${data.team}`}
                  sub={`${t.pickupExpected}: ${data.expected}`}
                  active
                />
                <TimelineItem
                  icon={<Truck />}
                  text={t.pickupOutForPickup}
                />
                <TimelineItem
                  icon={<CheckCircle />}
                  text={t.pickupCompleted}
                />
              </div>

              {/* SUPPORT */}
              <button className="mt-6 w-full bg-green-700 text-white py-2 rounded flex items-center justify-center gap-2">
                <Phone size={16} />
                {t.pickupCall}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- TIMELINE ITEM ---------------- */
function TimelineItem({ icon, text, sub, active }) {
  return (
    <div className="flex gap-3 items-start">
      <div
        className={`h-9 w-9 rounded-full flex items-center justify-center ${
          active
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-gray-500"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="font-medium">{text}</p>
        {sub && (
          <p className="text-sm text-gray-500">{sub}</p>
        )}
      </div>
    </div>
  );
}
