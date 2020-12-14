const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n");

const mapOfNumbers = new Map();
const mapOfNumbers2 = new Map();

let mask = []; // reversed

function display(x) {
    console.log(x);
    return x;
}

input.forEach(line => {
    if (line[1] === "a") { // Mask
        mask = line.slice(7).split("").reverse();
    } else { // mem
        const temp = line.split(" = ");
        const number = parseInt(temp[1]);
        const numberArr = number.toString(2).split("").reverse();
        const index = parseInt(temp[0].slice(4, -1));
        const result = mask.reduce((acc, curr, ind) => curr === "X" ?  (numberArr[ind] || 0) + acc : curr + acc,"");
        mapOfNumbers.set(index, parseInt(result.split(/[,\s]/).reverse().join(), 2));
        // Part 2
        const addr = index.toString(2).split("").reverse();
        const intermediateResult = mask.reduce((acc, curr, ind) => (curr === "0" ? addr[ind] || 0 : curr) + acc, "");
        const allAddresses = combinations(intermediateResult);
        allAddresses.forEach(x => {
            mapOfNumbers2.set(x, number);
        })
    }
});

function combinations(str) { // returns an array of numbers (addresses)
    if (str.includes("X")) {
        const new1 = str.replace("X", "1");
        const new2 = str.replace("X", "0");
        return [...combinations(new1), ...combinations(new2)];
    } else {
        return [str];
    }
}
let part1Ans = 0;
mapOfNumbers.forEach(val => {
    part1Ans += val;
});

console.log(part1Ans);

let part2Ans = 0;
mapOfNumbers2.forEach(val => {
    part2Ans += val;
});

console.log(part2Ans);