import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.VERCEL_ENV === "development"
      ? "http://localhost:3000/api"
      : process.env.VERCEL_URL,
  timeout: 5000,
});

export default api;
