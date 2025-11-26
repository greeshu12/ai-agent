import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { youtubeAuthRouter } from "./auth.js";
import { handleMcpRequest } from "./mcp.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// OAuth routes
app.use("/auth", youtubeAuthRouter);

// MCP endpoint
app.post("/mcp", async (req, res) => {
  try {
    const response = await handleMcpRequest(req.body);
    res.json(response);
  } catch (err) {
    console.error("Backend error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend running at http://localhost:3000");
});
