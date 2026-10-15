import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SandParticles from "@/components/SandParticles";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dlalas General Dealer",
  description: "Everything you need, all in one place. Browse our products and send your order request online.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SandParticles />
        <div className="relative z-[1]">{children}</div>
      </body>
    </html>
  );
}
