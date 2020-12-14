'use strict';
const fs = require("fs");
const inputArr = fs.readFileSync(__dirname + "/input3.txt", "utf8").split("\n").map(x => parseInt(x)).sort((a, b) => a - b);
const lastIndex = inputArr.length - 1;
// Part 1
const {d1, d2, d3} = (inputArr.reduce((acc, curr, ind) => {
    if (curr === 0) {
        return acc;
    }
    const diff = curr - inputArr[ind - 1];
    if (diff === 1) {
        acc.d1++;
    } else if (diff === 2) {
        acc.d2++;
    } else if (diff === 3) {
        acc.d3++;
    } else {
        console.log("weird");
    }
    if (ind === lastIndex) {
        acc.d3++;
    }
    return acc;
} , {d1: 0, d2: 0, d3: 0}));
console.log("Part 1: " + d1*d3);
// Part 2
const mem = [];
function find(index) {
    if (index === lastIndex) {
        return 1;
    } else if (index === -1) {
        return 0;
    } else if (mem[index] === undefined) {
        mem[index] = find(inputArr.indexOf(inputArr[index] + 1)) + find(inputArr.indexOf(inputArr[index] + 2)) + find(inputArr.indexOf(inputArr[index] + 3));
        return mem[index];
    } else {
        return mem[index];
    }
}
find(0);
console.log("Part 2: " + mem[0]);