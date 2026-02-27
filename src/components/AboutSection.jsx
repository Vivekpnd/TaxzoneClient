"use client";

import { useRef, useEffect, useState } from "react";
import {
  FaFire,
  FaTint,
  FaSun,
  FaGem,
  FaTruck,
  FaUsers,
  FaLock,
  FaHeadset,
} from "react-icons/fa";

/* ================= CARD ================= */

function ZigZagCard({ Icon, title, description, index }) {
  const isTop = index % 2 === 0;

  return (
    <div
      className={`
        relative flex-shrink-0
        w-full sm:w-[320px] lg:w-[340px]
        flex flex-col items-center
        lg:${isTop ? "-translate-y-16" : "translate-y-16"}
        transition-transform duration-500
      `}
    >
      {/* Desktop Connector Node */}
      <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-purple-500 border-4 border-white shadow-md z-10" />

      <div className="mt-10 lg:mt-16 bg-white rounded-2xl shadow-xl p-6 text-center hover:-translate-y-2 transition-all duration-300">
        <div className="flex justify-center mb-3 text-purple-500">
          <Icon className="text-4xl lg:text-5xl" />
        </div>

        <h3 className="text-lg font-semibold mb-2">{title}</h3>

        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

/* ================= MAIN SECTION ================= */

export default function ZigZagSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  /* Detect screen size */
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  /* Calculate horizontal width (Desktop only) */
  useEffect(() => {
    if (!isDesktop) return;

    const updateWidth = () => {
      if (!containerRef.current) return;

      const total =
        containerRef.current.scrollWidth - window.innerWidth;

      setScrollWidth(total > 0 ? total : 0);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [isDesktop]);

  /* Horizontal Scroll Animation */
  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      if (!sectionRef.current || !containerRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const scrollY = window.scrollY;
      const offset = scrollY - sectionTop;

      if (offset >= 0 && offset <= scrollWidth) {
        containerRef.current.style.transform =
          `translateX(-${offset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollWidth, isDesktop]);

  const cards = [
    { title: "Heat Resistant", Icon: FaFire },
    { title: "Waterproof Layer", Icon: FaTint },
    { title: "UV Protection", Icon: FaSun },
    { title: "Premium Fabric", Icon: FaGem },
    { title: "Fast Delivery", Icon: FaTruck },
    { title: "Trusted by 5000+", Icon: FaUsers },
    { title: "Secure Payments", Icon: FaLock },
    { title: "Customer Support", Icon: FaHeadset },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        height: isDesktop
          ? scrollWidth + window.innerHeight
          : "auto",
      }}
      className="relative bg-gray-50 max-w-[1440px] mx-auto py-16"
    >
      {/* ================= HEADING ================= */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Why Choose Us
        </h2>
        <p className="mt-3 text-gray-500 text-sm sm:text-base">
          Built for durability, designed for performance.
        </p>
      </div>

      {/* ================= ANIMATION AREA ================= */}

      <div
        className={` max-[768px]:pb-[20px]
          ${isDesktop ? "sticky top-0 h-screen" : ""}
          flex items-center
          overflow-hidden
        `}
      >
        {/* Desktop Connector Line */}
        {isDesktop && (
          <svg
            className="absolute w-full h-full pointer-events-none hidden lg:block"
            viewBox="0 0 2000 600"
            preserveAspectRatio="none"
          >
            <path
              d="M0 300 Q250 100 500 300 T1000 300 T1500 300 T2000 300"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="3"
              strokeDasharray="12 8"
            />
          </svg>
        )}

        <div
          ref={containerRef}
          className={`
            flex 
            ${isDesktop ? "flex-row gap-32 px-[40vw]" : "flex-col gap-10 px-6"}
            items-center
            transition-transform duration-75 ease-linear  !pb-[20px]
          `}
        >
          {cards.map((card, i) => (
            <ZigZagCard
              key={i}
              index={i}
              title={card.title}
              description="Premium protection engineered for extreme conditions."
              Icon={card.Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}