const GameStatus = {
  WAITING: 0,
  PLAYING: 1,
  FINISHED: 2,
};

class Game {
  constructor(classId, title, questions) {
    this.classId = classId;
    this.title = title;
    this.questions = questions;
    this.status = GameStatus.WAITING;
    this.players = {};
    this.actualQuestion = 0;
    this.answers = {};
  }

  joinGame(player) {
    if (!this.players[player.id]) {
      player.score = 0;
      this.players[player.id] = player;
    }
  }

  exitGame(player) {
    delete this.players[player.id];
  }

  startGame() {
    this.status = GameStatus.PLAYING;
  }

  getStatus() {
    return this.status;
  }

  getTitle() {
    return this.title;
  }

  getNumberOfPlayers() {
    return Object.keys(this.players).length;
  }

  getClassId() {
    return this.classId;
  }

  getActualQuestion() {
    if (this.actualQuestion < this.questions.length) {
      const question = this.questions[this.actualQuestion];

      return question;
    } else {
      this.status = GameStatus.FINISHED;
      throw 'Jogo Finalizado!';
    }
  }

  getNextQuestion() {
    this.answers = {};
    const ans = this.getActualQuestion();
    this.actualQuestion++;
    return ans;
  }

  getScoreboard() {
    let scoreboard = [];

    for (let key in this.players) {
      scoreboard.push(this.players[key]);
    }

    scoreboard.sort((a, b) => {
      return b.score - a.score;
    });

    return scoreboard;
  }

  processAnswers() {
    for (let key in this.answers) {
      if (this.answers[key]) {
        this.players[key].score++;
      }
    }
  }

  answerQuestion(playerId, choiceId) {
    try {
      let correctChoice = this.questions[this.actualQuestion - 1].choices.find(
        (choice) => {
          return choice.isCorrect;
        }
      );

      if (correctChoice.id == choiceId) {
        this.answers[playerId] = true;
      } else {
        this.answers[playerId] = false;
      }
    } catch (err) {
      console.log('[x] error on answering question');
    }
  }
}

const gamesOnline = {};

// '8cf05356-4958-41cb-b175-4e8aea3382f4': new Game(1, 'Simulado Surpresa ;-;', [
//   {
//     id: 1,
//     title: 'Matemática - Soma',
//     statement: 'Quanto é 2 + 2?',
//     choices: [
//       {
//         id: 1,
//         value: '4',
//         isCorrect: true,
//       },

//       {
//         id: 2,
//         value: '5',
//         isCorrect: false,
//       },
//     ],
//   },
//   {
//     id: 1,
//     title: 'Matemática - Subtração',
//     statement: 'Quanto é 4 - 2?',
//     choices: [
//       {
//         id: 1,
//         value: '4',
//         isCorrect: false,
//       },

//       {
//         id: 2,
//         value: '2',
//         isCorrect: true,
//       },
//     ],
//   },
// ]),

const getGamesByClassId = (classId) => {
  let games = [];

  for (let key in gamesOnline) {
    if (gamesOnline[key].getClassId() == classId) {
      games.push({
        id: key,
        status: gamesOnline[key].getStatus(),
        title: gamesOnline[key].getTitle(),
        playersOnline: gamesOnline[key].getNumberOfPlayers(),
      });
    }
  }

  return games;
};

module.exports = {
  getGamesByClassId,
  GameStatus,
  Game,
  gamesOnline,
};
