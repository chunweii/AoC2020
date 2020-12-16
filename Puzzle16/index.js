const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n\n");

const rules = {};

for (const line of input[0].split("\n")) {
    const splitLine = line.split(": ")
    rules[splitLine[0]] = splitLine[1].split(" or ").map(x => x.split("-").map(Number));
}

function check(num) {
    const allPossibleFields = [];
    for (const prop in rules) {
        const rule = rules[prop];
        if ((num < rule[0][0] || num > rule[0][1]) && (num < rule[1][0] || num > rule[1][1])) {
            continue;
        } else {
            allPossibleFields.push(prop);
        }
    }
    return allPossibleFields;
}

function arrIntersection(arr1, arr2) {
    const result = [];
    for (const entry of arr1) {
        if (arr2.includes(entry)) {
            result.push(entry);
        }
    }
    return result;
}

const nearbyTic = input[2].split("\n").slice(1).map(x => x.split(",").map(Number));
let part1 = 0;
const possibleFields = nearbyTic[0].map(x => Object.getOwnPropertyNames(rules));
for (const line of nearbyTic) {
    for (let i = 0; i < line.length; i++) {
        const num = line[i];
        const allPossibleFields = check(num);
        if (allPossibleFields.length === 0) {
            part1 += num;
        } else {
            possibleFields[i] = arrIntersection(possibleFields[i], allPossibleFields);
        }
    }
}
console.log("Part 1 is " + part1);

const checkedEntries = [];
function checkLength(arrfields) {
    for (let i = 0; i < arrfields.length; i++) {
        if (!checkedEntries[i] && arrfields[i].length === 1) {
            checkedEntries[i] = true;
            return i;
        }
    }
    return -1;
}

let index = checkLength(possibleFields);
while (index !== -1) {
    for (let i = 0; i < possibleFields.length; i++) {
        if (i === index) {
            continue;
        } else {
            const indexOfTheElement = possibleFields[i].indexOf(possibleFields[index][0]);
            if (indexOfTheElement !== -1) {
                possibleFields[i].splice(indexOfTheElement, 1);
            }
        }
    }
    index = checkLength(possibleFields);
}

const myTicket = input[1].split("\n")[1].split(",").map(Number);

const part2 = possibleFields.reduce((acc, curr, ind) => curr[0].match(/^departure/) !== null ? acc * myTicket[ind] : acc, 1);

console.log("Part 2 is " + part2);