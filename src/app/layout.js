import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://www.taxzone.store"),
  title: {
    default:
      "Taxzone Car Covers | Waterproof & Heavy Duty Car Covers India",
    template: "%s | Taxzone Car Covers",
  },
  description:
    "Buy premium waterproof, dustproof and heavy-duty car covers online in India. Protect your car from sun, rain, dust and scratches with Taxzone Car Covers.",
  keywords: [
    "Car covers India",
    "Waterproof car cover",
    "Dustproof car cover",
    "Heavy duty car cover",
    "Buy car cover online",
    "Car body cover India",
    "Taxzone car covers",
  ],
  authors: [{ name: "Taxzone" }],
  creator: "Taxzone",
  publisher: "Taxzone",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.taxzone.store",
    siteName: "Taxzone Car Covers",
    title:
      "Premium Waterproof & Heavy Duty Car Covers | Taxzone India",
    description:
      "Shop high-quality waterproof and dustproof car covers for all car models in India. Fast delivery and premium protection.",
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
    title:
      "Buy Premium Car Covers Online | Taxzone India",
    description:
      "Waterproof, dustproof and heavy-duty car covers for all vehicles across India.",
    images: ["https://www.taxzone.store/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
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
      <body
        className={`${inter.variable} antialiased max-w-[1440px] mx-auto`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
