import { getAllPosts, getPostBySlug } from "../../src/lib/data";

export async function onRequestGet(context: { request: Request }): Promise<Response> {
  const url = new URL(context.request.url);
  const slug = url.searchParams.get("slug");

  if (slug) {
    const post = getPostBySlug(slug);
    if (!post) {
      return new Response(JSON.stringify({ error: "文章不存在" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(post), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const posts = getAllPosts();
  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context: { request: Request }): Promise<Response> {
  try {
    const body = await context.request.json();
    const { title, content, slug, excerpt, tags } = body;

    if (!title || !content || !slug) {
      return new Response(JSON.stringify({ error: "缺少必填字段" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // In production, this would save to a database
    // For now, return success response
    const newPost = {
      id: Date.now(),
      title,
      slug,
      excerpt: excerpt || content.slice(0, 100),
      tags: tags || [],
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify(newPost), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "请求格式错误" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
