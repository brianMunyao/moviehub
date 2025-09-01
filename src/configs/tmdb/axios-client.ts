import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY!;
if (!TMDB_API_KEY) throw new Error("TMDB_API_KEY is required");

const tmdbAxiosApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

tmdbAxiosApiClient.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${TMDB_API_KEY}`;

    return config;
  },
  (error) => Promise.reject(error)
);

export default tmdbAxiosApiClient;
