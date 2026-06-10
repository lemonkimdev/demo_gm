"use client";

import { useState } from "react";
import BeautyActionModal from "@/components/BeautyActionModal";
import BeautyAnalysisCard from "@/components/BeautyAnalysisCard";
import {
  beautyAnalysis,
  beautyMembershipStatus,
  beautyPurchaseHistory,
  beautyRecommendedProducts,
  beautyRecommendationText,
  beautyUserName,
} from "@/lib/beauty-demo-data";

type ModalState = {
  eyebrow?: string;
  title: string;
  message: string;
};

const modalMessages = {
  purchase: {
    title: "원클릭 구매",
    message: "결제수단 확인 후 주문화면으로 넘어갑니다.",
  },
  subscription: {
    title: "커스텀 섭스크립션",
    message:
      "AI가 소진 주기를 예측하여 핸드크림은 30일, 향수는 60일 주기로 추천 배송합니다.",
  },
  membership: {
    title: "멤버십 토큰",
    message: "다음 리워드까지 구매 2회가 남았습니다.",
  },
  love: {
    eyebrow: "Beauty Voyage",
    title: "셀럽 레시피 픽",
    message:
      "팬 분들이 투표한 특별한 레시피 아이템. 구매 시 NFT, 토큰이 포함되며, 다음 구매 또는 투표에 활용할 수 있습니다.",
  },
} satisfies Record<string, ModalState>;

