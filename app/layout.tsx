import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "next-themes";
import { SearchProvider } from "./context/SearchContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TCG Pocket Database",
  description: "Database of TCG Pocket card game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 1) Do NOT set class/style on <html>. Add suppressHydrationWarning.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 2) Pre-set theme class before React hydrates */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function () {
              try {
                var saved = localStorage.getItem('theme'); // 'light' | 'dark' | null
                var theme = saved || 'light';              // your default
                var root = document.documentElement;
                root.classList.remove('light','dark');
                root.classList.add(theme);
                root.style.colorScheme = theme;
              } catch (e) {}
            })();
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}
      >
        <SearchProvider>
          {/* 3) Let next-themes manage the class after mount */}
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
          >
            <Header />
            <main className="flex-1 p-2">{children}</main>
            <Footer />
          </ThemeProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
