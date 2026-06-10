"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { Post, TagCount } from "@/lib/types";

const TAG_COLORS: Record<string, string> = {
  "AI": "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  "前端": "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  "教程": "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  "Cloudflare": "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800",
  "TypeScript": "bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 border-sky-200 dark:border-sky-800",
  "Next.js": "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700",
  "React": "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
  "部署": "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  "微信": "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800",
  "编程": "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-800",
  "随笔": "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border-teal-200 dark:border-teal-800",
  "公告": "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800",
};

function tagStyle(tag: string): string {
  return TAG_COLORS[tag] || "bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700";
}

function readingTime(content: string): number {
  const chars = content.replace(/[#*`\[\]()>|\-\s]/g, "").length;
  return Math.max(1, Math.ceil(chars / 400));
}

export default function PostList({
  posts,
  tags,
}: {
  posts: Post[];
  tags: TagCount[];
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSelectedTag(params.get("tag"));
    setMounted(true);
  }, []);

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (selectedTag) {
      result = result.filter((p) => p.tags.includes(selectedTag));
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [posts, selectedTag, search]);

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
    if (tag) {
      router.push(`/?tag=${encodeURIComponent(tag)}`, { scroll: false });
    } else {
      router.push("/", { scroll: false });
    }
  };

  // Always render content; during SSR/hydration, show all posts (no filtering)
  const displayPosts = mounted ? filteredPosts : posts;

  return (
    <div>
      {/* Search + Tag filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 dark:text-gray-600"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="搜索文章..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 dark:focus:border-indigo-600 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => handleTagClick(null)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              !selectedTag
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
                : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            全部
          </button>
          {tags.map((tag) => (
            <button
              key={tag.name}
              onClick={() => handleTagClick(tag.name)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all ${
                selectedTag === tag.name
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
                  : `${tagStyle(tag.name)} border hover:shadow-sm`
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {!mounted && (
        <>
          <p className="text-xs text-gray-400 dark:text-gray-600 mb-6">
            共 {posts.length} 篇文章
          </p>
          <div className="space-y-5">
            {posts.map((post, i) => (
              <article key={post.id} style={{ animationDelay: `${i * 0.1}s` }}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="block group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg hover:shadow-gray-100 dark:hover:shadow-gray-900/50 transition-all duration-300"
                >
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className={`px-2.5 py-0.5 rounded-md text-xs font-medium border ${tagStyle(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-600">
                    <time>{format(new Date(post.createdAt), "yyyy 年 M 月 d 日", { locale: zhCN })}</time>
                    <span>·</span>
                    <span>{readingTime(post.content)} 分钟阅读</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 dark:text-indigo-400 font-medium">
                      阅读 →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </>
      )}

      {mounted && filteredPosts.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-400 dark:text-gray-500 text-lg mb-2">
            {search ? `没有找到包含 "${search}" 的文章` : "该标签下暂无文章"}
          </p>
          <button
            onClick={() => { setSearch(""); handleTagClick(null); }}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors text-sm font-medium"
          >
            ← 查看全部文章
          </button>
        </div>
      )}

      {mounted && filteredPosts.length > 0 && (
        <>
          <p className="text-xs text-gray-400 dark:text-gray-600 mb-6">
            共 {filteredPosts.length} 篇文章
            {search && ` 匹配 "${search}"`}
            {selectedTag && ` · ${selectedTag}`}
          </p>
          <div className="space-y-5">
            {filteredPosts.map((post, i) => (
              <article key={post.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="block group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-lg hover:shadow-gray-100 dark:hover:shadow-gray-900/50 transition-all duration-300"
                >
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className={`px-2.5 py-0.5 rounded-md text-xs font-medium border ${tagStyle(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-600">
                    <time>{format(new Date(post.createdAt), "yyyy 年 M 月 d 日", { locale: zhCN })}</time>
                    <span>·</span>
                    <span>{readingTime(post.content)} 分钟阅读</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 dark:text-indigo-400 font-medium">
                      阅读 →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
