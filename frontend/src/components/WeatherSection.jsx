import React, { useContext, useState } from "react";
import {
  Sun,
  CloudRain,
  Cloud,
  CloudSnow,
  MapPin,
  Search,
  Navigation,
} from "lucide-react";
import { AppContext } from "../context/AppContext";
import TRANSLATIONS from "../i18n/translations";
import axios from "axios";

const API_KEY = "99072761d2e1536ac64eb659bd7cb7e4";

export default function WeatherSection() {
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language] || {};
  const user = JSON.parse(localStorage.getItem("user"));

  const [cityInput, setCityInput] = useState("");
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ICON */
  const getIcon = (main) => {
    const c = main.toLowerCase();
    if (c.includes("rain")) return <CloudRain size={26} className="text-blue-600" />;
    if (c.includes("cloud")) return <Cloud size={26} className="text-gray-500" />;
    if (c.includes("snow")) return <CloudSnow size={26} className="text-blue-400" />;
    return <Sun size={26} className="text-yellow-500" />;
  };

  /* ADVICE */
  const getAdvice = (temp, cond) => {
    if (cond.toLowerCase().includes("rain")) return "Rain expected. Avoid irrigation.";
    if (temp > 35) return "Very hot. Increase irrigation.";
    if (temp < 15) return "Cold weather. Protect crops.";
    return "Good weather for farming.";
  };

  /* FETCH BY CITY */
  const fetchByCity = async (city) => {
    if (!city) return setError("Enter a location");
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        {
          params: { q: city, units: "metric", appid: API_KEY },
        }
      );
      processWeather(res.data);
    } catch {
      setError("Location not found");
    } finally {
      setLoading(false);
    }
  };

  /* FETCH BY GPS */
  const fetchByGPS = () => {
    if (!navigator.geolocation)
      return setError("GPS not supported");

    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const res = await axios.get(
          "https://api.openweathermap.org/data/2.5/forecast",
          {
            params: {
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
              units: "metric",
              appid: API_KEY,
            },
          }
        );
        processWeather(res.data);
      } catch {
        setError("Failed to fetch GPS weather");
      } finally {
        setLoading(false);
      }
    });
  };

  /* PROCESS DATA */
  const processWeather = (data) => {
    const daily = data.list.filter((_, i) => i % 8 === 0);

    setCurrent({
      location: data.city.name,
      temp: Math.round(daily[0].main.temp),
      cond: daily[0].weather[0].main,
    });

    setForecast(
      daily.slice(1, 6).map((d) => ({
        date: new Date(d.dt_txt).toDateString(),
        temp: Math.round(d.main.temp),
        cond: d.weather[0].main,
      }))
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-5">
      <h2 className="text-xl font-bold">🌦 Weather & Forecast</h2>

      {/* BUTTONS */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={fetchByGPS}
          className="flex items-center gap-2 px-5 py-2 rounded-full
                     bg-gradient-to-r from-blue-500 to-blue-600
                     text-white font-semibold shadow
                     hover:scale-105 transition"
        >
          <Navigation size={16} /> Use GPS
        </button>

        <button
          onClick={() =>
            user?.location
              ? fetchByCity(user.location)
              : setError("Profile location not set")
          }
          className="flex items-center gap-2 px-5 py-2 rounded-full
                     bg-gradient-to-r from-green-500 to-green-600
                     text-white font-semibold shadow
                     hover:scale-105 transition"
        >
          <MapPin size={16} /> Profile Location
        </button>
      </div>

      {/* MANUAL LOCATION */}
      <div className="flex gap-2">
        <input
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Enter city"
          className="border px-4 py-2 rounded-full flex-1 outline-none"
        />
        <button
          onClick={() => fetchByCity(cityInput)}
          className="px-5 py-2 rounded-full
                     bg-gradient-to-r from-green-600 to-emerald-600
                     text-white shadow hover:scale-105 transition"
        >
          <Search size={16} />
        </button>
      </div>

      {loading && <p className="text-sm text-gray-600">Loading weather...</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* CURRENT WEATHER */}
      {current && (
        <div className="bg-green-50 p-4 rounded-xl flex justify-between items-center">
          <div className="flex gap-3 items-center">
            {getIcon(current.cond)}
            <div>
              <p className="font-semibold">{current.location}</p>
              <p className="text-sm text-gray-600">
                {getAdvice(current.temp, current.cond)}
              </p>
            </div>
          </div>
          <p className="font-bold text-lg">{current.temp}°C</p>
        </div>
      )}

      {/* 5 DAY FORECAST */}
      {forecast.length > 0 && (
        <>
          <h3 className="font-bold mt-4">📅 5-Day Forecast</h3>
          <div className="space-y-2">
            {forecast.map((d, i) => (
              <div
                key={i}
                className="flex justify-between items-center border p-3 rounded-lg bg-gray-50"
              >
                <div className="flex gap-3 items-center">
                  {getIcon(d.cond)}
                  <div>
                    <p className="text-sm font-semibold">{d.date}</p>
                    <p className="text-xs text-gray-600">
                      {getAdvice(d.temp, d.cond)}
                    </p>
                  </div>
                </div>
                <p className="font-bold">{d.temp}°C</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
