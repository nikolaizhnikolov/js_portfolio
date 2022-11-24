const displayHistory = document.querySelector(".display__history");
const displayResult = document.querySelector(".display__result");

const ZERO = "0";
const DECIMAL_POINT = ".";

let history = [ZERO];
let result = ZERO;

const LAST_ENTRY = () => history.length - 1;
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
    let entry = history[LAST_ENTRY()];
    entry = entry.slice(0, entry.length - 1);

    if(entry.length === 0 || entry === "-")
        history.pop();
    else
        history[LAST_ENTRY()] = entry;

    if(history.length === 0)
        setHistory(ZERO);

    updateHistory();
}

const appendNumber = (n) => {
    if(Number(n) === NaN) { throw TypeError("Can only append numbers!"); }

    let entry = history[LAST_ENTRY()];
    if(Number(entry) !== NaN) {
        if(entry === ZERO)
            entry = n;
        else
            entry += n;
        history[LAST_ENTRY()] = entry;
    } else {
        history.push(String(n));
    }

    updateHistory();
    evaluate();
}

const appendDecimalPoint = () => {
    const entry = history[LAST_ENTRY()];
    if(Number(entry) !== NaN && !(entry.includes(DECIMAL_POINT))){
        history[LAST_ENTRY()] = entry + DECIMAL_POINT;
    }

    updateHistory();    
}

const appendOperator = (o) => {
}

const negate = () => {
    const entry = Number(history[LAST_ENTRY()]);
    if(entry !== NaN && entry !== ZERO) {
        history[LAST_ENTRY()] = String(-entry);
    }
    updateHistory();
}

const evaluate = () => {

}

(function() {
    document.querySelector(".clear")
        .addEventListener("click", clear);
    document.querySelector(".clearEntry")
        .addEventListener("click", clearEntry);
    document.querySelector(".backspace")
        .addEventListener("click", deleteLast);

    document.querySelectorAll(".number").forEach((n) => {
        n.addEventListener("click", () => appendNumber(n.dataset.value));
    });

    document.querySelector(".decimalPoint")
        .addEventListener("click", appendDecimalPoint);

    document.querySelectorAll(".operator").forEach((n) => {
        n.addEventListener("click", () => appendOperator(n.dataset.value));
    });

    document.querySelector(".negate")
        .addEventListener("click", negate);
    document.querySelector(".evaluate")
        .addEventListener("click", evaluate);
})();