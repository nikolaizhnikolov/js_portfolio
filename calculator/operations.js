const add       = (a, b) => a + b;
const subtract  = (a, b) => a - b;
const multiply  = (a, b) => a * b;
const divide    = (a, b) => a / b;
const remainder = (a, b) => a % b;

const ADD = "+";
const SUBTRACT = "-";
const MULTIPLY = "*";
const DIVIDE = "/";
const REMAINDER = "%";

const OPERATORS =  {
    "+" : add,
    "-" : subtract,
    "*" : multiply,
    "/" : divide,
    "%" : remainder
}

const operate = function (operator, a, b) {
    if(!OPERATORS[operator]) {
        throw TypeError("No such operator exists!");
    }

    a = Number(a);
    b = Number(b);

    if (isNaN(a) || isNaN(b)) {
        throw TypeError("Operation Arguments Must be Numeric!");
    }
    
    return OPERATORS[operator](a, b);
}