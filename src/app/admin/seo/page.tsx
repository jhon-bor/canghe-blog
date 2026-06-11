"use client";

import { useState, useEffect } from "react";

interface SEOSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  ogImage: string;
  twitterHandle: string;
  googleAnalytics: string;
}

export default function SEOSettingsPage() {
  const [settings, setSettings] = useState<SEOSettings>({
    siteName: "苍何的博客",
    siteDescription: "分享技术、编程与生活。全栈开发、AI应用、Cloudflare部署实践。",
    siteUrl: "https://canghe-blog.pages.dev",
    ogImage: "",
    twitterHandle: "",
    googleAnalytics: "",
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage for demo
    localStorage.setItem("seo_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">SEO 设置</h2>
        <p className="text-gray-500 mt-1">配置站点的搜索引擎优化信息</p>
      </div>

      {saved && (
        <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg">
          设置已保存！
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">基本信息</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                网站名称
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                网站描述
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="w-full border border-gray-300 p-3 rounded-lg h-24 focus:ring-2 focus:ring-blue-500"
                placeholder="站点简短描述，用于搜索引擎显示"
              />
              <p className="text-xs text-gray-500 mt-1">
                建议 150-160 字符
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                网站 URL
              </label>
              <input
                type="url"
                value={settings.siteUrl}
                onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>
          </div>
        </div>

        {/* Social Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">社交媒体</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OG 图片 URL
              </label>
              <input
                type="url"
                value={settings.ogImage}
                onChange={(e) => setSettings({ ...settings, ogImage: e.target.value })}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/og-image.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                推荐尺寸 1200x630 像素
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Twitter @用户名
              </label>
              <input
                type="text"
                value={settings.twitterHandle}
                onChange={(e) => setSettings({ ...settings, twitterHandle: e.target.value })}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="@username"
              />
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">分析工具</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Analytics ID
            </label>
            <input
              type="text"
              value={settings.googleAnalytics}
              onChange={(e) => setSettings({ ...settings, googleAnalytics: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="G-XXXXXXXXXX"
            />
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">搜索结果预览</h3>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="text-blue-600 text-lg truncate">{settings.siteUrl}</div>
            <div className="text-green-700 text-xl font-medium mt-1">{settings.siteName}</div>
            <div className="text-gray-600 text-sm mt-1 line-clamp-2">
              {settings.siteDescription || "站点描述将显示在这里..."}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          保存设置
        </button>
      </form>
    </div>
  );
}
