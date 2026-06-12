"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  allowedStyles,
  fallbackRecommendationText,
  getRecommendedProduct,
  type Product,
  type StyleName,
} from "@/lib/demo-data";

type Props = {
  tagId: string;
  userName: string;
  purchasedProduct: string;
};

type RecommendationState = {
  style: StyleName;
  product: Product;
  text: string;
  productImageUrl: string;
  imageUrl: string;
  usedFallback: boolean;
};

function PlaceholderVisual({
  label,
  imageUrl,
  tall = false,
}: {
  label: string;
  imageUrl: string;
  tall?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={[
        "relative overflow-hidden rounded-md border border-white/10 bg-[radial-gradient(circle_at_22%_20%,rgba(255,255,255,0.28),transparent_26%),linear-gradient(135deg,#f5f5f5,#999_45%,#111)]",
        tall ? "h-72" : "h-44",
      ].join(" ")}
    >
      {!failed ? (
        // Placeholder files can be dropped into /public/demo-products later.
        // Until then, this image quietly falls back to the gradient campaign panel.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={label}
          className={[
            "h-full w-full",
            tall
              ? "object-cover"
              : "scale-[5] bg-neutral-100 object-contain p-0",
          ].join(" ")}
          onError={() => setFailed(true)}
        />
      ) : null}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function NfcDemoClient({
  tagId,
  userName,
  purchasedProduct,
}: Props) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [claimOpen, setClaimOpen] = useState(false);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tryOnLoading, setTryOnLoading] = useState(false);
  const [error, setError] = useState(false);
  const [recommendation, setRecommendation] =
    useState<RecommendationState | null>(null);

  const activeProduct = useMemo(
    () => recommendation?.product ?? getRecommendedProduct("젠틀"),
    [recommendation],
  );
  const isDark = theme === "dark";
  const surface = isDark
    ? "border-white/10 bg-white/[0.03] text-white"
    : "border-neutral-200 bg-white text-black";
  const mutedText = isDark ? "text-neutral-300" : "text-neutral-600";
  const pageBg = isDark ? "bg-neutral-950 text-white" : "bg-neutral-100 text-black";
  const primaryButton = isDark
    ? "bg-white text-black hover:bg-neutral-200"
    : "bg-black text-white hover:bg-neutral-800";

  async function selectStyle(style: StyleName) {
    const product = getRecommendedProduct(style);
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tagId,
          userName,
          purchasedProduct,
          style,
        }),
      });

      if (!response.ok) {
        throw new Error("Recommendation request failed");
      }

      const data = (await response.json()) as {
        recommendation?: string;
        usedFallback?: boolean;
      };

      setRecommendation({
        style,
        product,
        text:
          data.recommendation ??
          fallbackRecommendationText(userName, purchasedProduct, style, product.name),
        productImageUrl: product.productImageUrl,
        imageUrl: product.tryOnImageUrl,
        usedFallback: Boolean(data.usedFallback),
      });
      setError(Boolean(data.usedFallback));
    } catch {
      setRecommendation({
        style,
        product,
        text: fallbackRecommendationText(
          userName,
          purchasedProduct,
          style,
          product.name,
        ),
        productImageUrl: product.productImageUrl,
        imageUrl: product.tryOnImageUrl,
        usedFallback: true,
      });
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function generateTryOnImage() {
    if (!recommendation) {
      return;
    }

    setTryOnLoading(true);

    try {
      const response = await fetch("/api/generate-tryon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          style: recommendation.style,
          productId: recommendation.product.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Image request failed");
      }

      const data = (await response.json()) as { imageUrl?: string };

      const generatedImageUrl = data.imageUrl;

      if (generatedImageUrl) {
        setRecommendation((current) =>
          current ? { ...current, imageUrl: generatedImageUrl } : current,
        );
      }
    } catch {
      setError(true);
    } finally {
      setTryOnLoading(false);
    }
  }

  return (
    <main className={`min-h-screen px-4 py-5 transition-colors ${pageBg}`}>
      <div className="mx-auto mb-4 flex h-14 w-full max-w-md items-center justify-between">
        <Link href="/" className="text-lg font-black tracking-[-0.02em]">
          gmgm
        </Link>
      </div>
      <section className="mx-auto w-full max-w-md space-y-4 pb-10">
        <header className={`rounded-md border p-5 ${surface}`}>
          <div className="flex items-start justify-between gap-3">
            <p
              className={`w-fit rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] ${
                isDark
                  ? "border-white/15 text-neutral-300"
                  : "border-neutral-300 text-neutral-600"
              }`}
            >
              ANN [AI+NFT+NFC] Passport Demo
            </p>
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`flex h-10 shrink-0 items-center rounded-full border p-1 ${
                isDark
                  ? "border-white/15 bg-black/30"
                  : "border-neutral-300 bg-neutral-100"
              }`}
              aria-label="테마 전환"
              title="테마 전환"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition ${
                  !isDark ? "bg-neutral-950 text-white shadow-sm" : "text-neutral-400"
                }`}
              >
                ☀
              </span>
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition ${
                  isDark ? "bg-white text-black shadow-sm" : "text-neutral-500"
                }`}
              >
                ☾
              </span>
            </button>
          </div>
          <div className="mt-8 space-y-3">
            <h1 className="text-3xl font-semibold leading-tight">
              안녕하세요, {userName} 님.
            </h1>
            <p className={`text-xl ${mutedText}`}>
              {purchasedProduct} 을 구매하셨군요.
            </p>
          </div>
        </header>

        <section className="rounded-md border border-white/10 bg-white p-5 text-black">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Digital Warranty
              </p>
              <h2 className="mt-2 text-2xl font-semibold">NFT Claim</h2>
              <p className="mt-2 text-sm text-neutral-600">
                NFT를 발행하시면 환불이 불가합니다.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setClaimOpen(true)}
                className="h-12 rounded-md bg-black px-5 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                NFT Claim
              </button>
              <button
                type="button"
                aria-label="설명보기"
                title="설명보기"
                onClick={() => setDescriptionOpen((value) => !value)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-base font-semibold transition hover:bg-neutral-100"
              >
                ?
              </button>
            </div>
          </div>
          {descriptionOpen ? (
            <div className="mt-5 grid gap-3 text-sm text-neutral-700">
              <p className="rounded-md bg-neutral-100 p-3">정품 인증 완료</p>
              <p className="rounded-md bg-neutral-100 p-3">
                NFC 기반 제품 여권 연결
              </p>
              <p className="rounded-md bg-neutral-100 p-3">
                향후 NFT 보증서, A/S, 리셀 이력 연동 가능
              </p>
            </div>
          ) : null}
        </section>

        <section className={`rounded-md border p-5 ${surface}`}>
          <h2 className="text-xl font-semibold leading-8">
            3개월 뒤 구매할 만한 글래스를 추천드릴게요. 평소 즐기는 패션
            스타일을 알려주세요.
          </h2>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {allowedStyles.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => selectStyle(style)}
                disabled={loading}
                className={`h-12 rounded-md border px-1 text-sm font-semibold transition disabled:cursor-wait disabled:opacity-60 ${
                  isDark
                    ? "border-white/15 bg-white text-black hover:bg-neutral-200"
                    : "border-neutral-300 bg-black text-white hover:bg-neutral-800"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </section>

        {loading ? (
          <p className={`rounded-md border p-4 text-sm ${surface}`}>
            AI가 스타일을 분석하고 있습니다...
          </p>
        ) : null}

        {error ? (
          <p className="rounded-md border border-amber-300/30 bg-amber-300/10 p-4 text-sm text-amber-100">
            데모 네트워크가 불안정하여 기본 추천문을 표시합니다.
          </p>
        ) : null}

        {recommendation ? (
          <section className="space-y-4 rounded-md border border-white/10 bg-white p-5 text-black">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                3 Month Recommendation
              </p>
              <p className="mt-3 text-base leading-7 text-neutral-800">
                {recommendation.text}
              </p>
              {recommendation.usedFallback ? (
                <p className="mt-2 text-xs text-neutral-500">
                  현재 기본 추천문으로 표시 중입니다.
                </p>
              ) : null}
            </div>

            <div className="rounded-md border border-neutral-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Recommended Product
              </p>
              <h3 className="mt-2 text-2xl font-semibold">
                {recommendation.product.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                {recommendation.product.description}
              </p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <p className="text-lg font-semibold">
                  {recommendation.product.price}
                </p>
                <a
                  href={recommendation.product.paymentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex h-11 shrink-0 items-center justify-center rounded-md px-5 text-sm font-semibold transition ${primaryButton}`}
                >
                  결제하기
                </a>
              </div>
            </div>

            <PlaceholderVisual
              label={`${activeProduct.name} product image`}
              imageUrl={recommendation.productImageUrl}
            />
            <PlaceholderVisual
              label="AI try-on concept"
              imageUrl={recommendation.imageUrl}
              tall
            />

            <button
              type="button"
              onClick={generateTryOnImage}
              disabled={tryOnLoading}
              className="flex h-12 w-full items-center justify-center rounded-md border border-neutral-300 text-sm font-semibold transition hover:bg-neutral-100 disabled:cursor-wait disabled:opacity-60"
            >
              {tryOnLoading ? "AI 이미지 생성 중..." : "AI 착용 이미지 생성"}
            </button>
          </section>
        ) : null}

        <p
          className={`px-1 text-xs leading-5 ${
            isDark ? "text-neutral-500" : "text-neutral-600"
          }`}
        >
          본 화면은 AI 분석, NFT 활용 및 NFC 기술, 구매이력 기반 추천, 결제
          및 구독 커머스, 멤버십 토큰 등을 결합한 데모 화면입니다.
        </p>
      </section>

      {claimOpen ? (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-sm rounded-md bg-white p-6 text-black shadow-2xl">
            <h2 className="text-2xl font-semibold">데모용 NFT Claim 화면입니다.</h2>
            <p className="mt-4 text-sm leading-6 text-neutral-700">
              실서비스에서는 지갑 연결 후 NFT 보증서가 발행됩니다.
            </p>
            {/*
              NFT extension sketch:
              NFC 접속 -> 제품 ID 확인 -> 지갑 연결 -> NFT Claim 버튼 ->
              스마트컨트랙트 mint -> NFT 보증서 발급 -> tokenId 표시.
            */}
            <button
              type="button"
              onClick={() => setClaimOpen(false)}
              className="mt-6 flex h-12 w-full items-center justify-center rounded-md bg-black text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              확인
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
