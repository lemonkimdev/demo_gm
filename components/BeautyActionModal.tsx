"use client";

type BeautyActionModalProps = {
  eyebrow?: string;
  title: string;
  message: string;
  onClose: () => void;
};

export default function BeautyActionModal({
  eyebrow = "Beauty Concierge",
  title,
  message,
  onClose,
}: BeautyActionModalProps) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-sm rounded-md bg-[#fbf7ef] p-6 text-neutral-950 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-semibold">{title}</h2>
        <p className="mt-4 text-sm leading-6 text-neutral-700">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 flex h-12 w-full items-center justify-center rounded-md bg-neutral-950 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          확인
        </button>
      </div>
    </div>
  );
}
