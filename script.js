const numButtons = Array.from(document.querySelectorAll(".num-button"));
const operandButtons = Array.from(document.querySelectorAll(".operation-btn"));
const display = document.querySelector(".display");

let numIsAns = false;

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

function operate(expression) {
    operation = TEXT_TO_FUNCTION[expression[1]];
    return operation(+expression[0], +expression[2]);
}

function turnStrExpressionToArr(expression) {
    let expressionArr = (expression + "+0").split("");
    let index = 1;
    while (index < expressionArr.length) {
        const currItem = expressionArr[index];
        const prevItem = expressionArr[index - 1];
        if (currItem.match(/[0-9]/) && prevItem.match(/[0-9]/)) { //check if both items are numbers
            expressionArr[index - 1] = prevItem + currItem;
            expressionArr.splice(index, 1)
        } else {
            index++;
        }
    }
    if (expressionArr[0] === "-") {
        expressionArr[0] = expressionArr[0] + expressionArr[1];
        expressionArr.splice(1, 1);
    }
    return expressionArr;
}

function evaluateInOrder(expression) { //Evaluate in the order of division, and multiplication then addition, and subtraction
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
    const result = evaluateInOrder(expressionArr)[0].toFixed(3);
    if (result === "Infinity" || result === "NaN") {
        return "UNDEFINED";
    } else  {
        return result;
    }
}

function addToDisplay(element) {
    if (display.textContent.length * 16 < display.offsetWidth - 24) {
    display.textContent += element.textContent;
    element.className === "num-button" ?  enableButtons(operandButtons) : disableButtons(operandButtons);
    }
}

function disableButtons(btnArr) {
    btnArr.forEach(btn => btn.disabled = true);
}

function enableButtons(btnArr) {
    btnArr.forEach(btn => btn.disabled = false);
}

numButtons.forEach(btn => btn.addEventListener("click", () => {
    if (numIsAns) {
        display.textContent = "";
        numIsAns = false;
    }
    addToDisplay(btn);
}));
operandButtons.forEach(btn => btn.addEventListener("click", () => {
    addToDisplay(btn);
    numIsAns = false;
}));

document.querySelector(".clear").addEventListener("click", () => {
    display.textContent = "";
    enableButtons(operandButtons);
});

document.querySelector(".equal").addEventListener("click", () => {
    try {
        display.textContent = evaluate(display.textContent);
    } catch(error) {
        console.log(error);
        display.textContent ="ERROR"
    }
    numIsAns = true;
});