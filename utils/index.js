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
console.log("Data da partida:" + matchInfo + " - Data atual: " + dataAtual)
if (matchInfo === dataAtual) {
  saida = "O tales jogou lol hoje";
} else {
  saida = "O tales está doente";
}
  return saida
}