import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/data";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

function readingTime(content: string): number {
  const chars = content.replace(/[#*`\[\]()>|\-\s]/g, "").length;
  return Math.max(1, Math.ceil(chars / 400));
}

export default function ArchivePage() {
  const posts = getAllPosts();
  const tags = getAllTags();

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
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
        文章归档
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-12">
        共 {posts.length} 篇文章，涵盖 {tags.length} 个标签
      </p>

      {Object.entries(grouped)
        .sort(([a], [b]) => parseInt(b) - parseInt(a))
        .map(([year, yearPosts]) => (
          <section key={year} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {year}
            </h2>
            <div className="space-y-3">
              {yearPosts.map((post) => (
                <article key={post.id}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-3 px-4 -mx-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group"
                  >
                    <time className="text-sm text-gray-400 dark:text-gray-500 flex-shrink-0 w-24">
                      {format(new Date(post.createdAt), "M 月 d 日", {
                        locale: zhCN,
                      })}
                    </time>
                    <span className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex-1">
                      {post.title}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-600">
                      {readingTime(post.content)} 分钟
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
