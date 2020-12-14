const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt", "utf8").split("\n").map(x => [x[0], parseInt(x.slice(1))]);

Number.prototype.mod = function (n) {
    return ((this % n) + n) % n;
}

function rotateClockwise(degrees) {
    if (degrees === 90) {
        const temp = -waypoint[0];
        waypoint[0] = waypoint[1];
        waypoint[1] = temp;
    } else if (degrees === 180) {
        waypoint[0] = -waypoint[0];
        waypoint[1] = -waypoint[1];
    } else if (degrees === 270) {
        const temp = waypoint[0];
        waypoint[0] = -waypoint[1];
        waypoint[1] = temp;
    } else {
        console.log("Your degrees is " + degrees);
    }
}

let shipCoordinates = [0, 0];
let shipDir = 0; // 0 for east, 1 for south, 2 for west, 3 for north

for (const line of input) {
    switch (line[0]) {
        case "N":
            shipCoordinates[1] += line[1];
            break;
        
        case "S":
            shipCoordinates[1] -= line[1];
            break;

        case "E":
            shipCoordinates[0] += line[1];
            break;

        case "W":
            shipCoordinates[0] -= line[1];
            break;

        case "L":
            shipDir -= line[1] / 90;
            shipDir = shipDir.mod(4);
            break;

        case "R":
            shipDir += line[1] / 90;
            shipDir = shipDir.mod(4);
            break;

        case "F":
            switch (shipDir) {
                case 0:
                    shipCoordinates[0] += line[1];
                    break;
                
                case 1:
                    shipCoordinates[1] -= line[1];
                    break;
                
                case 2:
                    shipCoordinates[0] -= line[1];
                    break;
                
                case 3:
                    shipCoordinates[1] += line[1];
                    break;

                default:
                    console.log("Nani " + shipDir);
                    break;
            }
            break;
        default:
            console.log("What?");
            break;
    }
}

console.log("Part 1 is "+(Math.abs(shipCoordinates[0]) + Math.abs(shipCoordinates[1])));

let waypoint = [10, 1];
shipCoordinates = [0, 0];

for (const line of input) {
    switch (line[0]) {
        case "N":
            waypoint[1] += line[1];
            break;

        case "S":
            waypoint[1] -= line[1];
            break;

        case "E":
            waypoint[0] += line[1];
            break;

        case "W":
            waypoint[0] -= line[1];
            break;

        case "L":
            rotateClockwise(360 - line[1]);
            break;

        case "R":
            rotateClockwise(line[1]);
            break;

        case "F":
            shipCoordinates[0] += line[1] * waypoint[0];
            shipCoordinates[1] += line[1] * waypoint[1];
            break;
        default:
            console.log("What?");
            break;
    }
}

console.log("Part 2 is " + (Math.abs(shipCoordinates[0]) + Math.abs(shipCoordinates[1])));