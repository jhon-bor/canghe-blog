import { Post, TagCount } from "./types";

const posts: Post[] = [
  {
    id: 1,
    title: "欢迎来到苍何的博客",
    slug: "welcome",
    excerpt: "这是一篇欢迎文章，介绍这个博客的创建初衷和未来计划。",
    tags: ["随笔", "公告"],
    content: `## 你好，世界！

欢迎来到我的博客。这里是我记录技术思考、分享编程经验和生活感悟的地方。

### 关于我

我是一名全栈开发者，热爱开源，喜欢探索新技术。这个博客将涵盖以下主题：

- **前端开发** — React、Next.js、TailwindCSS 等现代前端技术
- **后端架构** — Node.js、Cloudflare Workers、数据库设计
- **AI 应用** — 大语言模型的实际应用场景
- **工具分享** — 提升效率的开发工具和工作流

### 关于这个博客

这个博客使用 Next.js 15 构建，部署在 Cloudflare Pages 上，利用 Cloudflare 全球 CDN 加速访问。

希望你能在这里找到有价值的内容！`,
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  },
  {
    id: 2,
    title: "【完整指南】如何将AI接入微信：实现智能客服与自动回复",
    slug: "ai-wechat-integration-guide",
    excerpt: "微信月活超13亿，将AI接入微信生态可实现7x24小时智能客服。本文详细介绍三种接入方案及完整实施步骤。",
    tags: ["AI", "微信", "教程"],
    content: `## 为什么要在微信中接入AI？

微信作为国内最大的社交平台，月活用户超过13亿。对于企业和开发者而言，将AI能力接入微信生态，意味着能够实现7x24小时的智能客服、自动回复、社群管理等功能。

## 接入方案对比

目前主流的微信AI接入方案有以下三种：

### 方案一：微信公众号 API 接入

这是最官方、最稳定的方案。通过微信公众号后台的开发者模式，接入AI服务。

**优势：**
- 官方支持，稳定性高
- 接口文档完善
- 支持消息加密验证

### 方案二：企业微信机器人

企业微信提供Webhook机器人功能，可以向群聊中推送消息，并接收回复。

**优势：**
- 支持群聊场景
- 部署简单，配置方便
- 支持 Markdown 消息格式

### 方案三：个人微信接入（第三方方案）

通过第三方框架如 itchat、WeChaty 实现，需要承担一定风险。

**注意事项：**
- 存在被封号风险
- 不适合生产环境
- 仅适合个人学习和研究

## AI模型选择建议

| 模型 | 适用场景 | 响应速度 | 成本 |
|-----|---------|---------|-----|
| GPT-4 | 复杂对话、客服 | 中等 | 较高 |
| GPT-3.5 | 日常对话 | 快 | 中等 |
| Claude | 长文本处理 | 中等 | 中等 |
| 国产大模型 | 国内业务 | 快 | 低 |

## 实战：5步完成AI微信接入

### 第一步：准备服务器

推荐使用云服务器（如阿里云、腾讯云），配置要求：2核4G内存、稳定的公网IP、HTTPS 域名。

### 第二步：注册AI服务

选择合适的AI服务提供商，获取 API Key。

### 第三步：开发消息处理服务

使用 Next.js 或其他框架开发消息处理接口。

### 第四步：配置微信公众号

1. 登录微信公众平台
2. 设置 → 基本配置
3. 填写服务器地址 (URL)
4. 配置 Token 和 EncodingAESKey
5. 启用服务器配置

### 第五步：测试与优化

- 使用微信测试号进行开发调试
- 监控消息处理延迟
- 优化AI回复质量
- 添加敏感词过滤

## 常见问题排查

**Q：消息接收不到？**
检查服务器是否正确响应微信验证请求，确认防火墙开放了80/443端口。

**Q：AI回复延迟高？**
考虑使用流式响应，启用消息队列缓冲，选择响应更快的AI模型。

## 总结

AI接入微信是一个系统性工程，需要综合考虑技术方案、安全性、成本和用户体验。建议从简单的场景开始，逐步扩展功能。`,
    createdAt: "2026-06-03T00:00:00.000Z",
    updatedAt: "2026-06-03T00:00:00.000Z",
  },
  {
    id: 3,
    title: "Next.js 15 新特性解读：从 Pages Router 到 App Router 的演进",
    slug: "nextjs-15-features",
    excerpt: "Next.js 15 带来了全新的 Turbopack、Server Components 优化和更好的开发体验。深入了解这些新特性如何提升你的开发效率。",
    tags: ["前端", "Next.js", "React"],
    content: `## Next.js 15 的重大更新

Next.js 15 正式发布，带来了一系列重要的性能优化和开发体验改进。本文将深入探讨这些新特性。

### 1. Turbopack 默认启用

Next.js 15 在开发模式下默认使用 Turbopack 替代 Webpack，带来显著的编译速度提升。

- **冷启动速度**提升 50%+
- **HMR 热更新**速度提升 90%+
- 更好的内存使用效率

### 2. React 19 集成

Next.js 15 内置支持 React 19，包括：

- **Server Components** 性能优化
- **Actions** — 简化表单和数据处理
- **新的 Hooks** — \`useOptimistic\`、\`useFormStatus\` 等

### 3. App Router 成熟稳定

App Router 在 15 版本中已经完全成熟：

\`\`\`tsx
// app/posts/[slug]/page.tsx
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <Article post={post} />;
}
\`\`\`

### 4. 构建优化

- **增量构建**支持更好
- **静态导出**改进
- **ISR** 和 **SSG** 更灵活

## 从 Pages Router 迁移建议

如果你还在使用 Pages Router，以下是迁移建议：

1. **渐进式迁移** — 新旧路由可以共存
2. **优先迁移布局** — Layout 是 App Router 最大优势
3. **Loading 和 Error 处理** — 利用 \`loading.tsx\` 和 \`error.tsx\`
4. **数据获取** — 从 \`getServerSideProps\` 迁移到 Server Components

## 总结

Next.js 15 是一个稳固的版本，特别是 App Router 的成熟和 Turbopack 的默认启用，让开发体验有了质的飞跃。对于新项目，强烈建议直接使用 Next.js 15。`,
    createdAt: "2026-06-06T00:00:00.000Z",
    updatedAt: "2026-06-06T00:00:00.000Z",
  },
  {
    id: 4,
    title: "Cloudflare 全家桶上手指南：Pages、Workers、D1、R2 一站式部署",
    slug: "cloudflare-full-stack-guide",
    excerpt: "了解如何利用 Cloudflare 的完整产品线构建现代全栈应用，从静态网站到无服务器 API，一步到位。",
    tags: ["Cloudflare", "部署", "教程"],
    content: `## 为什么选择 Cloudflare？

Cloudflare 已经从一个 CDN 服务商发展为完整的云平台。其产品线涵盖了现代应用所需的一切：

### Cloudflare Pages

托管静态网站和 Jamstack 应用：

- 全球 330+ 节点
- 与 GitHub 自动集成
- 免费 SSL 证书
- 无限带宽

### Cloudflare Workers

无服务器计算平台：

- 基于 V8 引擎
- 全球边缘运行
- 支持 JavaScript、TypeScript、Rust
- 每天 10 万次免费请求

### Cloudflare D1

边缘 SQLite 数据库：

- 兼容 SQLite 语法
- 自动备份
- 与 Workers 深度集成
- 低延迟读取

### Cloudflare R2

对象存储服务：

- S3 兼容 API
- 零出口流量费用
- 自动复制
- 适合存储图片、文件等

## 实战：搭建全栈博客

### 第一步：创建 Pages 项目

\`\`\`bash
wrangler pages project create my-blog
\`\`\`

### 第二步：创建 D1 数据库

\`\`\`bash
wrangler d1 create blog-db
\`\`\`

### 第三步：配置 wrangler.toml

\`\`\`toml
name = "my-blog"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "blog-db"
database_id = "your-database-id"
\`\`\`

### 第四步：编写 API

\`\`\`ts
// functions/api/posts.ts
export async function onRequest(context) {
  const { DB } = context.env;
  const posts = await DB.prepare("SELECT * FROM posts").all();
  return Response.json(posts.results);
}
\`\`\`

### 第五步：部署

\`\`\`bash
wrangler pages deploy
\`\`\`

## 总结

Cloudflare 全家桶提供了构建现代全栈应用所需的一切，从静态托管到无服务器计算，从数据库到对象存储。关键是它们深度集成，开箱即用。`,
    createdAt: "2026-06-08T00:00:00.000Z",
    updatedAt: "2026-06-08T00:00:00.000Z",
  },
  {
    id: 5,
    title: "TypeScript 高级类型体操：让你的代码更安全",
    slug: "typescript-advanced-types",
    excerpt: "掌握 TypeScript 的高级类型技巧，从条件类型到模板字面量类型，写出更安全、更优雅的代码。",
    tags: ["TypeScript", "前端", "编程"],
    content: `## 为什么需要类型体操？

TypeScript 的类型系统非常强大，掌握高级类型技巧可以让你的代码更安全、更简洁。

### 条件类型 (Conditional Types)

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<42>;       // false
\`\`\`

### 模板字面量类型 (Template Literal Types)

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type ClickEvent = EventName<"click">; // "onClick"
type FocusEvent = EventName<"focus">; // "onFocus"
\`\`\`

### 映射类型 (Mapped Types)

\`\`\`typescript
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};
\`\`\`

### infer 关键字

\`\`\`typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = (x: number) => string;
type Result = ReturnType<Fn>; // string
\`\`\`

### 递归类型

\`\`\`typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};

type PathValue<T, P extends string> =
  P extends \`\${infer K}.\${infer Rest}\`
    ? K extends keyof T
      ? PathValue<T[K], Rest>
      : never
    : P extends keyof T
      ? T[P]
      : never;
\`\`\`

## 实际应用场景

1. **API 响应类型推导** — 自动从 API 路径推导返回类型
2. **表单验证类型** — 编译时确保表单字段和验证规则匹配
3. **路由参数类型安全** — 避免错误的路由参数使用

## 总结

TypeScript 的类型系统是一个完整的编程语言。掌握高级类型不仅能减少运行时错误，还能显著提升代码的可维护性和开发体验。`,
    createdAt: "2026-06-10T00:00:00.000Z",
    updatedAt: "2026-06-10T00:00:00.000Z",
  },
];

export function getAllPosts(): Post[] {
  return posts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  return posts.find((p) => p.slug === slug) || null;
}

export function getAllTags(): TagCount[] {
  const tagMap = new Map<string, number>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}
