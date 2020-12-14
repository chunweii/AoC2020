const fs = require("fs");
let inputString;
let thePromise = new Promise((resolve, reject) => {
    fs.readFile(__dirname + "/input.txt", "utf8", (err, data) => {
        inputString = data;
        resolve();
    });
});
function build_arr(arr) {
    const result = [];
    for (let i = 0; i < arr[0].length; i++) {
        let is_in_others = true;
        for (let j = 1; j < arr.length; j++) {
            if (!arr[j].includes(arr[0][i])) {
                is_in_others = false;
                break;
            }
        }
        if (is_in_others) {
            result.push(arr[0][i]);
        }
    }
    return result;
}
thePromise.then(() => {
    console.log(
        inputString.split("\n\n").map(grp => {
            const removed_duplicates = Array.from(new Set(grp.split("")));
            const indexOfNewLine = removed_duplicates.indexOf("\n");
            if (indexOfNewLine !== -1) { removed_duplicates.splice(indexOfNewLine, 1); }
            return removed_duplicates.length;
        }).reduce((a, b) => a + b, 0));
    console.log(
    inputString
        .split("\n\n").map(grp => {
            const members = grp.split("\n").map(ind => ind.split(""));
            return build_arr(members);
        }).reduce((a, b) => a + b.length, 0)
    );
});