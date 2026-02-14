import HeroBanner from "../../../components/HeroBanner";
import ProductGrid from "../component/products/ProductGrid";
import { Flame, Sparkles, TrendingUp, Star } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-16 md:space-y-24">

      {/* HERO */}
      <HeroBanner />

      {/* BEST SELLERS */}
      <section className="px-4 md:px-8 lg:px-12">
        <SectionHeader
          slug="best-seller"
          icon={<Flame size={16} />}
          title="Best Sellers"
          subtitle="Most loved products by our customers"
        />
        <ProductGrid title="Best Sellers" slug="best-seller" />
      </section>

      {/* NEW LAUNCH */}
      <section className="px-4 md:px-8 lg:px-12">
        <SectionHeader
          slug="new-launch"
          icon={<Sparkles size={16} />}
          title="New Launch"
          subtitle="Fresh arrivals just for you"
        />
        <ProductGrid title="New Launch" slug="new-launch" />
      </section>

      {/* TRENDING */}
      <section className="px-4 md:px-8 lg:px-12">
        <SectionHeader
          slug="trending-now"
          icon={<TrendingUp size={16} />}
          title="Trending Now"
          subtitle="What everyone is buying right now"
        />
        <ProductGrid title="Trending Now" slug="trending-now" />
      </section>

      {/* RECOMMENDED */}
      <section className="px-4 md:px-8 lg:px-12">
        <SectionHeader
          slug="recommended"
          icon={<Star size={16} />}
          title="Recommended For You"
          subtitle="Handpicked based on popularity"
        />
        <ProductGrid title="Recommended For You" slug="recommended" />
      </section>

    </main>
  );
}

/* ---------------------------------- */
/* MODERN ECOMMERCE SECTION HEADER */
/* ---------------------------------- */

function SectionHeader({ icon, title, subtitle, slug }) {
  return (
    <div className="mb-8 md:mb-10">

      {/* Top Row */}
      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-3">

          {/* Minimal Brand Icon */}
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-50 text-orange-600">
            {icon}
          </div>

          {/* Title */}
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight text-gray-900">
            {title}
          </h2>

        </div>

        {/* View All Link */}
        <Link
          href={`/category/${slug}`}
          className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors duration-200"
        >
          View All →
        </Link>

      </div>

      {/* Subtitle + Divider */}
      <div className="flex items-center gap-4">

        <p className="text-sm text-gray-500 max-w-md leading-relaxed">
          {subtitle}
        </p>

        <div className="flex-1 h-px bg-gray-200" />

      </div>

    </div>
  );
}
