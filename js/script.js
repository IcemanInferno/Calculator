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
    if(a === 0 || b === 0) {
        alert("Don't divide by 0!")
        clearDisplay();
        return 0;
    }

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
            clearDisplay();
            return "UNKNOWN";            
    }
}



// Functions
function keyPressed(keyValue) {    
    if(checkDigit.test(keyValue)) {
        if(displayValue == 0) displayValue = "";

        if(operator === "") {                             
            firstOperand += keyValue;
            displayValue += keyValue;            
        }   
        else {                
            secondOperand += keyValue;
            displayValue += keyValue;
        }        
    }
    else if (checkOperator.test(keyValue)) {
        if(keyValue === "=") performCalculation();
        else if (!operator) { 
            displayValue += keyValue;
            operator = (keyValue === "+") ? "add": operator
            operator = (keyValue === "-") ? "subtract": operator
            operator = (keyValue === "*") ? "multiply": operator
            operator = (keyValue === "/") ? "divide": operator
        }    
    }
    
    updateDisplay();
}


function removeLastInput() {
    if(!operator && firstOperand) {                             
        firstOperand = firstOperand.slice(0,-1);
        displayValue = displayValue.slice(0,-1);            
    }
    else if(secondOperand) {   
        secondOperand = String(secondOperand).slice(0,-1);
        displayValue = String(displayValue).slice(0,-1);
    }
    else if(operator) {
        operator = "";
        displayValue = String(displayValue).slice(0,-1);
    }
    if(!firstOperand && !secondOperand) clearDisplay();
    else {updateDisplay();}    
}


function updateDisplay() {
    if((firstOperand.length + secondOperand.length) > OperandLimit) {
        clearDisplay();
        alert("The value you have entered is too long")
    }

    if(firstOperand === "-") firstOperand = "";
    if(secondOperand === "-") secondOperand = "";
    if(displayValue === "-") displayValue = "";
    
    const display = document.querySelector(".calculator-display");
    display.textContent = (displayValue) ? displayValue : "0";
}


function clearDisplay() {
    displayValue = '0';
    firstOperand = "";
    secondOperand = "";
    operator = "";
    updateDisplay();
}


function performCalculation() {
    if(firstOperand && secondOperand && operator) {
        let result = operate(parseFloat(firstOperand), parseFloat(secondOperand), operator);
        result = String(Math.round(result * 100) / 100);

        clearDisplay();
        firstOperand = result;
        displayValue = result;    
        updateDisplay();
    }
}


//Config
const checkDigit = new RegExp('(^[0-9\.]*$)'); 
const checkOperator = new RegExp('[\-\+\/\*\=]');
const OperandLimit = 12;

let displayValue = '0';
let firstOperand = "";
let secondOperand = "";
let operator = "";

updateDisplay();

//LISTENERS///

//numbers
const buttons = document.querySelectorAll('.number');
buttons.forEach((button) => {
    button.addEventListener('click', () => {        
        if((button.value === ".") && (firstOperand.includes(".") || secondOperand.includes("."))){} // Do nothing
        else{
            keyPressed(button.value);            
        }       
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
        else {
            keyPressed(button.textContent);
        }
    })
})
        
//clear button
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    clearDisplay();
})

//backspace
const backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener('click', () => {
    removeLastInput();          
})

//equals
const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener('click', () => {
    if(firstOperand && secondOperand && operator) {
        performCalculation();
    }
})

//Keyboard inputs
document.addEventListener('keydown', function(event) {
    if((checkDigit.test(event.key) || checkOperator.test(event.key))) {
        keyPressed(String(event.key));
    }
    else if(event.key === "Enter") {
        performCalculation();
    }
    else if(event.key === "Backspace") {
        removeLastInput();
    }
});