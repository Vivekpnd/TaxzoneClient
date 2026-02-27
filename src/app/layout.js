import "./globals.css";
import { Poppins } from "next/font/google";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.taxzone.store"),

  title: {
    default: "Taxzone Car Covers | Waterproof & Heavy Duty Car Covers India",
    template: "%s | Taxzone Car Covers",
  },

  description:
    "Taxzone Car Covers offers premium waterproof, dustproof and heavy-duty car covers across India. Protect your vehicle from sun, rain, scratches and pollution.",

  keywords: [
    "Taxzone",
    "Taxzone Car Covers",
    "Car Covers India",
    "Waterproof Car Cover",
    "Heavy Duty Car Cover",
    "Dustproof Car Cover",
  ],

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      {
        url: "https://backend.taxzone.store/wp/wp-content/uploads/2026/02/favicon-96x96-1.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    apple:
      "https://backend.taxzone.store/wp/wp-content/uploads/2026/02/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.taxzone.store",
    siteName: "Taxzone Car Covers",
    title: "Premium Waterproof & Heavy Duty Car Covers | Taxzone India",
    description:
      "Buy premium waterproof and dustproof car covers online in India. Fast delivery. Trusted protection by Taxzone.",
    images: [
      {
        url: "https://www.taxzone.store/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Taxzone Car Covers",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Taxzone Car Covers | Waterproof & Heavy Duty Protection",
    description:
      "Premium waterproof car covers for all vehicles in India. Shop now at Taxzone.",
    images: ["https://www.taxzone.store/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Brand Authority */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Taxzone Car Covers",
              alternateName: "Taxzone",
              url: "https://www.taxzone.store",
              logo: "https://www.taxzone.store/og-image.jpg",
              description:
                "Taxzone Car Covers is an Indian brand offering waterproof and heavy-duty car covers for all vehicle types.",
              sameAs: [
                "https://www.instagram.com/",
                "https://www.facebook.com/",
              ],
            }),
          }}
        />
      </head>

      <body className={poppins.className}>
        <div className="max-w-[1440px] mx-auto">
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}