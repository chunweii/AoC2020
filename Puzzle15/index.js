const timeNow = Date.now();
const input = [2, 15, 0, 9, 1, 20];
function solve(input) {
    return turns => {
        let turn = input.length + 1;
        let prev = input[input.length - 1];
        let prevTurn = 0;
        const mem = new Map();
        input.forEach((x, i) => {
            mem.set(x, i + 1);
        });
        while (turn <= turns) {
            if (prevTurn === 0) {
                prevTurn = mem.get(0);
                mem.set(0, turn++);
                prev = 0;
            } else {
                const newNumber = turn - 1 - prevTurn;
                prevTurn = mem.get(newNumber) || 0;
                mem.set(newNumber, turn++);
                prev = newNumber;
            }
        }
        return prev;
    };
}

const solver = solve(input);
console.log(
`Part 1 is ${solver(2020)}
Part 2 is ${solver(30000000)}`);
console.log(Date.now() - timeNow);