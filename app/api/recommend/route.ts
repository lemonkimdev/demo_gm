import {
  fallbackRecommendationText,
  getRecommendedProduct,
  isAllowedStyle,
  isAllowedTagId,
} from "@/lib/demo-data";

export const runtime = "nodejs";

type RecommendBody = {
  tagId?: unknown;
  userName?: unknown;
  purchasedProduct?: unknown;
  style?: unknown;
};

export async function POST(request: Request) {
  let body: RecommendBody;

  try {
    body = (await request.json()) as RecommendBody;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    !isAllowedTagId(body.tagId) ||
    typeof body.userName !== "string" ||
    typeof body.purchasedProduct !== "string" ||
    !isAllowedStyle(body.style)
  ) {
    return Response.json({ error: "Invalid demo input" }, { status: 400 });
  }

  const product = getRecommendedProduct(body.style);
  const fallback = fallbackRecommendationText(
    body.userName,
    body.purchasedProduct,
    body.style,
    product.name,
  );

  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ recommendation: fallback, usedFallback: true });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_TEXT_MODEL ?? "gpt-5.5",
        reasoning: { effort: "low" },
        instructions:
          "당신은 면접 데모용 프리미엄 아이웨어 제품 여권 화면의 짧은 추천문을 작성합니다. 제공된 이름, 기존 구매 제품명, 선택한 스타일, 추천 제품명만 사용하세요. 외부 브랜드나 실제 상품명을 추측하지 말고, 과장 광고 없이 한국어 3~5문장으로 작성하세요. 반드시 3개월 뒤 추천 맥락을 포함하세요.",
        input: JSON.stringify({
          userName: body.userName,
          purchasedProduct: body.purchasedProduct,
          style: body.style,
          recommendedProduct: product.name,
        }),
        max_output_tokens: 420,
      }),
    });

    if (!response.ok) {
      throw new Error("OpenAI recommendation failed");
    }

    const data = (await response.json()) as { output_text?: string };
    const recommendation = data.output_text?.trim();

    return Response.json({
      recommendation: recommendation || fallback,
      usedFallback: !recommendation,
    });
  } catch {
    return Response.json({ recommendation: fallback, usedFallback: true });
  }
}
