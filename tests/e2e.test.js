import { spawn } from "child_process";
import assert from "assert";

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}`;

console.log("=== BẮT ĐẦU CHẠY KIỂM THỬ END-TO-END (E2E) ===");

// Helper to wait for the server to boot up
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(retries = 10) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`${BASE_URL}/api/horoscope`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthDate: "2000-01-01", targetMonth: "2026-07" })
      });
      if (res.status === 200 || res.status === 400) {
        console.log("👉 Server Express đã sẵn sàng nhận kết nối!");
        return true;
      }
    } catch (e) {
      // Server not ready yet
    }
    console.log(`⌛ Chờ server khởi động... (Lần thử ${i + 1}/${retries})`);
    await delay(1000);
  }
  throw new Error("Không thể kết nối đến server Express.");
}

async function runTests() {
  let serverProcess;

  try {
    // 1. Khởi động server Express ở tiến trình con
    console.log("1. Đang khởi chạy server Express ở cổng 5000...");
    serverProcess = spawn("node", ["backend/server.js"], {
      stdio: "inherit",
      shell: true
    });

    // Chờ server khởi động
    await waitForServer();

    // 2. Chạy Scenario 1: Happy Path
    console.log("\n🎬 CHẠY SCENARIO 1: Happy Path - Đọc vận hạn Sư Tử (Leo)");
    const res1 = await fetch(`${BASE_URL}/api/horoscope`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        birthDate: "1995-07-28", // Leo (Sư Tử)
        targetMonth: "2026-07"
      })
    });

    assert.strictEqual(res1.status, 200, "Scenario 1: API phản hồi mã lỗi khác 200 OK");
    const data1 = await res1.json();

    assert.strictEqual(data1.zodiac.nameEn, "Leo", "Chòm sao phải là Leo");
    assert.strictEqual(data1.zodiac.nameVi, "Sư Tử", "Chòm sao phải là Sư Tử");
    assert.strictEqual(data1.zodiac.symbol, "♌", "Biểu tượng chòm sao phải là ♌");
    
    // Kiểm tra cấu trúc vận mệnh
    assert.ok(data1.predictions.overview, "Thiếu dự đoán tổng quan");
    assert.ok(data1.predictions.career.score >= 50, "Điểm sự nghiệp không hợp lệ");
    assert.ok(data1.predictions.career.text, "Thiếu văn bản dự báo sự nghiệp");
    assert.ok(data1.luckyElements.luckyColor, "Thiếu màu sắc may mắn");
    assert.strictEqual(data1.luckyElements.auspiciousDays.length, 3, "Phải có đúng 3 ngày cát tường");
    console.log("✅ Scenario 1 thành công: Phản hồi đúng thông tin Sư Tử và đầy đủ các chỉ số!");

    // 3. Chạy Scenario 2: Validation & Error Handling
    console.log("\n🎬 CHẠY SCENARIO 2: Validation & Error Handling");
    const res2 = await fetch(`${BASE_URL}/api/horoscope`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        birthDate: "", // Trống ngày sinh
        targetMonth: "2026-07"
      })
    });

    assert.strictEqual(res2.status, 400, "Scenario 2: Server phải phản hồi 400 Bad Request khi thiếu ngày sinh");
    const errorData2 = await res2.json();
    assert.ok(errorData2.error.includes("Thiếu thông tin ngày sinh"), "Thông điệp lỗi phải tiếng Việt");
    
    const res3 = await fetch(`${BASE_URL}/api/horoscope`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        birthDate: "1995-13-45", // Định dạng ngày không hợp lệ
        targetMonth: "2026-07"
      })
    });
    assert.strictEqual(res3.status, 400, "Scenario 2: Server phải phản hồi 400 khi ngày không hợp lệ");
    
    console.log("✅ Scenario 2 thành công: Hệ thống bắt lỗi định dạng đầu vào chính xác!");

    // 4. Chạy Scenario 3: Monthly Navigation & Prediction Determinism
    console.log("\n🎬 CHẠY SCENARIO 3: Monthly Navigation & Prediction Determinism");
    
    // Gọi lại lần 2 cho 07/2026
    const res4a = await fetch(`${BASE_URL}/api/horoscope`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ birthDate: "1995-07-28", targetMonth: "2026-07" })
    });
    const data4a = await res4a.json();
    
    // Nhập ngày sinh đó nhưng xem tháng khác (08/2026)
    const res4b = await fetch(`${BASE_URL}/api/horoscope`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ birthDate: "1995-07-28", targetMonth: "2026-08" })
    });
    const data4b = await res4b.json();
    
    // Xác minh kết quả tháng 7 và tháng 8 khác nhau (Monthly Navigation)
    assert.notDeepEqual(data4a.predictions, data4b.predictions, "Dự đoán tháng 7 và tháng 8 phải khác nhau");
    
    // Xác minh kết quả tháng 7 lần này hoàn toàn trùng khớp lần đầu (Determinism)
    assert.deepStrictEqual(data1, data4a, "Dự đoán tháng 7 giữa 2 lần chạy phải trùng khớp hoàn toàn");
    console.log("✅ Scenario 3 thành công: Kết quả dự đoán có tính nhất quán cao và phân biệt giữa các tháng!");

    console.log("\n🎉 TẤT CẢ 3 KỊCH BẢN KIỂM THỬ E2E ĐÃ VƯỢT QUA THÀNH CÔNG! 🎉");
    
  } catch (error) {
    console.error("\n❌ Kiểm thử E2E thất bại:", error);
    if (serverProcess) serverProcess.kill();
    process.exit(1);
  } finally {
    if (serverProcess) {
      console.log("\n🔌 Đang ngắt server Express...");
      serverProcess.kill();
    }
  }
}

runTests();
