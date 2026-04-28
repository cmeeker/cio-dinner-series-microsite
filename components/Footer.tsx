import WorkatoLogo from "./WorkatoLogo";

export default function Footer() {
  return (
    <footer
      className="mt-auto px-6 lg:px-12 py-8 flex flex-wrap items-center justify-between gap-4"
      style={{ borderTop: "1px solid var(--teal-line-dark)" }}
    >
      <div className="flex items-center gap-3">
        <WorkatoLogo className="w-6 h-6" />
        <span
          className="text-[12px] tracking-[0.06em]"
          style={{ color: "var(--text-muted)" }}
        >
          Workato · CIO Dinner Series · North America
        </span>
      </div>
      <span
        className="text-[11px] tracking-[0.08em]"
        style={{ color: "rgba(255,255,255,0.18)" }}
      >
        By invitation only · May 2026 – January 2027
      </span>
    </footer>
  );
}
