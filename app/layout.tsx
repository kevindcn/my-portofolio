import type { Metadata } from "next";
import { Barlow, Heebo } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["400", "500", "600", "700"],
});

const heebo = Heebo({
  subsets: ["latin"],
  variable: "--font-heebo",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kevin Daniel — UI/UX Designer",
  description:
    "Portfolio of Kevin Daniel, a UI/UX Designer focused on crafting intuitive, polished, and standard-compliant digital experiences.",
  metadataBase: new URL("https://example.com"),
  icons: {
    icon: "/projects/logo-kevin.png",
    shortcut: "/projects/logo-kevin.png",
    apple: "/projects/logo-kevin.png",
  },
  openGraph: {
    title: "Kevin Daniel — UI/UX Designer",
    description:
      "Portfolio of Kevin Daniel, a UI/UX Designer focused on crafting intuitive, polished, and standard-compliant digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${barlow.variable} ${heebo.variable} font-body bg-ink text-ice antialiased`}
      >
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
