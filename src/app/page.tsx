import { getAllPosts, getAllTags } from "@/lib/data";
import PostList from "./components/PostList";

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            苍何的博客
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            分享全栈开发、AI 应用与编程实践。
            <br />
            用代码构建更好的世界。
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">文章</h2>
            <PostList posts={posts} tags={tags} />
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                苍
              </div>
              <h3 className="text-center font-semibold text-gray-900 mb-1">苍何</h3>
              <p className="text-center text-sm text-gray-500">
                全栈开发者 · AI 探索者
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">文章统计</h3>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>文章总数</span>
                  <span className="font-medium text-gray-700">{posts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>标签数</span>
                  <span className="font-medium text-gray-700">{tags.length}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
