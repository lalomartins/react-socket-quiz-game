import React, {Component} from 'react';
import io from 'socket.io-client';

import './App.css';

import ScoreBoard from './score-board';

import BetweenTurns from './states/between-turns';
import Question from './states/question';
import WrongAnswer from './states/wrong-answer';

const SERVER_ADDRESS = process.env.SERVER_ADDRESS || `http://${window.location.hostname}:3001`;

const componentsByState = {
  BetweenTurns,
  Question,
  WrongAnswer,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: 'connecting',
      stateData: {},
      playerId: 1,
      score: 0,
      scoreBoard: [],
    };

    this.actions = {
      sendAnswer: this.sendAnswer.bind(this),
    };
  }

  componentWillMount() {
    const socket = this.socket = io(SERVER_ADDRESS);
    socket.on('login', this.handleLogin.bind(this));
    socket.on('connect', this.handleConnect.bind(this));
    socket.on('disconnect', this.handleDisconnect.bind(this))
    socket.on('set-state', this.setGameState.bind(this));
    socket.on('update-scores', this.updateScoreBoard.bind(this));
  }

  handleConnect() {
    this.socket.emit('login', {id: localStorage.getItem('playerId')});
  }

  handleDisconnect() {
    this.setState({gameState: 'connecting'});
  }

  handleLogin({id}) {
    this.setState({playerId: id});
    localStorage.setItem('playerId', id);
  }

  setGameState(state, data) {
    console.log('new game state', state, data);
    this.setState({
      gameState: state,
      stateData: data,
    });
  }

  updateScoreBoard(scoreBoard) {
    console.log('updade score', scoreBoard);
    this.setState({scoreBoard});
  }

  sendAnswer(proposition, answer) {
    this.socket.emit('answer', proposition, answer);
  }

  render() {
    const {gameState, stateData, playerId, score, scoreBoard} = this.state;
    const StateComponent = componentsByState[gameState];

    if (gameState !== 'connecting' && StateComponent) {
      return (
        <div className="app">
          <header>
            <h1>The Amazing Quiz Game</h1>
            <p>
              Player: {playerId} Score: {score}
            </p>
          </header>
          <main>
            <StateComponent actions={this.actions} {...stateData} />
          </main>
          <footer>
            <ScoreBoard scores={scoreBoard} />
          </footer>
        </div>
      );
    } else {
      return (
        <div className="App">
          <p>Connecting…</p>
        </div>
      );
    }
  }
}

export default App;
