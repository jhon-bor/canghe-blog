import Link from "next/link";
import type { Post, TagCount } from "@/lib/types";

function readingTime(content: string): number {
  const words = content.replace(/[#*`\[\]()>|-]/g, "").length;
  return Math.max(1, Math.ceil(words / 400));
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
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
      {/* Profile */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 shadow-lg shadow-primary-200 dark:shadow-none">
          苍
        </div>
        <h3 className="text-center font-semibold text-gray-900 dark:text-white mb-1">
          苍何
        </h3>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          全栈开发者 · AI 探索者
        </p>
      </div>

      {/* Stats */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
          统计
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-500 dark:text-gray-400">
            <span>文章总数</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {posts.length}
            </span>
          </div>
          <div className="flex justify-between text-gray-500 dark:text-gray-400">
            <span>标签数</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {tags.length}
            </span>
          </div>
        </div>
      </div>

      {/* Tags cloud */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
          标签
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Link
              key={tag.name}
              href={`/?tag=${encodeURIComponent(tag.name)}`}
              className="px-2.5 py-1 rounded-lg text-xs bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent posts */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">
          最近文章
        </h3>
        <div className="space-y-3">
          {recent.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="block group"
            >
              <h4 className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h4>
              <span className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 block">
                {readingTime(post.content)} 分钟阅读
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
