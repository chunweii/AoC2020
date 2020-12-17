const input = require("fs").readFileSync(__dirname + "/input.txt", "utf8").trim().split("\n").map(x => x.split("").map(y => y === "#" ? 1 : 0));
const numTurns = 6;
const sideLength = input.length + 2 * numTurns; // Side length of result
const thickness = 1 + 2 * numTurns;
 
function init3DArr(length) {
    const newArr = new Array(thickness);
    for (let i = 0; i < thickness; i++) {
        newArr[i] = new Array(length);
        for (let j = 0; j < length; j++) {
            newArr[i][j] = new Array(length);
            for (let k = 0; k < length; k++) {
                newArr[i][j][k] = 0;
            }
        }
    }
    return newArr;
}

function getAdjacentNumbers(i, j, k, arr) {
    const result = [];
    for (let x = i - 1; x <= i + 1; x++) {
        if (x < 0 || x >= thickness) {
            continue;
        }
        for (let y = j - 1; y <= j + 1; y++) {
            if (y < 0 || y >= sideLength) {
                continue;
            }
            for (let z = k - 1; z <= k + 1; z++) {
                if (z < 0 || z >= sideLength || (x === i && y === j && z === k)) {
                    continue;
                } else {
                    result.push(arr[x][y][z]);
                }
            }
        }
    }
    return result;
}

function getNewArr(arr) {
    const result = init3DArr(sideLength);
    for (let i = 0; i < thickness; i++) {
        for (let j = 0; j < sideLength; j++) {
            for (let k = 0; k < sideLength; k++) {
                const num = getAdjacentNumbers(i, j, k, arr).filter(x => x === 1).length;
                if (arr[i][j][k] === 1 && !(num === 2 || num === 3)) {
                    result[i][j][k] = 0;
                } else if (arr[i][j][k] === 0 && num === 3) {
                    result[i][j][k] = 1;
                } else {
                    result[i][j][k] = arr[i][j][k];
                }
            }
        }
    }
    return result;
}

let bigInput = init3DArr(sideLength);
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
        bigInput[numTurns][i + numTurns][j + numTurns] = input[i][j];
    }
}

for (let i = 0; i < numTurns; i++) {
    bigInput = getNewArr(bigInput);
}

function countOnes(arr) {
    if (Array.isArray(arr)) {
        return arr.reduce((acc, curr) => acc + countOnes(curr),0);
    } else if (arr === 1) {
        return 1;
    } else {
        return 0;
    }
}
console.log(countOnes(bigInput));

function init4DArr(length) {
    const newArr = new Array(thickness);
    for (let h = 0; h < thickness; h++) {
        newArr[h] = new Array(thickness);
        for (let i = 0; i < thickness; i++) {
            newArr[h][i] = new Array(length);
            for (let j = 0; j < length; j++) {
                newArr[h][i][j] = new Array(length);
                for (let k = 0; k < length; k++) {
                    newArr[h][i][j][k] = 0;
                }
            }
        }
    }
    return newArr;
}

function getAdjacentNumbers4D(h, i, j, k, arr) {
    const result = [];
    for (let w = h - 1; w <= h + 1; w++) {
        if (w < 0 || w >= thickness) {
            continue;
        }
        for (let x = i - 1; x <= i + 1; x++) {
            if (x < 0 || x >= thickness) {
                continue;
            }
            for (let y = j - 1; y <= j + 1; y++) {
                if (y < 0 || y >= sideLength) {
                    continue;
                }
                for (let z = k - 1; z <= k + 1; z++) {
                    if (z < 0 || z >= sideLength || (w === h && x === i && y === j && z === k)) {
                        continue;
                    } else {
                        result.push(arr[w][x][y][z]);
                    }
                }
            }
        }
    }
    return result;
}

function getNewArr4D(arr) {
    const result = init4DArr(sideLength);
    for (let h = 0; h < thickness; h++) {
        for (let i = 0; i < thickness; i++) {
            for (let j = 0; j < sideLength; j++) {
                for (let k = 0; k < sideLength; k++) {
                    const num = getAdjacentNumbers4D(h, i, j, k, arr).filter(x => x === 1).length;
                    if (arr[h][i][j][k] === 1 && !(num === 2 || num === 3)) {
                        result[h][i][j][k] = 0;
                    } else if (arr[h][i][j][k] === 0 && num === 3) {
                        result[h][i][j][k] = 1;
                    } else {
                        result[h][i][j][k] = arr[h][i][j][k];
                    }
                }
            }
        }
    }
    return result;
}

bigInput = init4DArr(sideLength);
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
        bigInput[numTurns][numTurns][i + numTurns][j + numTurns] = input[i][j];
    }
}
for (let i = 0; i < numTurns; i++) {
    bigInput = getNewArr4D(bigInput);
}
console.log(countOnes(bigInput));