import "dotenv/config";
import axios from "axios";
import { buscaIdsMatches, buscaPuuid, getApi, buscaMatchesById} from "../service/index.js";

const { THALES_ID, galoNick, name2, tag2 } = process.env;

export const converteTempo = (timestampUnix) => {
  const data = new Date(timestampUnix);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  console.log(data.toLocaleDateString("pt-BR", options));
  return data.toLocaleDateString("pt-BR", options);
};

export const comparaData = (dataFormatada) => {
  
const matchInfo = dataFormatada;
const dataAtual = converteTempo(new Date());
let saida = ""
if (matchInfo === dataAtual) {
  saida = "Tales jogou lol hoje!";
} else {
  saida = "O tales está doente e não jogou lol hoje!";
}
  return saida
}

export const main = async (name, tag) => {
  const puuid = await buscaPuuid(name, tag)
  const matches = await buscaIdsMatches(puuid)
  const matchInfo = await buscaMatchesById(matches)
  const dataFormatada = converteTempo(matchInfo);
  const comparacao = comparaData(dataFormatada);
  console.log(comparacao);
  return comparacao
}

export const mainTales = async () => {
  const name = name2 
  const tag = tag2
  const puuid = await buscaPuuid(name, tag)
  const matches = await buscaIdsMatches(puuid)
  const matchInfo = await buscaMatchesById(matches)
  const dataFormatada = converteTempo(matchInfo);
  const comparacao = comparaData(dataFormatada);
  console.log(comparacao);
  return comparacao
}
