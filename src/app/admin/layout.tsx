import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理后台 - 苍何的博客",
  description: "博客管理后台，编辑文章、管理分类和SEO设置",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-gray-900">News Storm 管理后台</h1>
              <nav className="flex items-center gap-4 text-sm">
                <a href="/admin" className="text-gray-900 font-medium">文章管理</a>
                <a href="/admin/seo" className="text-gray-500 hover:text-gray-900">SEO 设置</a>
                <a href="/admin/sync" className="text-gray-500 hover:text-gray-900">Obsidian 同步</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" target="_blank" className="text-sm text-gray-500 hover:text-gray-900">
                查看站点 →
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
