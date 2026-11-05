import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/* FONT CONFIGURATION */
// Initializes the Inter font for the Latin alphabet.
const inter = Inter({ subsets: ["latin"] });

/* SEO METADATA */
// Next.js reads this object to generate the <title> and <meta> tags in the document head.
export const metadata: Metadata = {
  title: "Coffee Shop",
  description: "Boutique coffee shop in Paris",
};

/* ROOT LAYOUT COMPONENT */
// This HTML wrapper persists across all pages in your app.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Adding className="dark" here tells Tailwind and shadcn to activate dark mode globally.
    <html lang="en" className="dark">
      {/* bg-background and text-foreground use the dynamic variables defined in your globals.css */}
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
