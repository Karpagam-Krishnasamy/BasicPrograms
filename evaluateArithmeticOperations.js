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

const evaluateOperations = (input) => {
  const operatorIndex = getOperatorIndex(input, Priorities[priority]);
  const result = input.map(doOperation(operatorIndex))
    .filter(removeOperands(operatorIndex));
    
  return result.length > 1 ? evaluateOperations(result) : result;
};

const displayResult =(result)=> console.log(result[0]);

const main = (input) =>{
  const result = evaluateOperations(input);
   displayResult(result);
};

main(input);

