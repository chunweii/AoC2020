const fs = require("fs");
const preambleLength = 25;
const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").map(x=>parseInt(x));
function find(num, arr) {
    const theArr = arr.sort((a, b) => a - b);
    let low = 0;
    let high = theArr.length - 1;
    while (low < high) {
        const sum = theArr[low] + theArr[high];
        if (sum === num) {
            return true;
        } else if (sum < num) {
            low++;
        } else {
            high--;
        }
    }
    return false;
}

let index = 0;
const len = input.length;
let part1;
while (index < len) {
    if (index < preambleLength || find(input[index], input.slice(index - preambleLength, index))) {
        index++;
        continue;
    } else {
        part1 = {index: index, number: input[index]};
        console.log(part1);
        break;
    }
}
index = 0;
function part2() {let sum;
while (index < part1.index - 1) {
    sum = 0;
    let found = false;
    for (let i = index; i < part1.index; i++) {
        sum += input[i];
        if (sum === part1.number) {
            found = true;
            const ans = input.slice(index, i + 1).sort((a, b) => a - b);
            console.log(ans[ans.length - 1] + ans[0]);
            break;
        } else if (sum < part1.number) {
            continue;
        } else {
            break;
        }
    }
    if (found) {
        break;
    } else {
        index++;
    }
}}
part2();