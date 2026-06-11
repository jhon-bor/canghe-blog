"use client";

import { useEffect, useState } from "react";
import PostList from "./PostList";
import type { Post, TagCount } from "@/lib/types";
import { getAllTags } from "@/lib/data";

export default function GitHubPostList({ localPosts }: { localPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(localPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGitHubPosts() {
      try {
        // Fetch directly from GitHub API (repo is public)
        const res = await fetch(
          "https://api.github.com/repos/jhon-bor/obsidian-blog/contents/Blog",
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!res.ok) {
          console.error("GitHub API error:", await res.text());
          setLoading(false);
          return;
        }

        const files = await res.json();

        console.log("GitHub files:", files.map((f: any) => f.name));

        if (files.length > 0) {
          const githubPosts: Post[] = files
            .filter((f: any) => f.name.endsWith(".md") && f.name !== "README.md")
            .map((f: any, idx: number) => {
              // Parse date from filename: 2026-06-06-codex.md -> 2026-06-06 or 2026-6-6 -> 2026-06-06
              const dateMatch = f.name.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
              const year = dateMatch ? dateMatch[1] : new Date().getFullYear();
              const month = dateMatch ? dateMatch[2].padStart(2, "0") : "01";
              const day = dateMatch ? dateMatch[3].padStart(2, "0") : "01";
              const date = `${year}-${month}-${day}`;
              const title = f.name
                .replace(/^\d{4}-\d{2}-\d{2}-/, "")
                .replace(/\.md$/, "")
                .replace(/-/g, " ");

              return {
                id: 1000 + idx,
                title: title,
                slug: title.replace(/\s+/g, "-"),
                excerpt: `来自 Obsidian 的文章: ${title}`,
                tags: ["Obsidian"],
                content: `// This post is synced from GitHub: ${f.name}`,
                createdAt: `${date}T00:00:00.000Z`,
                updatedAt: `${date}T00:00:00.000Z`,
              };
            });

          // Merge with local posts
          const allPosts = [...localPosts, ...githubPosts];
          // Sort by date
          allPosts.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setPosts(allPosts);
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch GitHub posts, falling back to local posts:", err);
        setLoading(false);
      }
    }

    fetchGitHubPosts();
  }, [localPosts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return <PostList posts={posts} tags={getAllTags()} />;
}