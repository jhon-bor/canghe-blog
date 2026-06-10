"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "", slug: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("文章创建成功！");
        setForm({ title: "", content: "", slug: "" });
        router.refresh();
      } else {
        const error = await res.json();
        setMessage(`错误: ${error.error}`);
      }
    } catch {
      setMessage("创建失败，请稍后重试");
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">管理后台</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">标题</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-3 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Slug (URL标识)</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full border p-3 rounded"
            required
            pattern="[a-z0-9-]+"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">内容</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full border p-3 rounded h-40"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          创建文章
        </button>
      </form>

      {message && (
        <p className="mt-4 p-4 bg-green-100 text-green-800 rounded">{message}</p>
      )}
    </main>
  );
}