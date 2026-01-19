import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import TRANSLATIONS from "../i18n/translations";
import { AppContext } from "../context/AppContext";

export default function Support() {
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          {t.support}
        </h1>

        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <p className="text-gray-700">
            {t.support_desc || "Need help? We are here for you."}
          </p>

          <div className="space-y-2">
            <p>📞 {t.support_phone || "Call"}: +91 98765 43210</p>
            <p>📧 {t.support_email || "Email"}: support@smartagri.com</p>
            <p>⏰ {t.support_time || "Time"}: 9 AM – 6 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
