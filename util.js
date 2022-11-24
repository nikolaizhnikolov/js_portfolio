const util = (function() {
    const clamp = function(value, min, max) {
        value = Number(value);
        min   = Number(min);
        max   = Number(max);

        if(isNaN(value) || isNaN(min) || isNaN(max))
            throw TypeError("Expected values convertable to Numeric!");
            
        return Math.min(max, Math.max(min,value));
    }

    return {
        clamp: clamp
    }
})();