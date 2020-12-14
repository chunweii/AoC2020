const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").map(x => x.split(""));
let n = 0;
// Part 1
function iterCheck(inputArr) {
    const result = [...inputArr].map(x => [...x]);
    let changed = false;
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[0].length; j++) {
            const theSeat = inputArr[i][j];
            if (theSeat === ".") {
                continue;
            }
            let count = 0;
            for (let k = i - 1; k <= i + 1; k++) {
                for (let l = j - 1; l <= j + 1; l++) {
                    if ((k === i && l === j) || (k < 0 || k >= result.length || l < 0 || l >= result[0].length)) {
                        continue;
                    } else if (inputArr[k][l] === "#") {
                        count++;
                    }
                }
            }
            if (count >= 4 && theSeat === "#") {
                result[i][j] = "L";
                changed = true;
            } else if (count === 0 && theSeat === "L") {
                result[i][j] = "#";
                changed = true;
            }
        }
    }
    if (changed) {
        return iterCheck(result);
    } else {
        return inputArr;
    }
}
console.log(iterCheck(input)
.reduce((acc, curr) => acc + curr.reduce((acc, curr) => curr === "#" ? acc + 1: acc, 0), 0)
);
// Part 2
function iterCheck2(inputArr) {
    const result = [...inputArr].map(x => [...x]);
    let changed = false;
    function helper(i, j, right, down) {
        if (i < 0 || i >= result.length || j < 0 || j >= result[0].length || inputArr[i][j] === "L") {
            return 0;
        } else if (inputArr[i][j] === ".") {
            return helper(i + down, j + right, right, down);
        } else { // inputArr[i][j] === "#"
            return 1;
        }
    }
    for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[0].length; j++) {
            const theSeat = inputArr[i][j];
            if (theSeat === ".") {
                continue;
            }
            let count = helper(i + 1, j, 0, 1) + // down
                helper(i - 1, j, 0, -1) + // up
                helper(i, j - 1, -1, 0) + // left
                helper(i, j + 1, 1, 0) + // right
                helper(i - 1, j - 1, -1, -1) + // up left
                helper(i - 1, j + 1, 1, -1) + // up right
                helper(i + 1, j - 1, -1, 1) + // down left
                helper(i + 1, j + 1, 1, 1);// down right
            if (count >= 5 && theSeat === "#") {
                result[i][j] = "L";
                changed = true;
            } else if (count === 0 && theSeat === "L") {
                result[i][j] = "#";
                changed = true;
            }
        }
    }
    if (changed) {
        return iterCheck2(result);
    } else {
        return inputArr;
    }
}
console.log(iterCheck2(input).reduce((acc, curr) => acc + curr.reduce((acc, curr) => curr === "#" ? acc + 1 : acc, 0), 0));