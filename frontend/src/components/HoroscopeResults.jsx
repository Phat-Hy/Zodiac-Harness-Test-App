import React from "react";

export default function HoroscopeResults({ data, targetMonth }) {
  if (!data) return null;

  const { zodiac, predictions, luckyElements } = data;
  const [year, month] = targetMonth.split("-");

  // Helpers to determine score colors and background glow classes separately
  const getScoreBgClass = (score) => {
    if (score >= 80) return "bg-high";
    if (score >= 60) return "bg-medium";
    return "bg-low";
  };

  const getScoreTextClass = (score) => {
    if (score >= 80) return "text-high";
    if (score >= 60) return "text-medium";
    return "text-low";
  };

  const getEmojiForCategory = (category) => {
    switch (category) {
      case "career": return "💼";
      case "finance": return "🪙";
      case "love": return "💖";
      case "health": return "🍀";
      default: return "✨";
    }
  };

  const translateCategory = (category) => {
    switch (category) {
      case "career": return "Sự nghiệp & Học tập";
      case "finance": return "Tài lộc & Tiền bạc";
      case "love": return "Tình duyên & Mối quan hệ";
      case "health": return "Sức khỏe & Thể trạng";
      default: return category;
    }
  };

  return (
    <div className="results-container animate-fade-in">
      {/* Header section with Zodiac Sign info */}
      <div className="zodiac-hero-card">
        <div className="zodiac-symbol-glow">{zodiac.symbol}</div>
        <div className="zodiac-names">
          <h2 className="zodiac-title-vi">{zodiac.nameVi}</h2>
          <h3 className="zodiac-title-en">{zodiac.nameEn}</h3>
          <p className="zodiac-date-range">📅 {zodiac.dateRange}</p>
        </div>
        
        <div className="zodiac-meta-grid">
          <div className="meta-item">
            <span className="meta-label">Nguyên tố</span>
            <span className="meta-value element-badge">{zodiac.element}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Sao chủ quản</span>
            <span className="meta-value planet-badge">{zodiac.rulingPlanet}</span>
          </div>
        </div>
      </div>

      {/* Monthly General Overview */}
      <div className="card overview-card">
        <h3 className="card-title">🪐 Tổng quan vận trình tháng {month}/{year}</h3>
        <p className="overview-text">{predictions.overview}</p>
      </div>

      {/* Luck Metrics Grid */}
      <div className="scores-grid">
        {["career", "finance", "love", "health"].map((cat) => {
          const item = predictions[cat];
          const bgClass = getScoreBgClass(item.score);
          const textClass = getScoreTextClass(item.score);
          return (
            <div key={cat} className="card score-card">
              <div className="score-card-header">
                <span className="category-icon">{getEmojiForCategory(cat)}</span>
                <h4 className="category-title">{translateCategory(cat)}</h4>
              </div>
              
              <div className="progress-bar-container">
                <div className="progress-bar-track">
                  <div 
                    className={`progress-bar-fill ${bgClass}`} 
                    style={{ width: `${item.score}%` }}
                  />
                </div>
                <span className={`score-value ${textClass}`}>{item.score}%</span>
              </div>
              
              <p className="prediction-detail-text">{item.text}</p>
            </div>
          );
        })}
      </div>

      {/* Lucky items and days */}
      <div className="lucky-grid">
        {/* Lucky indicators */}
        <div className="card lucky-indicators-card">
          <h3 className="card-title">🌟 Chỉ số may mắn</h3>
          <div className="indicators-list">
            <div className="indicator-row">
              <span className="ind-label">Con số may mắn:</span>
              <span className="ind-value number-highlight">{luckyElements.luckyNumber}</span>
            </div>
            <div className="indicator-row">
              <span className="ind-label">Màu sắc may mắn:</span>
              <span className="ind-value color-highlight">{luckyElements.luckyColor}</span>
            </div>
          </div>
        </div>

        {/* Good/Bad days of the month */}
        <div className="card lucky-days-card">
          <h3 className="card-title">📅 Lịch ngày tốt & xấu</h3>
          
          <div className="days-section">
            <h4 className="days-subtitle text-green">✨ Ngày cát tường (Nên mưu sự)</h4>
            <div className="days-tags">
              {luckyElements.auspiciousDays.map((day) => (
                <span key={day} className="day-tag tag-good">Ngày {day}</span>
              ))}
            </div>
          </div>

          <div className="days-section">
            <h4 className="days-subtitle text-red">⚠️ Ngày cẩn trọng (Tránh xung đột)</h4>
            <div className="days-tags">
              {luckyElements.cautionDays.map((day) => (
                <span key={day} className="day-tag tag-caution">Ngày {day}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
