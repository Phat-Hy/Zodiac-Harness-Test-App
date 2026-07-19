// Zodiac database with details
export const ZODIAC_SIGNS = [
  {
    id: "aries",
    nameVi: "Bạch Dương",
    nameEn: "Aries",
    symbol: "♈",
    element: "Lửa",
    rulingPlanet: "Sao Hỏa",
    dateRange: "21/03 - 19/04",
    startMonth: 3, startDay: 21, endMonth: 4, endDay: 19
  },
  {
    id: "taurus",
    nameVi: "Kim Ngưu",
    nameEn: "Taurus",
    symbol: "♉",
    element: "Đất",
    rulingPlanet: "Sao Kim",
    dateRange: "20/04 - 20/05",
    startMonth: 4, startDay: 20, endMonth: 5, endDay: 20
  },
  {
    id: "gemini",
    nameVi: "Song Tử",
    nameEn: "Gemini",
    symbol: "♊",
    element: "Khí",
    rulingPlanet: "Sao Thủy",
    dateRange: "21/05 - 20/06",
    startMonth: 5, startDay: 21, endMonth: 6, endDay: 20
  },
  {
    id: "cancer",
    nameVi: "Cự Giải",
    nameEn: "Cancer",
    symbol: "♋",
    element: "Nước",
    rulingPlanet: "Mặt Trăng",
    dateRange: "21/06 - 22/07",
    startMonth: 6, startDay: 21, endMonth: 7, endDay: 22
  },
  {
    id: "leo",
    nameVi: "Sư Tử",
    nameEn: "Leo",
    symbol: "♌",
    element: "Lửa",
    rulingPlanet: "Mặt Trời",
    dateRange: "23/07 - 22/08",
    startMonth: 7, startDay: 23, endMonth: 8, endDay: 22
  },
  {
    id: "virgo",
    nameVi: "Xử Nữ",
    nameEn: "Virgo",
    symbol: "♍",
    element: "Đất",
    rulingPlanet: "Sao Thủy",
    dateRange: "23/08 - 22/09",
    startMonth: 8, startDay: 23, endMonth: 9, endDay: 22
  },
  {
    id: "libra",
    nameVi: "Thiên Bình",
    nameEn: "Libra",
    symbol: "♎",
    element: "Khí",
    rulingPlanet: "Sao Kim",
    dateRange: "23/09 - 22/10",
    startMonth: 9, startDay: 23, endMonth: 10, endDay: 22
  },
  {
    id: "scorpio",
    nameVi: "Thiên Yết",
    nameEn: "Scorpio",
    symbol: "♏",
    element: "Nước",
    rulingPlanet: "Sao Diêm Vương",
    dateRange: "23/10 - 21/11",
    startMonth: 10, startDay: 23, endMonth: 11, endDay: 21
  },
  {
    id: "sagittarius",
    nameVi: "Nhân Mã",
    nameEn: "Sagittarius",
    symbol: "♐",
    element: "Lửa",
    rulingPlanet: "Sao Mộc",
    dateRange: "22/11 - 21/12",
    startMonth: 11, startDay: 22, endMonth: 12, endDay: 21
  },
  {
    id: "capricorn",
    nameVi: "Ma Kết",
    nameEn: "Capricorn",
    symbol: "♑",
    element: "Đất",
    rulingPlanet: "Sao Thổ",
    dateRange: "22/12 - 19/01",
    startMonth: 12, startDay: 22, endMonth: 1, endDay: 19
  },
  {
    id: "aquarius",
    nameVi: "Bảo Bình",
    nameEn: "Aquarius",
    symbol: "♒",
    element: "Khí",
    rulingPlanet: "Sao Thiên Vương",
    dateRange: "20/01 - 18/02",
    startMonth: 1, startDay: 20, endMonth: 2, endDay: 18
  },
  {
    id: "pisces",
    nameVi: "Song Ngư",
    nameEn: "Pisces",
    symbol: "♓",
    element: "Nước",
    rulingPlanet: "Sao Hải Vương",
    dateRange: "19/02 - 20/03",
    startMonth: 2, startDay: 19, endMonth: 3, endDay: 20
  }
];

