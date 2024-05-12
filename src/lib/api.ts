import ky from "ky";

export const BASE_URL =
  process.env.VERCEL_ENV === "development"
    ? "http://127.0.0.1:3000/api"
    : `${process.env.VERCEL_URL}/api`;

const api = ky.create({
  fetch,
  prefixUrl: BASE_URL,
  timeout: 20000,
});

export default api;
