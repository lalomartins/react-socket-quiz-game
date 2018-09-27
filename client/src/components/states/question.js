import React from 'react';

const Question = ({actions, proposition}) => (
  <div className="question">
    <p className="proposition">{proposition}</p>
    <p className="buttons">
      <button onClick={() => actions.sendAnswer(true)}>True</button>
      &nbsp;
      <button onClick={() => actions.sendAnswer(false)}>False</button>
    </p>
  </div>
);

export default Question;
