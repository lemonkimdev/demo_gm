import {
  getRecommendedProduct,
  isAllowedStyle,
  recommendedProducts,
} from "@/lib/demo-data";

export const runtime = "nodejs";

type TryOnBody = {
  style?: unknown;
  productId?: unknown;
};

export async function POST(request: Request) {
  let body: TryOnBody;

  try {
    body = (await request.json()) as TryOnBody;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isAllowedStyle(body.style) || typeof body.productId !== "string") {
    return Response.json({ error: "Invalid demo input" }, { status: 400 });
  }

  const product =
    recommendedProducts.find((item) => item.id === body.productId) ??
    getRecommendedProduct(body.style);

  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { imageUrl: product.tryOnImageUrl, usedFallback: true },
      { status: 200 },
    );
  }

  try {
    const prompt = `Create a stylish editorial image of a faceless model wearing futuristic sunglasses inspired by ${product.name}, fashion style: ${body.style}, clean studio background, premium eyewear campaign, no visible brand logos, no text.`;

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-2",
        prompt,
        size: "1024x1536",
        quality: "low",
      }),
    });

    if (!response.ok) {
      throw new Error("OpenAI image generation failed");
    }

    const data = (await response.json()) as {
      data?: Array<{ b64_json?: string; url?: string }>;
    };
    const generated = data.data?.[0];
    const imageUrl = generated?.b64_json
      ? `data:image/png;base64,${generated.b64_json}`
      : generated?.url;

    return Response.json({
      imageUrl: imageUrl ?? product.tryOnImageUrl,
      usedFallback: !imageUrl,
    });
  } catch {
    return Response.json({
      imageUrl: product.tryOnImageUrl,
      usedFallback: true,
    });
  }
}
