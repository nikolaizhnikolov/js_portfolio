const displayHistory = document.querySelector(".display__history");
const displayResult = document.querySelector(".display__result");

const ZERO          = "0";
const WHITESPACE    = " ";
const DASH          = "-";
const DECIMAL_POINT = ".";

let history = [ZERO];
let result = ZERO;

const LAST_ENTRY =      () =>  history.length - 1;
const updateResult =    () =>  displayResult.textContent = result;
const updateHistory =   () =>  displayHistory.textContent = history.reduce(
    (text, entry) => text + WHITESPACE + entry,
    "");

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

    if(entry.length === 0 || entry === DASH)
        history.pop();
    else
        history[LAST_ENTRY()] = entry;

    if(history.length === 0)
        setHistory(ZERO);

    updateHistory();
}

const appendNumber = (num) => {
    if(isNaN(num)) { throw TypeError("Can only append numbers!"); }

    let entry = history[LAST_ENTRY()];
    if(!isNaN(entry)) {
        if(entry === ZERO)
            entry = num;
        else
            entry += num;
        history[LAST_ENTRY()] = entry;
    } else {
        history.push(String(num));
    }

    updateHistory();
    evaluate();
}

const appendDecimalPoint = () => {
    const entry = history[LAST_ENTRY()];
    if(!isNaN(entry) && !(entry.includes(DECIMAL_POINT))){
        history[LAST_ENTRY()] = entry + DECIMAL_POINT;
    }

    updateHistory();
}

const appendOperator = (op) => {
    const entry = history[LAST_ENTRY()];
    if(isNaN(entry))
        history[LAST_ENTRY()] = op;
    else
        history.push(op);

    updateHistory();
}

const negate = () => {
    const entry = Number(history[LAST_ENTRY()]);
    if(!isNaN(entry) && Number(entry) !== 0) {
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