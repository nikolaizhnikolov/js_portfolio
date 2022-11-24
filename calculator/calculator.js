const displayHistory = document.querySelector(".display__history");
const displayResult = document.querySelector(".display__result");

const ZERO = "0";

let history = [ZERO];
let result = ZERO;

const updateHistory = () => displayHistory.textContent = history;
const updateResult = () => displayResult.textContent = result;

const setHistory = (value) => {
    history = [String(value)];
    updateHistory();
}

const setResult = (value) => {
    result = String(value);
    updateResult();
}

const clear = () => {
    setHistory(ZERO);
    setResult(ZERO);
}

const clearEntry = () => setResult(ZERO);

const deleteLast = () => {
    let entry = history[history.length - 1];
    entry = entry.slice(0, entry.length - 1);

    if(entry.length === 0 || entry === "-")
        history.pop();
    else
        history[history.length - 1] = entry;

    if(history.length === 0)
        setHistory(ZERO);

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

const appendZero = () => {
    // dont forget to push the popped element first.
    // calculate result
} 

const appendDecimalPoint = () => {
    // dont forget to push the popped element first.
}

const appendOperator = (o) => {
}

const negate = () => {
    const last = Number(history[history.length - 1]);
    if(last !== NaN && last !== "0") {
        history[history.length - 1] = String(-last);
    }
    updateHistory();
}

const evaluate = () => {

}

(function() {
    document.querySelector(".clear")
        .addEventListener("click", () => clear());
    document.querySelector(".clearEntry")
        .addEventListener("click", () => clearEntry());
    document.querySelector(".backspace")
        .addEventListener("click", () => deleteLast());

    document.querySelectorAll(".number").forEach((n) => {
        n.addEventListener(("click"), appendNumber(n.dataset.value));
    });

    document.querySelector(".decimalPoint").addEventListener("click", () => {
        appendDecimalPoint();
    });

    document.querySelectorAll(".operator").forEach((n) => {
        n.addEventListener(("click"), appendOperator(n.dataset.value));
    });

    document.querySelector(".negate").addEventListener("click", () => {
        negate();
    });

    document.querySelector(".evaluate").addEventListener("click", () => {
        evaluate();
    });
})();