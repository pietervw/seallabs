import type { Metadata, Viewport } from "next";
import { Orbitron, Share_Tech_Mono } from "next/font/google";
import Script from "next/script";

import {
  GA_MEASUREMENT_ID,
  SITE_DESCRIPTION,
  SITE_LEGAL_NAME,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  UMAMI_SRC,
  UMAMI_WEBSITE_ID,
  absoluteUrl,
} from "@/lib/config";

import "./globals.css";

const display = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

const mono = Share_Tech_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: "400",
});

const ogImage = {
  url: absoluteUrl("/opengraph-image"),
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — software systems`,
};

export const viewport: Viewport = {
  themeColor: "#05080c",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Software systems`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_LEGAL_NAME,
  keywords: [
    "Seal Labs",
    "software studio",
    "SaaS",
    "Next.js",
    "identity verification",
    "applicant tracking",
    "field audit",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Software systems`,
    description: SITE_DESCRIPTION,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Software systems`,
    description: SITE_DESCRIPTION,
    images: [ogImage.url],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" className={`${display.variable} ${mono.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <footer className="border-t border-slate-700 bg-[#05080c] px-6 py-6 text-center text-sm text-slate-400">
          <a className="underline underline-offset-4 hover:text-white" href="/sirens-emulator/privacy-policy">
            Sirens Emulator Privacy Policy
          </a>
        </footer>
        {UMAMI_SRC && UMAMI_WEBSITE_ID ? (
          <Script
            src={UMAMI_SRC}
            data-website-id={UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        ) : null}
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
