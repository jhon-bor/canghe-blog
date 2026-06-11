import { getAllPosts } from "@/lib/data";
import GitHubPostList from "./components/GitHubPostList";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-gray-900">News Storm</h1>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-sm font-medium text-gray-900">首页</Link>
                <Link href="/posts" className="text-sm font-medium text-gray-500 hover:text-gray-900">文章</Link>
                <Link href="/about" className="text-sm font-medium text-gray-500 hover:text-gray-900">关于</Link>
                <Link href="/admin" className="text-sm font-medium text-gray-500 hover:text-gray-900">管理</Link>
                <Link href="/archive" className="text-sm font-medium text-gray-500 hover:text-gray-900">最新</Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700">
                订阅
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              欢迎访问 News Storm 博客平台
            </h2>
            <p className="text-lg text-gray-300">
              - 这里有最新最热的技术文章和生活分享 -
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Content */}
          <div className="flex-1 space-y-12">
            {/* Today's Focus */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="section-title">今日焦点</h3>
                <Link href="/posts" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  查看全部 →
                </Link>
              </div>
            </section>

            {/* Editor's Picks */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="section-title">编辑精选</h3>
                <Link href="/posts" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  查看全部 →
                </Link>
              </div>
            </section>

            {/* Latest Articles */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="section-title">最新文章</h3>
                <Link href="/posts" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  查看全部 →
                </Link>
              </div>
              <GitHubPostList localPosts={posts} />
            </section>

            {/* Popular Articles */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="section-title">热门文章</h3>
                <Link href="/posts" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  查看全部 →
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80 space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📁 分类</h3>
              <div className="text-sm text-gray-500">加载中...</div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🏷️ 热门标签</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full">#技术</span>
                <span className="px-3 py-1 text-sm bg-emerald-50 text-emerald-600 rounded-full">#产品</span>
                <span className="px-3 py-1 text-sm bg-amber-50 text-amber-600 rounded-full">#生活</span>
                <span className="px-3 py-1 text-sm bg-purple-50 text-purple-600 rounded-full">#资讯</span>
                <span className="px-3 py-1 text-sm bg-rose-50 text-rose-600 rounded-full">#教程</span>
                <span className="px-3 py-1 text-sm bg-cyan-50 text-cyan-600 rounded-full">#AI</span>
                <span className="px-3 py-1 text-sm bg-orange-50 text-orange-600 rounded-full">#Web</span>
                <span className="px-3 py-1 text-sm bg-pink-50 text-pink-600 rounded-full">#移动</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-sm p-6 text-white">
              <h3 className="text-lg font-bold mb-2">📧 订阅更新</h3>
              <p className="text-sm text-blue-100 mb-4">订阅我们的 newsletter，获取最新文章推送</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="输入你的邮箱"
                  className="flex-1 px-3 py-2 rounded-lg text-gray-900 text-sm placeholder-gray-400"
                />
                <button className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50">
                  立即订阅
                </button>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">关于我们</h3>
              <p className="text-sm text-gray-600 mb-4">
                News Storm 是一个现代化的博客平台，分享技术干货、产品思考和生活感悟。
              </p>
              <div className="flex gap-3">
                <span className="text-xl">📘</span>
                <span className="text-xl">🐦</span>
                <span className="text-xl">📧</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">快速链接</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white">首页</Link></li>
                <li><Link href="/posts" className="hover:text-white">全部文章</Link></li>
                <li><Link href="/about" className="hover:text-white">关于我们</Link></li>
                <li><Link href="/admin" className="hover:text-white">管理后台</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">分类</h4>
              <ul className="space-y-2 text-sm">
                <li>技术教程</li>
                <li>产品思考</li>
                <li>生活感悟</li>
                <li>行业资讯</li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-white font-semibold mb-4">📧 订阅更新</h4>
              <p className="text-sm mb-4">订阅我们的 newsletter，获取最新文章推送</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="输入你的邮箱"
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 text-sm placeholder-gray-400"
                />
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
                  立即订阅
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            © 2026 News Storm. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
