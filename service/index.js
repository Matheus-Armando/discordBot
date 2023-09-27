import axios from "axios";

const { API_BASE_URL, X_RIOT_TOKEN } = process.env;

export const getApi = async () => {
  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  api.interceptors.request.use(
    (config) => {
      config.headers["X-Riot-Token"] =
        "RGAPI-96c539d8-bd20-49b5-a6ad-1bf9e6b2a2f2";

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return api;
};
