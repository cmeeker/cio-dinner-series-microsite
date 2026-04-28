import Hero from "@/components/Hero";
import RegionAccordion from "@/components/RegionAccordion";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="pt-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-10">
          <div className="flex items-center gap-4">
            <span
              className="text-[10px] tracking-[0.28em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Select a market
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "var(--teal-line-dark)" }}
            />
          </div>
        </div>
        <RegionAccordion />
      </section>
      <Footer />
    </>
  );
}
