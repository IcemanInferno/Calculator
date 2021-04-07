// Operator Functions
function add(a, b){
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if(a === 0 || b === 0) alert("Don't divide by 0!")
    return a / b;
}

function operate(a, b, operator) {
    switch (operator) {
        case "add":
            return add(a,b);
        case "subtract":
            return subtract(a,b);
        case "multiply":
            return multiply(a,b);
        case "divide":
            return divide(a,b);
        default:
            return "UNKNOWN";
    }
}

// Functions
function updateDisplay() {
    if((firstOperand.length + secondOperand.length) > OperandLimit) {
        clearDisplay();
        alert("The value you have entered is too long")
    }

    if(firstOperand === "-") firstOperand = "";
    if(secondOperand === "-") secondOperand = "";
    if(displayValue === "-") displayValue = "";
    
    const display = document.querySelector(".calculator-display");
    display.textContent = displayValue;
}

function clearDisplay() {
    displayValue = '0';
    firstOperand = "";
    secondOperand = "";
    operator = "";
    updateDisplay();
}

function performCalculation() {
    let result = operate(parseFloat(firstOperand), parseFloat(secondOperand), operator);
    result = String(Math.round(result * 100) / 100);

    clearDisplay();
    firstOperand = result;
    displayValue = result;    
    updateDisplay();
}

//Config
const OperandLimit = 12;
let displayValue = '0';
let firstOperand = "";
let secondOperand = "";
let operator = "";

updateDisplay();

//clear button
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    clearDisplay();
})

//numbers
const buttons = document.querySelectorAll('.number');
buttons.forEach((button) => {
    button.addEventListener('click', () => {        
        if(displayValue == 0) displayValue = "";
        
        if((button.value === ".") && (firstOperand.includes(".") || secondOperand.includes("."))){} // Do nothing
        else{
            if(!operator) {                             
                firstOperand += button.value;
                displayValue += button.value;            
            }
            else {                
                secondOperand += button.value;
                displayValue += button.value;
            }
        }

        updateDisplay();
    })
})

//operators
const operators = document.querySelectorAll('.operator');
operators.forEach((button) => {
    button.addEventListener('click', () => {
        if(!firstOperand) firstOperand = "0";
        if(firstOperand && secondOperand && operator){
            performCalculation();
        }

        operator = button.value;
        displayValue += button.textContent;        
        updateDisplay();
    })
})

//backspace
const backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener('click', () => {
    if(!operator && firstOperand) {                             
        firstOperand = firstOperand.slice(0,-1);
        displayValue = displayValue.slice(0,-1);            
    }
    else if(secondOperand) {   
        secondOperand = String(secondOperand).slice(0,-1);
        displayValue = String(displayValue).slice(0,-1);
    }

    updateDisplay();
})

//equals
const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener('click', () => {
    if(firstOperand && secondOperand && operator) {
        performCalculation();
    }
})
