const displayHistory = document.querySelector(".display__history");
const displayResult = document.querySelector(".display__result");

let history = "";
let result = "";

const appendHistory = (value) => {
    history += value;
    displayHistory.textContent = history;
}

const setHistory = (value) => {
    history = String(value);
    displayHistory.textContent = history;
}

const setResult = (value) => {
    result = String(value);
    displayResult.textContent = result;
}

(function() {
    document.querySelector(".clear").addEventListener("click", () => {
        setHistory(0);
        setResult(0);
    });

    document.querySelectorAll(".number").forEach((n) => {
        n.addEventListener("click", () => {
            if(Number(history) === 0)
                setHistory(n.dataset.value);
            else
                appendHistory(n.dataset.value);
        })
    });

    document.querySelector(".zero").addEventListener("click", () => {
        if(Number(history) !== 0 && !(history.includes(".")))
            appendHistory(0);
    })

    // const decimalPoint ...

    // const clear ...

    // const operators ... one-by-one.

})();