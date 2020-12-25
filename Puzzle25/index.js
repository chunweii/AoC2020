// Simple Diffie-Hellman Key Exchange problem.
const input = require("fs").readFileSync(__dirname + "/input.txt", "utf8").split("\n").map(Number);
console.log(input); // [card public key, door public key]

let cardKey = 1;
let cardLoop = 0;
while (cardKey != input[0]) {
    cardKey *= 7;
    cardKey = cardKey % 20201227;
    cardLoop++;
}

let doorKey = 1;
let doorLoop = 0;
while (doorKey != input[1]) {
    doorKey *= 7;
    doorKey = doorKey % 20201227;
    doorLoop++;
}

console.log(cardLoop, doorLoop);

let doorLoop2 = 0;
let encryptionKey = 1;
while (doorLoop2 !== doorLoop) {
    encryptionKey *= cardKey;
    encryptionKey = encryptionKey % 20201227;
    doorLoop2++;
}
console.log(encryptionKey);