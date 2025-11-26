import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

export const youtubeAuthRouter = express.Router();

export const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// 🔐 Store tokens (reset everything first)
global.ACCESS_TOKEN = null;
global.REFRESH_TOKEN = null;

// -------------------------------
// LOGIN - Google OAuth Consent
// -------------------------------
youtubeAuthRouter.get("/login", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",              // IMPORTANT
    prompt: "consent select_account",    // FORCE new token + new scopes
    scope: [
      "https://www.googleapis.com/auth/youtube.readonly",
      "https://www.googleapis.com/auth/youtube.force-ssl",
      "https://www.googleapis.com/auth/youtube"
    ]
  });

  res.redirect(url);
});

// -------------------------------
// OAUTH CALLBACK
// -------------------------------
youtubeAuthRouter.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;

    // FORCE CLEAR old refresh token
    global.REFRESH_TOKEN = null;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    global.ACCESS_TOKEN = tokens.access_token;
    global.REFRESH_TOKEN = tokens.refresh_token || null;

    console.log("ACCESS TOKEN SAVED");

    if (global.REFRESH_TOKEN) {
      console.log("REFRESH TOKEN SAVED");
    } else {
      console.log("⚠ No refresh token received. (Google may still be using old session)");
    }

    res.send("<h2>Authentication successful! You can close this window.</h2>");
  } catch (err) {
    console.error("OAuth Error:", err.response?.data || err.message);
    res.status(500).send("Authentication failed.");
  }
});

// -------------------------------
// REFRESH ACCESS TOKEN
// -------------------------------
export async function refreshAccessToken() {
  try {
    if (!global.REFRESH_TOKEN) return;

    oauth2Client.setCredentials({
      refresh_token: global.REFRESH_TOKEN
    });

    const { credentials } = await oauth2Client.refreshAccessToken();
    global.ACCESS_TOKEN = credentials.access_token;

    console.log("♻ Access Token refreshed");
    return global.ACCESS_TOKEN;

  } catch (error) {
    console.error("Token refresh failed:", error.response?.data || error.message);
    return null;
  }
}
