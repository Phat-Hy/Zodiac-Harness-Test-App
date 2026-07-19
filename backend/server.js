import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { generateHoroscope } from "./zodiac-logic.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Endpoint for Horoscope Predictions
app.post("/api/horoscope", (req, res) => {
  const { birthDate, targetMonth } = req.body;

  // Simple Input Validation
  if (!birthDate || !targetMonth) {
    return res.status(400).json({
      error: "Thiếu thông tin ngày sinh hoặc tháng dự đoán."
    });
  }

  // Validate Birth Date Format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(birthDate)) {
    return res.status(400).json({
      error: "Ngày sinh không đúng định dạng YYYY-MM-DD."
    });
  }

  const birthDateObj = new Date(birthDate);
  if (isNaN(birthDateObj.getTime())) {
    return res.status(400).json({
      error: "Ngày sinh không hợp lệ."
    });
  }

  // Validate Target Month Format (YYYY-MM)
  const monthRegex = /^\d{4}-\d{2}$/;
  if (!monthRegex.test(targetMonth)) {
    return res.status(400).json({
      error: "Tháng dự đoán không đúng định dạng YYYY-MM."
    });
  }

  const [targetYear, targetMonthNum] = targetMonth.split("-").map(Number);
  if (targetMonthNum < 1 || targetMonthNum > 12) {
    return res.status(400).json({
      error: "Tháng dự đoán không hợp lệ (phải từ 01 đến 12)."
    });
  }

  try {
    const result = generateHoroscope(birthDate, targetMonth);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Lỗi khi tạo dự đoán:", error);
    return res.status(500).json({
      error: "Đã xảy ra lỗi hệ thống trong quá trình tính toán vận mệnh."
    });
  }
});

// Serve static frontend files in production
const frontendDistPath = path.join(__dirname, "../dist");
app.use(express.static(frontendDistPath));

// Fallback to React index.html for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
