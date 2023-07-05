const GameStatus = {
  WAITING: 0,
  PLAYING: 1,
  FINISHED: 2,
};

console.log(`[ ] starting connection with game ${gameId}`);
var socket = io();

socket.emit('join game', {
  gameId,
  userId,
  userName,
  userPicture,
});

socket.on(`${gameId}`, (data) => {
  if (data.type == 'STATUS') {
    drawWaitingScreen(data);
  } else if (data.type == 'QUESTION') {
    drawQuestionScreen(data);
  } else if (data.type == 'SCOREBOARD') {
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

function drawSentScreen() {
  let templateString = `
    <h3>Aguarde</h3>
    <h4>Resposta enviada! Espere pela próxima questão</h4>`;

  document.getElementById('game-container').innerHTML = templateString;
}

function drawQuestionScreen(data) {
  let choices = '';
  for (let i in data.content.choices) {
    choices += `<div class="col-md-6 col-sm-12">
                  <button type="button" class="btn btn-primary game-btn game-btn-d" onclick="answerQuestion(${data.content.choices[i].id})">
                    ${data.content.choices[i].value}
                  </button>
                </div>`;
  }

  let templateString = `
    <h3>Questão ${data.content.id}</h3>
    <h5> ${data.content.title} </h5>
    <p class="text-justify text-dark game-question mt-2">
      ${data.content.statement}
    </p>
    <div class="game-answers mb-4">
      <div class="row mb-4">
        ${choices}
      </div>
    </div>`;

  document.getElementById('game-container').innerHTML = templateString;
}

function answerQuestion(choiceId) {
  socket.emit('answer question', {
    gameId,
    userId,
    choiceId,
  });

  drawSentScreen();
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
