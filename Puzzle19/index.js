const input = require("fs").readFileSync(__dirname + "/input.txt", "utf8").trim().split("\n\n").map((x, i) => 
    i === 0 
        ? x.split("\n").map(y => y.split(": ").map((z, j) => 
            j === 0
                ? Number(z)
                : z.includes(`"`)
                    ? z[1]
                    : z.split(" | ").map(x => x.split(" ").map(Number)))) 
        : x.split("\n"));
const rules = Object.fromEntries(input[0].sort((a, b) => a[0] - b[0]));
const mem = new Map();
function write(num, ans) {
    mem.set(num, ans);
    return ans;
}

function regexRule(ruleNumber) { //without the ^$
    if (mem.get(ruleNumber) === undefined) {
        const theRule = rules[ruleNumber.toString()];
        if (typeof theRule === "string") {
            return write(ruleNumber, theRule);
        } else {
            return write(ruleNumber, "(" + (theRule.reduce((acc, curr, i) => { // eg. [[8, 11], [2, 4]]
                const newRegex = curr.reduce((ac, cu) => ac.concat(regexRule(cu)), "");
                return i === 0 ? newRegex : acc.concat("|" + newRegex);
            }, "")) + ")");
        }
    } else {
        return mem.get(ruleNumber);
    }
}

function runPart1() {
    const theRegex = new RegExp("^" + regexRule(0) + "$");
    return input[1].reduce((acc, curr) => acc + (theRegex.test(curr) ? 1 : 0), 0);
}

console.log(runPart1());

// function possibleStrings(ruleNumber) {
//     if (mem[ruleNumber] === undefined) {
//         console.log(ruleNumber);
//         if (Array.isArray(rules[ruleNumber][1])) { // check other rules
//             return write(ruleNumber, rules[ruleNumber][1].reduce((acc, curr) => { // eg. [[8, 11], [2, 4]]
//                 const possibleString = curr.reduce((a, c) => { // curr is [8, 11] for eg
//                     const arrOfSubstrings = possibleStrings(c);
//                     return arrOfSubstrings.reduce((ac, cu) => ac.concat(a.map(x => x.concat(cu))), []);
//                 }, [""]);
//                 return possibleString.concat(acc);
//             }, []));
//         } else { // rule is a string
//             return write(ruleNumber, [rules[ruleNumber][1]]);
//         }
//     } else {
//         return mem[ruleNumber];
//     }
// }
// console.log(possibleStrings(0));

//Part 2
// rules[8][1] = [[42], [42, 8]];
// rules[11][1] = [[42, 31], [42, 11, 31]];

const rule0 = new RegExp("^(?<group42>(" + mem.get(42) + ")+)(?<group31>(" + mem.get(31) + ")+)$");

function test(str) {
    const matches = rule0.exec(str);
    if (matches) {
        const {groups} = matches;
        const match42 = groups.group42.match(new RegExp(mem.get(42), "g")).length;
        const match31 = groups.group31.match(new RegExp(mem.get(31), "g")).length;
        return match42 > match31;
    } else {
        return false;
    }
}

function runPart2() {
    return input[1].reduce((acc, curr) => acc + (test(curr) ? 1 : 0), 0);
}

console.log(runPart2());