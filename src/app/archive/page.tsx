import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/data";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export default function ArchivePage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  // Group posts by year
  const grouped = posts.reduce(
    (acc, post) => {
      const year = new Date(post.createdAt).getFullYear().toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(post);
      return acc;
    },
    {} as Record<string, typeof posts>
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">文章归档</h1>
      <p className="text-gray-500 mb-10">
        共 {posts.length} 篇文章，涵盖 {tags.length} 个标签
      </p>

      {Object.entries(grouped)
        .sort(([a], [b]) => parseInt(b) - parseInt(a))
        .map(([year, yearPosts]) => (
          <section key={year} className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {year}
            </h2>
            <div className="space-y-4">
              {yearPosts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
                >
                  <time className="text-sm text-gray-400 flex-shrink-0">
                    {format(new Date(post.createdAt), "MM/dd", {
                      locale: zhCN,
                    })}
                  </time>
                  <div>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="font-medium text-gray-900 hover:text-primary-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                    <div className="flex gap-1.5 mt-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
