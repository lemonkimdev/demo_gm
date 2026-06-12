"use client";

import { useEffect, useMemo, useState } from "react";

const quizQuestions = [
  {
    question: "선호하는 향 계열은?",
    options: ["플로럴", "머스크", "우디", "시트러스"],
  },
  {
    question: "향의 강도는?",
    options: ["가볍게", "적당히", "진하게"],
  },
  {
    question: "주로 언제 쓰나요?",
    options: ["출근", "데이트", "집에서", "운동 후"],
  },
  {
    question: "지금 기분은?",
    options: ["차분함", "설렘", "피곤함", "활기참"],
  },
  {
    question: "좋아하는 계절은?",
    options: ["봄", "여름", "가을", "겨울"],
  },
];

const collectibles = [
  {
    season: "Soft Bloom SBT",
    date: "2026.06",
    rarity: "Rare",
  },
  {
    season: "Purple Mist Drop",
    date: "2026.05",
    rarity: "Common",
  },
  {
    season: "Seoul Scent Pass",
    date: "2026.04",
    rarity: "Epic",
  },
];

export default function Subscription() {
  const [step, setStep] = useState("quiz");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [paying, setPaying] = useState(false);
  const [deliveryDays, setDeliveryDays] = useState(23);
  const [modal, setModal] = useState(null);

  const currentQuestion = quizQuestions[questionIndex];
  const progress = ((questionIndex + 1) / quizQuestions.length) * 100;
  const profile = useMemo(() => {
    const scent = answers[0] ?? "플로럴";
    const strength = answers[1] ?? "가볍게";

    if (scent === "우디") {
      return "클린 우디";
    }

    if (scent === "머스크") {
      return "포근한 머스크";
    }

    if (scent === "시트러스") {
      return "브라이트 시트러스";
    }

    return strength === "진하게" ? "딥 플로럴" : "소프트 플로럴";
  }, [answers]);

  useEffect(() => {
    if (step !== "result-loading") {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setStep("result");
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (step !== "dashboard") {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setDeliveryDays((current) => (current <= 1 ? 23 : current - 1));
    }, 24 * 60 * 60 * 1000);

    return () => window.clearInterval(timer);
  }, [step]);

  function chooseOption(option) {
    setSelectedOption(option);

    window.setTimeout(() => {
      setAnswers((current) => {
        const next = [...current];
        next[questionIndex] = option;
        return next;
      });
      setSelectedOption("");

      if (questionIndex === quizQuestions.length - 1) {
        setStep("result-loading");
      } else {
        setQuestionIndex((current) => current + 1);
      }
    }, 300);
  }

  function startSubscription() {
    setPaying(true);
    window.setTimeout(() => {
      setPaying(false);
      setStep("dashboard");
    }, 1000);
  }

  return (
    <div className="mx-auto w-full max-w-3xl text-[var(--iic-text)]">
      <style jsx>{`
        @keyframes iic-fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes iic-pulse-dot {
          0%,
          100% {
            transform: scale(0.75);
            opacity: 0.35;
          }
          50% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .iic-fade {
          animation: iic-fade-in 0.32s ease-out both;
        }
      `}</style>

      <section className="space-y-5">
        <div className="rounded-3xl border border-[var(--iic-border)] bg-[radial-gradient(circle_at_15%_15%,rgba(122,90,170,0.28),transparent_34%),var(--iic-card)] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
            Scent Subscription
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight">
            내 취향을 매달 받아보기
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--iic-text-muted)]">
            간단한 취향 퀴즈를 통해 매달 나에게 맞는 탬버린즈 향수와 시즌별 SBT를 추천받고 구독까지
          </p>
        </div>

        {step === "quiz" ? (
          <div className="iic-fade rounded-3xl border border-[var(--iic-border)] bg-black/35 p-5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-black text-[var(--iic-text)]">
                {questionIndex + 1}/5
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7A5AAA]">
                Taste Quiz
              </p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-black">
              <div
                className="h-full rounded-full bg-[#7A5AAA] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <h2 className="mt-6 text-3xl font-black leading-tight">
              {currentQuestion.question}
            </h2>
            <div className="mt-5 grid gap-3">
              {currentQuestion.options.map((option) => {
                const selected = selectedOption === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => chooseOption(option)}
                    disabled={Boolean(selectedOption)}
                    className={`min-h-14 rounded-3xl border px-5 py-4 text-left text-base font-black transition active:scale-[0.98] disabled:cursor-wait ${
                      selected
                        ? "border-[#7A5AAA] bg-[#7A5AAA] text-white"
                        : "border-[var(--iic-border)] bg-[var(--iic-card)] text-[var(--iic-text)] hover:border-[#7A5AAA]"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {step === "result-loading" ? (
          <div className="iic-fade rounded-3xl border border-[rgba(122,90,170,0.45)] bg-[var(--iic-card)] p-8 text-center">
            <div className="mx-auto flex h-16 w-28 items-center justify-center gap-2">
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  className="h-3 w-3 rounded-full bg-[#7A5AAA]"
                  style={{
                    animation: `iic-pulse-dot 0.85s ease-in-out ${index * 0.15}s infinite`,
                  }}
                />
              ))}
            </div>
            <p className="mt-4 text-xl font-black">취향 분석 중...</p>
            <p className="mt-2 text-sm text-[var(--iic-text-muted)]">
              선택한 향 계열, 사용 상황, 계절 선호를 조합하고 있습니다.
            </p>
          </div>
        ) : null}

        {step === "result" ? (
          <div className="iic-fade space-y-5">
            <div className="rounded-3xl border border-[rgba(122,90,170,0.5)] bg-[linear-gradient(145deg,rgba(122,90,170,0.3),rgba(20,20,20,1))] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
                Scent Profile
              </p>
              <h2 className="mt-3 text-3xl font-black">
                당신의 향 프로파일: {profile}
              </h2>
              <div className="iic-on-dark mt-5 rounded-3xl border border-[var(--iic-border)] bg-black/45 p-5">
                <p className="text-sm text-[var(--iic-text-muted)]">추천 제품</p>
                <p className="mt-2 text-4xl font-black">SYLPH 30ml</p>
              </div>
              <div className="mt-5 grid gap-3 text-sm leading-6 text-[var(--iic-text-muted)]">
                <p className="iic-on-dark-muted rounded-2xl border border-[var(--iic-border)] bg-black/35 p-3">
                  선택한 향 계열이 부드럽고 깨끗한 잔향과 잘 맞습니다.
                </p>
                <p className="iic-on-dark-muted rounded-2xl border border-[var(--iic-border)] bg-black/35 p-3">
                  일상 사용 빈도를 고려해 부담스럽지 않은 30ml 구성을 추천합니다.
                </p>
                <p className="iic-on-dark-muted rounded-2xl border border-[var(--iic-border)] bg-black/35 p-3">
                  매월 배송 시 계절별 SBT 에어드롭을 함께 받을 수 있습니다.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStep("settings")}
              className="min-h-12 w-full rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-black text-black transition hover:bg-[var(--iic-gold-light)] active:scale-95"
            >
              SYLPH로 구독 시작하기 $29/월 →
            </button>
          </div>
        ) : null}

        {step === "settings" ? (
          <div className="iic-fade space-y-5 rounded-3xl border border-[var(--iic-border)] bg-black/35 p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--iic-gold)]">
                Subscription Setup
              </p>
              <h2 className="mt-3 text-3xl font-black">구독 설정</h2>
            </div>

            <div className="rounded-3xl border border-[rgba(122,90,170,0.45)] bg-[var(--iic-card)] p-5">
              <div className="grid gap-3 text-sm">
                {[
                  ["제품명", "SYLPH 30ml"],
                  ["금액", "$29/월"],
                  ["배송 주기", "매월 1일"],
                  ["결제", "USDC"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl border border-[var(--iic-border)] bg-black p-3"
                  >
                    <span className="text-[var(--iic-text-muted)]">{label}</span>
                    <span className="font-black text-[var(--iic-text)]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={startSubscription}
              disabled={paying}
              className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#7A5AAA] px-5 py-3 text-sm font-black text-white transition hover:bg-[#8d6cc0] active:scale-95 disabled:opacity-70"
            >
              {paying ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/25 border-t-white" />
              ) : (
                "USDC로 결제하기"
              )}
            </button>
          </div>
        ) : null}

        {step === "dashboard" ? (
          <div className="iic-fade space-y-5">
            <div className="rounded-3xl border border-[rgba(122,90,170,0.55)] bg-[var(--iic-card)] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex min-h-10 items-center rounded-full bg-[#7A5AAA] px-4 text-sm font-black text-white">
                    구독 중 ✓
                  </span>
                  <h2 className="mt-5 text-3xl font-black">SYLPH Monthly</h2>
                  <p className="mt-2 text-sm text-[var(--iic-text-muted)]">
                    다음 배송까지
                  </p>
                </div>
                <div className="rounded-3xl border border-[var(--iic-border)] bg-black px-5 py-4 text-center">
                  <p className="text-xs text-[var(--iic-text-muted)]">D-Day</p>
                  <p className="mt-1 text-4xl font-black text-[var(--iic-gold)]">
                    D-{deliveryDays}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-3xl border border-[var(--iic-border)] bg-black/45 p-4">
                <p className="text-sm font-black text-[var(--iic-text)]">이번 달 배송 내용</p>
                <p className="mt-2 text-sm leading-6 text-[var(--iic-text-muted)]">
                  SYLPH 30ml + 시즌 SBT 에어드롭 포함
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--iic-border)] bg-black/35 p-5">
              <p className="text-sm font-black text-[var(--iic-text)]">
                받은 컬렉터블 이력
              </p>
              <div className="mt-4 grid gap-3">
                {collectibles.map((item) => (
                  <div
                    key={item.season}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-4"
                  >
                    <div>
                      <p className="text-sm font-black text-[var(--iic-text)]">
                        {item.season}
                      </p>
                      <p className="mt-1 text-xs text-[var(--iic-text-muted)]">
                        {item.date}
                      </p>
                    </div>
                    <span className="rounded-full border border-[#7A5AAA] bg-[rgba(122,90,170,0.16)] px-3 py-1 text-xs font-black text-white">
                      {item.rarity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {[
                ["pause", "일시정지", "다음 달 배송을 잠시 멈출까요? 결제도 함께 일시정지됩니다."],
                ["cancel", "취소", "구독을 취소할까요? 이미 발급된 SBT 이력은 유지됩니다."],
                ["change", "다른 향으로 변경", "다음 배송부터 새로운 향 프로파일로 다시 추천합니다."],
              ].map(([id, label, body]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setModal({ title: label, body })}
                  className="min-h-12 w-full rounded-full border border-[var(--iic-border)] px-4 py-3 text-sm font-black text-[var(--iic-text)] transition hover:border-[#7A5AAA] active:scale-95"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {modal ? (
        <div className="fixed inset-0 z-50 flex items-end bg-black/70 p-4 sm:items-center sm:justify-center">
          <div className="iic-fade w-full max-w-md rounded-3xl border border-[var(--iic-border)] bg-[var(--iic-card)] p-5 shadow-2xl shadow-black/70">
            <h3 className="text-2xl font-black">{modal.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--iic-text-muted)]">
              {modal.body}
            </p>
            <button
              type="button"
              onClick={() => setModal(null)}
              className="mt-5 min-h-12 w-full rounded-full bg-[var(--iic-gold)] px-5 py-3 text-sm font-black text-black transition hover:bg-[var(--iic-gold-light)] active:scale-95"
            >
              확인
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
