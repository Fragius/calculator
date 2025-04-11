const TEXT_TO_FUNCTION = {
    "+": add,
    "-": subtract,
    "/": divide,
    "*": multiply
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(equation) {
    operation = TEXT_TO_FUNCTION[equation[1]];
    return operation(equation[0], equation[2]);
}