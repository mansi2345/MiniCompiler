import axios from "axios";

// Create an axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000", // backend server URL
});

export const compileCode = async (code, input = "") => {
  try {
    const response = await api.post("/compile", { code, input });
    return { output: response.data.output };
  } catch (error) {
    return {
      error: error.response?.data?.error || "Unknown error occurred",
    };
  }
};
