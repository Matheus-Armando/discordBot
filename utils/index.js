export const converteTempo = (timestampUnix) => {
  const data = new Date(timestampUnix);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  return data.toLocaleDateString("pt-BR", options);
};

export const comparaData = (dataFormatada) => {
  
const matchInfo = dataFormatada;
const dataAtual = new Date();
const saida = ""
if (matchInfo.getTime() === dataAtual.getTime()) {
  saida = "jogou";
} else {
  saida = "n jogou";
}
  return saida
}