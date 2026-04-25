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
      { url: "/logo.png", sizes: "32x32" },
      { url: "/logo.png", sizes: "64x64" },
      { url: "/logo.png" },
    ],
    apple: { url: "/logo.png" },
    shortcut: "/logo.png",
  },
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
