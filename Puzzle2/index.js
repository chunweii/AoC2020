const fs = require("fs");

const inputLines = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").map(x => {
    const result = x.split(" ");
    result[0] = result[0].split("-").map(x => parseInt(x));
    result[1] = result[1][0];
    return result;
});

console.log("Part 1 is " + inputLines.reduce((acc, curr) => {
    const num = (curr[2].match(new RegExp(curr[1], "g")) || []).length;
    return num >= curr[0][0] && num <= curr[0][1] ? acc + 1 : acc;
}, 0));

console.log("Part 2 is " + inputLines.reduce((acc, curr) => 
    (curr[2][curr[0][0] - 1] === curr[1] || curr[2][curr[0][1] - 1] === curr[1]) &&
     !(curr[2][curr[0][0] - 1] === curr[1] && curr[2][curr[0][1] - 1] === curr[1]) 
        ? acc + 1 : acc, 0));