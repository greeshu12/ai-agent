import { useState } from "react";
import { mcp } from "./api";
import "./App.css";

function App() {
  const [output, setOutput] = useState(null);
  const [query, setQuery] = useState("");

  const callTool = async (tool, input = {}) => {
    try {
      const result = await mcp(tool, input);
      setOutput(result);
    } catch (error) {
      console.error(error);
      setOutput({ error: "Request failed. Check backend." });
    }
  };

  return (
    <div className="container">
      {/* Cute floating Eilik Robot */}
      <div className="eilik-header">🤖</div>

      <h1 className="title">My YouTube Agent</h1>

      {/* Login */}
      <a href={`${import.meta.env.VITE_API_BASE_URL}/auth/login`}>
        <button className="btn primary">Login with YouTube</button>
      </a>

      {/* SMART AGENT SEARCH */}
      <section className="section">
        <h3>🧠 Smart Agent Search</h3>
        <div className="row" style={{ display: "flex", gap: "10px" }}>
          <input
            className="input"
            placeholder="Ask anything... (e.g. provide me 3 cooking videos)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="btn"
            onClick={() => callTool("youtube.smartSearch", { query })}
          >
            Smart Search
          </button>
        </div>
      </section>

      {/* Watch History */}
      <section className="section">
        <h3>📜 Watch History</h3>
        <button className="btn" onClick={() => callTool("youtube.getHistory")}>
          Load History
        </button>
      </section>

      {/* ❤️ Liked Videos */}
      <section className="section">
        <h3>❤️ Liked Videos</h3>
        <button className="btn" onClick={() => callTool("youtube.getLiked")}>
          Load Liked Videos
        </button>
      </section>

      {/* AI Recommendations */}
      <section className="section">
        <h3>✨ AI Recommendations</h3>
        <button className="btn" onClick={() => callTool("youtube.recommend")}>
          Get Recommendations
        </button>
      </section>

      {/* Output */}
      <h3 style={{ marginTop: "30px", color: "#fff" }}>Output</h3>

      <div className="output">
        {Array.isArray(output?.items) ? (
          output.items.map((item, i) => {
            const s = item.snippet;
            const thumb = s?.thumbnails?.medium?.url;

            // Extract videoId for Search, History, Liked
            const videoId =
              item.id?.videoId ||
              item.contentDetails?.upload?.videoId ||
              item.contentDetails?.videoId ||
              item.id;

            return (
              <a
                key={i}
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div className="card">
                  {thumb && (
                    <img src={thumb} className="thumb" alt="thumbnail" />
                  )}
                  <div className="card-content">
                    <h4>{s?.title}</h4>
                    <p>{(s?.description || "").slice(0, 150)}...</p>
                  </div>
                </div>
              </a>
            );
          })
        ) : (
          <pre className="pre">
            {output ? JSON.stringify(output, null, 2) : "No output yet"}
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;
