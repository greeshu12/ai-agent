import { youtubeAPI } from "./youtube.js";
import { refreshAccessToken } from "./auth.js";

// --- Extract topic from natural language ---
function extractTopic(query) {
  // remove common words
  const cleaned = query
    .toLowerCase()
    .replace(/give me|show me|find|videos|video|please|provide/i, "")
    .trim();

  // fallback
  return cleaned.length > 0 ? cleaned : "trending";
}

// --- Extract number of videos (default: 5) ---
function extractCount(query) {
  const match = query.match(/\d+/);
  return match ? parseInt(match[0]) : 5;
}

export async function handleMcpRequest(body) {
  console.log("📩 MCP Request Body:", body);

  const { tool, input } = body;

  if (!global.ACCESS_TOKEN) {
    return { error: "User must authenticate via /auth/login first." };
  }

  await refreshAccessToken();
  const token = global.ACCESS_TOKEN;

  try {
    switch (tool) {

      /* ----------------------------------------------------
         SMART SEARCH — NO OPENAI
      ---------------------------------------------------- */
      case "youtube.smartSearch": {
        const userQuery = input?.query || "";

        const topic = extractTopic(userQuery);
        const count = extractCount(userQuery);

        console.log("🎯 SmartSearch Parsed:", { topic, count });

        const results = await youtubeAPI.search(topic, token);
        results.items = results.items.slice(0, count);

        return results;
      }

      /* ------------------------------
         WATCH HISTORY
      ------------------------------ */
      case "youtube.getHistory":
        return await youtubeAPI.history(token);

      /* ------------------------------
         SEARCH VIDEOS DIRECTLY
      ------------------------------ */
      case "youtube.search":
        return await youtubeAPI.search(input.query, token);

      /* ------------------------------
         LIKE A VIDEO
      ------------------------------ */
      case "youtube.likeVideo":
        return await youtubeAPI.likeVideo(input.videoId, token);

      /* ------------------------------
         LIKED VIDEOS
      ------------------------------ */
      case "youtube.getLiked":
        return await youtubeAPI.getLiked(token);

      /* ---------------------------------------------------
         RECOMMENDATIONS (FREE VERSION!)
      --------------------------------------------------- */
      case "youtube.recommend": {
        const history = await youtubeAPI.history(token);

        if (!history.items || history.items.length === 0) {
          return { error: "No watch history found." };
        }

        const lastVideoId =
          history.items[0].contentDetails?.upload?.videoId ||
          history.items[0].contentDetails?.playlistItem?.resourceId?.videoId;

        if (!lastVideoId) {
          return { error: "Cannot extract last watched video." };
        }

        // Use YouTube's own related videos system
        const related = await youtubeAPI.related(lastVideoId, token);

        return related;
      }

      default:
        return { error: "Unknown MCP tool" };
    }
  } catch (err) {
    console.error("❌ FREE MCP ERROR:", err.message);
    return { error: "Failed to process MCP request." };
  }
}
