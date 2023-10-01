import axios from "axios";

const { API_BASE_URL, X_RIOT_TOKEN, API_URL_UUID, name, tag } = process.env;

export const getApi = async () => {
  const api = axios.create(
  );

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
  const ids = await buscaIdsMatches(puuid);
  return await buscaMatchesById(ids);
}

export async function buscaPuuid() {
  try {
    const api = await getApi();

    const response = await api.get(`${API_URL_UUID}/${name}/${tag}`);

    if (response.status !== 200) {
      throw new Error("Erro na solicitação: " + response.status);
    }
    const data = response.data;
    const puuid = data.puuid;
    
    return puuid;
  } 
  catch (error) {
    // Trate erros
    console.error(error);
  }
};

export async function buscaIdsMatches(puuid){
  try {
    const api = await getApi();

    const response = await api.get(`${API_BASE_URL}/by-puuid/${puuid}/ids?start=0&count=1`);

    if (response.status !== 200) {
      throw new Error("Erro na solicitação: " + response.status);
    }
    const data = response.data;
    const matchesId = data
    return matchesId;
  } 
  catch (error) {
    // Trate erros
    console.error(error); 
  }
};

export async function buscaMatchesById(matches) {
  try {
    const api = await getApi();

    const response = await api.get(`${API_BASE_URL}/${matches}`);

    if (response.status !== 200) {
      throw new Error("Erro na solicitação: " + response.status);
    }
    const data = response.data;
    const gameCreation = data.info.gameCreation;
    //const dataFormatada = converteTempo(gameCreation);
    
    return gameCreation;
  } 
  catch (error) {
    // Trate erros
    console.error(error);
  }
};
