"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Premium Car Covers",
    subtitle: "Ultimate Protection",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000",
    href: "/shop",
  },
  {
    id: 2,
    title: "All Weather Protection",
    subtitle: "Built For Every Season",
    image:
      "https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=2000",
    href: "/shop",
  },
  {
    id: 3,
    title: "Custom Fit Designs",
    subtitle: "Perfect Fit Guaranteed",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2000",
    href: "/shop",
  },
];

const brands = [
  { name: "Hyundai", image: "https://backend.taxzone.store/wp/wp-content/uploads/2026/02/hyundai.jpg", href: "/category/hyundai" },
  { name: "Maruti", image: "https://backend.taxzone.store/wp/wp-content/uploads/2026/02/maruti.jpg", href: "/category/maruti" },
  { name: "Tata", image: "https://backend.taxzone.store/wp/wp-content/uploads/2026/02/tata.webp", href: "/category/tata" },
  { name: "Mahindra", image: "https://backend.taxzone.store/wp/wp-content/uploads/2026/02/mahindra-scaled.png", href: "/category/mahindra" },
  { name: "Toyota", image: "https://backend.taxzone.store/wp/wp-content/uploads/2026/02/toyota.png", href: "/category/toyota" },
  { name: "Honda", image: "https://backend.taxzone.store/wp/wp-content/uploads/2026/02/honda.png", href: "/category/honda" },
  { name: "Kia", image: "https://backend.taxzone.store/wp/wp-content/uploads/2026/02/kia.webp", href: "/category/kia" },
  { name: "MG", image: "https://backend.taxzone.store/wp/wp-content/uploads/2026/02/mg-car-removebg-preview.png", href: "/category/mg" },
];



export default function HeroSection() {
  const [current, setCurrent] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [enableTransition, setEnableTransition] = useState(true);
  const intervalRef = useRef(null);
  const scrollerRef = useRef(null);


const duplicatedBrands = [...brands, ...brands];

  const extendedSlides = [
    slides[slides.length - 1],
    ...slides,
    slides[0],
  ];

  // Detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto Slide
  useEffect(() => {
    startAuto();
    return stopAuto;
  }, []);

  const startAuto = () => {
    stopAuto();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 4000);
  };

  const stopAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // REAL Infinite Loop Fix (No Jump)
  useEffect(() => {
    if (current === extendedSlides.length - 1) {
      setTimeout(() => {
        setEnableTransition(false);
        setCurrent(1);
      }, 700);
    }

    if (current === 0) {
      setTimeout(() => {
        setEnableTransition(false);
        setCurrent(slides.length);
      }, 700);
    }
  }, [current]);

  // Re-enable transition after reset
  useEffect(() => {
    if (!enableTransition) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
        });
      });
    }
  }, [enableTransition]);

  return (
    <section className="w-full  py-8 pb-0">
      <div className="max-w-7xl mx-auto px-4">

        {/* HERO */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
        >
          <div
            className={`flex ${enableTransition
                ? "transition-transform duration-700 ease-in-out"
                : ""
              }`}
            style={{
              transform: `translateX(-${current * (isMobile ? 100 : 80)}%)`,
            }}
          >
            {extendedSlides.map((slide, index) => (
              <div
                key={index}
                className="flex-none w-full md:w-[80%] h-[50vh] md:pr-6"
              >
                <div className="h-full rounded-3xl overflow-hidden shadow-lg relative bg-white">

                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

                  <div className="absolute bottom-8 left-6 md:left-10 text-white">
                    <p className="text-xs md:text-sm uppercase tracking-wide text-orange-400">
                      {slide.subtitle}
                    </p>
                    <h2 className="text-lg md:text-4xl font-bold mt-2">
                      {slide.title}
                    </h2>
                    <Link
                      href={slide.href}
                      className="inline-block mt-4 px-6 py-3 bg-orange-600 hover:bg-orange-700 transition rounded-full text-sm font-semibold"
                    >
                      Shop Now
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Arrows Desktop Only */}
          <button
            onClick={() => setCurrent((prev) => prev - 1)}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:scale-105 transition"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => setCurrent((prev) => prev + 1)}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:scale-105 transition"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index + 1)}
                className={`h-2 rounded-full transition-all duration-300 ${current === index + 1
                    ? "w-8 bg-orange-600"
                    : "w-2 bg-gray-400"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* CATEGORY SECTION */}
        <section className="relative py-8  overflow-hidden bg-transparent rounded-[32px] overflow-hidden">

          <h3 className="text-xl md:text-2xl font-semibold text-center mb-12">
            Shop By Car Brand
          </h3>

         

          {/* Scrolling Track */}
          <div className="relative w-full overflow-hidden  py-[5px] px-[4px] rounded-[12px]">
            <div
              ref={scrollerRef}
              className="flex gap-10 animate-scroll whitespace-nowrap"
            >
              {duplicatedBrands.map((brand, index) => (
                <Link
                  key={index}
                  href={brand.href}
                  className="flex flex-col items-center group min-w-[100px]"
                >
                  {/* Card */}
                  <div className="bg-[#fdfdfd] backdrop-blur-md p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex justify-center items-center w-24 h-20">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="h-8 object-contain group-hover:scale-110 transition duration-300"
                    />
                  </div>

                  <span className="text-xs mt-3 text-gray-600 group-hover:text-black transition">
                    {brand.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Animation CSS */}
          <style jsx>{`
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
        </section>

      </div>
    </section>
  );
}
