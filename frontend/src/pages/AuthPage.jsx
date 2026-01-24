// AuthPage.jsx
import React, { useState, useEffect, useContext } from "react";
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
  const [timer, setTimer] = useState(0);
  const [otpExpiresAt, setOtpExpiresAt] = useState(null);

  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [phoneWarning, setPhoneWarning] = useState("");

  // Toast state
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const cropOptions = [
    "Rice", "Wheat", "Soybean", "Sugarcane", "Cotton", "Maize",
    "Jowar", "Bajra", "Tur", "Chana", "Onion", "Tomato",
  ];

  const MAHARASHTRA_CITIES = [
    "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Thane",
    "Kolhapur", "Sangli", "Satara", "Amravati", "Jalgaon", "Akola", "Latur",
    "Beed", "Parbhani", "Nanded", "Osmanabad", "Ratnagiri", "Sindhudurg",
    "Wardha", "Yavatmal", "Chandrapur", "Gondia", "Bhandara", "Ahmednagar", "Palghar",
  ];

  // Show toast notification
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  // TIMER EFFECT
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          setOtpExpiresAt(null);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ------------------ SEND OTP ------------------
  const handleSendOtp = async (isResend = false) => {
    if (phone.length !== 10) {
      showToast("Enter valid 10-digit number", "error");
      return;
    }

    try {
      // First check if user exists
      const checkRes = await fetch("http://localhost:5000/api/users/check-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: "+91" + phone }),
      });
      const checkData = await checkRes.json();

      // If user doesn't exist, redirect to signup
      if (!checkData.exists) {
        showToast("User not found. Please sign up first.", "error");
        setTimeout(() => setMode("signup"), 1500);
        return;
      }

      // User exists, proceed to send OTP
      const res = await fetch("http://localhost:5000/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: "+91" + phone }),
      });

      const data = await res.json();

      if (data.success) {
        setOtp(["", "", "", ""]); // Reset OTP fields FIRST
        setTimer(60);
        setOtpExpiresAt(Date.now() + 60000);
        setMode("otp");
        showToast(isResend ? "OTP resent successfully!" : "OTP sent successfully!", "success");
        // Auto-focus first OTP input after a brief delay
        setTimeout(() => {
          document.getElementById("otp-0")?.focus();
        }, 100);
      } else {
        showToast(data.message || "Failed to send OTP", "error");
      }
    } catch (error) {
      showToast("Network error. Please try again.", "error");
    }
  };

  // ------------------ VERIFY OTP ------------------
  const verifyOtp = async () => {
    const finalOtp = otp.join("");

    if (!otpExpiresAt || Date.now() > otpExpiresAt) {
      showToast("OTP expired. Please resend.", "error");
      return;
    }

    if (finalOtp.length !== 4) {
      showToast("Enter complete 4-digit OTP", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: "+91" + phone,
          otp: finalOtp,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        showToast(data.message || "Invalid OTP", "error");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      showToast("Login successful!", "success");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      showToast("Network error. Please try again.", "error");
    }
  };

  // ------------------ SIGNUP ------------------
  const handleSignup = async () => {
    if (!fullName || phone.length !== 10 || !location) {
      showToast("Please fill all required fields", "error");
      return;
    }

    if (phoneWarning) {
      showToast("This phone number already exists", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          phone: "+91" + phone,
          location,
          preferredCrops: crops,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        showToast(data.message || "Registration failed", "error");
        return;
      }

      showToast("Signup successful! Sending OTP...", "success");
      setTimeout(() => handleSendOtp(), 1000);
    } catch (error) {
      showToast("Network error. Please try again.", "error");
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpKey = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (newOtp[index]) {
        newOtp[index] = "";
        setOtp(newOtp);
        return;
      }

      if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }

    if (e.key === "Enter") verifyOtp();
  };

  // Check phone existence
  const checkPhoneExists = async (phoneNum) => {
    try {
      const res = await fetch("http://localhost:5000/api/users/check-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: "+91" + phoneNum }),
      });
      const data = await res.json();
      return data.exists;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Navbar />

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg ${
              toast.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}

      <div className="relative z-20 min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 py-10">
        <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
          {/* LOGIN */}
          {mode === "login" && (
            <>
              <h2 className="text-2xl font-bold mb-2">{t.login}</h2>

              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold">+91</span>
                <input
                  type="text"
                  maxLength={10}
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <button
                onClick={handleSendOtp}
                className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
              >
                Get OTP
              </button>

              <p className="mt-4 text-center">
                New user?{" "}
                <span
                  className="text-green-700 cursor-pointer font-semibold hover:underline"
                  onClick={() => setMode("signup")}
                >
                  Sign Up
                </span>
              </p>
            </>
          )}

          {/* OTP INPUT */}
          {mode === "otp" && (
            <>
              <h2 className="text-2xl font-bold mb-2">Enter OTP</h2>
              <p className="text-gray-600 mb-4">Sent to +91 {phone}</p>

              <div className="flex justify-between mb-4">
                {otp.map((box, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    maxLength={1}
                    value={box}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleOtpKey(e, index)}
                    className="w-14 h-14 border-2 text-xl text-center rounded-lg focus:border-green-500 focus:outline-none"
                  />
                ))}
              </div>

              {timer > 0 ? (
                <p className="text-center text-gray-600 mb-4">
                  OTP expires in <span className="font-bold text-green-700">{timer}s</span>
                </p>
              ) : (
                <p className="text-center text-red-600 mb-4 font-semibold">
                  OTP Expired
                </p>
              )}

              <button
                onClick={verifyOtp}
                className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition mb-3"
              >
                Verify OTP
              </button>

              {timer === 0 && (
                <button
                  onClick={() => {
                    setOtp(["", "", "", ""]); // Clear old OTP before resending
                    handleSendOtp(true); // Pass true to indicate it's a resend
                  }}
                  className="w-full text-green-700 font-semibold py-2 border-2 border-green-700 rounded-lg hover:bg-green-50 transition"
                >
                  Resend OTP
                </button>
              )}

              <p className="text-center mt-4">
                <span
                  onClick={() => {
                    setMode("login");
                    setOtp(["", "", "", ""]);
                    setTimer(0);
                  }}
                  className="text-gray-600 cursor-pointer hover:underline"
                >
                  ← Back to Login
                </span>
              </p>
            </>
          )}

          {/* SIGNUP */}
          {mode === "signup" && (
            <>
              <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-3 mb-3 border rounded-lg focus:border-green-500 focus:outline-none"
              />

              <div className="mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold">+91</span>
                  <input
                    type="text"
                    maxLength={10}
                    value={phone}
                    onChange={async (e) => {
                      const p = e.target.value.replace(/\D/g, "");
                      setPhone(p);
                      setPhoneWarning("");

                      if (p.length === 10) {
                        const exists = await checkPhoneExists(p);
                        if (exists) {
                          setPhoneWarning("This phone number already exists.");
                        }
                      }
                    }}
                    className={`w-full p-3 border rounded-lg focus:outline-none ${
                      phoneWarning ? "border-red-500 focus:border-red-500" : "focus:border-green-500"
                    }`}
                    placeholder="Mobile Number"
                  />
                </div>

                {phoneWarning && (
                  <p className="text-red-600 text-sm mt-1">{phoneWarning}</p>
                )}
              </div>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 mb-3 border rounded-lg bg-white focus:border-green-500 focus:outline-none"
              >
                <option value="">Select City</option>
                {MAHARASHTRA_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select
                value={selectedCrop}
                onChange={(e) => {
                  const crop = e.target.value;
                  if (crop && !crops.includes(crop)) {
                    setCrops([...crops, crop]);
                  }
                  setSelectedCrop("");
                }}
                className="w-full p-3 mb-3 border rounded-lg focus:border-green-500 focus:outline-none"
              >
                <option value="">Select Preferred Crop (Optional)</option>
                {cropOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              {crops.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {crops.map((c) => (
                    <span
                      key={c}
                      className="bg-green-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {c}
                      <button
                        onClick={() => setCrops(crops.filter((crop) => crop !== c))}
                        className="text-red-600 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={handleSignup}
                disabled={!!phoneWarning}
                className={`w-full py-3 rounded-lg transition ${
                  phoneWarning
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-700 text-white hover:bg-green-800"
                }`}
              >
                Create Account
              </button>

              <p className="text-center mt-3">
                Already have an account?{" "}
                <span
                  onClick={() => setMode("login")}
                  className="text-green-700 cursor-pointer font-semibold hover:underline"
                >
                  Login
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}