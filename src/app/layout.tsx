import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Interface - Prototype v1.0",
  description: "A modern AI chat interface with multiple model support",
  keywords: ["AI", "Chat", "Interface", "GPT", "Claude", "Gemini"],
  authors: [{ name: "AI Interface Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full bg-white dark:bg-gray-900`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AppProvider>
            <div id="app-root" className="h-full">
              {children}
            </div>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

