const stateChart = {
  initial: 'betweenTurns',
  states: {
    betweenTurns: {
      on: {
        TURN_START: 'question',
      },
    },
    question: {
      on: {
        ANSWER: 'answer',
        TURN_END: 'betweenTurns',
      },
      data: {},
    },
    answer: {
      on: {
        CORRECT: 'betweenTurns',
        INCORRECT: 'wrongAnswer',
      },
    },
    wrongAnswer: {
      on: {
        TURN_END: 'betweenTurns',
      },
    },
  },
};

export default stateChart;
