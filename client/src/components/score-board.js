import React from 'react';

import './score-board.css';

const ScoreLine = ({id, score, online}) => (score || online) ? (
  <tr className="score-line">
    <td className={'player' + (online ? '' : ' offline')}>{id}</td>
    <td className="score">{score}</td>
  </tr>
) : null;

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
        <ScoreLine key={score.id} {...score} />
      ))}
    </tbody>
  </table>
);

export default ScoreBoard;
