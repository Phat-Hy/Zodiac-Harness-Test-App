import assert from "assert";
import { getZodiacSign, generateHoroscope } from "./zodiac-logic.js";

console.log("=== BẮT ĐẦU CHẠY THỬ LOGIC BACKEND ===");

try {
  // Test Case 1: Zodiac sign calculation
  console.log("Test Case 1: Kiểm tra tính chính xác của việc phân tích Cung Hoàng Đạo...");
  
  const aries = getZodiacSign("1995-03-25"); // March 25 -> Aries
  assert.strictEqual(aries.nameEn, "Aries");
  assert.strictEqual(aries.nameVi, "Bạch Dương");
  
  const scorpio = getZodiacSign("1989-11-15"); // Nov 15 -> Scorpio
  assert.strictEqual(scorpio.nameEn, "Scorpio");
  assert.strictEqual(scorpio.nameVi, "Thiên Yết");
  
  const capricornDec = getZodiacSign("1990-12-25"); // Dec 25 -> Capricorn
  assert.strictEqual(capricornDec.nameEn, "Capricorn");
  
  const capricornJan = getZodiacSign("1991-01-10"); // Jan 10 -> Capricorn
  assert.strictEqual(capricornJan.nameEn, "Capricorn");

  console.log("✅ Đạt yêu cầu: Phân tích cung hoàng đạo chính xác.");

  // Test Case 2: Deterministic generation
  console.log("Test Case 2: Kiểm tra tính nhất quán (deterministic) của dự đoán...");
  
  const birthDate = "1995-07-28"; // Leo
  const targetMonth = "2026-07";
  
  const result1 = generateHoroscope(birthDate, targetMonth);
  const result2 = generateHoroscope(birthDate, targetMonth);
  
  // Assert both results are completely identical
  assert.deepStrictEqual(result1, result2);
  console.log(`✅ Đạt yêu cầu: Nhập ngày sinh ${birthDate} và tháng ${targetMonth} luôn cho ra dự đoán giống nhau.`);
  
  // Test Case 3: Monthly variations
  console.log("Test Case 3: Kiểm tra tính khác biệt giữa các tháng...");
  const targetMonthNext = "2026-08";
  const resultNext = generateHoroscope(birthDate, targetMonthNext);
  
  // They should be different since the month seed is different
  assert.notDeepStrictEqual(result1, resultNext);
  console.log("✅ Đạt yêu cầu: Dự đoán tháng 8/2026 khác biệt so với tháng 7/2026.");
  
  // Test Case 4: Output structure validation
  console.log("Test Case 4: Kiểm tra cấu trúc dữ liệu trả về...");
  assert.ok(result1.zodiac);
  assert.ok(result1.predictions);
  assert.ok(result1.predictions.career.score >= 50 && result1.predictions.career.score <= 100);
  assert.ok(result1.luckyElements.luckyNumber >= 1 && result1.luckyElements.luckyNumber <= 100);
  assert.ok(typeof result1.luckyElements.luckyColor === "string");
  assert.strictEqual(result1.luckyElements.auspiciousDays.length, 3);
  assert.strictEqual(result1.luckyElements.cautionDays.length, 3);
  
  console.log("✅ Đạt yêu cầu: Cấu trúc dữ liệu đầu ra đầy đủ thông tin.");
  console.log("\n🎉 TẤT CẢ CÁC BÀI KIỂM TRA LOGIC BACKEND ĐÃ ĐẠT YÊU CẦU! 🎉");
  
} catch (error) {
  console.error("❌ Bài kiểm tra thất bại:", error);
  process.exit(1);
}
