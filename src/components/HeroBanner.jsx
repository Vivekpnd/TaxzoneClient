"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Premium Auto Parts",
    subtitle: "Performance you can trust",
    description: "Explore high-quality engine parts and accessories.",
    image:
      "https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=2000",
    cta: "Shop Now",
    href: "/shop",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Latest upgrades",
    description: "Discover newly launched automotive components.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000",
    cta: "Explore",
    href: "/shop",
  },
  {
    id: 3,
    title: "Best Sellers",
    subtitle: "Customer favorites",
    description: "Top-rated products loved by professionals.",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2000",
    cta: "View Collection",
    href: "/shop",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  // 🔁 Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* SLIDES */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* BACKGROUND IMAGE */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/50" />

          {/* CONTENT */}
          <div className="relative z-20 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 text-white">
              <p className="text-sm md:text-base uppercase tracking-widest mb-3 opacity-80">
                {slide.subtitle}
              </p>

              <h1 className="text-4xl md:text-6xl font-bold max-w-2xl leading-tight">
                {slide.title}
              </h1>

              <p className="mt-4 max-w-xl text-base md:text-lg opacity-90">
                {slide.description}
              </p>

              <Link
                href={slide.href}
                className="inline-block mt-8 px-8 py-4 bg-red-600 hover:bg-red-700 transition rounded-full font-semibold"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* NAV BUTTONS */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition"
      >
        <ChevronRight size={28} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === current ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
