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
  title: "AI Chat Bot - Prototype v1.0",
  description: "A modern AI chat Chat Bot with multiple model support",
  keywords: ["AI", "Chat", "Chat Bot", "GPT", "Claude", "Gemini"],
  authors: [{ name: "AI Chat Bot Team" }],
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

