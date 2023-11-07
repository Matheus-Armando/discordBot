import axios from "axios";

const { API_BASE_URL, X_RIOT_TOKEN, API_URL_UUID, name, tag } = process.env;

export const getApi = async () => {
  const api = axios.create(
  );

  api.interceptors.request.use(
    (config) => {
      config.headers["X-Riot-Token"] =
        X_RIOT_TOKEN;

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  return api;
};
setInterval(() => {
   async function buscaInfosMatches(name, tag) {
    const puuid = await buscaPuuid(name, tag);
    const ids = await buscaIdsMatches(puuid);
    return await buscaMatchesById(ids);
  }
}, 60000);


export async function buscaPuuid() {
  try {
    const api = await getApi();

    const response = await api.get(`${API_URL_UUID}/${name}/${tag}`);

    if (response.status !== 200) {
      throw new Error("Erro na solicitação: " + response.status);
    }
    const data = response.data;
    const puuid = data.puuid;
    console.log("busquei o puuid");
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
    console.log("busquei o id da partida");
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
    console.log("busquei a data da partida");
    return gameCreation;
  } 
  catch (error) {
    // Trate erros
    console.error(error);
  }
  
};
