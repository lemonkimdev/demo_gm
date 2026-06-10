import type { BeautyAnalysis } from "@/lib/beauty-demo-data";

type BeautyAnalysisCardProps = {
  analysis: BeautyAnalysis;
  theme: "dark" | "light";
};

function BulletList({
  items,
  theme,
}: {
  items: string[];
  theme: "dark" | "light";
}) {
  const isDark = theme === "dark";

  return (
    <ul
      className={`mt-3 space-y-2 text-sm leading-6 ${
        isDark ? "text-neutral-200" : "text-neutral-700"
      }`}
    >
      {items.map((item) => (
        <li
          key={item}
          className={`rounded-md px-3 py-2 ${
            isDark ? "bg-white/10" : "bg-white/70"
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function BeautyAnalysisCard({
  analysis,
  theme,
}: BeautyAnalysisCardProps) {
  const isDark = theme === "dark";

  return (
    <section
      className={`rounded-md border p-5 ${
        isDark
          ? "border-white/10 bg-white/[0.04] text-[#fbf7ef]"
          : "border-neutral-200 bg-[#fbf7ef] text-neutral-950"
      }`}
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Detected Vanity
          </p>
          <h2 className="mt-2 text-2xl font-semibold">소유제품 현황</h2>
        </div>
        <p className="text-right text-3xl font-semibold">
          {analysis.detectedProductCount}
          <span className="ml-1 text-sm font-medium text-neutral-500">개</span>
        </p>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {analysis.categories.map((category) => (
          <div
            key={category.name}
            className={`rounded-md p-3 ${
              isDark ? "bg-[#fbf7ef] text-neutral-950" : "bg-neutral-950 text-white"
            }`}
          >
            <p className={`text-xs ${isDark ? "text-neutral-600" : "text-neutral-400"}`}>
              {category.name}
            </p>
            <p className="mt-1 text-xl font-semibold">{category.count}개</p>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-5">
        <div>
          <h3 className="text-sm font-semibold">브랜드 조합</h3>
          <BulletList items={analysis.brandMix} theme={theme} />
        </div>

        <div>
          <h3 className="text-sm font-semibold">소비 성향</h3>
          <BulletList items={analysis.consumptionTraits} theme={theme} />
        </div>

        <div>
          <h3 className="text-sm font-semibold">전체 취향</h3>
          <div className="mt-3 space-y-3">
            {analysis.tasteProfile.map((taste) => (
              <div key={taste.note}>
                <div className="flex items-center justify-between text-sm">
                  <span>{taste.note}</span>
                  <span className="font-semibold">{taste.percent}%</span>
                </div>
                <div
                  className={`mt-1 h-2 overflow-hidden rounded-full ${
                    isDark ? "bg-white/15" : "bg-neutral-200"
                  }`}
                >
                  <div
                    className={`h-full rounded-full ${
                      isDark ? "bg-[#fbf7ef]" : "bg-neutral-950"
                    }`}
                    style={{ width: `${taste.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">소진 예상</h3>
          <div className="mt-3 space-y-2">
            {analysis.depletionForecast.map((item) => (
              <p
                key={item.category}
                className={`rounded-md border px-3 py-2 text-sm ${
                  isDark
                    ? "border-white/10 bg-white/10 text-neutral-200"
                    : "border-neutral-200 bg-white/70 text-neutral-700"
                }`}
              >
                <span
                  className={`font-semibold ${
                    isDark ? "text-[#fbf7ef]" : "text-neutral-950"
                  }`}
                >
                  {item.category}
                </span>
                : {item.forecast}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
