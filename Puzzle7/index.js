const fs = require("fs");

function display(x) {
    console.log(x);
    return x;
}

fs.readFile(__dirname + "/input.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err.message);
    } else {
        const bags = data.split("\n").map(x => x.slice(0, -1).split(" bags contain ")
            .map((y, index) => index === 0 ? y : y === "no other bags" ? [] : y.split(", ").map(y => 
                            y.substring(0, y.lastIndexOf(" ")).split(/(?<=^\S+)\s/))));
        const colours = bags.map(bag => bag[0]).sort();
        const bagsNumbered = bags.map(bag => {
            const containedBags = bag[1].map(conBag => [parseInt(conBag[0]), colours.indexOf(conBag[1])]);
            return [colours.indexOf(bag[0]), containedBags];
            }).sort((a, b) => a < b ? -1 : 1);
        // array of bags. Each bag is of the following format:
        // [bag number, [[number of bags, bag number of contained bag], [...]]]
        let part1Ans = -1;
        const indexOfShinyGold = colours.indexOf("shiny gold");
        const checkedPart1 = colours.map(x => null);
        function part1(bagNumbered) {
            if (checkedPart1[bagNumbered[0]] === null) {
                if (bagNumbered[0] === indexOfShinyGold) {
                    part1Ans++;
                    checkedPart1[bagNumbered[0]] = true;
                } else {
                    for (conBag of bagNumbered[1]) {
                        part1(bagsNumbered[conBag[1]]);
                        if (checkedPart1[conBag[1]]) {
                            checkedPart1[bagNumbered[0]] = true;
                            part1Ans++;
                            return;
                        }
                    }
                    checkedPart1[bagNumbered[0]] = false;
                }
            }
        }
        bagsNumbered.forEach(bag => part1(bag));
        // setTimeout(() => console.log(part1Ans), 2000);
        console.log(part1Ans);
    }
})