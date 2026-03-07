import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProductsProvider } from "@/context/ProductsContext";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Devpuri Farms | Sustainable Organic Farming",
  description: "Fresh, sustainable, and organic produce from our family to your table. Supporting local agriculture and regenerative farming practices.",
  keywords: "organic produce, sustainable farming, local vegetables, community supported agriculture, CSA",
  authors: [{ name: "Devpuri Farms" }],
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "Devpuri Farms | Sustainable Organic Farming",
    description: "Fresh, sustainable, and organic produce from our family to your table.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LanguageProvider>
          <ProductsProvider>
            <Navbar />
            {children}
            <Footer />
          </ProductsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
