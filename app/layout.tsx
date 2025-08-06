import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import GoogleAnalytics from "@/components/google-analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "gpt-oss: Explore OpenAI's Open-Weight Language Models",
  description: "Dive into the world of open-weight AI with the gpt-oss playground. Experiment with OpenAI's gpt-oss-120b and gpt-oss-20b models, explore fine-tuning, and build your own applications with this powerful open-source technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GoogleAnalytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
