// Functional utils
function identity(a) {
    return a;
}
function compose(f, g) {
    return function (a) {
        return f(g(a));
    }
}
// removes any characters that are NOT letters
function removePunc(text) {
    return text.split('').filter(c => isLetter(c)).join('');
}
// makes all letters lowercase
function removeCase(text) {
    return text.toLowerCase();
}
// returns true if character is a letter
function isLetter(c) {
    return c.match(/[a-z|A-Z]/i);
}
function wordCompare(pairA, pairB) {
    if (pairA[0] > pairB[0])
        return 1;
    if (pairA[0] < pairB[0])
        return -1;
    return 0;
}
function countCompare(pairA, pairB) {
    return pairA[1] - pairB[1];
}
// returns a compare function from a list of compare functions
// comparing a and b first based on the first one, if equal on first, based on second, etc...
function multiLevelCompare(listOfCompares) {
    return function (a, b) {
        for (var i = 0; i < listOfCompares.length - 1; i++) {
            const comparison = listOfCompares[i](a, b);
            if (comparison !== 0) // a != b
                return comparison;
        }
        return listOfCompares[listOfCompares.length - 1](a, b);
    }
}
// composes a new sanitization function from a map of functions to booleans telling if we should add that function
function createSanitizationFunction(mapOfSanitization) {
    let sanitizationFunc = identity;
    mapOfSanitization.forEach(function(useSanitizeFunc, sanitizeFunc) {
        if (useSanitizeFunc)
            sanitizationFunc = compose(sanitizeFunc, sanitizationFunc);
    });
    return sanitizationFunc;
}
// Question 1
function parseText(text, caseSensitive = true, puncSensitive = true) {
    const sanitizationFunc = createSanitizationFunction(new Map([[removeCase, !caseSensitive], [removePunc, !puncSensitive]]));
    const hashmap = {};
    text.split(' ').forEach(word => {
        const sWord = sanitizationFunc(word);
        if (sWord in hashmap)
            hashmap[sWord]++;
        else
            hashmap[sWord] = 1;
    });
    return Object.entries(hashmap);
}
// Question 2
function sortText(arr, word) {
    if (word)
        return arr.sort(multiLevelCompare([wordCompare, countCompare]));
    return arr.sort(multiLevelCompare([countCompare, wordCompare]));
}