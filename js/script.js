
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
    return a / b;
}

function clearCalculation() {
    calculation = "";
    display.textContent = calculation;
}

function operate(a, b, operator) {
    return operator(a,b);    
}

// Configs
const calculationLimit = 9;
var calculation = "";
const display = document.querySelector(".calculator-display");

//Listener Events
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    clearCalculation();
})

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {

        if(calculation === "ERROR") clearCalculation();

        display.textContent += button.value;
        calculation += button.value;

        if(calculation.length > calculationLimit) {
            calculation = "ERROR";
            display.textContent = calculation;
        }
    })
})


const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener('click', () => {
    // Parse Calculation and throw to operate(num1, num2, operator);
})