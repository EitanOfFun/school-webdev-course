
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
function accessAndCompare(accessFunc, compareFunc) {
    return function (a, b) {
        return compareFunc(accessFunc(a), accessFunc(b));
    }
}
function compareByTwo(firstCompare, secondCompare) {
    return function(a, b) {
        return firstCompare(a, b) || secondCompare(a, b);
    }
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
function sortText(arr, word) {
    const compareByCount = accessAndCompare(second, numCompare);
    const compareByWord = accessAndCompare(first, stringCompare);
    const compareByWordThenByCount = compareByTwo(compareByWord, compareByCount);
    const compareByCountThenByWord = compareByTwo(compareByCount, compareByWord);
    if (word)
        return arr.sort(compareByWordThenByCount);
    return arr.sort(compareByCountThenByWord);
}

const arr = parseText("He saw her walking, so he asked her.", false, false);
console.log(sortText(arr, true));