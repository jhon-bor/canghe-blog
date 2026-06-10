"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, Suspense } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { Post, TagCount } from "@/lib/types";

function readingTime(content: string): number {
  const chars = content.replace(/[#*`\[\]()>|\-\s]/g, "").length;
  return Math.max(1, Math.ceil(chars / 400));
}

function PostListInner({
  posts,
  tags,
}: {
  posts: Post[];
  tags: TagCount[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedTag = searchParams.get("tag");
  const [search, setSearch] = useState("");

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

  return (
    <div>
      {/* Search + Tag filter */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="搜索文章..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all"
          />
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => router.push("/", { scroll: false })}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              !selectedTag
                ? "bg-primary-500 text-white shadow-sm shadow-primary-200"
                : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            全部
          </button>
          {tags.map((tag) => (
            <button
              key={tag.name}
              onClick={() =>
                router.push(`/?tag=${encodeURIComponent(tag.name)}`, {
                  scroll: false,
                })
              }
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all ${
                selectedTag === tag.name
                  ? "bg-primary-500 text-white shadow-sm shadow-primary-200"
                  : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-300 hover:text-primary-700 dark:hover:text-primary-300"
              }`}
            >
              {tag.name}
              <span className="text-xs opacity-70">({tag.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-400 dark:text-gray-500 text-lg mb-2">
            {search ? `没有找到包含 "${search}" 的文章` : "该标签下暂无文章"}
          </p>
          <button
            onClick={() => {
              setSearch("");
              router.push("/");
            }}
            className="text-primary-500 hover:text-primary-600 transition-colors text-sm"
          >
            ← 查看全部文章
          </button>
        </div>
      ) : (
        <>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
            共 {filteredPosts.length} 篇文章
            {search && ` 匹配 "${search}"`}
            {selectedTag && ` · 标签: ${selectedTag}`}
          </p>
          <div className="space-y-6">
            {filteredPosts.map((post, i) => (
              <article
                key={post.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <Link
                  href={`/posts/${post.slug}`}
                  className="block group p-5 -mx-5 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 rounded-md text-xs font-medium transition-colors ${
                          selectedTag === tag
                            ? "bg-primary-500 text-white"
                            : "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                    <time>
                      {format(new Date(post.createdAt), "yyyy 年 M 月 d 日", {
                        locale: zhCN,
                      })}
                    </time>
                    <span>·</span>
                    <span>{readingTime(post.content)} 分钟阅读</span>
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

export default function PostList({
  posts,
  tags,
}: {
  posts: Post[];
  tags: TagCount[];
}) {
  return (
    <Suspense
      fallback={
        <div className="space-y-5 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-5">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-3" />
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-full mb-2" />
              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded w-1/3" />
            </div>
          ))}
        </div>
      }
    >
      <PostListInner posts={posts} tags={tags} />
    </Suspense>
  );
}
