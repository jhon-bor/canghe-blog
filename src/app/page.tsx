import { getAllPosts, getAllTags } from "@/lib/data";
import PostList from "./components/PostList";
import Sidebar from "./components/Sidebar";

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute -bottom-20 right-1/4 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: "3s" }} />

        <div className="relative max-w-5xl mx-auto px-6 py-28 md:py-36 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white/80 text-sm mb-8 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            持续更新中
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-300 bg-clip-text text-transparent">
              苍何的博客
            </span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-200/70 max-w-xl mx-auto leading-relaxed mb-2">
            分享全栈开发、AI 应用与编程实践
          </p>
          <p className="text-sm text-indigo-300/40">
            用代码构建更好的世界
          </p>
          <div className="mt-10 flex items-center justify-center gap-6 text-sm text-indigo-300/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{posts.length}</div>
              <div className="text-xs mt-1">篇文章</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{tags.length}</div>
              <div className="text-xs mt-1">个标签</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-14">
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
