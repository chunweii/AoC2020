const playerCards = require("fs").readFileSync(__dirname + "/input2.txt", "utf8").trim().split("\n\n").map(x => x.split("\n").slice(1).map(Number));

const Queue = function () {
    this.first = null;
    this.size = 0;
};

const Node = function (data) {
    this.data = data;
    this.next = null;
};

Queue.prototype.enqueue = function (data) {
    const node = new Node(data);

    if (!this.first) {
        this.first = node;
    } else {
        n = this.first;
        while (n.next) {
            n = n.next;
        }
        n.next = node;
    }

    this.size += 1;
    return node;
};

Queue.prototype.dequeue = function () {
    temp = this.first;
    this.first = this.first.next;
    this.size -= 1;
    return temp;
};

function generateQueue(arr) { // top to bottom
    const result = new Queue();
    for (const num of arr) {
        result.enqueue(num);
    }
    return result;
}

function queueToArr(player) {
    const result = new Array(player.size);
    let i = 0;
    while (player.size !== 0) {
        result[i] = player.dequeue().data;
        i++;
    }
    return result;
}

let player1Q = generateQueue(playerCards[0]);
let player2Q = generateQueue(playerCards[1]);

function printInAscending(player) {
    return queueToArr(player).reverse().reduce((acc, curr, ind) => acc + curr * (ind + 1) , 0);
}

while (true) {
    const [p1card, p2card] = [player1Q.dequeue().data, player2Q.dequeue().data];
    if (p1card > p2card) {
        // P1 wins
        player1Q.enqueue(p1card);
        player1Q.enqueue(p2card);
    } else {
        // P2 wins
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

function combat2(arrP1, arrP2) {
    const mem = [];
    let strToCheck = `${arrP1.join(",")}.${arrP2.join(",")}`;
    while (true) {
        if (mem.includes(strToCheck)) {
            return { winner: 1, score: arrP1.reverse().reduce((acc, curr, ind) => acc + curr * (ind + 1), 0)};
        } else if (arrP1.length === 0 || arrP2.length === 0) {
            return arrP1.length === 0 
                ? { winner: 2, score: arrP2.reverse().reduce((acc, curr, ind) => acc + curr * (ind + 1), 0) }
                : { winner: 1, score: arrP1.reverse().reduce((acc, curr, ind) => acc + curr * (ind + 1), 0) };
        } else {
            mem.push(strToCheck);
            const p1Top = arrP1.shift();
            const p2Top = arrP2.shift();
            if (arrP1.length >= p1Top && arrP2.length >= p2Top) {
                if (combat2(arrP1.slice(0, p1Top), arrP2.slice(0, p2Top)).winner === 1) {
                    arrP1.push(p1Top, p2Top);
                } else {
                    arrP2.push(p2Top, p1Top);
                };
            } else if (p1Top > p2Top) {
                arrP1.push(p1Top, p2Top);
            } else {
                arrP2.push(p2Top, p1Top);
            }
            strToCheck = `${arrP1.join(",")}.${arrP2.join(",")}`;
        }
    }
}

console.log(combat2(playerCards[0], playerCards[1]));