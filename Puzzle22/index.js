const Queue = require("./queue.js").Queue;
const timeInitial = Date.now();
const playerCards = require("fs").readFileSync(__dirname + "/input.txt", "utf8").trim().split("\n\n").map(x => x.split("\n").slice(1).map(Number));

let player1Q = new Queue(...playerCards[0]);
let player2Q = new Queue(...playerCards[1]);

function printInAscending(player) {
    return player.toArray().reverse().reduce((acc, curr, ind) => acc + curr * (ind + 1) , 0);
}

while (true) {
    const [p1card, p2card] = [player1Q.dequeue().data, player2Q.dequeue().data];
    if (p1card > p2card) {
        // P1 wins round
        player1Q.enqueue(p1card);
        player1Q.enqueue(p2card);
    } else {
        // P2 wins round
        player2Q.enqueue(p2card);
        player2Q.enqueue(p1card);
    }
    if (player1Q.size === 0) {
        console.log("Player 2 wins");
        console.log(printInAscending(player2Q));
        break;
    } else if (player2Q.size === 0) {
        console.log("Player 1 wins");
        console.log(printInAscending(player1Q));
        break;
    }
}

console.log(Date.now() - timeInitial);
let roundsPlayed = 0;
function combat2(p1, p2, first) {
    const mem = [];
    let strToCheck = `${p1.toArray().join(",")}.${p2.toArray().join(",")}`;
    while (true) {
        roundsPlayed++;
        if (mem.includes(strToCheck)) {
            return { winner: 1, score: first ? p1.toArray().reduce((acc, curr, ind, arr) => acc + curr * (arr.length - ind), 0) : 0};
        } else if (p1.size === 0 || p2.size === 0) {
            return p1.size === 0 
                ? { winner: 2, score: first ? p2.toArray().reduce((acc, curr, ind, arr) => acc + curr * (arr.length - ind), 0) : 0 }
                : { winner: 1, score: first ? p1.toArray().reduce((acc, curr, ind, arr) => acc + curr * (arr.length - ind), 0) : 0 };
        } else {
            mem.push(strToCheck);
            const p1Top = p1.dequeue().data;
            const p2Top = p2.dequeue().data;
            if (p1.size >= p1Top && p2.size >= p2Top) {
                if (combat2(p1.slice(0, p1Top), p2.slice(0, p2Top), false).winner === 1) {
                    p1.enqueue(p1Top, p2Top);
                } else {
                    p2.enqueue(p2Top, p1Top);
                };
            } else if (p1Top > p2Top) {
                p1.enqueue(p1Top, p2Top);
            } else {
                p2.enqueue(p2Top, p1Top);
            }
            strToCheck = `${p1.toArray().join(",")}.${p2.toArray().join(",")}`;
        }
    }
}

console.log(combat2(new Queue(...playerCards[0]), new Queue(...playerCards[1]), true));

// function combat2(arrP1, arrP2, first) {
//     const mem = [];
//     let strToCheck = `${arrP1.join(",")}.${arrP2.join(",")}`;
//     while (true) {
//         roundsPlayed++;
//         if (mem.includes(strToCheck)) {
//             return { winner: 1, score: first ? arrP1.reduce((acc, curr, ind, arr) => acc + curr * (arr.length - ind), 0) : 0 };
//         } else if (arrP1.length === 0 || arrP2.length === 0) {
//             return arrP1.length === 0
//                 ? { winner: 2, score: first ? arrP2.reduce((acc, curr, ind, arr) => acc + curr * (arr.length - ind), 0) : 0 }
//                 : { winner: 1, score: first ? arrP1.reduce((acc, curr, ind, arr) => acc + curr * (arr.length - ind), 0) : 0 };
//         } else {
//             mem.push(strToCheck);
//             const p1Top = arrP1.shift();
//             const p2Top = arrP2.shift();
//             if (arrP1.length >= p1Top && arrP2.length >= p2Top) {
//                 if (combat2(arrP1.slice(0, p1Top), arrP2.slice(0, p2Top), false).winner === 1) {
//                     arrP1.push(p1Top, p2Top);
//                 } else {
//                     arrP2.push(p2Top, p1Top);
//                 };
//             } else if (p1Top > p2Top) {
//                 arrP1.push(p1Top, p2Top);
//             } else {
//                 arrP2.push(p2Top, p1Top);
//             }
//             strToCheck = `${arrP1.join(",")}.${arrP2.join(",")}`;
//         }
//     }
// }

// console.log(combat2(playerCards[0], playerCards[1], true));
console.log(roundsPlayed);
console.log("Time taken: " + (Date.now() - timeInitial));