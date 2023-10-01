import axios from "axios";

const { API_BASE_URL, X_RIOT_TOKEN, API_URL_UUID, name, tag } = process.env;

export const getApi = async () => {
  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  api.interceptors.request.use(
    (config) => {
      config.headers["X-Riot-Token"] =
        "RGAPI-5f4c179f-bdd5-4a0c-877f-29fafa2bb0c0";

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return api;
};

export async function buscaInfosMatches(name, tag) {
  const puuid = await buscaPuuid(name, tag);
  const ids = buscaIdsMatches(puuid);
  return await buscaMatchesById(ids);
}

export async function buscaPuuid(name, tag) {
  const api = axios.create({
    baseURL: `${API_URL_UUID}/${name}/${tag}`,
  });

  api.interceptors.request.use(
    (config) => {
      config.headers["X-Riot-Token"] =
        "RGAPI-5f4c179f-bdd5-4a0c-877f-29fafa2bb0c0";

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return api;
};

export async function buscaIdsMatches(puuid){
  const api = axios.create({
    baseURL: `${API_BASE_URL}/by-puuid/${puuid}/ids?start=0&count=10`,
  });

  api.interceptors.request.use(
    (config) => {
      config.headers["X-Riot-Token"] =
        "RGAPI-5f4c179f-bdd5-4a0c-877f-29fafa2bb0c0";

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return api;
}

export async function buscaMatchesById(idsMatches) {
  const infosMatches = [];
  for (const id of idsMatches) {
    const api = axios.create({
      baseURL: `${API_BASE_URL}/${puuid}`,
    });
  
    api.interceptors.request.use(
      (config) => {
        config.headers["X-Riot-Token"] =
          "RGAPI-5f4c179f-bdd5-4a0c-877f-29fafa2bb0c0";
  
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    infosMatches.push(api);
  }
  return infosMatches;
}