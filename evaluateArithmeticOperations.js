const { map } = require("@laufire/utils/collection");

const input = [2, "+", 3, "/", 3, "*", 2, "-", 5];

const sections = [[2, "*", [6, "/", 3]], "*", [2, "/", 5]];

const steps = [
  [2, "*", 6, "/", 3, "*", 2, "/", 5],
  [2, "*", 2, "*", 2, "/", 5],
  [2, "*", 2, "*", 0.4],
  [4, "*", 0.4],
  [1.6]
];

const Operations = {
  '/': (num1, num2) => num1 / num2,
  '*': (num1, num2) => num1 * num2,
  '+': (num1, num2) => num1 + num2,
  '-': (num1, num2) => num1 - num2
};

const Priorities = ['/', '*', '-', '+'];
let priority = 0;

const getOperatorIndex = (input, operator) =>
  Math.max(0, input.findIndex(el => el === operator))
  || getOperatorIndex(input, Priorities[priority++]);

const doOperation = (operatorIndex) => (element, index, array) =>
  index === operatorIndex ? Operations[element](array[index - 1], array[index + 1]) : element;

const removeOperands = (operatorIndex) => 
  (element, index) => index !== operatorIndex - 1 && index !== operatorIndex + 1;

const evaluateExpression = (input) => {
  const operatorIndex = getOperatorIndex(input, Priorities[priority]);
  const result = input.map(doOperation(operatorIndex))
    .filter(removeOperands(operatorIndex));

  return evaluate(result);
};

const evaluate = (input)=> input.length > 1 ? evaluateExpression(input) : input[0];

const display =(result)=> console.log(result);

const main = (input) =>{
  const result = evaluate(input);
   display(result);
};

main(input);

