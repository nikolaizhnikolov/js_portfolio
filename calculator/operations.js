const operations = (function() {
    const add       = (a, b) => a + b;
    const subtract  = (a, b) => a - b;
    const multiply  = (a, b) => a * b;
    const divide    = (a, b) => a / b;
    const remainder = (a, b) => a % b;

    const OP_ADD        = "+";
    const OP_SUBTRACT   = "-";
    const OP_MULTIPLY   = "*";
    const OP_DIVIDE     = "/";
    const OP_REMAINDER  = "*";
    
    const OPERATORS =  {
        OP_ADD :        add,
        OP_SUBTRACT :   subtract,
        OP_MULTIPLY :   multiply,
        OP_DIVIDE :     divide,
        OP_REMAINDER :  remainder
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

    return {
        operate,
        operators
    }
})();