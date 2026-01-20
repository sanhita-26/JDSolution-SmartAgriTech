import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import TRANSLATIONS from "../i18n/translations";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language];
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | otp | signup
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("");

  const cropOptions = ["Wheat", "Rice", "Onion", "Tomato", "Potato"];
  const avatars = ["/avatar1.jpg", "/avatar2.jpg", "/avatar3.jpg"];

  // ---------------------- Maharashtra Cities ----------------------
  const MAHARASHTRA_CITIES = [
    "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur",
    "Thane", "Kolhapur", "Sangli", "Satara", "Amravati",
    "Jalgaon", "Akola", "Latur", "Beed", "Parbhani", "Nanded",
    "Osmanabad", "Ratnagiri", "Sindhudurg", "Wardha", "Yavatmal",
    "Chandrapur", "Gondia", "Bhandara", "Ahmednagar", "Palghar"
  ];

  // ---------------------- Save User ----------------------
  const saveUserAndGo = (name) => {
    const avatar = avatars[Math.floor(Math.random() * avatars.length)];

    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        phone,
        location,
        preferredCrops: crops,
        avatar,
      })
    );

    navigate("/dashboard");
  };

  // LOGIN → OTP
  const handleLogin = () => {
    if (phone.length === 10) setMode("otp");
  };

  // OTP INPUT
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const verifyOtp = () => {
    if (otp.join("").length === 4) {
      saveUserAndGo("Farmer");
    }
  };

  // SIGNUP
  const handleSignup = () => {
    if (!fullName || phone.length !== 10 || !location) return;

    const avatar = avatars[Math.floor(Math.random() * avatars.length)];

    const user = {
      name: fullName,
      phone,
      location,
      preferredCrops: crops,
      avatar,
    };

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      {/* CENTER CONTENT */}
      <div className="flex flex-col items-center justify-center px-4 py-10">

        {/* CENTER LOGO */}
        <img
          src="src/assets/logo.jpg"
          alt="logo"
          className="w-24 h-24 mb-6 rounded-full shadow"
        />

        {/* AUTH CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">

          {/* LOGIN */}
          {mode === "login" && (
            <>
              <h2 className="text-2xl font-bold mb-2">
                {t.login || "Login"}
              </h2>
              <p className="text-gray-600 mb-4">
                {t.auth_instruction || "Enter your mobile number to continue"}
              </p>

              <input
                type="text"
                maxLength={10}
                placeholder={t.auth_phone || "Mobile Number"}
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, ""))
                }
                className="w-full p-3 mb-4 border rounded-lg"
              />

              <button
                onClick={handleLogin}
                className="w-full bg-green-700 text-white py-3 rounded-lg"
              >
                {t.auth_send_otp || "Get OTP"}
              </button>

              <p className="mt-4 text-center">
                {t.auth_new_user || "New user?"}{" "}
                <span
                  className="text-green-700 cursor-pointer font-semibold"
                  onClick={() => setMode("signup")}
                >
                  {t.signup || "Sign Up"}
                </span>
              </p>
            </>
          )}

          {/* OTP */}
          {mode === "otp" && (
            <>
              <h2 className="text-2xl font-bold mb-4">
                {t.auth_enter_otp || "Enter OTP"}
              </h2>

              <div className="flex justify-between mb-5">
                {otp.map((d, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    className="w-12 h-12 text-center text-lg border rounded-lg"
                  />
                ))}
              </div>

              <button
                onClick={verifyOtp}
                className="w-full bg-green-700 text-white py-3 rounded-lg"
              >
                {t.auth_verify_otp || "Verify OTP"}
              </button>
            </>
          )}

          {/* SIGNUP */}
          {mode === "signup" && (
            <>
              <h2 className="text-2xl font-bold mb-4">
                {t.signup || "Sign Up"}
              </h2>

              <input
                type="text"
                placeholder={t.auth_name || "Full Name"}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 mb-3 border rounded-lg"
              />

              <input
                type="text"
                maxLength={10}
                placeholder={t.auth_phone || "Mobile Number"}
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, ""))
                }
                className="w-full p-3 mb-3 border rounded-lg"
              />

              {/* LOCATION DROPDOWN HERE */}
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 mb-3 border rounded-lg bg-white"
              >
                <option value="">Select Your City</option>
                {MAHARASHTRA_CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              {/* CROPS */}
              <select
                className="w-full p-3 mb-3 border rounded-lg"
                value={selectedCrop}
                onChange={(e) => {
                  const c = e.target.value;
                  setSelectedCrop(c);
                  if (c && !crops.includes(c)) setCrops([...crops, c]);
                }}
              >
                <option value="">Select Preferred Crop</option>
                {cropOptions.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <div className="flex flex-wrap gap-2 mb-3">
                {crops.map((c) => (
                  <span
                    key={c}
                    className="bg-green-100 px-3 py-1 rounded-full text-sm"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <button
                onClick={handleSignup}
                className="w-full bg-green-700 text-white py-3 rounded-lg"
              >
                {t.auth_create_account || "Create Account"}
              </button>

              <p className="mt-4 text-center">
                {t.auth_have_account || "Already have an account?"}{" "}
                <span
                  className="text-green-700 cursor-pointer font-semibold"
                  onClick={() => setMode("login")}
                >
                  {t.login || "Login"}
                </span>
              </p>
            </>
          )}
        </div>

        {/* FOOTER IMAGE */}
        <img
          src="/footer.png"
          alt="footer"
          className="fixed bottom-0 left-0 w-full h-auto pointer-events-none"
        />
      </div>
    </div>
  );
}
