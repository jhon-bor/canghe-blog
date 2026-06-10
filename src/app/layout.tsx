import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "苍何的博客 — CANGHE BLOG",
    template: "%s — 苍何的博客",
  },
  description:
    "分享技术、编程与生活。全栈开发、AI应用、Cloudflare部署实践。",
  keywords: ["博客", "技术", "编程", "全栈", "AI", "Next.js", "Cloudflare"],
  authors: [{ name: "苍何" }],
  openGraph: {
    title: "苍何的博客",
    description: "分享技术、编程与生活。全栈开发、AI应用实践。",
    type: "website",
    locale: "zh_CN",
    siteName: "苍何的博客",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors"
            >
              苍何的博客
            </Link>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-900 transition-colors">
                首页
              </Link>
              <Link
                href="/archive"
                className="hover:text-gray-900 transition-colors"
              >
                归档
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} 苍何的博客. Built with Next.js
                &amp; Cloudflare.
              </div>
              <div className="flex gap-6 text-sm text-gray-400">
                <Link href="/" className="hover:text-gray-600 transition-colors">
                  首页
                </Link>
                <Link
                  href="/archive"
                  className="hover:text-gray-600 transition-colors"
                >
                  归档
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
