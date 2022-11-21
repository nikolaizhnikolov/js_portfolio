const add       = (a, b) => a + b;
const subtract  = (a, b) => a - b;
const multiply  = (a, b) => a * b;
const divide    = (a, b) => a / b;
const remainder = (a, b) => a % b;

const ADD = 0;
const SUBTRACT = 1;
const MULTIPLY = 2;
const DIVIDE = 3;
const REMAINDER = 4;

const OPERATORS =  {
    0 : add,
    1 : subtract,
    2 : multiply,
    3 : divide,
    4 : remainder
}

const operate = function (operator, a, b) {
    if(!OPERATORS[operator]) {
        throw TypeError("No such operator exists!");
    }

    if (typeof a !== "number" || typeof b !== "number") {
        throw TypeError("Operation Arguments Must be Numeric!");
    }
    
    return OPERATORS[operator](a, b);
}

let history = "";
let result = "";

(function() {
    const displayHistory = document.querySelector(".display__history");
    const displayResult = document.querySelector(".display__result");

    const updateResult = function() {
        displayResult.textContent = result;
    }

    const numbers = document.querySelectorAll(".number");
    console.log(numbers);
    numbers.forEach((n) => {
        n.addEventListener("click", () => {
            result += n.textContent;
            updateResult();
        })
    });

})();