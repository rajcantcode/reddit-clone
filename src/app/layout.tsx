import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toast/Toaster";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
export const metadata = {
  title: "Dingit",
  description: "A Reddit clone built with Next.js and TypeScript.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter.className
      )}
    >
      <body className="min-h-screen pt-12 antialiased ">
        <Providers>
          {/* @ts-expect-error server component */}
          <Navbar />
          <div className="container h-full pt-12 mx-auto max-w-7xl">
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
