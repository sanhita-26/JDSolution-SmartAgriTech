import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { Edit2, Save, X } from "lucide-react";
import { AppContext } from "../context/AppContext";
import TRANSLATIONS from "../i18n/translations";

const MAHARASHTRA_CITIES = [
  "Mumbai","Pune","Nagpur","Nashik","Aurangabad","Solapur",
  "Thane","Kolhapur","Sangli","Satara","Amravati",
  "Jalgaon","Akola","Latur","Beed","Parbhani","Nanded",
  "Osmanabad","Ratnagiri","Sindhudurg","Wardha","Yavatmal",
  "Chandrapur","Gondia","Bhandara","Ahmednagar","Palghar"
];

const AVATARS = [
  "/avatar1.jpg",
  "/avatar2.jpg",
  "/avatar3.jpg",
];

export default function ProfilePage() {
  const { language, setLanguage } = useContext(AppContext);
  const t = TRANSLATIONS[language];

  const [user, setUser] = useState({
    name: "",
    phone: "",
    address: "",
    location: "",
    avatar: AVATARS[0],
    preferredCrop: "",
  });

  const [editing, setEditing] = useState(false);

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleAvatarSelect = (avatar) => {
    setUser({ ...user, avatar });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEditing(false);
    alert(t.profileUpdated);
  };

  const handleCancel = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center items-start pt-10 px-4">
        <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 flex flex-col items-center gap-4">

          {/* My Profile Title */}
          <h2 className="text-2xl font-bold text-gray-800">{t.profileTitle}</h2>

          {/* Avatar */}
          <img
            src={user.avatar}
            alt="avatar"
            className="w-32 h-32 rounded-full border-4 border-green-600 object-cover"
          />

          {/* Avatar selection */}
          {editing && (
            <div className="flex gap-3">
              {AVATARS.map((a, i) => (
                <img
                  key={i}
                  src={a}
                  alt={`avatar-${i}`}
                  onClick={() => handleAvatarSelect(a)}
                  className={`w-16 h-16 rounded-full border-2 cursor-pointer ${
                    user.avatar === a ? "border-green-600" : "border-gray-200"
                  } hover:scale-105 transition`}
                />
              ))}
            </div>
          )}

          {/* User Details */}
          <div className="flex flex-col w-full gap-4 mt-2">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!editing}
              placeholder={t.profileName}
              className={`text-center text-xl font-semibold text-gray-800 border-b ${
                editing ? "border-green-600" : "border-transparent"
              } outline-none`}
            />

            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled={!editing}
              placeholder={t.profilePhone}
              className={`text-center text-gray-700 border-b ${
                editing ? "border-green-600" : "border-transparent"
              } outline-none`}
            />

            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              disabled={!editing}
              placeholder={t.profileAddress}
              className={`text-center text-gray-700 border-b ${
                editing ? "border-green-600" : "border-transparent"
              } outline-none`}
            />

            {/* Preferred Crop */}
            <input
              type="text"
              name="preferredCrop"
              value={user.preferredCrop}
              onChange={handleChange}
              disabled={!editing}
              placeholder={t.profilePreferredCrop}
              className={`text-center text-gray-700 border-b ${
                editing ? "border-green-600" : "border-transparent"
              } outline-none`}
            />

            {/* Location Dropdown */}
            {editing ? (
              <select
                name="location"
                value={user.location}
                onChange={handleChange}
                className="text-center border-b border-green-600 outline-none p-1"
              >
                <option value="">{t.profileSelectCity}</option>
                {MAHARASHTRA_CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            ) : (
              <p className="text-center text-gray-700">{user.location}</p>
            )}

            {/* Language Dropdown */}
            {editing ? (
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-center border-b border-green-600 outline-none p-1"
              >
                <option value="en">{TRANSLATIONS.en.profileLanguage}</option>
                <option value="hi">{TRANSLATIONS.hi.profileLanguage}</option>
                <option value="mr">{TRANSLATIONS.mr.profileLanguage}</option>
              </select>
            ) : (
              <p className="text-center text-gray-700">{t.profileLanguage}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                >
                  <Save size={16} /> {t.profileSave}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 border border-gray-400 text-gray-600 px-6 py-2 rounded hover:bg-gray-100 transition"
                >
                  <X size={16} /> {t.profileCancel}
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 border border-green-600 text-green-700 px-6 py-2 rounded hover:bg-green-50 transition"
              >
                <Edit2 size={16} /> {t.profileEdit}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