// Helper to determine Zodiac sign from date
export function getZodiacSign(birthDateStr) {
  const date = new Date(birthDateStr);
  if (isNaN(date.getTime())) {
    throw new Error("Ngày sinh không hợp lệ.");
  }
  const month = date.getUTCMonth() + 1; // 1-indexed (using UTC to prevent timezone offsets)
  const day = date.getUTCDate();

  for (const sign of ZODIAC_SIGNS) {
    if (
      (month === sign.startMonth && day >= sign.startDay) ||
      (month === sign.endMonth && day <= sign.endDay)
    ) {
      return sign;
    }
  }

  // Fallback to Capricorn
  return ZODIAC_SIGNS.find(s => s.id === "capricorn");
}

// Seedable Pseudo-Random Number Generator (PRNG)
function createPRNG(seedString) {
  // cyrb128 hash function
  let h1 = 1779033703, h2 = 3024733165, h3 = 3362453659, h4 = 50249339;
  for (let i = 0, k; i < seedString.length; i++) {
    k = seedString.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  
  let a = (h1^h2^h3^h4)>>>0;
  let b = (h2^h1)>>>0;
  let c = (h3^h1)>>>0;
  let d = (h4^h1)>>>0;

  // sfc32 generator
  return function() {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
    let t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

// Database of prediction templates in Vietnamese
const OVERVIEWS = [
  "Tháng này mang đến nguồn năng lượng chuyển dịch mạnh mẽ. Bạn sẽ cảm thấy khao khát thay đổi bản thân và bứt phá khỏi những ranh giới cũ.",
  "Một tháng đầy bình yên và tự chiêm nghiệm. Trực giác của bạn nhạy bén hơn bao giờ hết, giúp bạn thấu hiểu sâu sắc những mối quan hệ xung quanh.",
  "Năng lượng sáng tạo và giao tiếp bùng nổ trong tháng này. Bạn sẽ có cơ hội kết nối với nhiều đối tác mới và khẳng định dấu ấn cá nhân.",
  "Tháng này đòi hỏi sự kiên nhẫn và cẩn trọng cao độ. Hãy tập trung củng cố nền tảng hiện tại thay vì nóng vội đưa ra các quyết định lớn.",
  "Cơ hội tài lộc và phát triển sự nghiệp rộng mở. Sự kiên trì và tầm nhìn chiến lược của bạn bắt đầu gặt hái được những trái ngọt đầu tiên."
];

const CAREER_PREDICTIONS = {
  high: [
    "Sự nghiệp thăng hoa rõ rệt. Bạn nhận được sự tín nhiệm từ cấp trên và có cơ hội thăng tiến lớn hoặc dẫn dắt dự án mới quan trọng.",
    "Khả năng tư duy logic và xử lý công việc xuất sắc giúp bạn vượt qua mọi chướng ngại vật dễ dàng. Đây là thời điểm tốt để đề xuất tăng lương.",
    "Sự sáng tạo của bạn được đánh giá cao. Đối với các bạn học sinh/sinh viên, tháng này đem lại kết quả thi cử xuất sắc và tiếp thu nhanh chóng."
  ],
  medium: [
    "Công việc diễn ra khá ổn định. Dù có một vài thử thách nhỏ phát sinh đột xuất, bạn hoàn toàn đủ khả năng kiểm soát tình hình.",
    "Môi trường công sở có chút xao nhãng. Hãy giữ vững sự tập trung và tránh tham gia vào các cuộc thảo luận phiếm không cần thiết.",
    "Học tập và công việc cần thêm kế hoạch rõ ràng hơn. Làm việc có tổ chức sẽ giúp bạn tránh khỏi tình trạng quá tải vào cuối tháng."
  ],
  low: [
    "Áp lực công việc tăng cao dễ khiến bạn kiệt sức. Cần phân bổ thời gian hợp lý và tránh ôm đồm quá nhiều việc cùng lúc.",
    "Có thể xảy ra bất đồng ý kiến với đồng nghiệp hoặc cấp trên. Hãy bình tĩnh lắng nghe và kiểm soát cảm xúc của mình tốt hơn.",
    "Kết quả công việc hoặc thi cử có thể không đạt như kỳ vọng ban đầu. Đừng nản lòng, hãy coi đây là cơ hội để rà soát lại phương pháp làm việc."
  ]
};

const FINANCE_PREDICTIONS = {
  high: [
    "Tài chính vô cùng vượng phát. Các khoản đầu tư trước đây bắt đầu sinh lời mạnh mẽ, mang lại nguồn doanh thu đột biến.",
    "May mắn về tiền bạc gõ cửa. Bạn có thể nhận được khoản thưởng nóng, quà tặng giá trị hoặc thu hồi được những khoản nợ cũ tưởng như đã mất.",
    "Khả năng quản lý ngân sách thông minh giúp bạn tích lũy được khoản tiết kiệm đáng kể. Thích hợp để đầu tư dài hạn."
  ],
  medium: [
    "Thu nhập duy trì ở mức ổn định, đủ để chi trả cho các nhu cầu thiết yếu và một vài sở thích cá nhân vừa phải.",
    "Dòng tiền ra vào cân bằng. Tuy nhiên, nên hạn chế mua sắm theo cảm xúc để tránh hao hụt ngân quỹ vào giữa tháng.",
    "Có một vài cơ hội kiếm tiền nhỏ xuất hiện. Hãy cân nhắc kỹ lưỡng trước khi tham gia để đảm bảo an toàn tài chính."
  ],
  low: [
    "Tháng này cần thắt lưng buộc bụng. Chi phí phát sinh ngoài ý muốn liên quan đến sức khỏe hoặc sửa chữa thiết bị có thể làm bạn đau đầu.",
    "Tránh xa các dự án đầu tư rủi ro cao hoặc cho vay mượn tiền trong tháng này, nguy cơ thất thoát tiền bạc là rất lớn.",
    "Tài chính gặp chút khó khăn. Hãy tạm thời cắt giảm các chi tiêu không cần thiết và tập trung tối ưu hóa nguồn thu nhập hiện có."
  ]
};

const LOVE_PREDICTIONS = {
  high: [
    "Tình duyên ngọt ngào, thăng hoa. Người đã có đôi có cặp ngày càng thấu hiểu và gắn kết bền chặt. Người độc thân dễ gặp được tri kỷ.",
    "Sức hút cá nhân cực kỳ lớn giúp bạn trở thành tâm điểm của đám đông. Một lời tỏ tình lãng mạn hoặc cuộc hẹn hò đáng nhớ đang chờ đón bạn.",
    "Các mối quan hệ gia đình và bạn bè ấm áp, tràn ngập tình yêu thương và sự thấu cảm sâu sắc."
  ],
  medium: [
    "Đời sống tình cảm êm đềm, không có nhiều biến động lớn. Hãy dành thời gian hâm nóng tình cảm bằng những buổi hẹn hò giản dị.",
    "Đối với người độc thân, bạn cảm thấy thoải mái với cuộc sống tự do hiện tại và chưa thực sự sẵn sàng mở lòng với người mới.",
    "Cần giao tiếp cởi mở hơn với đối phương. Những hiểu lầm nhỏ có thể được giải quyết nhanh chóng nếu cả hai chịu ngồi lại lắng nghe."
  ],
  low: [
    "Mối quan hệ xuất hiện những rạn nứt hoặc tranh cãi căng thẳng do bất đồng quan điểm. Hãy học cách nhường nhịn và kiềm chế cái tôi.",
    "Người độc thân có thể gặp phải những mối quan hệ mập mờ, thiếu an toàn. Nên tỉnh táo để tránh tổn thương tình cảm.",
    "Cảm giác cô đơn hoặc xa cách bao trùm. Cần dành không gian riêng cho bản thân để suy ngẫm trước khi đưa ra quyết định đi tiếp hay dừng lại."
  ]
};

const HEALTH_PREDICTIONS = {
  high: [
    "Thể trạng tuyệt vời, tràn đầy sinh lực. Tinh thần phấn chấn giúp bạn hoàn thành mọi mục tiêu đề ra một cách nhẹ nhàng.",
    "Chỉ số sức khỏe ở mức tối ưu. Việc duy trì thói quen tập luyện và chế độ ăn uống khoa học đang mang lại hiệu quả rõ rệt.",
    "Giấc ngủ ngon và tinh thần thư thái giúp bạn hồi phục năng lượng cực kỳ nhanh chóng sau những giờ làm việc mệt mỏi."
  ],
  medium: [
    "Sức khỏe thể chất bình thường, tuy nhiên thỉnh thoảng bạn có thể cảm thấy mệt mỏi do thiếu ngủ hoặc căng thẳng nhẹ.",
    "Cần chú ý hơn đến chế độ dinh dưỡng. Ăn đúng giờ và bổ sung nhiều nước, rau xanh sẽ giúp hệ tiêu hóa hoạt động tốt hơn.",
    "Hãy duy trì các bài tập thể dục nhẹ nhàng như đi bộ, yoga để tăng cường dẻo dai cho cơ thể."
  ],
  low: [
    "Cảnh báo suy nhược cơ thể hoặc các bệnh vặt như cảm cúm, đau đầu. Đã đến lúc bạn cần nghỉ ngơi và đi kiểm tra sức khỏe.",
    "Căng thẳng tinh thần kéo dài ảnh hưởng xấu đến dạ dày và chất lượng giấc ngủ. Hãy học cách buông bỏ áp lực và thư giãn đầu óc.",
    "Đề phòng chấn thương nhẹ khi vận động mạnh hoặc tham gia giao thông. Hãy luôn cẩn thận trong mọi hoạt động."
  ]
};

const COLORS = ["Xanh lục bảo", "Đỏ hồng ngọc", "Vàng ánh kim", "Xanh coban", "Tím tinh vân", "Cam hổ phách", "Hồng thạch anh", "Trắng ngọc trai", "Bạc ánh trăng", "Đen huyền bí"];

// Function to generate deterministic horoscope predictions
export function generateHoroscope(birthDateStr, targetMonthStr) {
  const zodiac = getZodiacSign(birthDateStr);
  const seed = `${birthDateStr}-${targetMonthStr}`;
  const random = createPRNG(seed);
  
  // Helper to pick random element from array
  const pick = (arr) => arr[Math.floor(random() * arr.length)];
  
  // Generate random scores (20 to 100)
  const careerScore = Math.floor(random() * 51) + 50; // 50 - 100
  const financeScore = Math.floor(random() * 51) + 50; // 50 - 100
  const loveScore = Math.floor(random() * 51) + 50; // 50 - 100
  const healthScore = Math.floor(random() * 51) + 50; // 50 - 100
  
  // Helper to classify level based on score
  const getLevel = (score) => {
    if (score >= 80) return "high";
    if (score >= 60) return "medium";
    return "low";
  };
  
  const careerLevel = getLevel(careerScore);
  const financeLevel = getLevel(financeScore);
  const loveLevel = getLevel(loveScore);
  const healthLevel = getLevel(healthScore);
  
  // Generate predictions text
  const overview = pick(OVERVIEWS);
  const careerText = pick(CAREER_PREDICTIONS[careerLevel]);
  const financeText = pick(FINANCE_PREDICTIONS[financeLevel]);
  const loveText = pick(LOVE_PREDICTIONS[loveLevel]);
  const healthText = pick(HEALTH_PREDICTIONS[healthLevel]);
  
  // Lucky number (1 - 99)
  const luckyNumber = Math.floor(random() * 99) + 1;
  
  // Lucky color
  const luckyColor = pick(COLORS);
  
  // Days of the month (1 - 28/30/31)
  const [year, month] = targetMonthStr.split("-").map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();
  
  // Generate random unique days
  const allDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Shuffle days deterministically
  for (let i = allDays.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const temp = allDays[i];
    allDays[i] = allDays[j];
    allDays[j] = temp;
  }
  
  const auspiciousDays = allDays.slice(0, 3).sort((a, b) => a - b);
  const cautionDays = allDays.slice(3, 6).sort((a, b) => a - b);

  return {
    zodiac,
    seed,
    predictions: {
      overview,
      career: { score: careerScore, level: careerLevel, text: careerText },
      finance: { score: financeScore, level: financeLevel, text: financeText },
      love: { score: loveScore, level: loveLevel, text: loveText },
      health: { score: healthScore, level: healthLevel, text: healthText }
    },
    luckyElements: {
      luckyNumber,
      luckyColor,
      auspiciousDays,
      cautionDays
    }
  };
}
