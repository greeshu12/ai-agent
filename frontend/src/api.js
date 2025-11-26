import axios from "axios";

const BACKEND_URL = "http://localhost:3000";

export const mcp = async (tool, input = {}) => {
  const response = await axios.post(`${BACKEND_URL}/mcp`, {
    tool,
    input,
  });
  return response.data;
};
