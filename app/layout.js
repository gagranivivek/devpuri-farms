import { Lora, Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProductsProvider } from "@/context/ProductsContext";
import { LanguageProvider } from "@/context/LanguageContext";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
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
      <body className={`${lora.variable} ${raleway.variable}`} style={{ fontFamily: 'var(--font-raleway), sans-serif' }}>
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
