import HeroBanner from "../../../components/HeroBanner";
import ProductGrid from "../component/products/ProductGrid";
import { Flame, Sparkles, TrendingUp, Star } from "lucide-react";
import CommonBanner from "../../comonBanner/CommonBanner";
import Link from "next/link";
import { Suspense } from "react";

const banners = [
  {
    imageUrl:
      "https://backend.taxzone.store/wp/wp-content/uploads/2026/02/pexels-deniss-bojanini-174298580-12161799-scaled.jpg",
    title: "Premium Car Covers Collection",
    subtitle:
      "All-weather protection designed to fit sedans, hatchbacks & SUVs perfectly.",
    ctaText: "Explore Car Covers",
    ctaLink: "/category/maruti",
  },
  {
    imageUrl:
      "https://backend.taxzone.store/wp/wp-content/uploads/2026/02/yellow-sport-car-with-black-autotuning-bridge-scaled.jpg",
    title: "All-Weather Protection Range",
    subtitle:
      "Shield your vehicle from sun, rain, dust & scratches with durable fabric technology.",
    ctaText: "Shop Now",
    ctaLink: "/category/hyundai",
  },
  {
    imageUrl:
      "https://backend.taxzone.store/wp/wp-content/uploads/2026/02/pexels-introspectivedsgn-29028112-scaled.jpg",
    title: "Universal Fit Car Covers",
    subtitle:
      "Premium quality covers crafted for long-lasting performance and everyday protection.",
    ctaText: "Discover Collection",
    ctaLink: "/category/others",
  },
];

function ProductGridSkeleton() {
  return (
    <div className="
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
    <main className="space-y-6 md:space-y-14">

      <HeroBanner />

      {/* BEST SELLERS */}
      <section className="px-4 md:px-8 lg:px-12 mt-0">
        <SectionHeader
          slug="best-seller"
          icon={<Flame size={16} />}
          title="Best Sellers"
          subtitle="Most loved products by our customers"
        />
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid slug="best-seller" categoryLabel="Best Seller" />
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
          <ProductGrid slug="new-launch" categoryLabel="New Launch" />
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
          <ProductGrid slug="trending-now" categoryLabel="Trending" />
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
          <ProductGrid slug="recommended" categoryLabel="Recommended" />
        </Suspense>
      </section>

    </main>
  );
}

/* SECTION HEADER remains unchanged */

function SectionHeader({ icon, title, subtitle, slug }) {
  return (
    <div className="mb-8 md:mb-10 mt-0">
      <div className="flex items-center justify-end mb-3">
      
        <Link
          href={`/category/${slug}`}
          className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors duration-200"
        >
          View All →
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-200" />
      </div>
    </div>
  );
}