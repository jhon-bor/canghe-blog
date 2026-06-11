"use client";

import { useState } from "react";
import { FolderOpen, RefreshCw, CheckCircle, AlertCircle, Globe } from "lucide-react";

export default function SyncPage() {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<"idle" | "success" | "error">("idle");
  const [stats, setStats] = useState({
    totalPosts: 5,
    lastSynced: "2026-06-11 10:30:00",
    githubRepo: "jhon-bor/obsidian-blog",
  });

  const handleSync = async () => {
    setSyncing(true);
    setSyncStatus("idle");

    // Simulate sync process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSyncing(false);
    setLastSync(new Date().toISOString());
    setSyncStatus("success");
    setTimeout(() => setSyncStatus("idle"), 3000);
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Obsidian 同步</h2>
        <p className="text-gray-500 mt-1">管理 Obsidian 与 GitHub 的同步设置</p>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <FolderOpen className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-500">文章数量</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.totalPosts}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <RefreshCw className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-500">最后同步</span>
          </div>
          <div className="text-sm font-medium text-gray-900">
            {stats.lastSynced}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-5 h-5 text-gray-700" />
            <span className="text-sm text-gray-500">GitHub 仓库</span>
          </div>
          <div className="text-sm font-medium text-gray-900 truncate">
            {stats.githubRepo}
          </div>
        </div>
      </div>

      {/* Sync Status */}
      {syncStatus === "success" && (
        <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          同步成功！文章列表已更新。
        </div>
      )}

      {syncStatus === "error" && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          同步失败，请检查 GitHub 连接。
        </div>
      )}

      {/* GitHub Connection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          GitHub 连接
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Obsidian Blog 仓库</div>
              <div className="text-sm text-gray-500">github.com/jhon-bor/obsidian-blog</div>
            </div>
            <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
              已连接
            </span>
          </div>

          <div className="text-sm text-gray-600">
            <p className="mb-2"><strong>同步规则：</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Obsidian 仓库中的 <code className="bg-gray-100 px-1 rounded">Blog/</code> 文件夹内的 Markdown 文件会自动同步</li>
              <li>文件名格式：<code className="bg-gray-100 px-1 rounded">YYYY-MM-DD-title.md</code></li>
              <li>Frontmatter 中的 <code className="bg-gray-100 px-1 rounded">title</code> 和 <code className="bg-gray-100 px-1 rounded">tags</code> 会被读取</li>
              <li>同步频率：手动触发或 Webhook 自动触发</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sync Button */}
      <button
        onClick={handleSync}
        disabled={syncing}
        className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {syncing ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />
            同步中...
          </>
        ) : (
          <>
            <RefreshCw className="w-5 h-5" />
            立即同步
          </>
        )}
      </button>

      {/* Instructions */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">使用说明</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <p>在 Obsidian 中创建或编辑 <code className="bg-gray-200 px-1 rounded">Blog/</code> 文件夹下的 Markdown 文件</p>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <p>使用 Obsidian Git 插件提交更改到 GitHub</p>
          </div>
          <div className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <p>返回这里点击「立即同步」或设置 GitHub Webhook 自动同步</p>
          </div>
        </div>
      </div>
    </div>
  );
}
