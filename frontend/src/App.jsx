import React, { useState } from "react";
import StarryBackground from "./components/StarryBackground";
import HoroscopeForm from "./components/HoroscopeForm";
import HoroscopeResults from "./components/HoroscopeResults";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [targetMonth, setTargetMonth] = useState("");
  const [error, setError] = useState("");

  const handleFetchHoroscope = async ({ birthDate, targetMonth: month }) => {
    setLoading(true);
    setError("");
    setData(null);
    setTargetMonth(month);

    try {
      const response = await fetch("/api/horoscope", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ birthDate, targetMonth: month })
      });

      let resData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        resData = await response.json();
      } else {
        const errorText = await response.text();
        throw new Error(errorText || `Yêu cầu thất bại với mã trạng thái ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(resData.error || "Không thể tải dự đoán từ hệ thống.");
      }

      setData(resData);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Decorative interactive canvas background */}
      <StarryBackground />

      <header className="app-header animate-fade-in">
        <h1 className="logo-title">
          <span>COSMIC</span> HOROSCOPE
        </h1>
        <p className="logo-tagline">Tinh đồ mật mã - Giải mã cát hung vận số</p>
      </header>

      <main className="app-main">
        {/* Input Form */}
        <HoroscopeForm onSubmit={handleFetchHoroscope} loading={loading} />

        {/* Global Error Banner */}
        {error && (
          <div className="global-error card animate-fade-in">
            <span className="error-icon">⚠️</span>
            <p className="error-message">{error}</p>
          </div>
        )}

        {/* Prediction Results */}
        {data && <HoroscopeResults data={data} targetMonth={targetMonth} />}
      </main>

      <footer className="app-footer">
        <p>© 2026 Cosmic Horoscope. All astronomical calculations are seed-deterministic.</p>
      </footer>
    </div>
  );
}
