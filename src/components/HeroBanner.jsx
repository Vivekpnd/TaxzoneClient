"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Premium Car Covers",
    subtitle: "Ultimate Protection",
    description:
      "Shield your vehicle from dust, rain, UV rays & scratches with our high-quality waterproof covers.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000",
    cta: "Shop Car Covers",
    href: "/shop",
  },
  {
    id: 2,
    title: "All Weather Protection",
    subtitle: "Built For Every Season",
    description:
      "Snow, rain or heat — our covers are engineered to protect your car year round.",
    image:
      "https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=2000",
    cta: "Explore Collection",
    href: "/shop",
  },
  {
    id: 3,
    title: "Custom Fit Designs",
    subtitle: "Perfect Fit Guaranteed",
    description:
      "Tailored covers designed for SUVs, sedans & luxury cars with breathable fabric technology.",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2000",
    cta: "View Best Sellers",
    href: "/shop",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] lg:h-screen overflow-hidden">

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-20" : "opacity-0 z-0"
          }`}
        >
          {/* Background */}
          <div
            className={`absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[7000ms] ${
              index === current ? "scale-110" : "scale-105"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

          {/* Content */}
          <div className="relative z-30 flex items-center h-full">
            <div className="max-w-7xl mx-auto px-6 w-full">

              <div className="max-w-2xl text-white animate-fadeInUp">

                <p className="uppercase tracking-widest text-sm md:text-base text-red-500 mb-4">
                  {slide.subtitle}
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
                  {slide.title}
                </h1>

                <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-300">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href={slide.href}
                    className="px-8 py-4 bg-red-600 hover:bg-red-700 transition rounded-full font-semibold text-center shadow-lg"
                  >
                    {slide.cta}
                  </Link>

                  <Link
                    href="/about"
                    className="px-8 py-4 border border-white/40 hover:bg-white hover:text-black transition rounded-full font-semibold text-center"
                  >
                    Learn More
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 backdrop-blur hover:bg-white/30 text-white transition"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 backdrop-blur hover:bg-white/30 text-white transition"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-40">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === current ? "bg-red-500 scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
