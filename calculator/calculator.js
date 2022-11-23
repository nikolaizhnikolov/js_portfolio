const displayHistory = document.querySelector(".display__history");
const displayResult = document.querySelector(".display__result");

let history = [["0"]];
let result = "0";

const updateHistory = () => displayHistory.textContent = history;

const setHistory = (value) => {
    history = [String(value)];
    displayHistory.textContent = history;
}

const setResult = (value) => {
    result = String(value);
    displayResult.textContent = result;
}

const deleteLastSymbol = () => {
    history.pop().pop();
    updateHistory();
}

const appendNumber = (n) => {
    if(Number(n) === NaN) { throw TypeError("Can only append numbers!"); }
    if(n === 0) { appendZero(); return; }

    // pop last symbol 
    // if number
    //  if zero pop another one to see whether to push or replace
    // else push 

    // dont forget to push the popped element first.
    // calculate result
}

const appendZero = () => {} 

const appendDecimalPoint = () => {}

const appendOperator = (o) => {
    // append logic
}

const negate = () => {

}

const evaluate = () => {

}

(function() {
    document.querySelector(".clear").addEventListener("click", () => {
        setHistory(0);
        setResult(0);
    });

    document.querySelector(".clearEntry").addEventListener("click", () => {
        setResult(0);
    });

    document.querySelector(".backspace").addEventListener("click", () => {
        deleteLastSymbol();
    });

    document.querySelectorAll(".number").forEach((n) => {
        appendNumber(n.dataset.value);
    });

    document.querySelector(".decimalPoint").addEventListener("click", () => {
        appendDecimalPoint();
    });

    document.querySelectorAll(".operator").forEach((n) => {
        appendOperator(n.dataset.value);
    });

    document.querySelectorAll(".negate").forEach((n) => {
        negate();
    });

    document.querySelectorAll(".equals").forEach((n) => {
        evaluate();
    });
})();