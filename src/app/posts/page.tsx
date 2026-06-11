'use client';

import Link from 'next/link';
import { Search, Grid, List, Clock, User, Database, FolderOpen } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage?: string | null;
  author?: { name: string };
  category?: { name: string; slug: string } | null;
  tags?: { name: string; slug: string }[];
  createdAt: string;
  content?: string;
  source?: 'api' | 'github';
}

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: { posts: number };
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [dataSource, setDataSource] = useState<'all' | 'api' | 'github'>('all');

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch GitHub Obsidian posts directly
        const githubRes = await fetch(
          "https://api.github.com/repos/jhon-bor/obsidian-blog/contents/Blog",
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );
        
        const githubFiles = githubRes.ok ? await githubRes.json() : [];

        // Process GitHub files
        const githubPosts: Post[] = Array.isArray(githubFiles) 
          ? githubFiles
              .filter((f: any) => f.name?.endsWith('.md') && f.name !== 'README.md')
              .map((f: any, idx: number) => {
                const dateMatch = f.name.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
                const year = dateMatch ? dateMatch[1] : new Date().getFullYear();
                const month = dateMatch ? dateMatch[2].padStart(2, "0") : "01";
                const day = dateMatch ? dateMatch[3].padStart(2, "0") : "01";
                const date = `${year}-${month}-${day}`;
                const title = f.name
                  .replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '')
                  .replace(/\.md$/, '')
                  .replace(/-/g, ' ');

                return {
                  id: `github-${idx}`,
                  title,
                  slug: title.replace(/\s+/g, '-'),
                  excerpt: '点击阅读更多...',
                  createdAt: `${date}T00:00:00.000Z`,
                  source: 'github' as const,
                  author: { name: 'Obsidian' },
                };
              })
          : [];

        // Local posts from blog data
        const localPosts: Post[] = [
          { id: '1', title: 'TypeScript 高级类型体操：让你的代码更安全', slug: 'typescript-advanced-types', excerpt: '掌握 TypeScript 的高级类型技巧，从条件类型到模板字面量类型，写出更安全、更优雅的代码。', createdAt: '2026-06-10T00:00:00.000Z', source: 'api', author: { name: '苍何' }, tags: [{ name: 'TypeScript', slug: 'typescript' }] },
          { id: '2', title: 'Cloudflare 全家桶上手指南：Pages、Workers、D1、R2 一站式部署', slug: 'cloudflare-full-stack-guide', excerpt: '了解如何利用 Cloudflare 的完整产品线构建现代全栈应用，从静态网站到无服务器 API，一步到位。', createdAt: '2026-06-08T00:00:00.000Z', source: 'api', author: { name: '苍何' }, tags: [{ name: 'Cloudflare', slug: 'cloudflare' }] },
          { id: '3', title: 'Next.js 15 新特性解读：从 Pages Router 到 App Router 的演进', slug: 'nextjs-15-features', excerpt: 'Next.js 15 带来了全新的 Turbopack、Server Components 优化和更好的开发体验。', createdAt: '2026-06-06T00:00:00.000Z', source: 'api', author: { name: '苍何' }, tags: [{ name: 'Next.js', slug: 'nextjs' }] },
          { id: '4', title: '【完整指南】如何将AI接入微信：实现智能客服与自动回复', slug: 'ai-wechat-guide', excerpt: '微信月活超13亿，将AI接入微信生态可实现7x24小时智能客服。', createdAt: '2026-06-03T00:00:00.000Z', source: 'api', author: { name: '苍何' }, tags: [{ name: 'AI', slug: 'ai' }] },
          { id: '5', title: '欢迎来到苍何的博客', slug: 'welcome-to-blog', excerpt: '这是一篇欢迎文章，介绍这个博客的创建初衷和未来计划。', createdAt: '2026-06-01T00:00:00.000Z', source: 'api', author: { name: '苍何' }, tags: [] },
        ];

        // Merge: GitHub first (local edits), then local
        setPosts([...githubPosts, ...localPosts]);
        setCategories([
          { id: '1', name: '技术教程', slug: 'tech' },
          { id: '2', name: '产品思考', slug: 'product' },
          { id: '3', name: '生活感悟', slug: 'life' },
        ]);
      } catch (e) {
        console.error('Failed to fetch data:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('zh-CN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const filteredPosts = posts.filter(p => {
    if (selectedCategory && p.category?.slug !== selectedCategory) return false;
    if (dataSource !== 'all' && p.source !== dataSource) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">📑 文章列表</h1>
          <p className="text-white/80">探索我们的所有文章</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Filters & View Toggle */}
            <div className="mb-6 p-4 bg-white rounded-xl border border-gray-100">
              <div className="flex items-center justify-between w-full flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 text-sm">筛选:</span>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">全部分类</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                  <div className="flex items-center gap-2 border-l pl-4">
                    <button
                      onClick={() => setDataSource('all')}
                      className={`px-3 py-1 rounded text-sm flex items-center gap-1 ${dataSource === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
                    >
                      <Database className="w-3 h-3" /> 全部
                    </button>
                    <button
                      onClick={() => setDataSource('github')}
                      className={`px-3 py-1 rounded text-sm flex items-center gap-1 ${dataSource === 'github' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
                    >
                      <FolderOpen className="w-3 h-3" /> Obsidian
                    </button>
                    <button
                      onClick={() => setDataSource('api')}
                      className={`px-3 py-1 rounded text-sm flex items-center gap-1 ${dataSource === 'api' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
                    >
                      <Database className="w-3 h-3" /> 后台
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Posts */}
            {loading ? (
              <div className="text-center py-16">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
                {filteredPosts.map((post) => (
                  <article key={post.id} className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 ${viewMode === 'grid' ? '' : 'flex'}`}>
                    <div className={`${viewMode === 'grid' ? '' : 'w-40 h-32 flex-shrink-0'} overflow-hidden bg-gray-100`}>
                      {post.coverImage ? (
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <span className="text-2xl text-white">{post.source === 'github' ? '📝' : '📄'}</span>
                        </div>
                      )}
                    </div>
                    <div className={`p-4 ${viewMode === 'grid' ? '' : 'flex-1'}`}>
                      {post.tags && post.tags.length > 0 && (
                        <div className="post-tags mb-2 flex gap-2">
                          {post.tags.map(tag => (
                            <span key={tag.slug} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">{tag.name}</span>
                          ))}
                          {post.source === 'github' && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">📝 Obsidian</span>
                          )}
                        </div>
                      )}
                      <h2 className="text-lg font-bold mb-2">
                        <Link href={`/posts/${post.slug}`} className="hover:text-indigo-600">{post.title}</Link>
                      </h2>
                      <p className="text-sm text-gray-500 mb-3">{post.excerpt || '暂无摘要'}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><User className="w-3 h-3" />{post.author?.name || '未知'}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(post.createdAt)}</span>
                        </div>
                        <Link href={`/posts/${post.slug}`} className="text-indigo-600 hover:underline">阅读 →</Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <p className="text-gray-500 mb-4">暂无文章</p>
                <Link href="/admin/posts/new" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">撰写文章</Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            <div className="widget">
              <h3 className="widget-title">🔍 搜索</h3>
              <div className="relative">
                <input type="text" placeholder="搜索文章..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="widget">
              <h3 className="widget-title">📁 分类</h3>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button 
                      onClick={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded transition-colors flex items-center justify-between ${selectedCategory === cat.slug ? 'bg-indigo-600 text-white' : 'hover:bg-gray-50'}`}
                    >
                      <span>📂 {cat.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="widget">
              <h3 className="widget-title">🏷️ 标签</h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/tag/tech" className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">#技术</Link>
                <Link href="/tag/product" className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">#产品</Link>
                <Link href="/tag/life" className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">#生活</Link>
                <Link href="/tag/news" className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">#资讯</Link>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
              <h3 className="font-bold mb-2">📝 Obsidian 同步</h3>
              <p className="text-sm text-white/80 mb-4">在 Obsidian 的 Blog 文件夹中编辑 Markdown，自动同步到博客！</p>
              <a href="https://github.com/jhon-bor/obsidian-blog" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-lg text-sm font-medium hover:bg-gray-100">
                <FolderOpen className="w-4 h-4" /> 查看 GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}