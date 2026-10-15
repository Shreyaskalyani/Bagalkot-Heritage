import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import LenisProvider from "@/components/navigation/LenisProvider";
import ScrollProgress from "@/components/cinematic/ScrollProgress";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata = {
  metadataBase: new URL("https://bagalkot-tourism.karnataka.gov.in"),
  title: {
    default: "Bagalkot Heritage Tourism | The Official Heritage Valley Guide",
    template: "%s | Bagalkot Heritage Tourism",
  },
  description:
    "Official tourism portal for Bagalkot district, Karnataka. Plan your journey to Badami Cave Temples, UNESCO Pattadakal, Aihole, and the Chalukyan heritage corridor with real-time visitor info, curated circuits, hotels, and travel guides.",
  openGraph: {
    title: "Bagalkot Heritage Tourism | Where Stone Tells Stories",
    description:
      "Official tourism portal for Bagalkot district, Karnataka. Plan your journey to Badami Cave Temples, UNESCO Pattadakal, Aihole, and the Chalukyan heritage corridor with real-time visitor info, curated circuits, hotels, and travel guides.",
    type: "website",
    locale: "en_IN",
    siteName: "Bagalkot Heritage Tourism",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#171512",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icons/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-charcoal-950 text-ivory antialiased">
        <LanguageProvider>
          <LenisProvider>
            <ScrollProgress />
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-4 focus:left-4 focus:rounded-full focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-charcoal-950"
            >
              Skip to content
            </a>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
            <MobileBottomNav />
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}