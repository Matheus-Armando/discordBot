import "dotenv/config";
import axios from "axios";

import { converteTempo } from "./utils/index.js"
import { comparaData } from "./utils/index.js"
import { buscaIdsMatches, buscaPuuid, getApi, buscaMatchesById} from "./service/index.js";

const { THALES_ID, galoNick } = process.env;

/*const main = async () => {
  try {
    const api = await getApi();

    const response = await api.get(THALES_ID);

    if (response.status !== 200) {
      throw new Error("Erro na solicitação: " + response.status);
    }

    const data = response.data;
    const gameCreation = data.info.gameCreation;
    const dataFormatada = converteTempo(gameCreation);
    console.log("ultimo jogo:", dataFormatada);
  } catch (error) {
    // Trate erros
    console.error(error);
  }
};*/

/*const main = async () => {
  try {
    const api = await getApi();

    const response = await api.get(galoNick);

    if (response.status !== 200) {
      throw new Error("Erro na solicitação: " + response.status);
    }

    const data = response.data;
    const puuid = data.puuid;
    console.log("player uuid:", puuid);
  } catch (error) {
    // Trate erros
    console.error(error);
  }
};*/

const saida = ""

const main = async () => {
  const puuid = await buscaPuuid()
  const matches = await buscaIdsMatches(puuid)
  const matchInfo = await buscaMatchesById(matches)
  const dataFormatada = converteTempo(matchInfo);
 // const comparacao = comparaData(dataFormatada);
  console.log(dataFormatada)
}

main();