let calculator = {
    displayValue: '0',
    firstNumber: null,
    secondNumber: false,
    operator: null,
};

function inputDigit(digit) {
    let { displayValue, secondNumber } = calculator;
    if (secondNumber === true) {
        calculator.displayValue = digit;
        calculator.secondNumber = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}


function inputDecimal(dot) {
    if (calculator.secondNumber === true) return;
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}


function inputOperator(nextOperator) {
    let { firstNumber, displayValue, operator } = calculator
    let inputValue = parseFloat(displayValue);
    if (operator && calculator.secondNumber)  {
        calculator.operator = nextOperator;
        return;
    }
    if (firstNumber == null) {
        calculator.firstNumber = inputValue;
    } else if (operator) {
        let currentValue = firstNumber;
        let result = calculate[operator](currentValue, inputValue);
        calculator.displayValue = String(result);
        calculator.firstNumber = result;
    }
    calculator.secondNumber = true;
    calculator.operator = nextOperator;
}


let calculate = {
    '/': (firstNumber, secondNumber) => firstNumber !== 0 && secondNumber !== 0 ? firstNumber / secondNumber : `Error`,
    '*': (firstNumber, secondNumber) => firstNumber !== 0 && secondNumber !== 0 ? firstNumber * secondNumber : `Error`,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber
};


function clearCalculator() {
    calculator.displayValue = '0';
    calculator.firstNumber = null;
    calculator.secondNumber = false;
    calculator.operator = null;
}


function updateDisplay() {
    let display = document.querySelector('#display');
    display.value = calculator.displayValue;
}
updateDisplay();


let buttons = document.getElementsByTagName('button');
for(let i = 0; i < buttons.length; i++)
buttons[i].addEventListener('click', (event) => {
    let { target } = event;
    if (!target.matches('button')) {
        return;
    }
    if (target.classList.contains('operator')) {
        inputOperator(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains('clear')) {
        clearCalculator();
        updateDisplay();
        return;
    }
    inputDigit(target.value);
    updateDisplay();
});