import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/data";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "文章未找到" };
  return {
    title: `${post.title} — 苍何的博客`,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-gray-400 hover:text-gray-600 transition-colors mb-8"
      >
        ← 返回首页
      </Link>

      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/?tag=${encodeURIComponent(tag)}`}
              className="px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>
        <time className="text-gray-400">
          {format(new Date(post.createdAt), "yyyy 年 M 月 d 日", {
            locale: zhCN,
          })}
        </time>
      </header>

      <div className="prose max-w-none text-gray-700">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>

      <div className="mt-16 pt-8 border-t border-gray-100">
        <Link
          href="/"
          className="inline-flex items-center text-primary-600 hover:text-primary-800 transition-colors font-medium"
        >
          ← 返回首页
        </Link>
      </div>
    </article>
  );
}
