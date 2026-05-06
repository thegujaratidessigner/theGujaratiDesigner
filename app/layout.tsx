import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import SmoothScroll from "./_components/SmoothScroll";
import ThemeProvider from "./_components/ThemeProvider";
import WhatsAppButton from "./_components/WhatsAppButton";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "The Gujarati Designer – Global Creative Design Studio",
  description:
    "A globally serving creative design studio headquartered in Ahmedabad. We specialise in logo design, branding, website development, and social media marketing.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await headers();

  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
