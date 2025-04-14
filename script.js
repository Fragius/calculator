const numButtons = Array.from(document.querySelectorAll(".num-button"));
const operandButtons = Array.from(document.querySelectorAll(".operation-btn"));
const display = document.querySelector(".display");

const TEXT_TO_FUNCTION = {
    "+": add,
    "-": subtract,
    "/": divide,
    "x": multiply
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
    return operation(+equation[0], +equation[2]);
}

function turnStrExpressionToArr(equation) {
    let expressionArr = equation.split("");
    for (let i = 1; i < expressionArr.length; i++) {
        currItem = expressionArr[i];
        prevItem = expressionArr[i - 1];
        if (currItem.match(/[0-9]/) && prevItem.match(/[0-9]/)) { //check if both items are numbers
            expressionArr[i - 1] = prevItem + currItem;
            expressionArr.splice(i, 1)
        }
    }
    if (expressionArr[0] === "-") {
        expressionArr[0] = expressionArr[0] + expressionArr[1];
        expressionArr.splice(1, 1);
    }
    return expressionArr;
}

function evaluateInOrder(expression) { //: division is multiplication 
    for (let c = 0; c < expression.length; c++) {
    const index = expression.findIndex(item => item.toString().match(/x|\//));
        if (index === -1) {
            break;
        } else {
            const smallExp = expression.splice(index -1, 3);
            const result = operate(smallExp)
            expression.splice(index - 1, 0, result);
        }
    }
    while (expression.length > 1) {
        const currentExpression = expression.splice(0, 3);
        const solution = operate(currentExpression)
        expression.unshift(solution);
    };
    return expression;
}


function evaluate(expression) {
    const expressionArr = turnStrExpressionToArr(expression);
    return evaluateInOrder(expressionArr)[0] //Evaluate in the order of division, and multiplication then addition, and subtraction
}

function addToDisplay(element) {
    display.textContent += element.textContent;
    element.className === "num-button" ?  enableButtons(operandButtons) : disableButtons(operandButtons);
}

function disableButtons(btnArr) {
    btnArr.forEach(btn => btn.disabled = true);
}

function enableButtons(btnArr) {
    btnArr.forEach(btn => btn.disabled = false);
}

numButtons.forEach(btn => btn.addEventListener("click", () => addToDisplay(btn)));
operandButtons.forEach(btn => btn.addEventListener("click", () => addToDisplay(btn)));