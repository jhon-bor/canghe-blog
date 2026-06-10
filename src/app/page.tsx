import { getAllPosts, getAllTags } from "@/lib/data";
import PostList from "./components/PostList";
import Sidebar from "./components/Sidebar";

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="absolute inset-0 opacity-30 dark:opacity-10">
          <div className="absolute top-10 left-[10%] w-72 h-72 bg-primary-300 dark:bg-primary-700 rounded-full mix-blend-multiply dark:mix-blend-screen blur-3xl animate-float" />
          <div className="absolute top-20 right-[10%] w-96 h-96 bg-indigo-300 dark:bg-indigo-700 rounded-full mix-blend-multiply dark:mix-blend-screen blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute -bottom-10 left-[30%] w-80 h-80 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply dark:mix-blend-screen blur-3xl animate-float" style={{ animationDelay: "4s" }} />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
            </span>
            持续更新中
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            苍何的博客
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            分享全栈开发、AI 应用与编程实践
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-400 dark:text-gray-500">
            <span>{posts.length} 篇文章</span>
            <span>·</span>
            <span>{tags.length} 个标签</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 min-w-0">
            <PostList posts={posts} tags={tags} />
          </div>
          <Sidebar posts={posts} tags={tags} />
        </div>
      </div>
    </div>
  );
}
