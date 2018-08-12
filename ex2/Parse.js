
function removePunc(text) {
    return text.split('').filter(c => isLetter(c)).join('');
}
function removeCase(text) {
    return text.toLowerCase();
}
function isLetter(c) {
    return c.match(/[a-z|A-Z]/i);
}
function first(arr) {
    return arr[0];
}
function second(arr) {
    return arr[1];
}
function stringCompare(s1, s2) {
    if (s1 > s2)
        return 1;
    if (s1 < s2)
        return -1;
    return 0;
}
function numCompare(n1, n2) {
    return n1 - n2;
}

function identity(a) {
    return a;
}
function compose(f, g) {
    return function (a) {
        return f(g(a));
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
function accessAndCompareByTwo(firstCompare, secondCompare, firstAccess, secondAccess) {
    return function (a, b) {
        return firstCompare(firstAccess(a), firstAccess(b)) || secondCompare(secondAccess(a), secondAccess(b));
    }
}
function sortText(arr, word) {
    if (word)
        return arr.sort(accessAndCompareByTwo(stringCompare, numCompare, first, second));
    return arr.sort(accessAndCompareByTwo(numCompare, stringCompare, second, first));
}


// MAIN
const arr = parseText("He saw her walking, so he asked her.", false, false);
console.log(sortText(arr, false));