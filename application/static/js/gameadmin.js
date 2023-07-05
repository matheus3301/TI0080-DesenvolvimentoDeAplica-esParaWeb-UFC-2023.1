const GameStatus = {
  WAITING: 0,
  PLAYING: 1,
  FINISHED: 2,
};

console.log(`[ ] starting admin connection with game ${gameId}`);
var socket = io();

document.getElementById('start-game-button').addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('start game', gameId);
});

document
  .getElementById('next-question-button')
  .addEventListener('click', (e) => {
    e.preventDefault();
    socket.emit('next question', gameId);
  });

socket.on(`${gameId}`, (data) => {
  if (data.type == 'SCOREBOARD') {
    drawScoreboard(data);
  } else if (data.type == 'FINISH') {
    drawFinishScreen(data);
  } else {
    console.log('[-] mensagem inválida do servidor');
    console.log(data);
  }
});

function drawWaitingScreen(data) {
  let status = '';
  if (data.content == GameStatus.WAITING) {
    status = 'O jogo ainda não começou!';
  } else if (data.content == GameStatus.PLAYING) {
    status = 'O jogo começou, aguarde pela próxima questão!';
  } else if (data.content == GameStatus.FINISHED) {
    status = 'O jogo já foi finalizado!';
  }

  let templateString = `
  <h3>Aguarde</h3>
  <h4>${status}</h4>`;

  document.getElementById('game-container').innerHTML = templateString;
}

function drawFinishScreen(data) {
  let templateString = `
    <h3>Fim!</h3>
    <h4>O jogo acabou, confira no placar os vencedores!</h4>
    <a name="" id="" class="btn btn-warning" href="../" role="button">Voltar para a turma!</a>`;

  document.getElementById('game-container').innerHTML = templateString;
}

function drawScoreboard(data) {
  console.log(data.content);

  let table = '';
  for (let player of data.content) {
    table += `
      <tr>
          <td>
              ${player.name}
          </td>
          <td>
              ${player.score}
          </td>
      </tr>
      `;
  }

  let templateString = `
  <h4>Placar</h4>
  <table class="table">
  <thead>
      <tr>
      <th scope="col">Nome</th>
      <th scope="col">Pontos</th>
      </tr>
  </thead>
  <tbody>
      ${table}
  </tbody>
  </table>
  `;

  document.getElementById('scoreboard').innerHTML = templateString;
}
