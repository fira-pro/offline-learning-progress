// Generate Math Questions
export const generateMathQuestion = () => {
  const operators = ["+", "-", "*"];
  const operator =
    operators[Math.floor(Math.random() * operators.length)];
  let num1, num2, correctAnswer;

  if (operator === "*") {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
  } else {
    num1 = Math.floor(Math.random() * 50) + 1;
    num2 = Math.floor(Math.random() * 50) + 1;
  }

  switch (operator) {
    case "+":
      correctAnswer = num1 + num2;
      break;
    case "-":
      if (num1 < num2) [num1, num2] = [num2, num1];
      correctAnswer = num1 - num2;
      break;
    case "*":
      correctAnswer = num1 * num2;
      break;
  }

  const wrongAnswers = [];
  while (wrongAnswers.length < 3) {
    const wrong =
      correctAnswer + Math.floor(Math.random() * 20) - 10;
    if (
      wrong !== correctAnswer &&
      !wrongAnswers.includes(wrong) &&
      wrong > 0
    ) {
      wrongAnswers.push(wrong);
    }
  }

  const options = [correctAnswer, ...wrongAnswers].sort(
    () => Math.random() - 0.5
  );

  return {
    id: Date.now() + Math.random(),
    question: `${num1} ${operator} ${num2} = ?`,
    options,
    correctAnswer,
  };
};
