import Hero from "@/components/Hero";
import RegionAccordion from "@/components/RegionAccordion";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="markets" className="pt-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p
                className="text-[11px] tracking-[0.22em] uppercase mb-1.5"
                style={{ color: "var(--teal)" }}
              >
                Browse by city
              </p>
              <h2
                className="font-semibold leading-tight"
                style={{ color: "var(--text)", fontSize: "24px" }}
              >
                Select a market
              </h2>
            </div>
            <div
              className="flex-1 h-px mb-1.5"
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
