import React, { useState } from "react";

export default function HoroscopeForm({ onSubmit, loading }) {
  const [birthDate, setBirthDate] = useState("");
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const currentYear = String(new Date().getFullYear());

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!birthDate) {
      setError("Vui lòng chọn ngày tháng năm sinh của bạn.");
      return;
    }

    const targetMonthCombined = `${selectedYear}-${selectedMonth}`;
    // Call onSubmit callback
    onSubmit({ birthDate, targetMonth: targetMonthCombined });
  };

  return (
    <form className="horoscope-form card" onSubmit={handleSubmit}>
      <h2 className="form-title">✨ Tra Cứu Vận Mệnh Cát Hung ✨</h2>
      <p className="form-subtitle">Nhập thông tin của bạn để khám phá cung hoàng đạo và vận thế tương lai</p>

      {error && <div className="form-error animate-shake">{error}</div>}

      <div className="input-group">
        <label htmlFor="birthdate">📅 Ngày tháng năm sinh</label>
        <input
          id="birthdate"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          disabled={loading}
          max={new Date().toISOString().split("T")[0]} // Birthday cannot be in the future
        />
      </div>

      <div className="input-group">
        <label>🌙 Chọn tháng muốn xem</label>
        <div className="month-year-select-container">
          <select
            id="target-month-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            disabled={loading}
            className="select-field"
          >
            {Array.from({ length: 12 }, (_, i) => {
              const m = String(i + 1).padStart(2, "0");
              return (
                <option key={m} value={m}>
                  Tháng {i + 1}
                </option>
              );
            })}
          </select>
          <select
            id="target-year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            disabled={loading}
            className="select-field"
          >
            {Array.from({ length: 15 }, (_, i) => {
              const y = String(2024 + i);
              return (
                <option key={y} value={y}>
                  Năm {y}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        className={`submit-btn ${loading ? "btn-loading" : ""}`}
        disabled={loading}
      >
        {loading ? (
          <span className="spinner-wrapper">
            <span className="spinner"></span>
            Đang giải mã tinh cầu...
          </span>
        ) : (
          "Giải Mã Vận Mệnh"
        )}
      </button>
    </form>
  );
}
