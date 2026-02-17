"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Truck, ShieldCheck, Users, Sparkles } from "lucide-react";
import Link from "next/link";

/* ================= COUNTER COMPONENT ================= */

function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = target / (duration / 36);
    let animationFrame;

    const updateCounter = () => {
      start += increment;

      if (start < target) {
        setCount(Math.floor(start));
        animationFrame = requestAnimationFrame(updateCounter);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ icon, target, suffix, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group bg-white border border-gray-200 
                 rounded-2xl p-6 md:p-8 text-center 
                 transition-all duration-300
                 hover:border-orange-500 
                 hover:shadow-xl hover:shadow-orange-100"
    >
      <div className="flex justify-center mb-4 text-orange-500 group-hover:scale-110 transition">
        {icon}
      </div>

      <h3 className="text-2xl md:text-3xl font-bold text-[#4B4B4B]">
        <AnimatedCounter target={target} suffix={suffix} />
      </h3>

      <p className="text-gray-500 mt-2 text-sm md:text-base">
        {label}
      </p>
    </motion.div>
  );
}

/* ================= MAIN SECTION ================= */

export default function AboutSection() {
  return (
    <section className="relative bg-white text-[#4B4B4B] py-20 md:py-28 px-5 md:px-10">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-gray-500">About</span>{" "}
            <span className="text-orange-500">TaxZone</span>
          </h2>

          <div className="mt-4 w-20 md:w-28 h-1 bg-orange-500 mx-auto rounded-full" />

          <p className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed">
            TaxZone is your trusted destination for premium automotive and
            lifestyle essentials delivered straight to your doorstep.
            We focus on speed, transparency, and secure shopping to give
            you a seamless online experience.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

          <StatCard
            icon={<Truck size={28} />}
            target={10000}
            suffix="+"
            label="Orders Delivered"
          />

          <StatCard
            icon={<Users size={28} />}
            target={5000}
            suffix="+"
            label="Happy Customers"
          />

          <StatCard
            icon={<ShieldCheck size={28} />}
            target={100}
            suffix="%"
            label="Secure Payments"
          />

          <StatCard
            icon={<Sparkles size={28} />}
            target={100}
            suffix="%"
            label="Quality Assured"
          />

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mt-16"
        >
          <Link href="/shop">
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold
                         px-6 md:px-8 py-3 rounded-xl 
                         transition-all duration-300
                         shadow-md hover:shadow-lg
                         hover:scale-105"
            >
              Explore Products
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
