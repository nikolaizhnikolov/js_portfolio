const displayHistory = document.querySelector(".display__history");
const displayResult = document.querySelector(".display__result");

const ZERO          = "0";
const WHITESPACE    = " ";
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

    if(entry.length === 0 || entry === operations.MINUS)
        history.pop();
    else
        history[LAST_ENTRY()] = entry;

    if(history.length === 0)
        setHistory(ZERO);

    updateHistory();
    evaluate();
}

const appendNumber = (num) => {
    if(isNaN(num)) { throw TypeError("Can only append numbers!"); }

    let entry = history[LAST_ENTRY()];
    if(!isNaN(entry)) {
        if(entry === ZERO) {
            entry = num;
        } else {
            entry += num;
            entry = String(util.clamp(entry, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER));
        }

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
    evaluate();
}

const evaluate = () => {
    if(history.length < 3) {
        setResult(history[0]);
        return;
    }

    let base = Number(history[0]);
    for(let i = 2; i < history.length; i+= 2) {
        const entry = Number(history[i]);
        const operator = history[i-1];

        if(entry === 0 && operator === operations.DIVIDER) {
            setHistory(ZERO);
            setResult("Cannot divide by zero!");
            return;
        }

        base = operations.operate(operator, base, entry);
    }

    setResult(base);
}

(function() {
    function initDefaultEvents() {
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
            .addEventListener("click", () => {
                evaluate();
                setHistory(ZERO);
        });
    }

    function initKeyboardEvents() {    
        document.addEventListener("keydown", (e) => {
            console.log(e.code);
            const shiftHeld = e.shiftKey;
            const code = e.code.toLowerCase();
            switch (true) {
                case /escape/.test(code): 
                    clear(); break;
                case /backspace/.test(code):
                    deleteLast(); break;

                case /enter/.test(code):
                case /numpadenter/.test(code):
                    evaluate(); 
                    setHistory(ZERO); break;
                    
                case /equal/.test(code) && shiftHeld:
                case /numpadadd/.test(code):
                    appendOperator(operations.PLUS); break;

                case /minus/.test(code) && shiftHeld:
                case /numpadsubtract/.test(code):
                    appendOperator(operations.MINUS); break;

                case /digit8/.test(code) && shiftHeld:
                case /numpadmultiply/.test(code):
                    appendOperator(operations.MULTIPLIER); break;

                case /slash/.test(code):
                case /numpaddivide/.test(code):
                    appendOperator(operations.DIVIDER); break;
                    
                case /digit5/.test(code) && shiftHeld:
                    appendOperator(operations.REMAINDER); break;

                case /digit|numpad\d/.test(code):
                    appendNumber(code.match(/\d/)[0]); break;
                case /period/.test(code):
                    appendDecimalPoint(); break;
            }
        });
    
    
        document.querySelectorAll(".operator").forEach((n) => {
            n.addEventListener("click", () => appendOperator(n.dataset.value));
        });
    
        document.querySelector(".negate")
            .addEventListener("click", negate);
        document.querySelector(".evaluate")
            .addEventListener("click", () => {
                evaluate();
                setHistory(ZERO);
            });

    }

    initDefaultEvents();
    initKeyboardEvents();
})();