import "dotenv/config";
import axios from "axios";

import { converteTempo } from "./utils/index.js";
import { getApi } from "./service/index.js";

const { THALES_ID } = process.env;

const main = async () => {
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
};

main();