export default function BeautyPassportDemo() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [loggedIn, setLoggedIn] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [modal, setModal] = useState<ModalState | null>(null);
  const isDark = theme === "dark";
  const pageClass = isDark
    ? "bg-neutral-950 text-[#fbf7ef]"
    : "bg-neutral-100 text-neutral-950";
  const heroCardClass = isDark
    ? "border-white/10 bg-[#fbf7ef] text-neutral-950"
    : "border-neutral-200 bg-white text-neutral-950";
  const darkSurfaceClass = isDark
    ? "border-white/10 bg-white/[0.04] text-[#fbf7ef]"
    : "border-neutral-200 bg-white text-neutral-950";
  const mutedTextClass = isDark ? "text-neutral-300" : "text-neutral-600";
  const creamButtonClass = isDark
    ? "bg-[#fbf7ef] text-neutral-950 hover:bg-white"
    : "bg-neutral-950 text-white hover:bg-neutral-800";

  return (
    <main className={`min-h-screen px-4 py-5 transition-colors ${pageClass}`}>
      <section className="mx-auto w-full max-w-md space-y-4 pb-10">
        <header className={`rounded-md border p-5 ${heroCardClass}`}>
          <div className="flex items-center justify-between gap-3">
            <p className="rounded-full border border-neutral-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
              AI Beauty Journey Demo
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <div
                className={`flex h-10 items-center rounded-full border p-1 ${
                  isDark
                    ? "border-neutral-300 bg-neutral-100"
                    : "border-neutral-300 bg-neutral-100"
                }`}
                aria-label="테마 선택"
              >
                <button
                  type="button"
                  aria-label="라이트 모드"
                  title="라이트 모드"
                  onClick={() => setTheme("light")}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition ${
                    !isDark ? "bg-white shadow-sm" : "text-neutral-500"
                  }`}
                >
                  ☀
                </button>
                <button
                  type="button"
                  aria-label="다크 모드"
                  title="다크 모드"
                  onClick={() => setTheme("dark")}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition ${
                    isDark ? "bg-neutral-950 text-white shadow-sm" : "text-neutral-500"
                  }`}
                >
                  ☾
                </button>
              </div>
              <button
                type="button"
                onClick={() => setLoggedIn(true)}
                className="h-10 rounded-md bg-neutral-950 px-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                {loggedIn ? "로그인됨" : "로그인"}
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <h1 className="text-3xl font-semibold leading-tight">
              안녕하세요, {beautyUserName} 님.
            </h1>
            <p className="text-lg font-medium text-neutral-800">
              AI로 분석하는 뷰티 여정입니다.
            </p>
            {!loggedIn ? (
              <p className="text-sm leading-6 text-neutral-600">
                로그인하면 구매이력과 AI 화장대 분석을 기반으로 다음 구매를
                추천합니다.
              </p>
            ) : null}
          </div>
        </header>

        {loggedIn ? (
          <>
            <section className={`rounded-md border p-5 ${darkSurfaceClass}`}>
              <p
                className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                  isDark ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                AI Vision Ready
              </p>
              <h2 className="mt-2 text-2xl font-semibold">AI 화장대 분석</h2>
              <p className={`mt-3 text-sm leading-6 ${mutedTextClass}`}>
                화장대 사진을 촬영하면 보유 제품, 브랜드 조합, 소비 성향,
                취향을 분석합니다. # 스마트폰 사용 시, 카메라 촬영. 글래스
                사용 시, 글래스 촬영
              </p>
              {/*
                Future extension:
                replace this mock capture with an image upload/camera input,
                send the photo to a server route, and run OpenAI Vision analysis
                with only user-approved demo data.
              */}
              <button
                type="button"
                onClick={() => setCaptured(true)}
                className={`mt-5 flex h-14 w-full items-center justify-center rounded-md text-base font-semibold transition ${creamButtonClass}`}
              >
                {captured ? "촬영 완료" : "카메라 촬영하기"}
              </button>
              {captured ? (
                <div className="mt-5 overflow-hidden rounded-md border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/beauty-demo/vanity-analysis.png"
                    alt="여성의 정리된 화장대 사진"
                    className="aspect-square w-full object-cover"
                  />
                  <p
                    className={`px-4 py-3 text-xs ${
                      isDark
                        ? "bg-black/30 text-neutral-300"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    이 사진은 분석에만 쓰이며, 저장되지 않습니다.
                  </p>
                </div>
              ) : null}
            </section>

            {captured ? (
              <>
                <BeautyAnalysisCard analysis={beautyAnalysis} theme={theme} />

                <section className={`rounded-md border p-5 ${darkSurfaceClass}`}>
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    Purchase Memory
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    구매이력 기반 분석
                  </h2>
                  <div className="mt-4 space-y-2">
                    {beautyPurchaseHistory.map((item) => (
                      <p
                        key={item.name}
                        className={`rounded-md px-3 py-2 text-sm ${
                          isDark
                            ? "bg-[#fbf7ef] text-neutral-950"
                            : "bg-neutral-100 text-neutral-800"
                        }`}
                      >
                        {item.name} {item.quantity}개 구매
                      </p>
                    ))}
                  </div>
                  <p className={`mt-4 text-sm ${mutedTextClass}`}>
                    최근 구매일: 38일 전
                  </p>
                  <div
                    className={`mt-4 rounded-md border p-4 text-sm leading-6 ${
                      isDark
                        ? "border-white/10 text-neutral-200"
                        : "border-neutral-200 text-neutral-700"
                    }`}
                  >
                    <p>AI 판단:</p>
                    <p className="mt-2">
                      “핸드크림 재구매 가능성이 가장 높습니다.”
                    </p>
                    <p>“향수는 아직 충분하며, 헤어오일은 이번 추천에서 제외합니다.”</p>
                  </div>
                </section>

                <section
                  className={`rounded-md border p-5 ${
                    isDark
                      ? "border-neutral-200 bg-[#fbf7ef] text-neutral-950"
                      : "border-neutral-200 bg-white text-neutral-950"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Next Order
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    AI가 구성한 다음 주문
                  </h2>
                  <p className="mt-4 text-sm leading-6 text-neutral-700">
                    {beautyRecommendationText}
                  </p>
                  <div className="mt-5 space-y-3">
                    {beautyRecommendedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="grid grid-cols-[1fr_86px] gap-3 rounded-md border border-neutral-200 bg-white/70 p-4"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-base font-semibold leading-6">
                              {product.name}
                            </h3>
                          </div>
                          <p className="mt-1 shrink-0 text-sm font-semibold">
                            {product.price}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-neutral-600">
                            추천 이유: {product.reason}
                          </p>
                        </div>
                        <div className="overflow-hidden rounded-md bg-neutral-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.imageUrl}
                            alt={`${product.name} 제품 사진`}
                            className="aspect-square h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                    <button
                      type="button"
                      onClick={() => setModal(modalMessages.purchase)}
                      className="h-11 shrink-0 rounded-full bg-neutral-950 px-4 text-sm font-semibold text-white"
                    >
                      원클릭 구매
                    </button>
                    <button
                      type="button"
                      onClick={() => setModal(modalMessages.subscription)}
                      className="h-11 shrink-0 rounded-full border border-neutral-300 px-4 text-sm font-semibold"
                    >
                      커스텀 섭스크립션
                    </button>
                    <button
                      type="button"
                      onClick={() => setModal(modalMessages.membership)}
                      className="h-11 shrink-0 rounded-full border border-neutral-300 px-4 text-sm font-semibold"
                    >
                      {beautyMembershipStatus.label.replace(" ", "")}:+구매
                      {beautyMembershipStatus.remainingPurchases}회
                    </button>
                  </div>
                </section>

                <section
                  className={`rounded-md border p-5 ${
                    isDark
                      ? "border-white/10 bg-white/[0.04] text-[#fbf7ef]"
                      : "border-neutral-200 bg-white text-neutral-950"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    Next My Love
                  </p>
                  <div className="mt-4 flex items-center gap-3 rounded-md border border-white/10 bg-[#fbf7ef] p-4 text-neutral-950">
                    <button
                      type="button"
                      onClick={() => setModal(modalMessages.love)}
                      className="h-11 shrink-0 rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white"
                    >
                      Pick!
                    </button>
                    <p className="text-sm font-semibold leading-5">
                      Celeb&apos;s Recipe + NFT
                      <span className="block text-xs font-medium text-neutral-600">
                        (포인트 상당의 토큰이 포함됩니다.)
                      </span>
                    </p>
                  </div>
                </section>
              </>
            ) : null}
          </>
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

      {modal ? (
        <BeautyActionModal
          eyebrow={modal.eyebrow}
          title={modal.title}
          message={modal.message}
          onClose={() => setModal(null)}
        />
      ) : null}
    </main>
  );
}
