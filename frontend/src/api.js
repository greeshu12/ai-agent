import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

export const mcp = async (tool, input = {}) => {
  const response = await axios.post(`${BACKEND_URL}/mcp`, {
    tool,
    input,
  });
  return response.data;
};
