String.prototype.replaceAll = function (find, replace) {return this.replace(new RegExp(find, 'g'), replace);};
const input = require("fs").readFileSync(__dirname + "/input.txt", "utf8").trim().split("\n").map(x => x.replaceAll(" ", "").split(""));

function parseArrString(arr) { // return a number
    const indexOfFirstBracket = arr.indexOf("(");
    if (indexOfFirstBracket !== -1) {
        let i = -1;
        let index = indexOfFirstBracket;
        do {
            if (arr[index] === "(") {
                i++;
                index++;
            } else if (arr[index] === ")") {
                i--;
                if (i === -1) {
                    break;
                }
                index++;
            } else {index++;}
        } while (true)
        const resultOfBracket = parseArrString(arr.slice(indexOfFirstBracket + 1, index));
        arr.splice(indexOfFirstBracket, index - indexOfFirstBracket + 1, resultOfBracket);
        return parseArrString(arr);
    } else if (arr.length === 1) {
        return Number(arr[0]);
    } else {
        const secondLast = arr.length - 2;
        const firstPart = parseArrString(arr.slice(0, secondLast));
        return arr[secondLast] === "*" 
            ? firstPart * Number(arr[arr.length - 1])
            : firstPart + Number(arr[arr.length - 1]);
    }
}
console.log(input.reduce((acc, curr) => parseArrString(curr) + acc,0));

function parseArrString2(arr) { // Part 2
    const indexOfFirstBracket = arr.indexOf("(");
    if (indexOfFirstBracket !== -1) {
        let i = -1;
        let index = indexOfFirstBracket;
        do {
            if (arr[index] === "(") {
                i++;
                index++;
            } else if (arr[index] === ")") {
                i--;
                if (i === -1) {
                    break;
                }
                index++;
            } else { index++; }
        } while (true)
        const resultOfBracket = parseArrString2(arr.slice(indexOfFirstBracket + 1, index));
        arr.splice(indexOfFirstBracket, index - indexOfFirstBracket + 1, resultOfBracket);
        return parseArrString2(arr);
    } else if (arr.length === 1) {
        return Number(arr[0]);
    } else {
        const indexOfPlus = arr.indexOf("+");
        if (indexOfPlus === -1) { // No more plus
            const firstPart = parseArrString2(arr.slice(0, arr.length - 2));
            return firstPart * Number(arr[arr.length - 1]);
        } else {
            const temp = Number(arr[indexOfPlus - 1]) + Number(arr[indexOfPlus + 1]);
            arr.splice(indexOfPlus - 1, 3, temp);
            return parseArrString2(arr);
        }
    }
}

console.log(input.reduce((acc, curr) => parseArrString2(curr) + acc,0));

