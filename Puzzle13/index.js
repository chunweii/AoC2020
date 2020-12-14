const fs = require("fs");
const {chineseRemainder} = require("./modularArithmetic.js");
const input = fs.readFileSync(__dirname + "/input2.txt", "utf8").split("\n");

const arrNumbers = 
input[1]
.split(",").filter(x => x !== "x").map(x => parseInt(x));
const arrPart1 = arrNumbers.map(x => x - input[0] % x);
const minNumber = Math.min(...arrPart1)
console.log("Part 1: " + minNumber * arrNumbers[arrPart1.indexOf(minNumber)]);
const part2 = 
input[1]
.split(",").map((x, i) => {
    if (x !== "x") {
        const newX = parseInt(x);
        return [i === 0 ? i : newX - i % newX, newX]
    } else {
        return x;
    }
}).filter(x => x !== "x");
console.log("Part 2: " + chineseRemainder(...part2));
console.log(part2);