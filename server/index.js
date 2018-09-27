const io = require('socket.io')(3001);
const fs = require('fs');

const state = {
  state: 'BetweenTurns',
  proposition: null,
  correctAnswer: true,
  lastWinner: null,
  waitTime: Infinity,
};

setInterval(() => {
  if ((state.state === 'BetweenTurns') && (players.filter(p => p.socket !== null).length > 0)) {
    if (state.waitTime === Infinity) state.waitTime = 5;
    else state.waitTime -= 1;
    if (state.waitTime === 0) {
      state.state = 'Question';
      state.proposition = 'True or False?';
      state.correctAnswer = true;
    }
    sendState();
  }
}, 1000);

function sendState(socket = io) {
  let data;
  switch (state.state) {
    case 'BetweenTurns': {
      data = {
        winner: state.lastWinner,
        waitTime: state.waitTime === Infinity ? 5 : state.waitTime,
      };
      break;
    }
    case 'Question': {
      data = {
        proposition: state.proposition,
      }
    }
  }
  socket.emit('set-state', state.state, data);
}

const players = [];
for (let i = 1; i <= 10; i++)
  players.push({
    id: i,
    socket: null,
    score: 0,
  });
players.scores = () =>
  players.map((p) => ({id: p.id, score: p.score, online: p.socket !== null}));

function login({id}) {
  if (id === null || players[id - 1].socket !== null) {
    // that id is taken!
    id = null;
    for (const p of players) {
      if (p.socket === null) {
        id = p.id;
        break;
      }
    }
    if (id === null) {
      this.emit('login-fail', message='The game is full');
    }
  }
  const player = players[id - 1];
  player.socket = this;
  this.player = player;
  this.emit('login', {id});
  io.emit('update-scores', players.scores());
  sendState(this);
  console.log(`connection ${this.id} logged in as player ${id}`);
}

function processAnswer(proposition, answer) {
  if (this.player && state.state === 'Question') {
    console.log(`got answer from ${this.id} for ${proposition}: ${answer}`);
    if (answer === state.correctAnswer) {
      state.state = 'BetweenTurns';
      state.waitTime = 5;
      state.lastWinner = this.player.id;
      this.player.score += 1;
      sendState();
    } else {
      this.player.score -= 1;
      this.emit('set-state', 'WrongAnswer', {});
    }
    io.emit('update-scores', players.scores());
  }
}

io.on('connection', (socket) => {
  console.log(`new connection ${socket.id} from ${socket.conn.remoteAddress}, playing on ${socket.handshake.headers.referer}`);
  // broadcast the scores because it includes the online flag
  socket.emit('update-scores', players.scores());
  socket.on('login', login.bind(socket));
  socket.on('answer', processAnswer.bind(socket));
  socket.on('disconnect', () => {
    if (socket.player) {
      socket.player.socket = null;
      io.emit('update-scores', players.scores());
    }
  })
});
