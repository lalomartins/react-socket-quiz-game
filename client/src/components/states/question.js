import React from 'react';

import './question.css';

const Question = ({actions, proposition}) => (
  <div className="question">
    <p className="proposition">{proposition}</p>
    <p className="buttons">
      <button onClick={() => actions.sendAnswer(proposition, true)}>True</button>
      &nbsp;
      <button onClick={() => actions.sendAnswer(proposition, false)}>False</button>
    </p>
  </div>
);

export default Question;
