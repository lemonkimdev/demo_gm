export const allowedTagPattern = /^gm-\d{3}$/;

export const allowedStyles = [
  "팬시",
  "미니멀",
  "젠틀",
  "펑크",
  "스트리트",
  "맥시멀",
] as const;

export type StyleName = (typeof allowedStyles)[number];

export type Product = {
  id: string;
  name: string;
  styleTags: StyleName[];
  price: string;
  description: string;
  productImageUrl: string;
  tryOnImageUrl: string;
  paymentUrl: string;
};

const names = [
  "즐거운뽁뽁이",
  "차가운도시고양이",
  "선명한구름",
  "밤산책여우",
  "조용한반짝이",
  "느긋한번개",
  "도도한달빛",
  "맑은네온",
  "우아한파도",
  "빠른은하",
];

const purchasedProducts = [
  "FRIDA 01",
  "LANG 01",
  "LO CELL 01",
  "BOLD 01",
  "ATOMIC 02",
  "DEAR 01",
  "KUBO 01",
  "SOUTH SIDE 01",
  "MONO SHADE 02",
  "CITY FRAME 03",
];

export const recommendedProducts: Product[] = [
  {
    id: "nova-flare-01",
    name: "NOVA FLARE 01",
    styleTags: ["팬시"],
    price: "278,000원",
    description: "빛을 넓게 받는 실루엣과 선명한 렌즈 톤의 데모 선글래스.",
    productImageUrl:
      "https://gm-prd-resource.gentlemonster.com/catalog/product/OHASDDUXYNAO/OHASDDUXYNAO_FRONT.jpg",
    tryOnImageUrl:
      "https://gm-prd-resource.gentlemonster.com/catalog/product/bulk/606c96d0-22d6-43a1-a28a-6e26c8559836/OHASDDUXYNAO_LOOK_BOOK_FIRST.jpg",
    paymentUrl: "https://example.com/checkout?product=nova-flare-01",
  },
  {
    id: "line-still-02",
    name: "LINE STILL 02",
    styleTags: ["미니멀"],
    price: "246,000원",
    description: "얇은 전면 라인과 낮은 채도의 렌즈로 매일 쓰기 쉬운 모델.",
    productImageUrl:
      "https://gm-prd-resource.gentlemonster.com/catalog/product/bulk/9fb93291-c1e0-40a7-9a1c-12d4ab7f58db/11004996_FRONT.jpg?width=1400",
    tryOnImageUrl:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    paymentUrl: "https://example.com/checkout?product=line-still-02",
  },
  {
    id: "urban-muse-03",
    name: "URBAN MUSE 03",
    styleTags: ["젠틀"],
    price: "292,000원",
    description: "정돈된 사각 프레임과 은은한 광택을 조합한 도시형 디자인.",
    productImageUrl:
      "https://gm-prd-resource.gentlemonster.com/catalog/product/bulk/d6604af8-9026-4f2c-b13e-95805a06e30a/11005001_FRONT.jpg?width=1400",
    tryOnImageUrl:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    paymentUrl: "https://example.com/checkout?product=urban-muse-03",
  },
  {
    id: "riot-angle-04",
    name: "RIOT ANGLE 04",
    styleTags: ["펑크"],
    price: "318,000원",
    description: "각진 브리지와 강한 템플 라인이 포인트가 되는 데모 모델.",
    productImageUrl:
      "https://gm-prd-resource.gentlemonster.com/catalog/product/bulk/08abb096-5235-45df-99b3-838aa986392c/11004354_FRONT.jpg?width=1400",
    tryOnImageUrl:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    paymentUrl: "https://example.com/checkout?product=riot-angle-04",
  },
  {
    id: "metro-echo-05",
    name: "METRO ECHO 05",
    styleTags: ["스트리트"],
    price: "264,000원",
    description: "두께감 있는 프레임과 깨끗한 렌즈 밸런스의 거리감 있는 모델.",
    productImageUrl:
      "https://gm-prd-resource.gentlemonster.com/catalog/product/bulk/84692b3b-a832-4088-aa82-938e12f3b982/11004352_FRONT.jpg?width=1400",
    tryOnImageUrl:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
    paymentUrl: "https://example.com/checkout?product=metro-echo-05",
  },
  {
    id: "quiet-arc-06",
    name: "QUIET ARC 06",
    styleTags: ["맥시멀"],
    price: "236,000원",
    description: "부드러운 곡선과 절제된 볼륨으로 오래 보기 좋은 모델.",
    productImageUrl:
      "https://gm-prd-resource.gentlemonster.com/catalog/product/bulk/64b42c5a-065f-4148-8207-53cfab412648/11004361_FRONT.jpg?width=1400",
    tryOnImageUrl:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    paymentUrl: "https://example.com/checkout?product=quiet-arc-06",
  },
];

export function isAllowedStyle(value: unknown): value is StyleName {
  return typeof value === "string" && allowedStyles.includes(value as StyleName);
}

export function isAllowedTagId(value: unknown): value is string {
  return typeof value === "string" && allowedTagPattern.test(value);
}

export function seededIndex(seed: string, length: number) {
  let hash = 2166136261;
  for (const char of seed) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash >>> 0) % length;
}

export function getTagPersona(_tagId: string) {
  void _tagId;

  return {
    userName: names[Math.floor(Math.random() * names.length)],
    purchasedProduct:
      purchasedProducts[Math.floor(Math.random() * purchasedProducts.length)],
  };
}

export function getRecommendedProduct(style: StyleName) {
  return (
    recommendedProducts.find((product) => product.styleTags.includes(style)) ??
    recommendedProducts[0]
  );
}

export function fallbackRecommendationText(
  userName: string,
  purchasedProduct: string,
  style: StyleName,
  productName: string,
) {
  return `${userName} 님이 선택하신 ${style} 스타일은 ${purchasedProduct}의 분위기를 자연스럽게 확장하기 좋습니다. 3개월 뒤에는 현재 프레임보다 조금 더 선명한 인상을 주는 ${productName}을 추천드립니다. 데일리 착용과 특별한 일정 모두에 무리 없이 어울리도록 균형감을 중심으로 골랐습니다.`;
}
