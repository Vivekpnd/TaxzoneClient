import HeroBanner from "../../../components/HeroBanner"
import ProductGrid from "../component/products/ProductGrid";
import { Flame, Sparkles, TrendingUp, Star } from "lucide-react";

export default function HomePage() {
  return (
    <main className="space-y-20">
      {/* BEST SELLERS */}
      <HeroBanner />
      <section>
        <SectionHeader
          icon={<Flame className="text-orange-500" />}
          title="Best Sellers"
          subtitle="Most loved products by our customers"
        />
        <ProductGrid title="Best Sellers" slug="best-seller" />
      </section>

      {/* NEW LAUNCH */}
      <section>
        <SectionHeader
          icon={<Sparkles className="text-purple-500" />}
          title="New Launch"
          subtitle="Fresh arrivals just for you"
        />
        <ProductGrid title="New Launch" slug="new-launch" />
      </section>

      {/* TRENDING */}
      <section>
        <SectionHeader
          icon={<TrendingUp className="text-green-500" />}
          title="Trending Now"
          subtitle="What everyone is buying right now"
        />
        <ProductGrid title="Trending Now" slug="trending-now" />
      </section>

      {/* RECOMMENDED */}
      <section>
        <SectionHeader
          icon={<Star className="text-yellow-500" />}
          title="Recommended For You"
          subtitle="Handpicked based on popularity"
        />
        <ProductGrid title="Recommended For You" slug="recommended" />
      </section>
    </main>
  );
}

/* ---------------------------------- */
/* MODERN SECTION HEADER COMPONENT */
/* ---------------------------------- */

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div className="mb-8 px-1">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
          {icon}
        </div>

        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-500">{subtitle}</p>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
      </div>
    </div>
  );
}
