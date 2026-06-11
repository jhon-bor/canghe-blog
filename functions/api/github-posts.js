export async function onRequest(context) {
  const GITHUB_REPO = context.env.GITHUB_REPO || "jhon-bor/obsidian-blog";

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/Blog`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!res.ok) {
      const error = await res.json();
      console.error("GitHub API error:", error);
      return new Response(JSON.stringify({ files: [] }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const files = await res.json();
    return new Response(JSON.stringify({ files }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to fetch GitHub posts:", err);
    return new Response(JSON.stringify({ files: [] }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}