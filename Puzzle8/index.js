const fs = require("fs");
const inputString = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").map(x => {
    const result = x.split(" ");
    result[1] = parseInt(result[1]);
    return result;
});
const len = inputString.length;
function calculateAcc() {
    let index = 0;
    let accumulator = 0;
    const mem = [];
    while (mem[index] === undefined) {
        if (index >= len) {
            return {acc: accumulator, noInfinite: true};
        }
        const line = inputString[index];
        if (line[0] === "acc") {
            accumulator += line[1];
            mem[index++] = true;
            continue;
        } else if (line[0] === "jmp") {
            mem[index] = true;
            index += line[1];
            continue;
        } else {
            mem[index++] = true;
            continue;
        }
    }
    return { acc: accumulator, noInfinite: false };
}
console.log("Part 1: " + calculateAcc().acc);
for (let i = 0; i < len; i++) {
    if (inputString[i][0] === "acc") {
        continue;
    } else if (inputString[i][0] === "nop") {
        inputString[i][0] = "jmp";
        const calObj = calculateAcc();
        if (calObj.noInfinite) {
            console.log("Part 2: " + calObj.acc);
            break;
        }
        inputString[i][0] = "nop";
    } else { // "jmp"
        inputString[i][0] = "nop";
        const calObj = calculateAcc();
        if (calObj.noInfinite) {
            console.log("Part 2: " + calObj.acc);
            break;
        }
        inputString[i][0] = "jmp";
    }
}