const util = (function() {
    const clamp = function(value, min, max) {
        return Math.min(max, Math.max(min,value));
    }

    return {
        clamp: clamp
    }
})();