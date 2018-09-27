import React from 'react';

const BetweenTurns = ({winner, waitTime}) => (
  <div className="between-turns">
    {winner ? (
      <p className="result">
        Player {winner} won the last round and scored one point.
      </p>
    ) : (
      <p>Welcome to the game</p>
    )}
    <p className="lobby">New round in {waitTime} seconds…</p>
  </div>
);

export default BetweenTurns;
