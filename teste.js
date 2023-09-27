
let gameCreation


fetch('https://americas.api.riotgames.com/lol/match/v5/matches/BR1_2809059833', {
  headers: {
    'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 OPR/102.0.0.0',
    'Accept-Language' : 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
    'Accept-Charset' : 'application/x-www-form-urlencoded; charset=UTF-8',
    'Origin' : 'https://developer.riotgames.com',
    'X-Riot-Token': 'RGAPI-96c539d8-bd20-49b5-a6ad-1bf9e6b2a2f2'
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na solicitação: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    gameCreation = data.info.gameCreation
    const dataFormatada = converteTempo(gameCreation);
    console.log('ultimo jogo:', dataFormatada); 
  })
  .catch(error => {
    // Trate erros
    console.error('Erro:', error);
  });

function converteTempo(timestampUnix) {
    const data = new Date(timestampUnix);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    };
    return data.toLocaleDateString('pt-BR', options);
  }