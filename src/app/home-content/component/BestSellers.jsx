import HeroBanner from "../../../components/HeroBanner";
import ProductGrid from "../component/products/ProductGrid";
import { Flame, Sparkles, TrendingUp, Star } from "lucide-react";
import CommonBanner from "../../comonBanner/CommonBanner";
import Link from "next/link";
import { Suspense } from "react";

/* Skeleton Component */
const banners = [
  {
    imageUrl: "https://backend.taxzone.store/wp/wp-content/uploads/2026/02/Gemini_Generated_Image_4c14s14c14s14c14.png",
    title: "Maruti Car Covers Collection",
    subtitle: "Custom-fit protection for Ertiga, Brezza, Ritz, S-Cross & Baleno",
    ctaText: "Shop Maruti Covers",
    ctaLink: "/category/maruti", // matches CSV category
  },
  {
    imageUrl: "https://backend.taxzone.store/wp/wp-content/uploads/2026/02/Gemini_Generated_Image_ufkpi7ufkpi7ufkp.png",
    title: "Hyundai Car Covers Collection",
    subtitle: "Weatherproof covers for i20, Creta & more",
    ctaText: "Shop Hyundai Covers",
    ctaLink: "/category/hyundai", // matches CSV category
  },
  {
    imageUrl: "https://backend.taxzone.store/wp/wp-content/uploads/2026/02/ChatGPT-Image-Feb-15-2026-04_00_04-PM.png",
    title: "Tata, Honda & Others",
    subtitle: "Covers for City, Nexon, Punch, XUV300 & Volkswagen Polo",
    ctaText: "Shop Other Brands",
    ctaLink: "/category/others", // could be a merged category for Tata/Honda/TVS/Mahindra/Volkswagen
  },
];


function ProductGridSkeleton() {

  return (
    <div
      className="
        no-scrollbar
        flex gap-4 overflow-x-auto px-4 pb-4
        md:grid md:grid-cols-4 lg:grid-cols-5 md:gap-6 md:overflow-visible md:px-0
      "
    >
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="
            min-w-[70%] sm:min-w-[45%] md:min-w-0
            bg-white border border-gray-100 rounded-xl
            flex flex-col animate-pulse
          "
        >
          <div className="w-full aspect-square bg-gray-200 rounded-t-xl" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>
          <div className="px-4 pb-4">
            <div className="h-9 bg-gray-200 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

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
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid title="Best Sellers" slug="best-seller" />
        </Suspense>
      </section>

      <CommonBanner {...banners[0]} />


      {/* NEW LAUNCH */}
      <section className="px-4 md:px-8 lg:px-12">
        <SectionHeader
          slug="new-launch"
          icon={<Sparkles size={16} />}
          title="New Launch"
          subtitle="Fresh arrivals just for you"
        />
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid title="New Launch" slug="new-launch" />
        </Suspense>
      </section>

      <CommonBanner {...banners[1]} />


      {/* TRENDING */}
      <section className="px-4 md:px-8 lg:px-12">
        <SectionHeader
          slug="trending-now"
          icon={<TrendingUp size={16} />}
          title="Trending Now"
          subtitle="What everyone is buying right now"
        />
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid title="Trending Now" slug="trending-now" />
        </Suspense>
      </section>

      <CommonBanner {...banners[2]} />


      {/* RECOMMENDED */}
      <section className="px-4 md:px-8 lg:px-12">
        <SectionHeader
          slug="recommended"
          icon={<Star size={16} />}
          title="Recommended For You"
          subtitle="Handpicked based on popularity"
        />
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid title="Recommended For You" slug="recommended" />
        </Suspense>
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

      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-3">

          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-50 text-orange-600">
            {icon}
          </div>

          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold tracking-tight text-gray-900">
            {title}
          </h2>

        </div>

        <Link
          href={`/category/${slug}`}
          className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors duration-200"
        >
          View All →
        </Link>

      </div>

      <div className="flex items-center gap-4">

        <p className="text-sm text-gray-500 max-w-md leading-relaxed">
          {subtitle}
        </p>

        <div className="flex-1 h-px bg-gray-200" />

      </div>

    </div>
  );
}
