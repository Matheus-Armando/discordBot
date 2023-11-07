import "dotenv/config";
import axios from "axios";
import { buscaIdsMatches, buscaPuuid, getApi, buscaMatchesById} from "../service/index.js";

const { THALES_ID, galoNick } = process.env;
export const converteTempo = (timestampUnix) => {
  const data = new Date(timestampUnix);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return data.toLocaleDateString("pt-BR", options);
};

export const comparaData = (dataFormatada) => {
  
const matchInfo = dataFormatada;
const dataAtual = converteTempo(new Date());
let saida = ""
if (matchInfo === dataAtual) {
  saida = "O tales jogou lol hoje";
} else {
  saida = "O tales está doente";
}
  return saida
}

export const main = async () => {
  const puuid = await buscaPuuid()
  const matches = await buscaIdsMatches(puuid)
  const matchInfo = await buscaMatchesById(matches)
  const dataFormatada = converteTempo(matchInfo);
  const comparacao = comparaData(dataFormatada);
  return comparacao
}

