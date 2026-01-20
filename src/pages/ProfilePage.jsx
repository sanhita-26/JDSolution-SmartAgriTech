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

const AVATARS = ["/avatar1.jpg", "/avatar2.jpg", "/avatar3.jpg"];

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
  const [myOrders, setMyOrders] = useState([]);

  // ✅ LOAD USER + USER ORDERS (CORRECT PLACE)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    if (storedUser) {
      setUser(storedUser);

      const filteredOrders = allOrders.filter(
        (order) => order.user === storedUser.name
      );

      setMyOrders(filteredOrders);
    }
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

          {/* TITLE */}
          <h2 className="text-2xl font-bold text-gray-800">
            {t.profileTitle}
          </h2>

          {/* AVATAR */}
          <img
            src={user.avatar}
            alt="avatar"
            className="w-32 h-32 rounded-full border-4 border-green-600 object-cover"
          />

          {/* AVATAR SELECT */}
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
                  }`}
                />
              ))}
            </div>
          )}

          {/* USER DETAILS */}
          <div className="flex flex-col w-full gap-4 mt-2">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!editing}
              placeholder={t.profileName}
              className="text-center text-xl font-semibold border-b outline-none"
            />

            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled={!editing}
              placeholder={t.profilePhone}
              className="text-center border-b outline-none"
            />

            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              disabled={!editing}
              placeholder={t.profileAddress}
              className="text-center border-b outline-none"
            />

            <input
              type="text"
              name="preferredCrop"
              value={user.preferredCrop}
              onChange={handleChange}
              disabled={!editing}
              placeholder={t.profilePreferredCrop}
              className="text-center border-b outline-none"
            />

            {/* LOCATION */}
            {editing ? (
              <select
                name="location"
                value={user.location}
                onChange={handleChange}
                className="text-center border-b outline-none"
              >
                <option value="">{t.profileSelectCity}</option>
                {MAHARASHTRA_CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            ) : (
              <p className="text-center">{user.location}</p>
            )}

            {/* LANGUAGE */}
            {editing ? (
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-center border-b outline-none"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
              </select>
            ) : (
              <p className="text-center">{t.profileLanguage}</p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-4">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded"
                >
                  <Save size={16} /> {t.profileSave}
                </button>

                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 border px-6 py-2 rounded"
                >
                  <X size={16} /> {t.profileCancel}
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 border px-6 py-2 rounded"
              >
                <Edit2 size={16} /> {t.profileEdit}
              </button>
            )}
          </div>

          {/* ✅ MY REQUESTS */}
          {myOrders.length > 0 && (
            <div className="w-full mt-6">
              <h3 className="text-lg font-bold mb-3">
                {t.myRequests || "My Requests"}
              </h3>

              <div className="space-y-3">
                {myOrders.map((order, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 border rounded-xl p-3 bg-gray-50"
                  >
                    <img
                      src={order.photo || "/logo.png"}
                      alt="crop"
                      className="w-14 h-14 rounded-lg object-cover border"
                    />

                    <div className="flex-1">
                      <p className="font-semibold text-sm">
                        {order.crop} • {order.qty} {order.unit}
                      </p>
                      <p className="text-xs text-gray-500">
                        Token: #{order.trackingNo}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

<button
  onClick={() => window.location.href = "/sell-crop"}
  className="mt-4 w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition"
>
  {t.submitAnotherRequest || "Submit New Request"}
</button>


        </div>
      </div>
    </div>
  );
}
