
function removePunc(text) {
    return text.split('').filter(c => isLetter(c)).join('');
}
function removeCase(text) {
    return text.toLowerCase();
}
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
function identity(a) {
    return a;
}
function compose(f, g) {
    return function (a) {
        return f(g(a));
    }
}
function multiLevelCompare(listOfCompares) {
    return function (a, b) {
        for (i = 0; i < listOfCompares.length - 1; i++) {
            const comparison = listOfCompares[i](a, b);
            if (comparison !== 0) // a != b
                return comparison;
        }
        return listOfCompares[listOfCompares.length - 1](a, b);
    }
}
function parseText(text, caseSensitive = true, puncSensitive = true) {
    let sanitize = identity;
    if (!caseSensitive)
        sanitize = compose(removeCase, sanitize);
    if (!puncSensitive)
        sanitize = compose(removePunc, sanitize);

    const hashmap = new Map();

    text.split(' ')
        .forEach(word => {
            const sWord = sanitize(word);
            if (hashmap.has(sWord))
                hashmap.set(sWord, hashmap.get(sWord) + 1);
            else
                hashmap.set(sWord, 1);
        });

    return Array.from(hashmap.entries());
}
function sortText(arr, word) {
    if (word)
        return arr.sort(multiLevelCompare([wordCompare, countCompare]));
    return arr.sort(multiLevelCompare([countCompare, wordCompare]));

}


// MAIN
const arr = parseText("He saw her walking, so he asked her.", false, false);
console.log(sortText(arr, true));