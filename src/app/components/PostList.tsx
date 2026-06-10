"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, Suspense } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { Post, TagCount } from "@/lib/types";

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

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter((p) => p.tags.includes(selectedTag));
  }, [posts, selectedTag]);

  return (
    <div>
      {/* Tag filter bar */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => router.push("/", { scroll: false })}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              !selectedTag
                ? "bg-primary-500 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
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
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedTag === tag.name
                  ? "bg-primary-500 text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700"
              }`}
            >
              {tag.name}
              <span className="text-xs opacity-70">({tag.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Post list */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg mb-2">该标签下暂无文章</p>
          <button
            onClick={() => router.push("/")}
            className="text-primary-500 hover:text-primary-600 transition-colors"
          >
            ← 查看全部文章
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {filteredPosts.map((post) => (
            <article key={post.id}>
              <Link href={`/posts/${post.slug}`} className="group">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                        selectedTag === tag
                          ? "bg-primary-500 text-white"
                          : "bg-primary-50 text-primary-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <time className="text-sm text-gray-400">
                  {format(new Date(post.createdAt), "yyyy 年 M 月 d 日", {
                    locale: zhCN,
                  })}
                </time>
              </Link>
            </article>
          ))}
        </div>
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
        <div className="space-y-8 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-5 bg-gray-200 rounded w-1/4 mb-3" />
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-full mb-2" />
              <div className="h-4 bg-gray-100 rounded w-1/3" />
            </div>
          ))}
        </div>
      }
    >
      <PostListInner posts={posts} tags={tags} />
    </Suspense>
  );
}
