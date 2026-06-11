import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "苍何的博客 — CANGHE BLOG",
    template: "%s | 苍何的博客",
  },
  description: "分享技术、编程与生活。全栈开发、AI应用、Cloudflare部署实践。",
  keywords: ["博客", "技术", "编程", "Next.js", "Cloudflare", "AI", "全栈开发"],
  authors: [{ name: "苍何" }],
  creator: "苍何",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://canghe-blog.pages.dev",
    siteName: "苍何的博客",
    title: "苍何的博客 — CANGHE BLOG",
    description: "分享技术、编程与生活。全栈开发、AI应用、Cloudflare部署实践。",
  },
  twitter: {
    card: "summary_large_image",
    title: "苍何的博客",
    description: "分享技术、编程与生活。全栈开发、AI应用、Cloudflare部署实践。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
