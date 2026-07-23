import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "TubeMind AI — Transform YouTube into Interactive Learning Suites",
  description: "AI summaries, editable notes, flippable flashcards, interactive quizzes, dynamic SVG mind maps, social media thread builders, and real-time ChatGPT discussion workspaces for any YouTube video.",
  keywords: ["YouTube summarizer", "AI notes", "Active Recall", "Flashcards", "Mind Map creator", "Twitter thread generator", "TubeMind AI"],
  authors: [{ name: "TubeMind AI Team" }],
  manifest: "/manifest.json",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tubemind.ai",
    title: "TubeMind AI — Transform YouTube into Interactive Learning Suites",
    description: "Autogenerate summaries, interactive quizzes, zoomable mind maps, flippable flashcards, and ChatGPT-style workspaces for any YouTube video in seconds.",
    siteName: "TubeMind AI",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "TubeMind AI Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TubeMind AI — Transform YouTube into Interactive Learning Suites",
    description: "Transform YouTube videos into interactive notes, quizzes, mind maps, and live study chats instantly.",
    images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=630&q=80"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
