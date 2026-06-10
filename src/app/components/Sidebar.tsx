import Link from "next/link";
import type { Post, TagCount } from "@/lib/types";

function readingTime(content: string): number {
  const chars = content.replace(/[#*`\[\]()>|\-\s]/g, "").length;
  return Math.max(1, Math.ceil(chars / 400));
}

export default function Sidebar({
  posts,
  tags,
}: {
  posts: Post[];
  tags: TagCount[];
}) {
  const recent = posts.slice(0, 4);

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-5">
      {/* Profile */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 text-center">
        <div className="relative mx-auto w-20 h-20 mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-indigo-200 dark:shadow-indigo-900/30">
            苍
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-0.5">
          苍何
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          全栈开发者 · AI 探索者
        </p>
      </div>

      {/* Stats */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          统计
        </h3>
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">文章总数</span>
            <span className="font-bold text-gray-900 dark:text-white text-lg">{posts.length}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 dark:text-gray-400">标签数</span>
            <span className="font-bold text-gray-900 dark:text-white text-lg">{tags.length}</span>
          </div>
        </div>
      </div>

      {/* Tags cloud */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          标签
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Link
              key={tag.name}
              href={`/?tag=${encodeURIComponent(tag.name)}`}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent posts */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          最近文章
        </h3>
        <div className="space-y-3">
          {recent.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="block group"
            >
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h4>
              <span className="text-xs text-gray-400 dark:text-gray-600 mt-0.5 block">
                {readingTime(post.content)} 分钟
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
