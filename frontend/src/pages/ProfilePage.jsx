import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { Edit2, Save, X, LogOut } from "lucide-react";
import { AppContext } from "../context/AppContext";
import TRANSLATIONS from "../i18n/translations";
import axios from "axios";

const MAHARASHTRA_CITIES = [
  "Mumbai","Pune","Nagpur","Nashik","Aurangabad","Solapur",
  "Thane","Kolhapur","Sangli","Satara","Amravati",
  "Jalgaon","Akola","Latur","Beed","Parbhani","Nanded",
  "Osmanabad","Ratnagiri","Sindhudurg","Wardha","Yavatmal",
  "Chandrapur","Gondia","Bhandara","Ahmednagar","Palghar"
];

const CROP_OPTIONS = [
  "Rice","Wheat","Soybean","Sugarcane","Cotton","Maize",
  "Jowar","Bajra","Tur","Chana(Chickpea)","Onion","Tomato"
];

const AVATARS = ["/avatar1.jpg", "/avatar2.jpg", "/avatar3.jpg"];

export default function ProfilePage() {
  const { language, setLanguage } = useContext(AppContext);
  const t = TRANSLATIONS[language];

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [myOrders, setMyOrders] = useState([]);

  /* LOAD USER + ORDERS */
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    if (storedUser) {
      if (!Array.isArray(storedUser.preferredCrops)) {
        storedUser.preferredCrops = [];
      }

      setUser(storedUser);

      const filteredOrders = allOrders.filter(
        (order) => order.user === storedUser.name
      );
      setMyOrders(filteredOrders);
    }
  }, []);

  if (!user) return null;

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/update/${user._id}`,
        {
          name: user.name,
          location: user.location,
          preferredCrops: user.preferredCrops,
          avatar: user.avatar,
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setEditing(false);
      alert("Profile updated successfully");
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleCancel = () => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setEditing(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-lg mx-auto py-10 px-4">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-green-700">
            {t.profileTitle}
          </h2>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <LogOut size={18} /> {t.logout}
          </button>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-3xl shadow-md p-6 mb-6">

          {/* AVATAR */}
          <div className="flex flex-col items-center mb-4">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-32 h-32 rounded-full border-4 border-green-600 object-cover shadow"
            />

            {editing && (
              <div className="flex gap-3 mt-4">
                {AVATARS.map((a, i) => (
                  <img
                    key={i}
                    src={a}
                    onClick={() => setUser({ ...user, avatar: a })}
                    className={`w-16 h-16 rounded-full cursor-pointer border-2 ${
                      user.avatar === a
                        ? "border-green-600"
                        : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="space-y-4">
            <input
              type="text"
              disabled={!editing}
              value={user.name}
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
              className="w-full text-center text-xl border-b outline-none"
            />

            <input
              type="text"
              value={user.phone}
              disabled
              className="w-full text-center border-b outline-none bg-gray-100 cursor-not-allowed"
            />

            <input
              type="text"
              disabled={!editing}
              value={user.address || ""}
              onChange={(e) =>
                setUser({ ...user, address: e.target.value })
              }
              className="w-full text-center border-b outline-none"
              placeholder={t.profileAddress}
            />

            {/* CITY */}
            {editing ? (
              <select
                value={user.location}
                onChange={(e) =>
                  setUser({ ...user, location: e.target.value })
                }
                className="w-full border-b outline-none text-center"
              >
                <option value="">{t.profileSelectCity}</option>
                {MAHARASHTRA_CITIES.map((c) => (
                  <option key={c}>{c}</option>
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
                className="w-full border-b outline-none text-center"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="mr">Marathi</option>
              </select>
            ) : (
              <p className="text-center text-gray-600">
                {t.profileLanguage}
              </p>
            )}

            {/* PREFERRED CROPS */}
            <div className="w-full mt-4">
              <label className="text-gray-600 text-sm">
                {t.profilePreferredCrop}
              </label>

              {editing ? (
                <>
                  <select
                    className="w-full border-b outline-none text-center mt-1"
                    value=""
                    onChange={(e) => {
                      const crop = e.target.value;
                      if (
                        crop &&
                        !user.preferredCrops.includes(crop)
                      ) {
                        setUser({
                          ...user,
                          preferredCrops: [
                            ...user.preferredCrops,
                            crop,
                          ],
                        });
                      }
                    }}
                  >
                    <option value="">{t.selectCrop}</option>
                    {CROP_OPTIONS.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {user.preferredCrops.map((crop, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                      >
                        {crop}
                        <button
                          onClick={() =>
                            setUser({
                              ...user,
                              preferredCrops:
                                user.preferredCrops.filter(
                                  (x) => x !== crop
                                ),
                            })
                          }
                          className="text-red-500 font-bold"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {user.preferredCrops.length > 0 ? (
                    user.preferredCrops.map((crop, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                      >
                        {crop}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">—</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* EDIT / SAVE */}
          <div className="flex justify-center gap-4 mt-6">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-6 py-2 rounded-full flex items-center gap-2"
                >
                  <Save size={16} /> {t.profileSave}
                </button>
                <button
                  onClick={handleCancel}
                  className="border px-6 py-2 rounded-full flex items-center gap-2"
                >
                  <X size={16} /> {t.profileCancel}
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="border px-6 py-2 rounded-full flex items-center gap-2"
              >
                <Edit2 size={16} /> {t.profileEdit}
              </button>
            )}
          </div>
        </div>

        {/* ✅ MY REQUESTS — IMAGE REMOVED ONLY */}
        {myOrders.length > 0 && (
          <div className="bg-white p-4 rounded-3xl shadow mb-6">
            <h3 className="text-lg font-bold mb-3">
              {t.myRequests}
            </h3>

            <div className="space-y-3">
              {myOrders.map((order, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-3 bg-gray-50"
                >
                  <p className="font-semibold text-sm">
                    {order.crop} • {order.qty} {order.unit}
                  </p>
                  <p className="text-xs text-gray-500">
                    Token: #{order.trackingNo}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEW REQUEST */}
        <button
          onClick={() => (window.location.href = "/sell-crop")}
          className="w-full bg-green-700 text-white py-3 rounded-full font-bold text-lg"
        >
          {t.submitAnotherRequest}
        </button>
      </div>
    </div>
  );
}
