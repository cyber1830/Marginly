import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://marginly.example"),
  title: "Marginly — Direct orders, better margins",
  description:
    "Marginly helps restaurants build profitable direct orders in 7 days.",
  keywords: [
    "direct online ordering for restaurants",
    "reduce delivery platform commission",
    "restaurant margin intelligence",
  ],
  openGraph: {
    title: "Marginly — Direct orders, better margins",
    description:
      "Build a direct-order channel around the restaurant you already run.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Marginly",
    url: "https://marginly.example",
    description: "Direct-order operating system for restaurants.",
  };
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
