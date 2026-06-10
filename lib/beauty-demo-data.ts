export type BeautyProduct = {
  id: string;
  name: string;
  price: string;
  reason: string;
  imageUrl: string;
};

export type DetectedCategory = {
  name: string;
  count: number;
};

export type BeautyAnalysis = {
  detectedProductCount: number;
  categories: DetectedCategory[];
  brandMix: string[];
  consumptionTraits: string[];
  tasteProfile: Array<{
    note: string;
    percent: number;
  }>;
  depletionForecast: Array<{
    category: string;
    forecast: string;
  }>;
};

export type PurchaseHistoryItem = {
  name: string;
  quantity: number;
};

export type MembershipStatus = {
  label: string;
  remainingPurchases: number;
};

export const beautyUserName = "즐거운뽁뽁이";

export const beautyAnalysis: BeautyAnalysis = {
  detectedProductCount: 9,
  categories: [
    { name: "향수", count: 4 },
    { name: "핸드크림", count: 3 },
    { name: "헤어오일", count: 2 },
  ],
  brandMix: [
    "니치/프리미엄 계열 중심",
    "우디·머스크·시트러스 계열이 반복됨",
    "패키지 디자인이 미니멀한 제품 선호",
  ],
  consumptionTraits: [
    "향수는 여러 개를 번갈아 쓰는 타입",
    "핸드크림은 소진 주기가 빠른 타입",
    "헤어오일은 보유량이 충분한 타입",
  ],
  tasteProfile: [
    { note: "우디", percent: 55 },
    { note: "머스크", percent: 25 },
    { note: "시트러스", percent: 20 },
  ],
  depletionForecast: [
    { category: "핸드크림", forecast: "약 12일 후 소진 예상" },
    { category: "향수", forecast: "약 46일 이상 사용 가능" },
    { category: "헤어오일", forecast: "약 35일 이상 사용 가능" },
  ],
};

// 구매이력 상품명은 면접 데모용 가상 상품명입니다. 실제 상표/제품 데이터와 결제 흐름은 연결하지 않습니다.
export const beautyPurchaseHistory: PurchaseHistoryItem[] = [
  { name: "VEIL HAND CREAM", quantity: 2 },
  { name: "WOOD SALT HAND CREAM", quantity: 1 },
  { name: "FOG MUSK PERFUME", quantity: 1 },
];

export const beautyRecommendedProducts: BeautyProduct[] = [
  {
    id: "perfume-hand-chamo",
    name: "PERFUME HAND CHAMO",
    price: "32,000원",
    reason: "빠른 소진 주기와 기존 재구매 패턴 기반",
    imageUrl: "/beauty-demo/hand-cream.png",
  },
  {
    id: "perfume-berga-sandal-11ml",
    name: "PERFUME BERGA SANDAL 11ML",
    price: "48,000원",
    reason: "우디 취향과 기존 향수 보유량을 고려한 미니 사이즈 제안",
    imageUrl: "/beauty-demo/mini-perfume.png",
  },
];

export const beautyRecommendationText =
  "AI는 화장대 이미지에서 감지한 보유 제품 구성과 구매이력을 함께 분석했습니다. 현재는 향수보다 핸드크림 소진 가능성이 높아, 핸드크림을 우선 추천하고 우디 계열 미니 향수를 보조 추천합니다.";

export const beautyMembershipStatus: MembershipStatus = {
  label: "멤버십 토큰",
  remainingPurchases: 2,
};
