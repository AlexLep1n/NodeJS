function plus(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function minus(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function mult(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
  if (secondNumber != 0) {
    return Math.round((firstNumber / secondNumber) * 100) / 100;
  } else {
    return `
    You cant divide by zero!
    Please enter a non-zero divisor.
    `;
  }
}

function calculator(firstNumber, secondNumber, operator) {
  switch (operator) {
    case "+":
      return plus(firstNumber, secondNumber);
    case "-":
      return minus(firstNumber, secondNumber);
    case "*":
      return mult(firstNumber, secondNumber);
    case "/":
      return divide(firstNumber, secondNumber);
    default:
      "Такой операции не существует!";
      break;
  }
}

module.exports = { calculator };
