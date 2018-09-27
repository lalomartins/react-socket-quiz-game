const ops = [
  {
    str: '+',
    fn: (a, b) => a + b,
    makeAnswer: () => randInt(20),
  },
  {
    str: '-',
    fn: (a, b) => a - b,
    makeAnswer: () => randInt(20) - 10,
  },
  {
    str: '×',
    fn: (a, b) => a * b,
    makeAnswer: () => randInt(100),
  },
  {
    str: '÷',
    fn: (a, b) => a / b,
    makeAnswer: () => Math.random() * 10,
  }];

const randInt = (ceil) => Math.floor(Math.random() * ceil);

module.exports = function createQuestion() {
  const op = ops[randInt(4)];
  const left = randInt(10) + 1;
  const right = randInt(10) + 1;
  const correctAnswer = op.fn(left, right);
  const answer = randInt(2) ? op.makeAnswer() : correctAnswer;
  if (op.str === '÷')
    return {proposition: `${left} ${op.str} ${right} = ${answer.toFixed(3)}`, answer: answer === correctAnswer};
  else
    return {proposition: `${left} ${op.str} ${right} = ${answer}`, answer: answer === correctAnswer};
}
