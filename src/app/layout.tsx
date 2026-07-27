import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seal Labs",
  description: "Seal Labs",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://seallabs.io",
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="border-t border-slate-200 bg-white px-6 py-6 text-center text-sm text-slate-500">
          <a className="underline underline-offset-4 hover:text-slate-900" href="/sirens-emulator/privacy-policy">
            Privacy Policy
          </a>
        </footer>
      </body>
    </html>
  );
}
