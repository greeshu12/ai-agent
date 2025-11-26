import axios from "axios";

export const youtubeAPI = {

  // SEARCH VIDEOS
  search: async (query, token) => {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          type: "video",
          maxResults: 25
        },
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return res.data;
  },

  // WATCH HISTORY
  history: async (token) => {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/activities",
      {
        params: {
          part: "snippet,contentDetails",
          mine: true,
          maxResults: 25
        },
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return res.data;
  },

  // LIKE A VIDEO
  likeVideo: async (videoId, token) => {
    await axios.post(
      "https://www.googleapis.com/youtube/v3/videos/rate",
      {},
      {
        params: { id: videoId, rating: "like" },
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return { success: true };
  },

  // NEW: GET LIKED VIDEOS
  getLiked: async (token) => {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,contentDetails",
          myRating: "like",
          maxResults: 25
        },
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return res.data;
  }

};
