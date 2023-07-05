const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
  },
});
const { gamesOnline } = require('../services/game');

io.on('connection', (socket) => {
  console.log('[ ] new user connected to socket');

  socket.on('start game', (gameId) => {
    console.log(`[ ] starting game ${gameId}`);

    gamesOnline[gameId].startGame();
    io.emit(`${gameId}`, {
      type: 'STATUS',
      content: gamesOnline[gameId].getStatus(),
    });
  });

  socket.on('next question', (gameId) => {
    gamesOnline[gameId].processAnswers();
    io.emit(`${gameId}`, {
      type: 'SCOREBOARD',
      content: gamesOnline[gameId].getScoreboard(),
    });
    try {
      let question = gamesOnline[gameId].getNextQuestion();
      io.emit(`${gameId}`, {
        type: 'QUESTION',
        content: question,
      });
    } catch (err) {
      gamesOnline[gameId].processAnswers();
      io.emit(`${gameId}`, {
        type: 'FINISH',
      });
      io.emit(`${gameId}`, {
        type: 'SCOREBOARD',
        content: gamesOnline[gameId].getScoreboard(),
      });
    }
  });

  socket.on('join game', ({ gameId, userId, userName, userPicture }) => {
    if (gamesOnline[gameId]) {
      gamesOnline[gameId].joinGame({
        id: userId,
        name: userName,
        picture: userPicture,
      });
      console.log(`[ ] user ${userId} joined on game ${gameId}`);

      // io.emit(`${gameId}`, {
      //   type: 'STATUS',
      //   content: gamesOnline[gameId].getStatus(),
      // });

      io.emit(`${gameId}`, {
        type: 'SCOREBOARD',
        content: gamesOnline[gameId].getScoreboard(),
      });
    } else {
      console.log('[x] user trying to connect on a invalid game');
    }
  });

  socket.on('answer question', ({ gameId, userId, choiceId }) => {
    if (gamesOnline[gameId]) {
      gamesOnline[gameId].answerQuestion(userId, choiceId);

      // io.emit(`${gameId}`, {
      //   type: 'SCOREBOARD',
      //   content: gamesOnline[gameId].getScoreboard(),
      // });
    } else {
      console.log('[x] user trying to answer on a invalid game');
    }
  });

  // TODO: check if user is on any game and remove it
  socket.on('disconnect', () => {
    console.log('[x] user disconnected from socket');
  });
});

module.exports = server;
