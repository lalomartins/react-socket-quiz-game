import React from 'react';

import './score-board.css';

const ScoreLine = ({player, score}) => (
  <tr className="score-line">
    <td className="player">{player}</td>
    <td className="score">{score}</td>
  </tr>
);

const ScoreBoard = ({scores}) => (
  <table className="score-board">
    <thead>
      <tr>
        <th>Player</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      {scores.map((score) => (
        <ScoreLine key={score.player} {...score} />
      ))}
    </tbody>
  </table>
);

export default ScoreBoard;
