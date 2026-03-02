import type { Metadata, Viewport } from "next";
import { DM_Sans, DM_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["400", "500"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Build Your Workspace | monis.rent",
  description:
    "Design your dream workspace in Bali. Pick a desk, chair, monitors & accessories — see your setup come to life, then rent it all with free delivery.",
  keywords: [
    "office rental",
    "bali workspace",
    "desk rental",
    "digital nomad",
    "remote work equipment",
    "monis.rent",
  ],
  openGraph: {
    title: "Build Your Dream Workspace | monis.rent",
    description:
      "Visual workspace builder for digital nomads in Bali. Design, preview, and rent your perfect office setup.",
    type: "website",
    locale: "en_US",
    siteName: "monis.rent",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Your Dream Workspace | monis.rent",
    description:
      "Visual workspace builder for digital nomads in Bali.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F5F0E8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmMono.variable} ${fraunces.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
