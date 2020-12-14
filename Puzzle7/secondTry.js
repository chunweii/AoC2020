const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", "utf8").replace(/((\sbags)|(\sbag))/g, "").split("\n").map(x => x.split(" contain "));

{ // Part 1
const found = ["shiny gold"];
let index = 0;
while (index < found.length) {
    input.forEach(bag => {
        if (bag[1].includes(found[index]) && !found.includes(bag[0])) {
            found.push(bag[0]);
        }
    });
    index++;
}
console.log(index - 1);
}

{ // Part 2
const parsedInput = input.map(bag => {
    const otherBags = bag[1].slice(0, -1).split(", ");
    if (otherBags.includes("no other")) {
        return [bag[0], []];
    } else {
        return [bag[0], otherBags.map(oneColourBag => [parseInt(oneColourBag[0]), oneColourBag.slice(2)])];
    }
});
const memColour = [];
const memCount = [];
function getIndexOfColour(colour) {
    for (let i = 0; i < parsedInput.length; i++) {
        if (parsedInput[i][0] === colour) {
            return i;
        }
    }
    throw "Cannot find colour " + colour;
}
function findSubBags(colour) {
    const indexInMemColour = memColour.indexOf(colour);
    if (indexInMemColour !== -1) {
        return memCount[indexInMemColour];
    } else {
        const indexOfColour = getIndexOfColour(colour);
        const result = parsedInput[indexOfColour][1].reduce((acc, otherBags) => { // eg [1, "light red"]
            return acc + otherBags[0] * (1 + findSubBags(otherBags[1]));
        }, 0);
        memCount.push(result);
        memColour.push(colour);
        return result;
    }
}
console.log(findSubBags("light olive"));
}