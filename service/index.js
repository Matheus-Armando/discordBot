import axios from "axios";

const { API_BASE_URL, X_RIOT_TOKEN } = process.env;

export const getApi = async () => {
  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  api.interceptors.request.use(
    (config) => {
      config.headers["X-Riot-Token"] =
        "RGAPI-1caaa495-e296-4ac7-a875-f7867792f5be";

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return api;
};
