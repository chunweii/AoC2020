const timeNow = Date.now();
const input = [2, 15, 0, 9, 1, 20];
let turn = input.length + 1;
let prev = input[input.length - 1];
const mem = new Map();
input.forEach((x, i) => {
    mem.set(x, [i + 1]);
});
function cutArray(arr) {
    if (arr.length <= 2) {
    } else {
        arr.shift();
    }
    return arr;
}
while (turn <= 30000000) {
    const prevArr = mem.get(prev);
    if (prevArr.length === 1) {
        const theArr = mem.get(0);
        if (theArr === undefined) {
            mem.set(0, [turn++]);
        } else {
            theArr.push(turn++);
            cutArray(theArr);
        }
        prev = 0;
    } else {
        const diff = prevArr[1] - prevArr[0];
        const theArr = mem.get(diff);
        if (theArr === undefined) {
            mem.set(diff, [turn++]);
        } else {
            theArr.push(turn++);
            cutArray(theArr);
        }
        prev = diff;
    }
}
console.log(prev, turn);
console.log(Date.now() - timeNow);