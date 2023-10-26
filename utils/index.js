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
  saida = "jogou";
} else {
  saida = "n jogou";
}
  return saida
}