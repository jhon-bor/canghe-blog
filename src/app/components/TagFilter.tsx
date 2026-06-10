"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import type { TagCount } from "@/lib/types";

export default function TagFilter({
  tags,
  selectedTag,
}: {
  tags: TagCount[];
  selectedTag: string | null;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagClick = useCallback(
    (tag: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (tag) {
        params.set("tag", tag);
      } else {
        params.delete("tag");
      }
      const query = params.toString();
      router.push(query ? `/?${query}` : "/", { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleTagClick(null)}
        className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
          !selectedTag
            ? "bg-primary-500 text-white"
            : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
        }`}
      >
        全部
      </button>
      {tags.map((tag) => (
        <button
          key={tag.name}
          onClick={() => handleTagClick(tag.name)}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-colors ${
            selectedTag === tag.name
              ? "bg-primary-500 text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700"
          }`}
        >
          {tag.name}
          <span className="text-xs opacity-70">({tag.count})</span>
        </button>
      ))}
    </div>
  );
}
