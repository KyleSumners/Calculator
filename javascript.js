const calcDisplay = document.querySelector("#display");
const numberButtons = [...document.querySelectorAll(".number")];
const operationButtons = [...document.querySelectorAll(".operation")];
const equalsBtn = document.querySelector(".equals");
const decimalBtn = document.querySelector(".decimal");
const clearBtn = document.querySelector("#clear");
let decimalAdded = false;
let divideByZero  = false;
let operation = null;
let op1 = "";
let op2 = "";

const clear = function() {
  op1 = "";
  op2 = "";
  operation = null;
  calcDisplay.textContent = "";
  decimalAdded = false;
  divideByZero = false;
}

const operate = function(operand1, operand2, op) {
  operand1 = parseFloat(operand1);
  operand2 = parseFloat(operand2);
  if(isNaN(operand1) || isNaN(operand2)) {
    calcDisplay.textContent = "Error: incorrect operands";
    return;
  }
  calcDisplay.textContent = "";
  switch(op) {
    case '+':
      ans = add(operand1, operand2);
      break;
    case '×':
      ans = multiply(operand1, operand2);
      break;
    case '÷':
      ans = divide(operand1, operand2);
      break;
    case '−':
      ans = subtract(operand1, operand2);
      break;
    default:
      calcDisplay.textContent = "Error: incorrect operands";
      return;
  }
  display(calcDisplay, ans);
  return ans;
}

function add(op1, op2) {
  return op1 + op2;
}

function subtract(op1, op2) {
  return op1 - op2;
}

function multiply(op1, op2) {
  return op1 * op2;
}

function divide(op1, op2) {
  if( op2 == 0) {
    divideByZero = true;
    return;
  }
  return op1 / op2;
}

function display(display, text) {
  display.textContent += text;
}

numberButtons.forEach(item => item.addEventListener('click', () => {
  if(operation === null) {
    op1 += item.id;
  } else {
    if(op2 === "") {
      calcDisplay.textContent = "";
    }
    op2 += item.id
  }
  display(calcDisplay, item.id);
}));

operationButtons.forEach(item => item.addEventListener('click', () => {
  if(!(op2 === "" )) { 
    op1 = operate(op1, op2, operation);
    op2 = "";
    calcDisplay.textContent = "";
    display(calcDisplay, op1);
  }
  operation = item.id;
  decimalAdded = false;
  if(divideByZero) {
    clear();
  }
}));

equalsBtn.addEventListener('click', () => {
  if(op1 !== "" && op2 !== "") {
    op1 = operate(op1, op2, operation);
    calcDisplay.textContent = op1;
    op2 = "";
    decimalAdded = false;
  }
  if(divideByZero) {
    clear();
  }
});

clearBtn.addEventListener('click', clear);

decimalBtn.addEventListener('click', () => {
  if(!decimalAdded) {
    if(operation === null) {
      op1 += '.';
    } else {
      if(op2 === "") {
        calcDisplay.textContent = "";
      }
      op2 += '.';
    }
    display(calcDisplay, '.');
    decimalAdded = true;
  }
});
